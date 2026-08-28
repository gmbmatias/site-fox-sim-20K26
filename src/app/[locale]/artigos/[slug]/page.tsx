import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, Calendar, User, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { LOCALES, ValidLocale, getAlternateLanguages, getBcp47Lang, getSiteUrl, normalizeLocale } from "@/lib/i18n";
import { getArticleBySlug, getArticles } from "@/lib/translations/articles";
import { getUi } from "@/lib/translations/ui";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => {
    const articles = getArticles(locale);
    return articles.map((article) => ({
      locale,
      slug: article.slug,
    }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const article = getArticleBySlug(locale, resolvedParams.slug);

  if (!article) return {};

  const alternates = getAlternateLanguages(`/artigos/${article.slug}`);
  const siteUrl = getSiteUrl();

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    category: article.category,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${siteUrl}/${locale}/artigos/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      section: article.category,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const article = getArticleBySlug(locale, resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const ui = getUi(locale);
  const bcp47 = getBcp47Lang(locale);
  const siteUrl = getSiteUrl();

  const relatedArticles = article.relatedSlugs
    ? article.relatedSlugs
        .map((slug) => getArticleBySlug(locale, slug))
        .filter(Boolean)
    : [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: bcp47,
    author: {
      "@type": "Organization",
      name: article.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "FOX SIM",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${locale}/artigos/${article.slug}`,
    },
    articleSection: article.category,
  };

  return (
    <main>
      <PageHero
        eyebrow={article.category.toUpperCase()}
        title={article.title}
        description={article.description}
        crumbs={[
          { label: ui.breadcrumbs.home, href: `/${locale}` },
          { label: ui.breadcrumbs.articles, href: `/${locale}/artigos` },
          { label: article.title },
        ]}
      />

      <article className="content-section article-reader-section">
        <div className="shell article-layout">
          <div className="article-main-column">
            {/* Meta info header */}
            <div className="article-meta-bar">
              <span>
                <Calendar size={14} /> {ui.common.publishedAt}{" "}
                {new Intl.DateTimeFormat(bcp47, { dateStyle: "long" }).format(
                  new Date(article.publishedAt)
                )}
              </span>
              <span>
                <Clock3 size={14} /> {article.readTime} min
              </span>
              <span>
                <User size={14} /> {article.author}
              </span>
            </div>

            {/* Intro Lead */}
            <div className="article-intro-lead">
              <p>{article.intro}</p>
            </div>

            {/* Content Sections */}
            <div className="article-body-content">
              {article.sections.map((section, idx) => (
                <section key={section.title} className="article-section-block">
                  <h2>{section.title}</h2>
                  {section.body.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </section>
              ))}
            </div>

            {/* Educational Disclaimer */}
            <div className="article-bottom-disclaimer">
              <strong>Nota Educacional</strong>
              <p>
                Este artigo faz parte da biblioteca educacional FOX SIM e destina-se a fins de
                estudo e simulação de voo. Para operações aeronáuticas reais, consulte sempre as
                publicações oficiais (AIP, ROTAER, NOTAM) e manuais aprovados da aeronave.
              </p>
            </div>

            {/* Back Button */}
            <div className="article-back-nav">
              <Link href={`/${locale}/artigos`} className="button button-secondary">
                <ArrowLeft size={16} /> {ui.common.allArticles}
              </Link>
            </div>
          </div>

          {/* Related Articles Sidebar */}
          <aside className="article-sidebar">
            <div className="panel-card sidebar-block">
              <span className="section-kicker">{ui.common.relatedContent}</span>
              <div className="sidebar-articles-list">
                {relatedArticles.map((rel) => {
                  if (!rel) return null;
                  return (
                    <Link
                      key={rel.slug}
                      href={`/${locale}/artigos/${rel.slug}`}
                      className="sidebar-article-item"
                    >
                      <small>{rel.category}</small>
                      <strong>{rel.title}</strong>
                      <span>{rel.readTime} min →</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  );
}

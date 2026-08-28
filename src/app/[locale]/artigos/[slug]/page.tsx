import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ArticleInteractiveViewer } from "@/components/ArticleInteractiveViewer";
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
    title: `${article.title} | FOX SIM`,
    description: article.description,
    authors: [{ name: article.author }],
    category: article.category,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      type: "article",
      title: `${article.title} | FOX SIM`,
      description: article.description,
      url: `${siteUrl}/${locale}/artigos/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      section: article.category,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | FOX SIM`,
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

      <section className="content-section article-reader-section">
        <div className="shell">
          <ArticleInteractiveViewer
            article={article}
            locale={locale}
            bcp47={bcp47}
            ui={ui}
            relatedArticles={relatedArticles}
          />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  );
}

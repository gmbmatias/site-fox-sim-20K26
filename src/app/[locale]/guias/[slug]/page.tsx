import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock3, Users, HelpCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { LOCALES, ValidLocale, getAlternateLanguages, getBcp47Lang, getSiteUrl, normalizeLocale } from "@/lib/i18n";
import { getGuideBySlug, getGuides } from "@/lib/translations/guides";
import { getUi } from "@/lib/translations/ui";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => {
    const guides = getGuides(locale);
    return guides.map((guide) => ({
      locale,
      slug: guide.slug,
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
  const guide = getGuideBySlug(locale, resolvedParams.slug);

  if (!guide) return {};

  const alternates = getAlternateLanguages(`/guias/${guide.slug}`);

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: `${guide.title} | FOX SIM`,
      description: guide.description,
      url: `${getSiteUrl()}/${locale}/guias/${guide.slug}`,
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const guide = getGuideBySlug(locale, resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  const ui = getUi(locale);
  const siteUrl = getSiteUrl();

  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: {
      "@type": "Organization",
      name: guide.author,
    },
    publisher: {
      "@type": "Organization",
      name: "FOX SIM",
      url: siteUrl,
    },
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    mainEntityOfPage: `${siteUrl}/${locale}/guias/${guide.slug}`,
  };

  const faqSchema = guide.faqList && guide.faqList.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqList.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <main>
      <PageHero
        eyebrow={guide.category.toUpperCase()}
        title={guide.title}
        description={guide.description}
        crumbs={[
          { label: ui.breadcrumbs.home, href: `/${locale}` },
          { label: ui.breadcrumbs.guides, href: `/${locale}/guias` },
          { label: guide.shortTitle },
        ]}
      />

      <article className="content-section guide-reader-section">
        <div className="shell guide-detail-layout">
          <div className="guide-main-content">
            {/* Guide Highlights Header */}
            <div className="guide-summary-card panel-card">
              <div className="guide-summary-meta">
                <span>
                  <Clock3 size={15} /> {guide.readTime} min de leitura
                </span>
                <span>
                  <Users size={15} /> {guide.targetAudience}
                </span>
              </div>
              <p className="guide-summary-lead">{guide.summary}</p>
            </div>

            {/* Guide Content Sections */}
            {guide.sections.map((sec, idx) => (
              <section key={sec.heading} className="guide-section-block">
                <h2>{sec.heading}</h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {sec.bulletPoints && (
                  <ul className="guide-bullets">
                    {sec.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx}>{bp}</li>
                    ))}
                  </ul>
                )}

                {sec.linkedResources && (
                  <div className="guide-resource-links panel-card">
                    <strong>Recursos recomendados na plataforma:</strong>
                    <div className="resource-links-list">
                      {sec.linkedResources.map((res) => (
                        <Link key={res.url} href={`/${locale}${res.url}`} className="resource-link-item">
                          <BookOpen size={15} /> {res.label} <span>→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* FAQ Section */}
            {guide.faqList && guide.faqList.length > 0 && (
              <section className="guide-faq-block">
                <div className="faq-head">
                  <HelpCircle size={22} className="faq-icon" />
                  <h2>Perguntas Frequentes</h2>
                </div>
                <div className="faq-list">
                  {guide.faqList.map((faq, fIdx) => (
                    <div key={fIdx} className="faq-item panel-card">
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Back Button */}
            <div className="article-back-nav">
              <Link href={`/${locale}/guias`} className="button button-secondary">
                <ArrowLeft size={16} /> {ui.common.allGuides}
              </Link>
            </div>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </main>
  );
}

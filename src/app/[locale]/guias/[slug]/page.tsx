import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { GuideInteractiveViewer } from "@/components/GuideInteractiveViewer";
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
    title: `${guide.title} | FOX SIM`,
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

      <section className="content-section guide-reader-section">
        <div className="shell">
          <GuideInteractiveViewer
            guide={guide}
            locale={locale}
            ui={ui}
          />
        </div>
      </section>

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

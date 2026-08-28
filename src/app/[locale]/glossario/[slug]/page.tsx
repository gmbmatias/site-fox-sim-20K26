import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { GlossaryInteractiveViewer } from "@/components/GlossaryInteractiveViewer";
import { LOCALES, ValidLocale, getAlternateLanguages, getBcp47Lang, getSiteUrl, normalizeLocale } from "@/lib/i18n";
import { getGlossaryTermBySlug, getGlossaryTerms } from "@/lib/translations/glossary";
import { getArticleBySlug } from "@/lib/translations/articles";
import { getUi } from "@/lib/translations/ui";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => {
    const terms = getGlossaryTerms(locale);
    return terms.map((term) => ({
      locale,
      slug: term.slug,
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
  const term = getGlossaryTermBySlug(locale, resolvedParams.slug);

  if (!term) return {};

  const alternates = getAlternateLanguages(`/glossario/${term.slug}`);

  return {
    title: `${term.term} — O que é, Significado e Definição | Glossário FOX SIM`,
    description: term.shortDefinition,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: `${term.term} | Glossário FOX SIM`,
      description: term.shortDefinition,
      url: `${getSiteUrl()}/${locale}/glossario/${term.slug}`,
    },
  };
}

export default async function GlossaryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const term = getGlossaryTermBySlug(locale, resolvedParams.slug);

  if (!term) {
    notFound();
  }

  const ui = getUi(locale);
  const bcp47 = getBcp47Lang(locale);
  const siteUrl = getSiteUrl();

  const relatedArticle = term.relatedArticleSlug
    ? getArticleBySlug(locale, term.relatedArticleSlug)
    : undefined;

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.shortDefinition,
    inDefinedTermSet: `${siteUrl}/${locale}/glossario`,
    termCode: term.slug,
  };

  return (
    <main>
      <PageHero
        eyebrow={term.category.toUpperCase()}
        title={`${term.term} — Definição e Conceito`}
        description={term.shortDefinition}
        crumbs={[
          { label: ui.breadcrumbs.home, href: `/${locale}` },
          { label: ui.breadcrumbs.glossary, href: `/${locale}/glossario` },
          { label: term.term },
        ]}
      />

      <section className="content-section glossary-detail-section">
        <div className="shell">
          <GlossaryInteractiveViewer
            term={term}
            locale={locale}
            bcp47={bcp47}
            ui={ui}
            relatedArticle={relatedArticle}
          />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
    </main>
  );
}

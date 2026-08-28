import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ExternalLink, Wrench } from "lucide-react";
import { PageHero } from "@/components/PageHero";
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
    title: `${term.term} — O que é, Significado e Definição`,
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

      <article className="content-section glossary-detail-section">
        <div className="shell glossary-detail-layout">
          <div className="glossary-main-column">
            {/* Quick Answer / Featured Snippet Box */}
            <div className="featured-snippet-box panel-card">
              <span className="section-kicker">RESUMO DIRETO</span>
              <h2>O que é {term.term}?</h2>
              <p className="snippet-lead">{term.shortDefinition}</p>
              <small>Significado: {term.phoneticOrAcronym}</small>
            </div>

            {/* In-depth explanation */}
            <div className="glossary-depth-content">
              <h2>Explicação Técnica Completa</h2>
              {term.fullExplanation.map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>

            {/* Key formula or rules */}
            {term.keyFormulaOrRules && (
              <div className="formula-box panel-card">
                <span className="section-kicker">FÓRMULA / REGRA PRÁTICA</span>
                <code>{term.keyFormulaOrRules}</code>
              </div>
            )}

            {/* Back Button */}
            <div className="article-back-nav">
              <Link href={`/${locale}/glossario`} className="button button-secondary">
                <ArrowLeft size={16} /> {ui.common.allTerms}
              </Link>
            </div>
          </div>

          {/* Related Links Sidebar */}
          <aside className="glossary-sidebar">
            {relatedArticle && (
              <div className="panel-card sidebar-block">
                <span className="section-kicker">GUIA RELACIONADO</span>
                <h3>{relatedArticle.title}</h3>
                <p>{relatedArticle.description}</p>
                <Link href={`/${locale}/artigos/${relatedArticle.slug}`} className="button button-primary">
                  <BookOpen size={16} /> Ler guia completo
                </Link>
              </div>
            )}

            {term.relatedTool && (
              <div className="panel-card sidebar-block">
                <span className="section-kicker">FERRAMENTA</span>
                <h3>Calculadora de {term.term}</h3>
                <p>Calcule os parâmetros na nossa central de ferramentas.</p>
                <Link href={`/${locale}/ferramentas`} className="button button-secondary">
                  <Wrench size={16} /> Abrir ferramentas
                </Link>
              </div>
            )}
          </aside>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
    </main>
  );
}

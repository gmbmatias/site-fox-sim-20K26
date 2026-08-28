import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ValidLocale, getAlternateLanguages, normalizeLocale } from "@/lib/i18n";
import { getGlossaryTerms } from "@/lib/translations/glossary";
import { getUi } from "@/lib/translations/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const alternates = getAlternateLanguages("/glossario");

  const metaData: Record<ValidLocale, { title: string; description: string }> = {
    "pt-br": {
      title: "Glossário Aeronáutico: Termos, Siglas e Definições",
      description: "Dicionário técnico de aviação: METAR, TAF, ILS, VOR, RNAV, RNP, SID, STAR, QNH, QFE, QNE, TOD, DME e conceitos essenciais.",
    },
    en: {
      title: "Aviation Glossary: Terms, Acronyms & Definitions",
      description: "Comprehensive aeronautical dictionary: METAR, TAF, ILS, VOR, RNAV, RNP, SID, STAR, QNH, QFE, QNE, TOD, DME, and essential flight terms.",
    },
    es: {
      title: "Glosario Aeronáutico: Términos, Siglas y Definiciones",
      description: "Diccionario técnico de aviación: METAR, TAF, ILS, VOR, RNAV, RNP, SID, STAR, QNH, QFE, QNE, TOD, DME y conceptos clave de vuelo.",
    },
    fr: {
      title: "Glossaire Aéronautique : Termes, Acronymes & Définitions",
      description: "Dictionnaire technique de l'aviation : METAR, TAF, ILS, VOR, RNAV, RNP, SID, STAR, QNH, QFE, QNE, TOD, DME et notions fondamentales.",
    },
  };

  const m = metaData[locale] || metaData["pt-br"];

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);
  const terms = getGlossaryTerms(locale);

  const heroData: Record<ValidLocale, { eyebrow: string; title: string; description: string }> = {
    "pt-br": {
      eyebrow: "TERMINOLOGIA TÉCNICA",
      title: "Glossário Aeronáutico",
      description: "Definições claras, siglas decodificadas e fórmulas práticas para consulta rápida e fixação de conceitos.",
    },
    en: {
      eyebrow: "TECHNICAL TERMINOLOGY",
      title: "Aviation Glossary",
      description: "Precise definitions, acronyms, and practical rules of thumb for fast reference and study mastery.",
    },
    es: {
      eyebrow: "TERMINOLOGÍA TÉCNICA",
      title: "Glosario Aeronáutico",
      description: "Definiciones precisas, siglas decodificadas y fórmulas prácticas para consulta rápida y afianzar conocimientos.",
    },
    fr: {
      eyebrow: "TERMINOLOGIE TECHNIQUE",
      title: "Glossaire Aéronautique",
      description: "Définitions précises, sigles et formules pratiques pour une consultation rapide et un apprentissage rigoureux.",
    },
  };

  const hero = heroData[locale] || heroData["pt-br"];

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: ui.breadcrumbs.home, href: `/${locale}` }, { label: ui.breadcrumbs.glossary }]}
      />

      <section className="content-section">
        <div className="shell">
          <div className="glossary-grid">
            {terms.map((term) => (
              <article key={term.slug} className="glossary-card panel-card">
                <header className="glossary-card-header">
                  <div>
                    <span className="glossary-badge">{term.category}</span>
                    <h2>
                      <Link href={`/${locale}/glossario/${term.slug}`}>{term.term}</Link>
                    </h2>
                  </div>
                  <small>{term.phoneticOrAcronym}</small>
                </header>
                <p>{term.shortDefinition}</p>
                <div className="glossary-card-footer">
                  <Link href={`/${locale}/glossario/${term.slug}`} className="glossary-read-link">
                    Ver explicação detalhada <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

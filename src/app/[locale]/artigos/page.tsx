import type { Metadata } from "next";
import { ArticleGrid } from "@/components/ArticleGrid";
import { PageHero } from "@/components/PageHero";
import { ValidLocale, getAlternateLanguages, normalizeLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const alternates = getAlternateLanguages("/artigos");

  const metaData: Record<ValidLocale, { title: string; description: string }> = {
    "pt-br": {
      title: "Artigos e Guias de Aviação e Simulação de Voo",
      description: "Biblioteca técnica: como interpretar METAR e TAF, ILS, VOR, RNAV/RNP, circuito de tráfego, altimetria, Top of Descent e simuladores de voo.",
    },
    en: {
      title: "Aviation Articles & Flight Simulation Guides",
      description: "Comprehensive technical guides: METAR & TAF decoding, ILS approaches, VOR tracking, RNAV/RNP navigation, barometric altimetry, and desktop flight simulators.",
    },
    es: {
      title: "Artículos y Guías de Aviación y Simulación",
      description: "Biblioteca técnica de aviación: interpretación de METAR y TAF, sistemas ILS, VOR, navegación RNAV/RNP, altimetría y simuladores de vuelo.",
    },
    fr: {
      title: "Articles & Guides d'Aviation et Simulation de Vol",
      description: "Bibliothèque technique : décodage METAR et TAF, approches ILS, VOR, navigation RNAV/RNP, altimétrie et simulateurs de vol.",
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

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);

  const heroData: Record<ValidLocale, { eyebrow: string; title: string; description: string }> = {
    "pt-br": {
      eyebrow: "BIBLIOTECA TÉCNICA",
      title: "Guias, Artigos e Conceitos",
      description: "Conteúdo aprofundado para compreender meteorologia, navegação instrumental, altimetria, procedimentos e aviação virtual.",
    },
    en: {
      eyebrow: "KNOWLEDGE BASE",
      title: "Technical Articles & Guides",
      description: "In-depth aeronautical guides covering weather interpretation, instrument navigation, altimetry systems, and flight simulation.",
    },
    es: {
      eyebrow: "BIBLIOTECA TÉCNICA",
      title: "Guías, Artículos y Conceptos",
      description: "Contenido especializado en meteorología aeronáutica, navegación instrumental, altimetría y simulación de vuelo.",
    },
    fr: {
      eyebrow: "BASE DE CONNAISSANCES",
      title: "Guides, Articles et Notions",
      description: "Des analyses techniques complètes sur la météorologie, la radionavigation, l'altimétrie et la simulation de vol.",
    },
  };

  const hero = heroData[locale] || heroData["pt-br"];

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: ui.breadcrumbs.home, href: `/${locale}` }, { label: ui.breadcrumbs.articles }]}
      />

      <section className="content-section">
        <div className="shell">
          <ArticleGrid locale={locale} />
        </div>
      </section>
    </main>
  );
}

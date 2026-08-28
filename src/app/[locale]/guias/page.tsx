import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ValidLocale, getAlternateLanguages, normalizeLocale } from "@/lib/i18n";
import { getGuides } from "@/lib/translations/guides";
import { getUi } from "@/lib/translations/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const alternates = getAlternateLanguages("/guias");

  const metaData: Record<ValidLocale, { title: string; description: string }> = {
    "pt-br": {
      title: "Guias Completos de Aviação e Simulação de Voo",
      description: "Hubs de conteúdo aprofundado: Guia Piloto Privado, Guia IFR, Guia de Meteorologia e Guia de Simulação de Voo.",
    },
    en: {
      title: "Aviation Pillar Guides & Flight Simulation Manuals",
      description: "Comprehensive pillar manuals: Private Pilot Ground School, Instrument Rating (IFR), Aviation Weather, and Advanced Flight Simulation.",
    },
    es: {
      title: "Guías Maestras de Aviación y Simulación",
      description: "Guías fundamentales: Guía de Piloto Privado, Guía IFR, Guía de Meteorología Aeronáutica y Guía de Simulación de Vuelo.",
    },
    fr: {
      title: "Guides Maîtres d'Aviation & Simulation de Vol",
      description: "Dossiers de référence : Guide Pilote Privé (PPL), Guide IFR, Guide Météorologie et Guide Simulation de Vol.",
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

export default async function GuidesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);
  const guides = getGuides(locale);

  const heroData: Record<ValidLocale, { eyebrow: string; title: string; description: string }> = {
    "pt-br": {
      eyebrow: "CENTRAL DE CONHECIMENTO",
      title: "Guias Pilares de Aviação",
      description: "Manuais abrangentes e estruturados para consolidar o conhecimento essencial de cada etapa da sua formação.",
    },
    en: {
      eyebrow: "KNOWLEDGE HUBS",
      title: "Aviation Pillar Guides",
      description: "Comprehensive foundational guides structuring essential flight knowledge for every step of your aviation journey.",
    },
    es: {
      eyebrow: "CENTRO DE CONOCIMIENTO",
      title: "Guías Maestras de Aviación",
      description: "Manuales completos y estructurados para consolidar el conocimiento esencial de cada etapa de tu formación.",
    },
    fr: {
      eyebrow: "CENTRE DE CONNAISSANCES",
      title: "Guides Maîtres d'Aviation",
      description: "Des dossiers complets et structurés pour consolider les connaissances essentielles de votre formation aéronautique.",
    },
  };

  const hero = heroData[locale] || heroData["pt-br"];

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: ui.breadcrumbs.home, href: `/${locale}` }, { label: ui.breadcrumbs.guides }]}
      />

      <section className="content-section">
        <div className="shell">
          <div className="guides-hub-grid">
            {guides.map((guide) => (
              <article key={guide.slug} className="guide-hub-card panel-card">
                <header className="guide-hub-header">
                  <span className="guide-badge">{guide.category}</span>
                  <span className="guide-read-time">{guide.readTime} min de leitura</span>
                </header>
                <h2>
                  <Link href={`/${locale}/guias/${guide.slug}`}>{guide.title}</Link>
                </h2>
                <p>{guide.description}</p>
                <div className="guide-target-box">
                  <small>PÚBLICO-ALVO</small>
                  <span>{guide.targetAudience}</span>
                </div>
                <div className="guide-card-footer">
                  <Link href={`/${locale}/guias/${guide.slug}`} className="button button-primary">
                    Explorar guia completo <span>→</span>
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

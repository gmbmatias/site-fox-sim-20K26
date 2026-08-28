import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Toolbox } from "@/components/Toolbox";
import { ValidLocale, getAlternateLanguages, normalizeLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const alternates = getAlternateLanguages("/ferramentas");

  const metaData: Record<ValidLocale, { title: string; description: string }> = {
    "pt-br": {
      title: "Calculadoras Aeronáuticas e Conversores de Voo",
      description: "10 ferramentas práticas: Top of Descent (TOD), vento cruzado, razão de descida, consumo de combustível, relógio UTC e conversores.",
    },
    en: {
      title: "Aviation Flight Calculators & Aeronautical Converters",
      description: "10 practical pilot tools: Top of Descent (TOD), crosswind component, target descent rate, fuel burn & endurance, live UTC clock, and unit converters.",
    },
    es: {
      title: "Calculadoras Aeronáuticas y Conversores de Vuelo",
      description: "10 herramientas de cálculo: Top of Descent (TOD), viento cruzado, régimen de descenso, autonomía, reloj UTC y conversores de unidades.",
    },
    fr: {
      title: "Calculateurs Aéronautiques et Convertisseurs de Vol",
      description: "10 outils pratiques : Top of Descent (TOD), vent traversier, taux de descente, consommation carburant, horloge UTC et conversions d'unités.",
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

export default async function ToolboxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);

  const heroData: Record<ValidLocale, { eyebrow: string; title: string; description: string }> = {
    "pt-br": {
      eyebrow: "MISSION CONTROL",
      title: "Calculadoras e Conversores",
      description: "Ferramentas práticas para resolver conversões, planejar descidas e decompor vento em poucos cliques.",
    },
    en: {
      eyebrow: "MISSION CONTROL",
      title: "Flight Tools & Calculators",
      description: "Fast, practical pilot utilities to resolve conversions, compute top-of-descent points, and calculate crosswind components.",
    },
    es: {
      eyebrow: "MISSION CONTROL",
      title: "Calculadoras y Conversores",
      description: "Herramientas prácticas para realizar conversiones, planificar descensos y calcular componentes de viento en segundos.",
    },
    fr: {
      eyebrow: "MISSION CONTROL",
      title: "Calculateurs & Outils de Vol",
      description: "Des utilitaires aéronautiques pratiques pour convertir les unités, planifier les descentes et décomposer le vent en quelques clics.",
    },
  };

  const hero = heroData[locale] || heroData["pt-br"];

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: ui.breadcrumbs.home, href: `/${locale}` }, { label: ui.breadcrumbs.tools }]}
      />

      <section className="content-section">
        <div className="shell">
          <Toolbox locale={locale} />
        </div>
      </section>
    </main>
  );
}

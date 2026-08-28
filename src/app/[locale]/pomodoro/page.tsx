import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PomodoroApp } from "@/components/PomodoroApp";
import { ValidLocale, getAlternateLanguages, normalizeLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const alternates = getAlternateLanguages("/pomodoro");

  const metaData: Record<ValidLocale, { title: string; description: string }> = {
    "pt-br": {
      title: "Pomodoro Aeronáutico: Foco e Metas de Estudo",
      description: "Temporizador Pomodoro com metas diárias, escolha de matérias de aviação e registro contínuo de tempo estudado.",
    },
    en: {
      title: "Aviation Pomodoro Timer: Focus & Daily Study Goals",
      description: "Customizable aviation Pomodoro focus timer with subject tags, daily study targets, audio cues, and local browser persistence.",
    },
    es: {
      title: "Pomodoro Aeronáutico: Temporizador de Estudio y Enfoque",
      description: "Temporizador Pomodoro con metas diarias, asignación por materias aeronáuticas y registro local de tiempo de estudio.",
    },
    fr: {
      title: "Pomodoro Aéronautique : Minuteur d'Étude & Objectifs",
      description: "Minuteur Pomodoro avec objectifs quotidiens, sélection des matières aéronautiques et journal de sessions local.",
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

export default async function PomodoroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);

  const heroData: Record<ValidLocale, { eyebrow: string; title: string; description: string }> = {
    "pt-br": {
      eyebrow: "MÉTODO DE ESTUDO",
      title: "Pomodoro Aeronáutico",
      description: "Divida seu tempo em blocos de foco sustentável, defina sua meta diária e registre suas sessões de estudo sem distrações.",
    },
    en: {
      eyebrow: "FOCUS WORKFLOW",
      title: "Aviation Pomodoro Timer",
      description: "Break complex aviation topics into structured focus sessions, set daily targets, and track your study time seamlessly.",
    },
    es: {
      eyebrow: "MÉTODO DE ESTUDIO",
      title: "Pomodoro Aeronáutico",
      description: "Divide tu tiempo en bloques de concentración, fija tus metas diarias y registra tus horas de estudio sin interrupciones.",
    },
    fr: {
      eyebrow: "MÉTHODE D'ÉTUDE",
      title: "Pomodoro Aéronautique",
      description: "Structurez vos révisions en blocs de concentration, définissez vos objectifs quotidiens et suivez votre temps d'étude.",
    },
  };

  const hero = heroData[locale] || heroData["pt-br"];

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: ui.breadcrumbs.home, href: `/${locale}` }, { label: ui.breadcrumbs.pomodoro }]}
      />

      <section className="content-section">
        <div className="shell">
          <PomodoroApp locale={locale} />
        </div>
      </section>
    </main>
  );
}

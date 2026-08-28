import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { QuizEngine } from "@/components/QuizEngine";
import { ValidLocale, getAlternateLanguages, normalizeLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const alternates = getAlternateLanguages("/simulados");

  const metaData: Record<ValidLocale, { title: string; description: string }> = {
    "pt-br": {
      title: "Simulados de Prova Teórica de Aviação",
      description: "Teste seus conhecimentos em tempo real com simulados cronometrados de PP, PC, IFR e Multimotor. Relatório de desempenho por matéria.",
    },
    en: {
      title: "Aviation Timed Practice Exams (Mock Tests)",
      description: "Test your ground school proficiency with timed practice exams for Private Pilot, Commercial, IFR, and Multi-Engine.",
    },
    es: {
      title: "Exámenes Simulados de Aviación",
      description: "Pon a prueba tus conocimientos con exámenes cronometrados de PP, PC, IFR y Multimotor con informe final detallado.",
    },
    fr: {
      title: "Examens Blancs Théoriques Aéronautiques",
      description: "Évaluez votre niveau avec des examens chronométrés pour PPL, CPL, IFR et Multi-moteurs avec analyse par matière.",
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

export default async function MockExamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);

  const heroData: Record<ValidLocale, { eyebrow: string; title: string; description: string }> = {
    "pt-br": {
      eyebrow: "AMBIENTE DE EXAME",
      title: "Simulado Cronometrado",
      description: "Teste seu preparo com contagem regressiva, questões aleatórias e relatório completo de desempenho por matéria.",
    },
    en: {
      eyebrow: "EXAM SIMULATION",
      title: "Timed Practice Exams",
      description: "Test your theoretical readiness under realistic countdown constraints with comprehensive subject performance breakdowns.",
    },
    es: {
      eyebrow: "SIMULACIÓN DE EXAMEN",
      title: "Examen Cronometrado",
      description: "Evalúa tu preparación con cuenta atrás, preguntas aleatorias y desglose completo de resultados por materia.",
    },
    fr: {
      eyebrow: "ENVIRONNEMENT D'EXAMEN",
      title: "Examen Blanc Chronométré",
      description: "Mesurez vos connaissances en conditions réelles avec décompte du temps et bilan de compétences par matière.",
    },
  };

  const hero = heroData[locale] || heroData["pt-br"];

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: ui.breadcrumbs.home, href: `/${locale}` }, { label: ui.breadcrumbs.simulations }]}
      />

      <section className="content-section">
        <div className="shell">
          <Suspense fallback={<div className="panel-card">Carregando simulado...</div>}>
            <QuizEngine mode="simulado" locale={locale} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

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
  const alternates = getAlternateLanguages("/questoes");

  const metaData: Record<ValidLocale, { title: string; description: string }> = {
    "pt-br": {
      title: "Banco de Questões de Aviação Comentadas",
      description: "Pratique com questões comentadas de Piloto Privado, Comercial, IFR e Multimotor. Feedback detalhado após cada resposta.",
    },
    en: {
      title: "Aviation Practice Questions with Explanations",
      description: "Practice ground school questions for Private Pilot, Commercial, Instrument Rating (IFR), and Multi-Engine with detailed answers.",
    },
    es: {
      title: "Banco de Preguntas de Aviación Explicadas",
      description: "Practica preguntas de examen de Piloto Privado, Comercial, IFR y Multimotor con corrección y explicaciones inmediatas.",
    },
    fr: {
      title: "Banque de Questions Aéronautiques Commentées",
      description: "Entraînez-vous avec des questions théoriques expliquées pour Pilote Privé (PPL), Commercial (CPL), IFR et Multi-moteurs.",
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

export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);

  const heroData: Record<ValidLocale, { eyebrow: string; title: string; description: string }> = {
    "pt-br": {
      eyebrow: "PRÁTICA GUIADA",
      title: "Banco de Questões Comentadas",
      description: "Resolva questões com correção imediata e explicações técnicas para reforçar conceitos e identificar pontos de melhoria.",
    },
    en: {
      eyebrow: "ACTIVE RECALL PRACTICE",
      title: "Explained Question Bank",
      description: "Solve aeronautical practice questions with immediate feedback and technical explanations to solidify key concepts.",
    },
    es: {
      eyebrow: "PRÁCTICA GUIADA",
      title: "Banco de Preguntas Explicadas",
      description: "Resuelve preguntas de examen con corrección instantánea y explicaciones técnicas para reforzar tu aprendizaje.",
    },
    fr: {
      eyebrow: "ENTRAÎNEMENT GUIDÉ",
      title: "Banque de Questions Commentées",
      description: "Testez vos connaissances avec correction immédiate et explications pour identifier vos axes de révision.",
    },
  };

  const hero = heroData[locale] || heroData["pt-br"];

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: ui.breadcrumbs.home, href: `/${locale}` }, { label: ui.breadcrumbs.questions }]}
      />

      <section className="content-section">
        <div className="shell">
          <Suspense fallback={<div className="panel-card">Carregando questões...</div>}>
            <QuizEngine mode="questoes" locale={locale} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

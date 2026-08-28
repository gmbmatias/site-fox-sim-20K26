import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { ValidLocale, getAlternateLanguages, normalizeLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const alternates = getAlternateLanguages("/painel");

  const metaData: Record<ValidLocale, { title: string; description: string }> = {
    "pt-br": {
      title: "Painel de Estudos e Progresso",
      description: "Acompanhe seu tempo de estudo, sessões Pomodoro, simulados concluídos, taxa de acerto e fila de revisão.",
    },
    en: {
      title: "Study Dashboard & Ground School Analytics",
      description: "Track study time, Pomodoro sessions, mock exam scores, accuracy rates, and active study streaks.",
    },
    es: {
      title: "Panel de Estudio y Progreso",
      description: "Monitorea tu tiempo de estudio, sesiones Pomodoro, exámenes realizados, tasa de acierto y temas a reforzar.",
    },
    fr: {
      title: "Tableau de Bord & Suivi de Progression",
      description: "Suivez votre temps d'étude, vos sessions Pomodoro, vos scores aux examens blancs et vos séries d'étude.",
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

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);

  const heroData: Record<ValidLocale, { eyebrow: string; title: string; description: string }> = {
    "pt-br": {
      eyebrow: "CENTRAL DE COMANDO",
      title: "Meu Painel de Estudos",
      description: "Métricas consolidadas, histórico de atividades, sequência diária e fila de revisão persistidas localmente.",
    },
    en: {
      eyebrow: "COMMAND CENTER",
      title: "My Study Dashboard",
      description: "Consolidated study metrics, activity history, daily study streak, and revision queue saved locally.",
    },
    es: {
      eyebrow: "CENTRO DE MANDO",
      title: "Mi Panel de Estudios",
      description: "Métricas consolidadas, historial de actividades, racha de estudio y cola de repaso guardadas localmente.",
    },
    fr: {
      eyebrow: "POSTE DE CONTRÔLE",
      title: "Mon Tableau de Bord",
      description: "Métriques consolidées, historique d'activité, série d'études et file de révision sauvegardées localement.",
    },
  };

  const hero = heroData[locale] || heroData["pt-br"];

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: ui.breadcrumbs.home, href: `/${locale}` }, { label: ui.breadcrumbs.dashboard }]}
      />

      <section className="content-section">
        <div className="shell">
          <ProgressDashboard locale={locale} />
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ValidLocale, createPageMetadata, normalizeLocale } from "@/lib/i18n";
import { getCourses } from "@/lib/translations/courses";
import { getUi } from "@/lib/translations/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);

  const titles: Record<ValidLocale, { title: string; description: string }> = {
    "pt-br": {
      title: "Trilhas de Estudo em Aviação",
      description: "Explore as trilhas de Piloto Privado, Comercial, IFR e Multimotor estruturadas com aulas, objetivos e progresso.",
    },
    en: {
      title: "Aviation Ground School Courses",
      description: "Structured ground school training for Private Pilot, Commercial, Instrument Rating (IFR), and Multi-Engine.",
    },
    es: {
      title: "Cursos de Formación Aeronáutica",
      description: "Cursos estructurados para Piloto Privado, Comercial, Habilitación Instrumental (IFR) y Multimotor.",
    },
    fr: {
      title: "Formations Théoriques Aéronautiques",
      description: "Parcours complets pour Pilote Privé (PPL), Pilote Professionnel (CPL), IFR et Multi-moteurs.",
    },
  };

  const meta = titles[locale] || titles["pt-br"];

  return createPageMetadata({
    locale,
    path: "/estudos",
    title: meta.title,
    description: meta.description,
  });
}

export default async function StudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);
  const courses = getCourses(locale);

  const heroData: Record<ValidLocale, { eyebrow: string; title: string; description: string }> = {
    "pt-br": {
      eyebrow: "FORMAÇÃO AERONÁUTICA",
      title: "Trilhas de Estudo Estruturadas",
      description: "Módulos organizados em sequência lógica com objetivos claros, tempo estimado e acompanhamento do seu progresso.",
    },
    en: {
      eyebrow: "AVIATION GROUND SCHOOL",
      title: "Structured Ground School Courses",
      description: "Logically sequenced syllabus covering core aeronautical knowledge, clear learning objectives, and local progress tracking.",
    },
    es: {
      eyebrow: "FORMACIÓN AERONÁUTICA",
      title: "Cursos Teóricos de Aviación",
      description: "Módulos estructurados con objetivos claros, tiempo estimado y seguimiento continuo de tu aprendizaje.",
    },
    fr: {
      eyebrow: "FORMATION THÉORIQUE",
      title: "Parcours d'Études Aéronautiques",
      description: "Des modules organisés avec rigueur, des objectifs précis et un suivi local de votre progression.",
    },
  };

  const hero = heroData[locale] || heroData["pt-br"];

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: ui.breadcrumbs.home, href: `/${locale}` }, { label: ui.breadcrumbs.studies }]}
      />

      <section className="content-section">
        <div className="shell">
          <div className="course-grid-2x2">
            {courses.map((course) => {
              const lessonsCount = course.modules.flatMap((m) => m.lessons).length;
              return (
                <article className="course-compact-card panel-card" key={course.code}>
                  <div className="course-compact-header">
                    <span
                      className="course-compact-badge"
                      style={{ color: course.accent, borderColor: `${course.accent}66`, backgroundColor: `${course.accent}14` }}
                    >
                      {course.shortTitle}
                    </span>
                    <span className="course-compact-hours">{course.estimatedHours} {ui.common.hours}</span>
                  </div>
                  
                  <h3 className="course-compact-title">{course.title}</h3>
                  <p className="course-compact-desc">{course.description}</p>
                  
                  <div className="course-compact-meta">
                    <span className="meta-pill">{course.modules.length} {ui.home.modulesCount}</span>
                    <span className="meta-pill">{lessonsCount} {ui.common.lessons}</span>
                    <span className="meta-pill">{course.level}</span>
                  </div>
                  
                  <div className="course-compact-footer">
                    <Link className="course-compact-link" href={`/${locale}/estudos/${course.code}`}>
                      {ui.common.continueStudying} <span>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { StudyTrack } from "@/components/StudyTrack";
import { LOCALES, ValidLocale, getAlternateLanguages, normalizeLocale } from "@/lib/i18n";
import { CourseCode, getCourseByCode, getCourses } from "@/lib/translations/courses";
import { getUi } from "@/lib/translations/ui";

export function generateStaticParams() {
  const codes: CourseCode[] = ["pp", "pc", "ifr", "mlte"];
  return LOCALES.flatMap((locale) =>
    codes.map((code) => ({
      locale,
      code,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const course = getCourseByCode(locale, resolvedParams.code);

  if (!course) return {};

  const alternates = getAlternateLanguages(`/estudos/${course.code}`);

  return {
    title: `${course.title} (${course.shortTitle})`,
    description: course.description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: `${course.title} | FOX SIM`,
      description: course.description,
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const course = getCourseByCode(locale, resolvedParams.code);

  if (!course) {
    notFound();
  }

  const ui = getUi(locale);
  const lessonsCount = course.modules.flatMap((m) => m.lessons).length;

  return (
    <main>
      <PageHero
        eyebrow={`${ui.common.level.toUpperCase()} · ${course.level.toUpperCase()}`}
        title={course.title}
        description={course.description}
        crumbs={[
          { label: ui.breadcrumbs.home, href: `/${locale}` },
          { label: ui.breadcrumbs.studies, href: `/${locale}/estudos` },
          { label: course.shortTitle },
        ]}
        aside={
          <div className="course-hero-badge">
            <span style={{ color: course.accent }}>{course.shortTitle}</span>
            <div>
              <strong>{course.estimatedHours} {ui.common.hours}</strong>
              <small>{lessonsCount} {ui.common.lessons} · {course.modules.length} {ui.home.modulesCount}</small>
            </div>
          </div>
        }
      />

      <section className="content-section">
        <div className="shell">
          <StudyTrack course={course} locale={locale} />
        </div>
      </section>
    </main>
  );
}

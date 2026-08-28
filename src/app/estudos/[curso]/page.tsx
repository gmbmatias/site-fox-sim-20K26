import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, Clock3, Layers3 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { StudyTrack } from "@/components/StudyTrack";
import { courseList, courses, isCourseCode } from "@/lib/content";

export function generateStaticParams() { return courseList.map((course) => ({ curso: course.code })); }
export async function generateMetadata({ params }: { params: Promise<{ curso: string }> }): Promise<Metadata> { const { curso } = await params; if (!isCourseCode(curso)) return {}; const course = courses[curso]; return { title: `Trilha ${course.shortTitle} — ${course.title}`, description: course.description, alternates: { canonical: `/estudos/${course.code}` }, openGraph: { title: `${course.shortTitle}: ${course.title} | FOX SIM`, description: course.description, type: "website" } }; }

export default async function CoursePage({ params }: { params: Promise<{ curso: string }> }) {
  const { curso } = await params; if (!isCourseCode(curso)) notFound(); const course = courses[curso]; const lessonCount = course.modules.flatMap((module) => module.lessons).length;
  return <main><PageHero eyebrow={`TRILHA ${course.shortTitle}`} title={course.title} description={course.description} crumbs={[{ label: "Início", href: "/" }, { label: "Estudos", href: "/estudos" }, { label: course.shortTitle }]} aside={<div className="course-hero-meta" style={{ "--course-accent": course.accent } as React.CSSProperties}><span className="course-hero-code">{course.shortTitle}</span><div><span><Layers3 size={15} /> {course.modules.length} módulos</span><span><BookOpen size={15} /> {lessonCount} aulas</span><span><Clock3 size={15} /> {course.estimatedHours}h estimadas</span></div></div>} /><section className="content-section"><div className="shell"><StudyTrack course={course} /></div></section></main>;
}

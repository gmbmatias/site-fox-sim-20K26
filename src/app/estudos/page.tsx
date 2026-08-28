import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, Layers3, Route } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { courseList } from "@/lib/content";

export const metadata: Metadata = { title: "Trilhas de estudos", description: "Trilhas completas de Piloto Privado, Piloto Comercial, IFR e Multimotor Terrestre.", alternates: { canonical: "/estudos" } };

export default function StudiesPage() {
  const lessons = courseList.reduce((total, course) => total + course.modules.flatMap((module) => module.lessons).length, 0);
  return <main><PageHero eyebrow="ACADEMIA FOX SIM" title="Uma rota clara para cada etapa." description="Escolha sua formação, avance módulo a módulo e acompanhe o que já foi concluído. O progresso fica salvo neste dispositivo." crumbs={[{ label: "Início", href: "/" }, { label: "Estudos" }]} aside={<div className="hero-stat-cluster"><span><b>04</b> trilhas</span><span><b>{lessons}</b> aulas</span><span><b>142h</b> estimadas</span></div>} />
    <section className="content-section"><div className="shell"><div className="section-heading compact"><div><span className="section-kicker">ESCOLHA SUA TRILHA</span><h2>Do primeiro princípio ao voo especializado.</h2></div><p>Cada trilha combina conteúdo, objetivos, prática e revisão.</p></div><div className="study-course-grid">{courseList.map((course, index) => { const lessonCount = course.modules.flatMap((module) => module.lessons).length; return <Link className="study-course-card" href={`/estudos/${course.code}`} style={{ "--course-accent": course.accent } as React.CSSProperties} key={course.code}><header><span>{String(index + 1).padStart(2, "0")}</span><b>{course.level}</b></header><div className="study-course-code">{course.shortTitle}</div><h2>{course.title}</h2><p>{course.description}</p><div className="study-course-meta"><span><Layers3 size={15} /> {course.modules.length} módulos</span><span><BookOpen size={15} /> {lessonCount} aulas</span><span><Clock3 size={15} /> {course.estimatedHours}h</span></div><footer>Ver trilha completa <ArrowRight size={17} /></footer></Link>; })}</div></div></section>
    <section className="study-method"><div className="shell"><div><Route size={31} /><span className="section-kicker">MÉTODO FOX SIM</span><h2>Aprender é uma sequência, não um salto.</h2></div><ol><li><span>01</span><div><b>Compreenda</b><p>Leia com um objetivo claro e conecte o conceito a uma situação de voo.</p></div></li><li><span>02</span><div><b>Recupere</b><p>Feche o material e explique com suas palavras antes de consultar novamente.</p></div></li><li><span>03</span><div><b>Pratique</b><p>Responda questões, analise o motivo do erro e reforce o tema.</p></div></li><li><span>04</span><div><b>Revise</b><p>Volte aos assuntos fracos e faça simulados com tempo controlado.</p></div></li></ol></div></section>
  </main>;
}

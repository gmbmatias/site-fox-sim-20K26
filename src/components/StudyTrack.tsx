"use client";

import Link from "next/link";
import { Check, ChevronDown, Circle, Clock3, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Course } from "@/lib/content";
import { loadProgress, toggleLessonProgress } from "@/lib/progress";

export function StudyTrack({ course }: { course: Course }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(course.modules[0]?.lessons[0]?.id ?? null);

  useEffect(() => {
    const timer = window.setTimeout(() => setCompleted(loadProgress().completedLessons), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const lessonIds = useMemo(() => course.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)), [course]);
  const completedCount = lessonIds.filter((id) => completed.includes(id)).length;
  const percent = Math.round((completedCount / lessonIds.length) * 100);

  const toggle = (id: string) => {
    toggleLessonProgress(id);
    setCompleted(loadProgress().completedLessons);
  };

  return (
    <div className="study-layout">
      <aside className="study-sidebar">
        <div className="course-progress-card">
          <div className="progress-ring" style={{ "--progress": `${percent}%`, "--course-accent": course.accent } as React.CSSProperties}><span>{percent}<small>%</small></span></div>
          <div><small>PROGRESSO DA TRILHA</small><strong>{completedCount} de {lessonIds.length} aulas</strong><p>Seu avanço fica salvo neste dispositivo.</p></div>
        </div>
        <nav aria-label="Módulos da trilha">
          {course.modules.map((module, index) => (
            <a href={`#modulo-${index + 1}`} key={module.title}><span>{String(index + 1).padStart(2, "0")}</span>{module.title}</a>
          ))}
        </nav>
        <div className="sidebar-actions"><Link href={`/questoes?curso=${course.code}`}>Praticar questões <span>→</span></Link><Link href={`/simulados?curso=${course.code}`}>Iniciar simulado <span>→</span></Link></div>
      </aside>

      <div className="module-list">
        {course.modules.map((module, moduleIndex) => {
          const moduleDone = module.lessons.filter((lesson) => completed.includes(lesson.id)).length;
          return (
            <section className="study-module" id={`modulo-${moduleIndex + 1}`} key={module.title}>
              <div className="module-heading"><div><span>MÓDULO {String(moduleIndex + 1).padStart(2, "0")}</span><h2>{module.title}</h2><p>{module.description}</p></div><small>{moduleDone}/{module.lessons.length} concluídas</small></div>
              <div className="lesson-list">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isDone = completed.includes(lesson.id);
                  const isActive = active === lesson.id;
                  return (
                    <article className={isActive ? "lesson-card is-active" : "lesson-card"} key={lesson.id}>
                      <button className="lesson-summary" type="button" onClick={() => setActive(isActive ? null : lesson.id)} aria-expanded={isActive}>
                        <span className={isDone ? "lesson-status done" : "lesson-status"}>{isDone ? <Check size={15} /> : <Circle size={13} />}</span>
                        <span className="lesson-number">{moduleIndex + 1}.{lessonIndex + 1}</span>
                        <span className="lesson-name"><b>{lesson.title}</b><small><Clock3 size={13} /> {lesson.duration} min · leitura guiada</small></span>
                        <ChevronDown className="lesson-chevron" size={18} />
                      </button>
                      {isActive && (
                        <div className="lesson-content">
                          <p>{lesson.summary}</p>
                          <div><b>Ao final desta aula, você será capaz de:</b><ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div>
                          <div className="lesson-actions"><button type="button" className={isDone ? "complete-button is-done" : "complete-button"} onClick={() => toggle(lesson.id)}>{isDone ? <><RotateCcw size={16} /> Marcar como não concluída</> : <><Check size={16} /> Marcar aula como concluída</>}</button></div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
        <div className="study-disclaimer"><b>Uso educacional</b><p>Esta trilha organiza conceitos para estudo e simulação. Consulte manuais, cartas e publicações oficiais vigentes para operações reais.</p></div>
      </div>
    </div>
  );
}

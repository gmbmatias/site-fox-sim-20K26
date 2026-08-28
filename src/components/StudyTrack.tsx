"use client";

import Link from "next/link";
import { Check, ChevronDown, Circle, Clock3, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Course } from "@/lib/translations/courses";
import { loadProgress, toggleLessonProgress } from "@/lib/progress";
import { ValidLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";

const STRINGS: Record<ValidLocale, {
  trackProgress: string;
  ofLessons: string;
  savedLocally: string;
  practiceQuestions: string;
  startExam: string;
  moduleLabel: string;
  completedOf: string;
  guidedReading: string;
  objectivesTitle: string;
  markIncomplete: string;
  markComplete: string;
  educationalUse: string;
  disclaimer: string;
}> = {
  "pt-br": {
    trackProgress: "PROGRESSO DA TRILHA",
    ofLessons: "de aulas",
    savedLocally: "Seu avanço fica salvo neste dispositivo.",
    practiceQuestions: "Praticar questões",
    startExam: "Iniciar simulado",
    moduleLabel: "MÓDULO",
    completedOf: "concluídas",
    guidedReading: "min · leitura guiada",
    objectivesTitle: "Ao final desta aula, você será capaz de:",
    markIncomplete: "Marcar como não concluída",
    markComplete: "Marcar aula como concluída",
    educationalUse: "Uso educacional",
    disclaimer: "Esta trilha organiza conceitos para estudo e simulação. Consulte manuais, cartas e publicações oficiais vigentes para operações reais.",
  },
  en: {
    trackProgress: "COURSE PROGRESS",
    ofLessons: "lessons completed",
    savedLocally: "Your study progress is securely saved in this browser.",
    practiceQuestions: "Practice Questions",
    startExam: "Start Mock Exam",
    moduleLabel: "MODULE",
    completedOf: "completed",
    guidedReading: "min · guided reading",
    objectivesTitle: "Upon completing this lesson, you will be able to:",
    markIncomplete: "Mark as incomplete",
    markComplete: "Mark lesson as complete",
    educationalUse: "Educational Use",
    disclaimer: "This ground school track structures theoretical knowledge for flight training and desktop simulation. Always consult official certified flight manuals for real-world operations.",
  },
  es: {
    trackProgress: "PROGRESO DEL CURSO",
    ofLessons: "lecciones completadas",
    savedLocally: "Tu avance se guarda localmente en este navegador.",
    practiceQuestions: "Practicar preguntas",
    startExam: "Iniciar examen",
    moduleLabel: "MÓDULO",
    completedOf: "completadas",
    guidedReading: "min · lectura guiada",
    objectivesTitle: "Al finalizar esta lección, serás capaz de:",
    markIncomplete: "Marcar como no completada",
    markComplete: "Marcar lección como completada",
    educationalUse: "Uso educativo",
    disclaimer: "Este curso organiza conceptos teóricos para el estudio y la simulación. Consulta publicaciones y manuales oficiales para operaciones reales.",
  },
  fr: {
    trackProgress: "PROGRESSION DU PARCOURS",
    ofLessons: "leçons terminées",
    savedLocally: "Votre progression est enregistrée localement sur cet appareil.",
    practiceQuestions: "Pratiquer les questions",
    startExam: "Démarrer l'examen blanc",
    moduleLabel: "MODULE",
    completedOf: "terminées",
    guidedReading: "min · lecture guidée",
    objectivesTitle: "À l'issue de cette leçon, vous serez en mesure de :",
    markIncomplete: "Marquer comme non terminée",
    markComplete: "Marquer la leçon comme terminée",
    educationalUse: "Usage éducatif",
    disclaimer: "Ce parcours structure les connaissances pour l'étude et la simulation. Consultez les manuels officiels en vigueur pour les opérations réelles.",
  },
};

export function StudyTrack({ course, locale = "pt-br" }: { course: Course; locale?: ValidLocale }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(course.modules[0]?.lessons[0]?.id ?? null);
  const t = STRINGS[locale] || STRINGS["pt-br"];
  const ui = getUi(locale);

  useEffect(() => {
    const timer = window.setTimeout(() => setCompleted(loadProgress().completedLessons), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const lessonIds = useMemo(() => course.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)), [course]);
  const completedCount = lessonIds.filter((id) => completed.includes(id)).length;
  const percent = Math.round((completedCount / (lessonIds.length || 1)) * 100);

  const toggle = (id: string) => {
    toggleLessonProgress(id);
    setCompleted(loadProgress().completedLessons);
  };

  return (
    <div className="study-layout">
      <aside className="study-sidebar">
        <div className="course-progress-card">
          <div className="progress-ring" style={{ "--progress": `${percent}%`, "--course-accent": course.accent } as React.CSSProperties}>
            <span>{percent}<small>%</small></span>
          </div>
          <div>
            <small>{t.trackProgress}</small>
            <strong>{completedCount} / {lessonIds.length} {t.ofLessons}</strong>
            <p>{t.savedLocally}</p>
          </div>
        </div>

        <nav aria-label="Módulos da trilha">
          {course.modules.map((module, index) => (
            <a href={`#modulo-${index + 1}`} key={module.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {module.title}
            </a>
          ))}
        </nav>

        <div className="sidebar-actions">
          <Link href={`/${locale}/questoes?curso=${course.code}`}>
            {t.practiceQuestions} <span>→</span>
          </Link>
          <Link href={`/${locale}/simulados?curso=${course.code}`}>
            {t.startExam} <span>→</span>
          </Link>
        </div>
      </aside>

      <div className="module-list">
        {course.modules.map((module, moduleIndex) => {
          const moduleDone = module.lessons.filter((lesson) => completed.includes(lesson.id)).length;
          return (
            <section className="study-module" id={`modulo-${moduleIndex + 1}`} key={module.title}>
              <div className="module-heading">
                <div>
                  <span>{t.moduleLabel} {String(moduleIndex + 1).padStart(2, "0")}</span>
                  <h2>{module.title}</h2>
                  <p>{module.description}</p>
                </div>
                <small>{moduleDone}/{module.lessons.length} {t.completedOf}</small>
              </div>

              <div className="lesson-list">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isDone = completed.includes(lesson.id);
                  const isActive = active === lesson.id;
                  return (
                    <article className={isActive ? "lesson-card is-active" : "lesson-card"} key={lesson.id}>
                      <button
                        className="lesson-summary"
                        type="button"
                        onClick={() => setActive(isActive ? null : lesson.id)}
                        aria-expanded={isActive}
                      >
                        <span className={isDone ? "lesson-status done" : "lesson-status"}>
                          {isDone ? <Check size={15} /> : <Circle size={13} />}
                        </span>
                        <span className="lesson-number">{moduleIndex + 1}.{lessonIndex + 1}</span>
                        <span className="lesson-name">
                          <b>{lesson.title}</b>
                          <small><Clock3 size={13} /> {lesson.duration} {t.guidedReading}</small>
                        </span>
                        <ChevronDown className="lesson-chevron" size={18} />
                      </button>

                      {isActive && (
                        <div className="lesson-content">
                          <p>{lesson.summary}</p>
                          <div>
                            <b>{t.objectivesTitle}</b>
                            <ul>
                              {lesson.objectives.map((objective) => (
                                <li key={objective}>{objective}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="lesson-actions">
                            <button
                              type="button"
                              className={isDone ? "complete-button is-done" : "complete-button"}
                              onClick={() => toggle(lesson.id)}
                            >
                              {isDone ? (
                                <><RotateCcw size={16} /> {t.markIncomplete}</>
                              ) : (
                                <><Check size={16} /> {t.markComplete}</>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        {course.regulatoryNote && (
          <div className="study-regulatory-note">
            <p><strong>Nota técnica / ICAO:</strong> {course.regulatoryNote}</p>
          </div>
        )}

        <div className="study-disclaimer">
          <b>{t.educationalUse}</b>
          <p>{t.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}

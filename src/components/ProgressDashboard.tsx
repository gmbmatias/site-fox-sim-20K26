"use client";

import Link from "next/link";
import { BookOpen, CheckCircle2, Clock3, Flame, Target, TimerReset, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ValidLocale, getBcp47Lang } from "@/lib/i18n";
import { getCourses } from "@/lib/translations/courses";
import { emptyProgress, loadProgress, type FoxProgress } from "@/lib/progress";

const STRINGS: Record<ValidLocale, {
  timeStudied: string;
  dailyGoal: string;
  pomodoroSessions: string;
  focusRecorded: string;
  questionsAnswered: string;
  correctAnswers: string;
  accuracyRate: string;
  simulationsCompleted: string;
  tracksKicker: string;
  tracksTitle: string;
  viewAll: string;
  lessonsCompleted: string;
  historyKicker: string;
  historyTitle: string;
  emptyHistoryTitle: string;
  emptyHistoryDesc: string;
  practiceNowBtn: string;
  simulatedKind: string;
  practiceKind: string;
  streakTitle: string;
  dayLabel: string;
  daysLabel: string;
  streakDesc: string;
  reviewKicker: string;
  reviewTitle: string;
  reviewEmpty: string;
  reviewPriority: string;
  startReview: string;
  goalsKicker: string;
  goal1: string;
  goal2: string;
  goal3: string;
  goal4: string;
}> = {
  "pt-br": {
    timeStudied: "TEMPO ESTUDADO",
    dailyGoal: "Meta diária: {goal} min",
    pomodoroSessions: "SESSÕES POMODORO",
    focusRecorded: "Foco registrado no dispositivo",
    questionsAnswered: "QUESTÕES",
    correctAnswers: "{correct} respostas corretas",
    accuracyRate: "TAXA DE ACERTO",
    simulationsCompleted: "{count} simulados concluídos",
    tracksKicker: "TRILHAS DE ESTUDO",
    tracksTitle: "Seu plano de voo",
    viewAll: "Ver todas",
    lessonsCompleted: "{done} de {total} aulas",
    historyKicker: "HISTÓRICO",
    historyTitle: "Atividade recente",
    emptyHistoryTitle: "Seu histórico começa com a primeira prática",
    emptyHistoryDesc: "Responda questões ou conclua um simulado para visualizar a evolução.",
    practiceNowBtn: "Praticar agora",
    simulatedKind: "Simulado",
    practiceKind: "Prática de questões",
    streakTitle: "SEQUÊNCIA DE ESTUDOS",
    dayLabel: "dia",
    daysLabel: "dias",
    streakDesc: "Uma sessão hoje mantém sua sequência ativa.",
    reviewKicker: "FILA DE REVISÃO",
    reviewTitle: "Assuntos para reforçar",
    reviewEmpty: "Responda questões. Tópicos abaixo de 70% aparecerão aqui.",
    reviewPriority: "prioridade",
    startReview: "Iniciar revisão",
    goalsKicker: "PRÓXIMAS METAS",
    goal1: "Concluir uma sessão Pomodoro",
    goal2: "Responder 10 questões",
    goal3: "Finalizar um simulado",
    goal4: "Concluir 3 aulas",
  },
  en: {
    timeStudied: "TIME STUDIED",
    dailyGoal: "Daily target: {goal} min",
    pomodoroSessions: "POMODORO SESSIONS",
    focusRecorded: "Focus logged locally",
    questionsAnswered: "QUESTIONS",
    correctAnswers: "{correct} correct answers",
    accuracyRate: "ACCURACY RATE",
    simulationsCompleted: "{count} mock exams completed",
    tracksKicker: "STUDY TRACKS",
    tracksTitle: "Your ground school plan",
    viewAll: "View all",
    lessonsCompleted: "{done} of {total} lessons",
    historyKicker: "HISTORY",
    historyTitle: "Recent activity",
    emptyHistoryTitle: "Your study history begins with your first session",
    emptyHistoryDesc: "Complete questions or finish a practice exam to unlock analytics.",
    practiceNowBtn: "Practice now",
    simulatedKind: "Mock Exam",
    practiceKind: "Practice Questions",
    streakTitle: "STUDY STREAK",
    dayLabel: "day",
    daysLabel: "days",
    streakDesc: "One session today keeps your momentum flying.",
    reviewKicker: "REVIEW QUEUE",
    reviewTitle: "Topics to reinforce",
    reviewEmpty: "Complete quiz questions. Sub-70% subjects will appear here automatically.",
    reviewPriority: "priority",
    startReview: "Start review",
    goalsKicker: "NEXT GOALS",
    goal1: "Complete 1 Pomodoro focus session",
    goal2: "Answer 10 practice questions",
    goal3: "Complete 1 mock practice exam",
    goal4: "Complete 3 ground school lessons",
  },
  es: {
    timeStudied: "TIEMPO ESTUDIADO",
    dailyGoal: "Meta diaria: {goal} min",
    pomodoroSessions: "SESIONES POMODORO",
    focusRecorded: "Foco guardado en tu dispositivo",
    questionsAnswered: "PREGUNTAS",
    correctAnswers: "{correct} respuestas correctas",
    accuracyRate: "TASA DE ACIERTO",
    simulationsCompleted: "{count} exámenes completados",
    tracksKicker: "CURSOS DE ESTUDIO",
    tracksTitle: "Tu plan de vuelo",
    viewAll: "Ver todos",
    lessonsCompleted: "{done} de {total} lecciones",
    historyKicker: "HISTORIAL",
    historyTitle: "Actividad reciente",
    emptyHistoryTitle: "Tu historial comienza con tu primera sesión",
    emptyHistoryDesc: "Responde preguntas o completa un examen para ver tu evolución.",
    practiceNowBtn: "Practicar ahora",
    simulatedKind: "Examen",
    practiceKind: "Práctica de preguntas",
    streakTitle: "RACHA DE ESTUDIOS",
    dayLabel: "día",
    daysLabel: "días",
    streakDesc: "Una sesión hoy mantiene activa tu racha de estudio.",
    reviewKicker: "COLA DE REPASO",
    reviewTitle: "Materias a reforzar",
    reviewEmpty: "Responde preguntas. Los temas con menos del 70% aparecerán aquí.",
    reviewPriority: "prioridad",
    startReview: "Iniciar repaso",
    goalsKicker: "PRÓXIMAS METAS",
    goal1: "Completar 1 sesión Pomodoro",
    goal2: "Responder 10 preguntas",
    goal3: "Finalizar 1 examen de práctica",
    goal4: "Completar 3 lecciones",
  },
  fr: {
    timeStudied: "TEMPS ÉTUDIÉ",
    dailyGoal: "Objectif quotidien : {goal} min",
    pomodoroSessions: "SESSIONS POMODORO",
    focusRecorded: "Focus enregistré sur l'appareil",
    questionsAnswered: "QUESTIONS",
    correctAnswers: "{correct} réponses correctes",
    accuracyRate: "TAUX DE RÉUSSITE",
    simulationsCompleted: "{count} examens blancs terminés",
    tracksKicker: "PARCOURS D'ÉTUDES",
    tracksTitle: "Votre plan de vol",
    viewAll: "Tout voir",
    lessonsCompleted: "{done} sur {total} leçons",
    historyKicker: "HISTORIQUE",
    historyTitle: "Activité récente",
    emptyHistoryTitle: "Votre historique débute avec votre première session",
    emptyHistoryDesc: "Répondez à des questions ou passez un examen pour visualiser vos progrès.",
    practiceNowBtn: "S'entraîner",
    simulatedKind: "Examen blanc",
    practiceKind: "Pratique de questions",
    streakTitle: "SÉRIE D'ÉTUDES",
    dayLabel: "jour",
    daysLabel: "jours",
    streakDesc: "Une session aujourd'hui maintient votre série active.",
    reviewKicker: "FILE DE RÉVISION",
    reviewTitle: "Sujets à renforcer",
    reviewEmpty: "Répondez aux questions. Les thèmes sous 70 % s'afficheront ici.",
    reviewPriority: "priorité",
    startReview: "Démarrer la révision",
    goalsKicker: "PROCHAINS OBJECTIFS",
    goal1: "Terminer une session Pomodoro",
    goal2: "Répondre à 10 questions",
    goal3: "Valider un examen blanc",
    goal4: "Terminer 3 leçons",
  },
};

export function ProgressDashboard({ locale = "pt-br" }: { locale?: ValidLocale }) {
  const t = STRINGS[locale] || STRINGS["pt-br"];
  const bcp47 = getBcp47Lang(locale);
  const courseList = getCourses(locale);

  const [progress, setProgress] = useState<FoxProgress>(emptyProgress);

  useEffect(() => {
    const update = () => setProgress(loadProgress());
    update();
    window.addEventListener("foxsim-progress", update);
    return () => window.removeEventListener("foxsim-progress", update);
  }, []);

  const accuracy = progress.questionsAnswered
    ? Math.round((progress.correctAnswers / progress.questionsAnswered) * 100)
    : 0;
  const simulations = progress.activities.filter((item) => item.kind === "simulado");
  const reviews = Object.entries(progress.reviewTopics)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="dashboard-grid">
      <section className="dashboard-main">
        <div className="metric-grid">
          <div className="metric-card">
            <span><Clock3 size={19} /></span>
            <small>{t.timeStudied}</small>
            <strong>
              {Math.floor(progress.studyMinutes / 60)}h {progress.studyMinutes % 60}min
            </strong>
            <p>{t.dailyGoal.replace("{goal}", String(progress.dailyGoal))}</p>
          </div>

          <div className="metric-card">
            <span><TimerReset size={19} /></span>
            <small>{t.pomodoroSessions}</small>
            <strong>{progress.pomodoroSessions}</strong>
            <p>{t.focusRecorded}</p>
          </div>

          <div className="metric-card">
            <span><CheckCircle2 size={19} /></span>
            <small>{t.questionsAnswered}</small>
            <strong>{progress.questionsAnswered}</strong>
            <p>{t.correctAnswers.replace("{correct}", String(progress.correctAnswers))}</p>
          </div>

          <div className="metric-card">
            <span><Target size={19} /></span>
            <small>{t.accuracyRate}</small>
            <strong>{accuracy}%</strong>
            <p>{t.simulationsCompleted.replace("{count}", String(simulations.length))}</p>
          </div>
        </div>

        <div className="panel-card dashboard-section">
          <div className="dashboard-heading">
            <div>
              <span className="section-kicker">{t.tracksKicker}</span>
              <h2>{t.tracksTitle}</h2>
            </div>
            <Link href={`/${locale}/estudos`}>
              {t.viewAll} <span>→</span>
            </Link>
          </div>
          <div className="dashboard-courses">
            {courseList.map((course) => {
              const lessons = course.modules.flatMap((m) => m.lessons);
              const done = lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
              const percent = Math.round((done / (lessons.length || 1)) * 100);
              return (
                <Link
                  href={`/${locale}/estudos/${course.code}`}
                  className="dashboard-course"
                  key={course.code}
                >
                  <span
                    className="course-code"
                    style={{ color: course.accent, borderColor: `${course.accent}55` }}
                  >
                    {course.shortTitle}
                  </span>
                  <div>
                    <b>{course.title}</b>
                    <small>
                      {t.lessonsCompleted
                        .replace("{done}", String(done))
                        .replace("{total}", String(lessons.length))}
                    </small>
                    <div className="mini-bar">
                      <i style={{ width: `${percent}%`, background: course.accent }} />
                    </div>
                  </div>
                  <strong>{percent}%</strong>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="panel-card dashboard-section">
          <div className="dashboard-heading">
            <div>
              <span className="section-kicker">{t.historyKicker}</span>
              <h2>{t.historyTitle}</h2>
            </div>
          </div>
          {progress.activities.length === 0 ? (
            <div className="dashboard-empty">
              <BookOpen size={28} />
              <b>{t.emptyHistoryTitle}</b>
              <p>{t.emptyHistoryDesc}</p>
              <Link className="button button-primary" href={`/${locale}/questoes`}>
                {t.practiceNowBtn}
              </Link>
            </div>
          ) : (
            <div className="activity-list">
              {progress.activities.slice(0, 6).map((activity) => (
                <div key={activity.id}>
                  <span
                    className={
                      activity.kind === "simulado"
                        ? "activity-icon simulation"
                        : "activity-icon"
                    }
                  >
                    {activity.kind === "simulado" ? (
                      <TrendingUp size={18} />
                    ) : (
                      <CheckCircle2 size={18} />
                    )}
                  </span>
                  <div>
                    <b>
                      {activity.kind === "simulado" ? t.simulatedKind : t.practiceKind} ·{" "}
                      {activity.course.toUpperCase()}
                    </b>
                    <small>
                      {new Intl.DateTimeFormat(bcp47, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(activity.date))}
                    </small>
                  </div>
                  <strong>
                    {Math.round((activity.correct / (activity.total || 1)) * 100)}%
                  </strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <aside className="dashboard-aside">
        <div className="streak-card panel-card">
          <span><Flame size={24} fill="currentColor" /></span>
          <div>
            <small>{t.streakTitle}</small>
            <strong>
              {progress.streak} {progress.streak === 1 ? t.dayLabel : t.daysLabel}
            </strong>
            <p>{t.streakDesc}</p>
          </div>
        </div>

        <div className="panel-card review-card">
          <span className="section-kicker">{t.reviewKicker}</span>
          <h3>{t.reviewTitle}</h3>
          {reviews.length === 0 ? (
            <p>{t.reviewEmpty}</p>
          ) : (
            <div>
              {reviews.slice(0, 5).map(([topic, count]) => (
                <span key={topic}>
                  <b>{topic}</b>
                  <small>
                    {t.reviewPriority} {Math.min(3, count)}/3
                  </small>
                </span>
              ))}
            </div>
          )}
          <Link href={`/${locale}/questoes`}>
            {t.startReview} <span>→</span>
          </Link>
        </div>

        <div className="panel-card goals-card">
          <span className="section-kicker">{t.goalsKicker}</span>
          <label>
            <input type="checkbox" checked={progress.pomodoroSessions > 0} readOnly />
            <span>{t.goal1}</span>
          </label>
          <label>
            <input type="checkbox" checked={progress.questionsAnswered >= 10} readOnly />
            <span>{t.goal2}</span>
          </label>
          <label>
            <input type="checkbox" checked={simulations.length > 0} readOnly />
            <span>{t.goal3}</span>
          </label>
          <label>
            <input type="checkbox" checked={progress.completedLessons.length >= 3} readOnly />
            <span>{t.goal4}</span>
          </label>
        </div>
      </aside>
    </div>
  );
}

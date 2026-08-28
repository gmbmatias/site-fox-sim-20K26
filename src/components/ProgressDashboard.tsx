"use client";

import Link from "next/link";
import { BookOpen, CheckCircle2, Clock3, Flame, Target, TimerReset, TrendingUp, Check, ChevronRight } from "lucide-react";
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
    questionsAnswered: "QUESTÕES RESPONDIDAS",
    correctAnswers: "{correct} respostas corretas",
    accuracyRate: "TAXA DE ACERTO",
    simulationsCompleted: "{count} simulados concluídos",
    tracksKicker: "TRILHAS DE FORMAÇÃO",
    tracksTitle: "Seu plano de voo",
    viewAll: "Ver todas",
    lessonsCompleted: "{done} de {total} aulas",
    historyKicker: "HISTÓRICO OPERACIONAL",
    historyTitle: "Atividade recente",
    emptyHistoryTitle: "Seu histórico começa com a primeira prática",
    emptyHistoryDesc: "Responda questões ou conclua um simulado para visualizar sua evolução e métricas por matéria.",
    practiceNowBtn: "Praticar agora",
    simulatedKind: "Simulado",
    practiceKind: "Prática de questões",
    streakTitle: "SEQUÊNCIA DE ESTUDOS",
    dayLabel: "dia",
    daysLabel: "dias",
    streakDesc: "Uma sessão concluída hoje mantém sua sequência de estudos ativa.",
    reviewKicker: "FILA DE REVISÃO",
    reviewTitle: "Assuntos para reforçar",
    reviewEmpty: "Responda questões. Tópicos com acerto abaixo de 70% aparecerão automaticamente aqui para revisão.",
    reviewPriority: "prioridade",
    startReview: "Iniciar revisão prioritária",
    goalsKicker: "CHECKLIST DE METAS",
    goal1: "Concluir uma sessão Pomodoro",
    goal2: "Responder 10 questões",
    goal3: "Finalizar um simulado",
    goal4: "Concluir 3 aulas teóricas",
  },
  en: {
    timeStudied: "TIME STUDIED",
    dailyGoal: "Daily target: {goal} min",
    pomodoroSessions: "POMODORO SESSIONS",
    focusRecorded: "Focus logged locally",
    questionsAnswered: "QUESTIONS ANSWERED",
    correctAnswers: "{correct} correct answers",
    accuracyRate: "ACCURACY RATE",
    simulationsCompleted: "{count} mock exams completed",
    tracksKicker: "GROUND SCHOOL TRACKS",
    tracksTitle: "Your flight plan",
    viewAll: "View all",
    lessonsCompleted: "{done} of {total} lessons",
    historyKicker: "OPERATIONAL LOG",
    historyTitle: "Recent activity",
    emptyHistoryTitle: "Your study log begins with your first session",
    emptyHistoryDesc: "Complete questions or finish a practice exam to unlock detailed performance analytics.",
    practiceNowBtn: "Practice now",
    simulatedKind: "Mock Exam",
    practiceKind: "Practice Questions",
    streakTitle: "STUDY STREAK",
    dayLabel: "day",
    daysLabel: "days",
    streakDesc: "Completing a study session today keeps your streak alive.",
    reviewKicker: "REVISION QUEUE",
    reviewTitle: "Subjects to reinforce",
    reviewEmpty: "Answer practice questions. Topics scored below 70% will automatically appear here for review.",
    reviewPriority: "priority",
    startReview: "Start targeted review",
    goalsKicker: "GOAL CHECKLIST",
    goal1: "Complete 1 Pomodoro session",
    goal2: "Answer 10 practice questions",
    goal3: "Finish a full mock exam",
    goal4: "Complete 3 syllabus lessons",
  },
  es: {
    timeStudied: "TIEMPO ESTUDIADO",
    dailyGoal: "Meta diaria: {goal} min",
    pomodoroSessions: "SESIONES POMODORO",
    focusRecorded: "Foco guardado en el dispositivo",
    questionsAnswered: "PREGUNTAS RESPONDIDAS",
    correctAnswers: "{correct} respuestas correctas",
    accuracyRate: "TASA DE ACIERTO",
    simulationsCompleted: "{count} exámenes completados",
    tracksKicker: "PLAN DE ESTUDIOS",
    tracksTitle: "Tu plan de vuelo",
    viewAll: "Ver todos",
    lessonsCompleted: "{done} de {total} lecciones",
    historyKicker: "HISTORIAL OPERATIVO",
    historyTitle: "Actividad reciente",
    emptyHistoryTitle: "Tu historial comienza con tu primera práctica",
    emptyHistoryDesc: "Responde preguntas o completa un examen para desbloquear el análisis de tu progreso.",
    practiceNowBtn: "Practicar ahora",
    simulatedKind: "Examen de práctica",
    practiceKind: "Práctica de preguntas",
    streakTitle: "RACHA DE ESTUDIO",
    dayLabel: "día",
    daysLabel: "días",
    streakDesc: "Una sesión completada hoy mantiene activa tu racha de estudio.",
    reviewKicker: "COLA DE REPASO",
    reviewTitle: "Materias a reforzar",
    reviewEmpty: "Responde preguntas. Los temas con menos del 70% de aciertos aparecerán aquí automáticamente.",
    reviewPriority: "prioridad",
    startReview: "Iniciar repaso prioritario",
    goalsKicker: "CHECKLIST DE METAS",
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
    questionsAnswered: "QUESTIONS RÉPONDUES",
    correctAnswers: "{correct} réponses correctes",
    accuracyRate: "TAUX DE RÉUSSITE",
    simulationsCompleted: "{count} examens blancs terminés",
    tracksKicker: "PARCOURS D'ÉTUDES",
    tracksTitle: "Votre plan de vol",
    viewAll: "Tout voir",
    lessonsCompleted: "{done} sur {total} leçons",
    historyKicker: "JOURNAL OPÉRATIONNEL",
    historyTitle: "Activité récente",
    emptyHistoryTitle: "Votre historique débute avec votre première session",
    emptyHistoryDesc: "Répondez à des questions ou passez un examen blanc pour visualiser vos progrès.",
    practiceNowBtn: "S'entraîner",
    simulatedKind: "Examen blanc",
    practiceKind: "Pratique de questions",
    streakTitle: "SÉRIE D'ÉTUDES",
    dayLabel: "jour",
    daysLabel: "jours",
    streakDesc: "Une session aujourd'hui maintient votre série d'études active.",
    reviewKicker: "FILE DE RÉVISION",
    reviewTitle: "Sujets à renforcer",
    reviewEmpty: "Répondez aux questions. Les thèmes sous 70 % de réussite s'afficheront ici pour révision.",
    reviewPriority: "priorité",
    startReview: "Démarrer la révision",
    goalsKicker: "CHECKLIST D'OBJECTIFS",
    goal1: "Terminer une session Pomodoro",
    goal2: "Répondre à 10 questions",
    goal3: "Valider un examen blanc",
    goal4: "Terminer 3 leçons théoriques",
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
    <div className="dashboard-layout">
      {/* 4 Main Metrics Top Grid */}
      <div className="dashboard-metrics-grid">
        <div className="metric-panel-card panel-card">
          <div className="metric-panel-header">
            <span className="metric-kicker">{t.timeStudied}</span>
            <span className="metric-icon"><Clock3 size={17} /></span>
          </div>
          <strong className="metric-main-val">
            {Math.floor(progress.studyMinutes / 60)}h {progress.studyMinutes % 60}min
          </strong>
          <p className="metric-sub-note">{t.dailyGoal.replace("{goal}", String(progress.dailyGoal))}</p>
        </div>

        <div className="metric-panel-card panel-card">
          <div className="metric-panel-header">
            <span className="metric-kicker">{t.pomodoroSessions}</span>
            <span className="metric-icon"><TimerReset size={17} /></span>
          </div>
          <strong className="metric-main-val">{progress.pomodoroSessions}</strong>
          <p className="metric-sub-note">{t.focusRecorded}</p>
        </div>

        <div className="metric-panel-card panel-card">
          <div className="metric-panel-header">
            <span className="metric-kicker">{t.questionsAnswered}</span>
            <span className="metric-icon"><CheckCircle2 size={17} /></span>
          </div>
          <strong className="metric-main-val">{progress.questionsAnswered}</strong>
          <p className="metric-sub-note">{t.correctAnswers.replace("{correct}", String(progress.correctAnswers))}</p>
        </div>

        <div className="metric-panel-card panel-card">
          <div className="metric-panel-header">
            <span className="metric-kicker">{t.accuracyRate}</span>
            <span className="metric-icon"><Target size={17} /></span>
          </div>
          <strong className="metric-main-val">{accuracy}%</strong>
          <p className="metric-sub-note">{t.simulationsCompleted.replace("{count}", String(simulations.length))}</p>
        </div>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="dashboard-columns-grid">
        {/* Left Column: Courses & History */}
        <section className="dashboard-main-column">
          {/* Ground School Tracks Progress */}
          <div className="panel-card dashboard-section-card">
            <div className="dashboard-card-head">
              <div>
                <span className="section-kicker">{t.tracksKicker}</span>
                <h2>{t.tracksTitle}</h2>
              </div>
              <Link href={`/${locale}/estudos`}>
                {t.viewAll} <span>→</span>
              </Link>
            </div>

            <div className="dashboard-courses-grid">
              {courseList.map((course) => {
                const lessons = course.modules.flatMap((m) => m.lessons);
                const done = lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
                const percent = Math.round((done / (lessons.length || 1)) * 100);
                return (
                  <Link
                    href={`/${locale}/estudos/${course.code}`}
                    className="dashboard-course-item"
                    key={course.code}
                  >
                    <div className="dashboard-course-top">
                      <span
                        className="course-pill-badge"
                        style={{
                          color: course.accent,
                          borderColor: `${course.accent}66`,
                          backgroundColor: `${course.accent}14`,
                        }}
                      >
                        {course.shortTitle}
                      </span>
                      <strong className="dashboard-course-pct">{percent}%</strong>
                    </div>

                    <div className="dashboard-course-info">
                      <b className="dashboard-course-title">{course.title}</b>
                      <span className="dashboard-course-lessons">
                        {t.lessonsCompleted
                          .replace("{done}", String(done))
                          .replace("{total}", String(lessons.length))}
                      </span>
                    </div>

                    <div className="dashboard-progress-track">
                      <i style={{ width: `${percent}%`, background: course.accent }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Operational Log / Recent Activity */}
          <div className="panel-card dashboard-section-card">
            <div className="dashboard-card-head">
              <div>
                <span className="section-kicker">{t.historyKicker}</span>
                <h2>{t.historyTitle}</h2>
              </div>
            </div>

            {progress.activities.length === 0 ? (
              <div className="dashboard-empty-state">
                <div className="empty-icon-circle">
                  <BookOpen size={24} />
                </div>
                <h3>{t.emptyHistoryTitle}</h3>
                <p>{t.emptyHistoryDesc}</p>
                <Link className="button button-primary" href={`/${locale}/questoes`}>
                  {t.practiceNowBtn} <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="dashboard-activity-list">
                {progress.activities.slice(0, 6).map((activity) => (
                  <div className="activity-row-item" key={activity.id}>
                    <span
                      className={
                        activity.kind === "simulado"
                          ? "activity-badge-icon simulation"
                          : "activity-badge-icon"
                      }
                    >
                      {activity.kind === "simulado" ? (
                        <TrendingUp size={16} />
                      ) : (
                        <CheckCircle2 size={16} />
                      )}
                    </span>
                    <div className="activity-details">
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
                    <strong className="activity-score-pct">
                      {Math.round((activity.correct / (activity.total || 1)) * 100)}%
                    </strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Right Sidebar: Streak, Revision & Goal Checklist */}
        <aside className="dashboard-sidebar-column">
          {/* Study Streak Card */}
          <div className="panel-card streak-dashboard-card">
            <div className="streak-icon-box">
              <Flame size={26} fill="currentColor" />
            </div>
            <div className="streak-copy-wrap">
              <span className="streak-kicker-tag">{t.streakTitle}</span>
              <strong className="streak-days-number">
                {progress.streak} {progress.streak === 1 ? t.dayLabel : t.daysLabel}
              </strong>
              <p className="streak-desc-text">{t.streakDesc}</p>
            </div>
          </div>

          {/* Revision Queue */}
          <div className="panel-card review-dashboard-card">
            <span className="section-kicker">{t.reviewKicker}</span>
            <h3>{t.reviewTitle}</h3>
            {reviews.length === 0 ? (
              <p className="review-empty-text">{t.reviewEmpty}</p>
            ) : (
              <div className="review-topics-list">
                {reviews.slice(0, 5).map(([topic, count]) => (
                  <div className="review-topic-pill" key={topic}>
                    <b>{topic}</b>
                    <small>
                      {t.reviewPriority} {Math.min(3, count)}/3
                    </small>
                  </div>
                ))}
              </div>
            )}
            <Link href={`/${locale}/questoes`} className="review-cta-link">
              {t.startReview} <span>→</span>
            </Link>
          </div>

          {/* Goals Checklist Card */}
          <div className="panel-card goals-dashboard-card">
            <span className="section-kicker">{t.goalsKicker}</span>
            <div className="goals-checklist-list">
              <div className={progress.pomodoroSessions > 0 ? "goal-check-row is-completed" : "goal-check-row"}>
                <span className="goal-check-box">
                  {progress.pomodoroSessions > 0 && <Check size={13} />}
                </span>
                <span className="goal-check-text">{t.goal1}</span>
              </div>

              <div className={progress.questionsAnswered >= 10 ? "goal-check-row is-completed" : "goal-check-row"}>
                <span className="goal-check-box">
                  {progress.questionsAnswered >= 10 && <Check size={13} />}
                </span>
                <span className="goal-check-text">{t.goal2}</span>
              </div>

              <div className={simulations.length > 0 ? "goal-check-row is-completed" : "goal-check-row"}>
                <span className="goal-check-box">
                  {simulations.length > 0 && <Check size={13} />}
                </span>
                <span className="goal-check-text">{t.goal3}</span>
              </div>

              <div className={progress.completedLessons.length >= 3 ? "goal-check-row is-completed" : "goal-check-row"}>
                <span className="goal-check-box">
                  {progress.completedLessons.length >= 3 && <Check size={13} />}
                </span>
                <span className="goal-check-text">{t.goal4}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

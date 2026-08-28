"use client";

import Link from "next/link";
import { BookOpen, CheckCircle2, Clock3, Flame, Target, TimerReset, TrendingUp, Check, ChevronRight, Sparkles, Trophy, Compass, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { ValidLocale, getBcp47Lang } from "@/lib/i18n";
import { getCourses } from "@/lib/translations/courses";
import { emptyProgress, loadProgress, type FoxProgress } from "@/lib/progress";
import { soundEngine } from "./GlobalInteractivity";

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
    streakDesc: "Completing one study block today maintains your active streak.",
    reviewKicker: "REVIEW QUEUE",
    reviewTitle: "Topics for reinforcement",
    reviewEmpty: "Answer questions to populate your review queue based on performance.",
    reviewPriority: "priority",
    startReview: "Start targeted review",
    goalsKicker: "GOAL CHECKLIST",
    goal1: "Complete 1 Pomodoro session",
    goal2: "Answer 10 practice questions",
    goal3: "Complete 1 mock exam",
    goal4: "Finish 3 ground school lessons",
  },
  es: {
    timeStudied: "TIEMPO DE ESTUDIO",
    dailyGoal: "Meta diaria: {goal} min",
    pomodoroSessions: "SESIONES POMODORO",
    focusRecorded: "Foco registrado en este equipo",
    questionsAnswered: "PREGUNTAS RESPONDIDAS",
    correctAnswers: "{correct} respuestas correctas",
    accuracyRate: "TASA DE ACIERTO",
    simulationsCompleted: "{count} exámenes completados",
    tracksKicker: "RUTAS DE FORMACIÓN",
    tracksTitle: "Tu plan de vuelo",
    viewAll: "Ver todas",
    lessonsCompleted: "{done} de {total} lecciones",
    historyKicker: "HISTORIAL OPERACIONAL",
    historyTitle: "Actividad reciente",
    emptyHistoryTitle: "Tu historial comienza con tu primera práctica",
    emptyHistoryDesc: "Responde preguntas para visualizar tu evolución y métricas detalladas.",
    practiceNowBtn: "Practicar ahora",
    simulatedKind: "Simulado",
    practiceKind: "Práctica de preguntas",
    streakTitle: "RACHA DE ESTUDIO",
    dayLabel: "día",
    daysLabel: "días",
    streakDesc: "Una sesión completada hoy mantiene activa tu racha de estudio.",
    reviewKicker: "COLA DE REPASO",
    reviewTitle: "Temas para reforzar",
    reviewEmpty: "Los temas con acierto inferior al 70% aparecerán automáticamente aquí.",
    reviewPriority: "prioridad",
    startReview: "Iniciar repaso prioritario",
    goalsKicker: "CHECKLIST DE METAS",
    goal1: "Completar una sesión Pomodoro",
    goal2: "Responder 10 preguntas",
    goal3: "Finalizar un simulado",
    goal4: "Completar 3 lecciones teóricas",
  },
  fr: {
    timeStudied: "TEMPS ÉTUDIÉ",
    dailyGoal: "Objectif du jour : {goal} min",
    pomodoroSessions: "SESSIONS POMODORO",
    focusRecorded: "Focus enregistré localement",
    questionsAnswered: "QUESTIONS TRAITÉES",
    correctAnswers: "{correct} réponses correctes",
    accuracyRate: "TAUX DE RÉUSSITE",
    simulationsCompleted: "{count} examens blancs terminés",
    tracksKicker: "PARCOURS DE FORMATION",
    tracksTitle: "Votre plan de vol",
    viewAll: "Tout afficher",
    lessonsCompleted: "{done} sur {total} leçons",
    historyKicker: "CARNET DE BORD",
    historyTitle: "Activité récente",
    emptyHistoryTitle: "Votre carnet débutera à la première session",
    emptyHistoryDesc: "Répondez aux questions pour visualiser vos statistiques de progression.",
    practiceNowBtn: "S'entraîner",
    simulatedKind: "Examen Blanc",
    practiceKind: "Entraînement",
    streakTitle: "SÉRIE D'ÉTUDE",
    dayLabel: "jour",
    daysLabel: "jours",
    streakDesc: "Une session validée aujourd'hui maintient votre série active.",
    reviewKicker: "FILE DE RÉVISION",
    reviewTitle: "Thèmes à renforcer",
    reviewEmpty: "Les notions avec moins de 70% de réussite apparaîtront ici pour révision.",
    reviewPriority: "priorité",
    startReview: "Lancer la révision",
    goalsKicker: "OBJECTIFS DU JOUR",
    goal1: "Terminer une session Pomodoro",
    goal2: "Répondre à 10 questions",
    goal3: "Compléter un examen blanc",
    goal4: "Valider 3 leçons théoriques",
  },
};

export function ProgressDashboard({ locale = "pt-br" }: { locale?: ValidLocale }) {
  const [progress, setProgress] = useState<FoxProgress>(emptyProgress);
  const [customCheckedGoals, setCustomCheckedGoals] = useState<Record<number, boolean>>({});
  const t = STRINGS[locale] || STRINGS["pt-br"];
  const courses = getCourses(locale);
  const bcp47 = getBcp47Lang(locale);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProgress(loadProgress());
      try {
        const savedGoals = JSON.parse(localStorage.getItem("foxsim_dashboard_goals") || "{}");
        setCustomCheckedGoals(savedGoals);
      } catch {
        // ignore
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const triggerToast = (message: string, type: "success" | "info" = "info") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foxsim-toast", { detail: { message, type } }));
    }
  };

  const toggleGoal = (idx: number, label: string) => {
    soundEngine.playChirp();
    const next = { ...customCheckedGoals, [idx]: !customCheckedGoals[idx] };
    setCustomCheckedGoals(next);

    try {
      localStorage.setItem("foxsim_dashboard_goals", JSON.stringify(next));
    } catch {
      // ignore
    }

    if (next[idx]) {
      soundEngine.playSuccess();
      triggerToast(`✓ Meta alcançada: "${label}"! +25 XP`, "success");
    }
  };

  const simulations = progress.activities.filter((item) => item.kind === "simulado");
  const accuracy = Math.round(
    (progress.correctAnswers / (progress.questionsAnswered || 1)) * 100
  );

  const reviews = Object.entries(progress.reviewQueue).sort((a, b) => b[1] - a[1]);

  return (
    <div className="dashboard-layout">
      {/* Top 4 Cockpit Metrics Cards */}
      <section className="dashboard-metrics-grid" aria-label="Métricas principais">
        <div className="panel-card dashboard-metric-card">
          <div className="metric-icon-wrap time">
            <Clock3 size={20} />
          </div>
          <span className="metric-kicker-label">{t.timeStudied}</span>
          <strong className="metric-big-number">{progress.totalMinutes} min</strong>
          <small className="metric-sub-label">
            {t.dailyGoal.replace("{goal}", String(progress.dailyGoal))}
          </small>
        </div>

        <div className="panel-card dashboard-metric-card">
          <div className="metric-icon-wrap pomodoro">
            <TimerReset size={20} />
          </div>
          <span className="metric-kicker-label">{t.pomodoroSessions}</span>
          <strong className="metric-big-number">{progress.pomodoroSessions}</strong>
          <small className="metric-sub-label">{t.focusRecorded}</small>
        </div>

        <div className="panel-card dashboard-metric-card">
          <div className="metric-icon-wrap questions">
            <Target size={20} />
          </div>
          <span className="metric-kicker-label">{t.questionsAnswered}</span>
          <strong className="metric-big-number">{progress.questionsAnswered}</strong>
          <small className="metric-sub-label">
            {t.correctAnswers.replace("{correct}", String(progress.correctAnswers))}
          </small>
        </div>

        <div className="panel-card dashboard-metric-card">
          <div className="metric-icon-wrap accuracy">
            <TrendingUp size={20} />
          </div>
          <span className="metric-kicker-label">{t.accuracyRate}</span>
          <strong className="metric-big-number">{accuracy}%</strong>
          <small className="metric-sub-label">
            {t.simulationsCompleted.replace("{count}", String(simulations.length))}
          </small>
        </div>
      </section>

      {/* Main 2-Column Dashboard Layout */}
      <div className="dashboard-columns-grid">
        {/* Left Primary Section: Course Tracks & Activity Log */}
        <section className="dashboard-main-column">
          {/* Ground School Tracks */}
          <div className="panel-card dashboard-section-card">
            <div className="dashboard-card-head">
              <div>
                <span className="section-kicker">{t.tracksKicker}</span>
                <h2>{t.tracksTitle}</h2>
              </div>
              <Link className="dashboard-head-link" href={`/${locale}/estudos`}>
                {t.viewAll} <span>→</span>
              </Link>
            </div>

            <div className="dashboard-courses-grid">
              {courses.map((course) => {
                const total = course.modules.flatMap((m) => m.lessons).length;
                const done = course.modules
                  .flatMap((m) => m.lessons)
                  .filter((l) => progress.completedLessons.includes(l.id)).length;
                const percent = Math.round((done / (total || 1)) * 100);

                return (
                  <Link
                    key={course.code}
                    className="dashboard-course-card panel-card"
                    href={`/${locale}/estudos/${course.code}`}
                    onClick={() => soundEngine.playClick()}
                  >
                    <div className="dashboard-course-top">
                      <span className="dashboard-course-badge" style={{ color: course.accent, borderColor: course.accent }}>
                        {course.shortTitle}
                      </span>
                      <strong className="dashboard-course-pct">{percent}%</strong>
                    </div>

                    <div className="dashboard-course-info">
                      <h3>{course.title}</h3>
                      <p>
                        {t.lessonsCompleted
                          .replace("{done}", String(done))
                          .replace("{total}", String(total))}
                      </p>
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
                  <BookOpen size={24} className="text-cyan" />
                </div>
                <h3>{t.emptyHistoryTitle}</h3>
                <p>{t.emptyHistoryDesc}</p>
                <Link className="button button-primary" href={`/${locale}/questoes`} onClick={() => soundEngine.playClick()}>
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
          {/* Study Streak Card with Animated Flame */}
          <div className="panel-card streak-dashboard-card">
            <div className="streak-icon-box">
              <Flame size={28} className="streak-flame-icon" />
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
            <Link href={`/${locale}/questoes`} className="review-cta-link" onClick={() => soundEngine.playClick()}>
              {t.startReview} <span>→</span>
            </Link>
          </div>

          {/* Interactive Goals Checklist Card */}
          <div className="panel-card goals-dashboard-card">
            <span className="section-kicker">{t.goalsKicker}</span>
            <div className="goals-checklist-list">
              {[
                { label: t.goal1, isAuto: progress.pomodoroSessions > 0 },
                { label: t.goal2, isAuto: progress.questionsAnswered >= 10 },
                { label: t.goal3, isAuto: simulations.length > 0 },
                { label: t.goal4, isAuto: progress.completedLessons.length >= 3 },
              ].map((goal, gIdx) => {
                const isCompleted = goal.isAuto || !!customCheckedGoals[gIdx];

                return (
                  <button
                    key={gIdx}
                    type="button"
                    onClick={() => toggleGoal(gIdx, goal.label)}
                    className={`goal-check-row ${isCompleted ? "is-completed" : ""}`}
                    title="Clique para marcar / desmarcar meta"
                  >
                    <span className="goal-check-box">
                      {isCompleted && <Check size={13} className="text-night" />}
                    </span>
                    <span className="goal-check-text">{goal.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

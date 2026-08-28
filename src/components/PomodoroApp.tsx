"use client";

import { Bell, BellRing, Pause, Play, RotateCcw, Volume2, VolumeX, Sparkles, Flame, Clock, Compass } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ValidLocale } from "@/lib/i18n";
import { loadProgress, recordPomodoro, setDailyGoal as persistDailyGoal } from "@/lib/progress";
import { soundEngine } from "./GlobalInteractivity";

type Phase = "foco" | "pausa-curta" | "pausa-longa";

const STRINGS: Record<ValidLocale, {
  phases: Record<Phase, string>;
  custom: string;
  focusLabel: string;
  breakLabel: string;
  pauseBtn: string;
  resumeBtn: string;
  startBtn: string;
  focusBtn: string;
  shortBreakBtn: string;
  longBreakBtn: string;
  sessionKicker: string;
  subjectLabel: string;
  subjects: string[];
  notifEnabled: string;
  notifEnableBtn: string;
  todayKicker: string;
  minStudied: string;
  sessionsCount: string;
  ofGoal: string;
  dailyGoalLabel: string;
  tipTitle: string;
  tipText: string;
  notifBodyFocus: string;
  notifBodyBreak: string;
}> = {
  "pt-br": {
    phases: { foco: "Sessão de Foco", "pausa-curta": "Pausa Curta", "pausa-longa": "Pausa Longa" },
    custom: "Personalizado",
    focusLabel: "Foco",
    breakLabel: "Pausa",
    pauseBtn: "Pausar",
    resumeBtn: "Continuar",
    startBtn: "Iniciar",
    focusBtn: "Foco",
    shortBreakBtn: "Pausa Curta",
    longBreakBtn: "Pausa Longa",
    sessionKicker: "SESSÃO ATUAL",
    subjectLabel: "Matéria de Estudo",
    subjects: ["Teoria de voo", "Meteorologia", "Navegação", "Regulamentos", "Performance", "Voo IFR", "Multimotor"],
    notifEnabled: "Notificações ativadas",
    notifEnableBtn: "Ativar notificações",
    todayKicker: "DESEMPENHO DE HOJE",
    minStudied: "min estudados",
    sessionsCount: "sessões",
    ofGoal: "da meta diária",
    dailyGoalLabel: "Meta diária",
    tipTitle: "Ritmo Sustentável de Estudo",
    tipText: "Durante o bloco de foco, elimine distrações e foque em um único objetivo. Na pausa, descanse a visão para melhor fixação da memória.",
    notifBodyFocus: "Sessão de foco concluída! Hora de uma pausa.",
    notifBodyBreak: "Pausa concluída! Pronto para a próxima sessão?",
  },
  en: {
    phases: { foco: "Focus Session", "pausa-curta": "Short Break", "pausa-longa": "Long Break" },
    custom: "Custom",
    focusLabel: "Focus",
    breakLabel: "Break",
    pauseBtn: "Pause",
    resumeBtn: "Resume",
    startBtn: "Start",
    focusBtn: "Focus",
    shortBreakBtn: "Short Break",
    longBreakBtn: "Long Break",
    sessionKicker: "CURRENT SESSION",
    subjectLabel: "Study Subject",
    subjects: ["Principles of Flight", "Meteorology", "Navigation", "Air Law & Regs", "Performance", "IFR Flight", "Multi-Engine"],
    notifEnabled: "Notifications enabled",
    notifEnableBtn: "Enable notifications",
    todayKicker: "TODAY'S PROGRESS",
    minStudied: "minutes studied",
    sessionsCount: "sessions",
    ofGoal: "of daily goal",
    dailyGoalLabel: "Daily target",
    tipTitle: "Sustainable Study Rhythm",
    tipText: "During focus intervals, eliminate distractions and focus on one specific concept. Take active short breaks to consolidate knowledge.",
    notifBodyFocus: "Focus session complete! Time for a short break.",
    notifBodyBreak: "Break finished! Ready for your next flight block?",
  },
  es: {
    phases: { foco: "Sesión de Foco", "pausa-curta": "Pausa Corta", "pausa-longa": "Pausa Larga" },
    custom: "Personalizado",
    focusLabel: "Foco",
    breakLabel: "Pausa",
    pauseBtn: "Pausar",
    resumeBtn: "Continuar",
    startBtn: "Iniciar",
    focusBtn: "Foco",
    shortBreakBtn: "Pausa Corta",
    longBreakBtn: "Pausa Larga",
    sessionKicker: "SESIÓN ACTUAL",
    subjectLabel: "Materia de Estudio",
    subjects: ["Teoría de vuelo", "Meteorología", "Navegación", "Reglamentos", "Performance", "Vuelo IFR", "Multimotor"],
    notifEnabled: "Notificaciones activadas",
    notifEnableBtn: "Activar notificaciones",
    todayKicker: "PROGRESO DE HOY",
    minStudied: "min estudiados",
    sessionsCount: "sesiones",
    ofGoal: "de la meta diaria",
    dailyGoalLabel: "Meta diaria",
    tipTitle: "Ritmo Sostenible de Estudio",
    tipText: "Durante el bloque de foco, elimina distracciones y enfócate en un solo objetivo. Descansa la vista en las pausas.",
    notifBodyFocus: "¡Sesión de foco completada! Momento de descansar.",
    notifBodyBreak: "¡Pausa finalizada! ¿Listo para continuar?",
  },
  fr: {
    phases: { foco: "Session de Focus", "pausa-curta": "Pause Courte", "pausa-longa": "Pause Longue" },
    custom: "Personnalisé",
    focusLabel: "Focus",
    breakLabel: "Pause",
    pauseBtn: "Pause",
    resumeBtn: "Reprendre",
    startBtn: "Démarrer",
    focusBtn: "Focus",
    shortBreakBtn: "Pause Courte",
    longBreakBtn: "Pause Longue",
    sessionKicker: "SESSION ACTUELLE",
    subjectLabel: "Matière d'Étude",
    subjects: ["Principes du Vol", "Météorologie", "Navigation", "Réglementation", "Performance", "Vol IFR", "Multi-moteurs"],
    notifEnabled: "Notifications activées",
    notifEnableBtn: "Activer les notifications",
    todayKicker: "PROGRESSION DU JOUR",
    minStudied: "min étudiées",
    sessionsCount: "sessions",
    ofGoal: "de l'objectif quotidien",
    dailyGoalLabel: "Objectif quotidien",
    tipTitle: "Rythme d'Étude Soutenable",
    tipText: "Pendant la session de focus, éliminez les distractions et fixez-vous un objectif précis. Reposez vos yeux pendant les pauses.",
    notifBodyFocus: "Session terminée ! C'est l'heure d'une pause.",
    notifBodyBreak: "Pause terminée ! Prêt pour la prochaine session ?",
  },
};

export function PomodoroApp({ locale = "pt-br" }: { locale?: ValidLocale }) {
  const t = STRINGS[locale] || STRINGS["pt-br"];
  const [phase, setPhase] = useState<Phase>("foco");
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(50);
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [subject, setSubject] = useState(t.subjects[0]);
  const completedRef = useRef(false);

  const triggerToast = (message: string, type: "success" | "info" = "info") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foxsim-toast", { detail: { message, type } }));
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const progress = loadProgress();
      const today = new Date().toLocaleDateString("en-CA");
      setSessions(progress.pomodoroSessions);
      setTodayMinutes(progress.dailyMinutesDate === today ? progress.dailyMinutes : 0);
      setDailyGoal(progress.dailyGoal);
      setNotifications(typeof Notification !== "undefined" && Notification.permission === "granted");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (remaining !== 0 || completedRef.current) return;
    const timer = window.setTimeout(() => {
      completedRef.current = true;
      setRunning(false);
      soundEngine.playSuccess();
      
      if (notifications && typeof Notification !== "undefined") {
        new Notification("FOX SIM", {
          body: phase === "foco" ? t.notifBodyFocus : t.notifBodyBreak,
        });
      }
      if (phase === "foco") {
        recordPomodoro(focusMinutes, dailyGoal);
        setSessions(loadProgress().pomodoroSessions);
        setTodayMinutes(loadProgress().dailyMinutes);
        triggerToast(`🎉 Bloco de foco em "${subject}" concluído! (+${focusMinutes} min)`, "success");
      } else {
        triggerToast("Pausa concluída! Pronto para o próximo bloco? ✈️", "info");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [remaining, notifications, phase, focusMinutes, dailyGoal, t, subject]);

  const setPreset = (focus: number, pause: number) => {
    soundEngine.playClick();
    setFocusMinutes(focus);
    setShortBreak(pause);
    setPhase("foco");
    setRemaining(focus * 60);
    setRunning(false);
    completedRef.current = false;
  };

  const switchPhase = (next: Phase) => {
    soundEngine.playClick();
    const minutes = next === "foco" ? focusMinutes : next === "pausa-curta" ? shortBreak : 15;
    setPhase(next);
    setRemaining(minutes * 60);
    setRunning(false);
    completedRef.current = false;
  };

  const reset = () => {
    soundEngine.playChirp();
    switchPhase(phase);
  };

  const toggleRun = () => {
    soundEngine.playClick();
    completedRef.current = false;
    setRunning(!running);
  };

  const requestNotifications = async () => {
    if (typeof Notification === "undefined") return;
    const permission = await Notification.requestPermission();
    setNotifications(permission === "granted");
    if (permission === "granted") {
      soundEngine.playSuccess();
      triggerToast("Notificações do Cockpit Ativadas! 🔔", "success");
    }
  };

  const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
  const seconds = (remaining % 60).toString().padStart(2, "0");
  const totalForPhase = (phase === "foco" ? focusMinutes : phase === "pausa-curta" ? shortBreak : 15) * 60;
  const clockProgress = Math.max(0, Math.min(100, ((totalForPhase - remaining) / (totalForPhase || 1)) * 100));

  return (
    <div className="pomodoro-layout">
      {/* Clock Instrument Section */}
      <section className="pomodoro-clock panel-card">
        {/* Preset Selector */}
        <div className="preset-tabs">
          <button
            type="button"
            className={focusMinutes === 25 && shortBreak === 5 ? "preset-tab active" : "preset-tab"}
            onClick={() => setPreset(25, 5)}
          >
            25 / 5 min
          </button>
          <button
            type="button"
            className={focusMinutes === 50 && shortBreak === 10 ? "preset-tab active" : "preset-tab"}
            onClick={() => setPreset(50, 10)}
          >
            50 / 10 min
          </button>
          <button
            type="button"
            className={![25, 50].includes(focusMinutes) ? "preset-tab active" : "preset-tab"}
            onClick={() => setPreset(40, 8)}
          >
            {t.custom}
          </button>
        </div>

        {![25, 50].includes(focusMinutes) && (
          <div className="custom-times">
            <label className="custom-input-label">
              <span>{t.focusLabel}</span>
              <input
                type="number"
                min="1"
                max="120"
                value={focusMinutes}
                onChange={(event) => setPreset(Math.max(1, Number(event.target.value)), shortBreak)}
              />
              <small>min</small>
            </label>
            <label className="custom-input-label">
              <span>{t.breakLabel}</span>
              <input
                type="number"
                min="1"
                max="30"
                value={shortBreak}
                onChange={(event) => setPreset(focusMinutes, Math.max(1, Number(event.target.value)))}
              />
              <small>min</small>
            </label>
          </div>
        )}

        {/* Phase Header Tag */}
        <div className="clock-phase-tag">
          <span className="phase-dot" />
          <span className="phase-text">{t.phases[phase]}</span>
        </div>

        {/* Circular Instrument Dial with Animated Glow */}
        <div
          className={`clock-dial ${running ? "is-running" : ""}`}
          style={{ "--clock-progress": `${clockProgress}%` } as React.CSSProperties}
        >
          <div className="clock-dial-inner">
            <div className="clock-digits-display">
              <span className="digit-segment">{minutes}</span>
              <span className="digit-colon">:</span>
              <span className="digit-segment">{seconds}</span>
            </div>
            <div className="clock-subject-pill">
              <Compass size={12} className="text-cyan" />
              <span>{subject}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="clock-controls">
          <button
            type="button"
            className="round-action-btn"
            onClick={reset}
            aria-label="Reiniciar cronômetro"
            title="Reiniciar"
          >
            <RotateCcw size={18} />
          </button>
          
          <button
            type="button"
            className={running ? "main-play-btn is-running" : "main-play-btn"}
            onClick={toggleRun}
          >
            {running ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            <span>{running ? t.pauseBtn : remaining < totalForPhase ? t.resumeBtn : t.startBtn}</span>
          </button>

          <button
            type="button"
            className="round-action-btn"
            onClick={() => {
              setSound(!sound);
              soundEngine.playClick();
            }}
            aria-label={sound ? "Silenciar áudio" : "Ativar áudio"}
            title={sound ? "Silenciar áudio" : "Ativar áudio"}
          >
            {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>

        {/* Phase Quick Switch */}
        <div className="break-switch">
          <button
            type="button"
            className={phase === "foco" ? "phase-btn active" : "phase-btn"}
            onClick={() => switchPhase("foco")}
          >
            {t.focusBtn}
          </button>
          <button
            type="button"
            className={phase === "pausa-curta" ? "phase-btn active" : "phase-btn"}
            onClick={() => switchPhase("pausa-curta")}
          >
            {t.shortBreakBtn}
          </button>
          <button
            type="button"
            className={phase === "pausa-longa" ? "phase-btn active" : "phase-btn"}
            onClick={() => switchPhase("pausa-longa")}
          >
            {t.longBreakBtn}
          </button>
        </div>
      </section>

      {/* Sidebar Cockpit Settings & Statistics */}
      <aside className="pomodoro-sidebar">
        {/* Subject & Notification Form */}
        <div className="panel-card setting-card">
          <span className="section-kicker">{t.sessionKicker}</span>
          <div className="setting-field">
            <label htmlFor="pomodoro-subject-select" className="setting-label">
              {t.subjectLabel}
            </label>
            <div className="select-wrap">
              <select
                id="pomodoro-subject-select"
                value={subject}
                onChange={(event) => {
                  soundEngine.playClick();
                  setSubject(event.target.value);
                }}
              >
                {t.subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            className={notifications ? "notification-toggle-btn active" : "notification-toggle-btn"}
            onClick={requestNotifications}
          >
            {notifications ? <BellRing size={16} /> : <Bell size={16} />}
            <span>{notifications ? t.notifEnabled : t.notifEnableBtn}</span>
          </button>
        </div>

        {/* Today's Goal & Metrics */}
        <div className="panel-card today-card">
          <span className="section-kicker">{t.todayKicker}</span>
          
          <div className="today-main-metric">
            <strong className="metric-number">{todayMinutes}</strong>
            <span className="metric-unit">{t.minStudied}</span>
          </div>

          <div className="today-stats-grid">
            <div className="stat-pill-box">
              <strong>{sessions}</strong>
              <span>{t.sessionsCount}</span>
            </div>
            <div className="stat-pill-box">
              <strong>{Math.min(100, Math.round((todayMinutes / (dailyGoal || 1)) * 100))}%</strong>
              <span>{t.ofGoal}</span>
            </div>
          </div>

          <div className="goal-progress-wrap">
            <div className="goal-progress-bar">
              <i style={{ width: `${Math.min(100, (todayMinutes / (dailyGoal || 1)) * 100)}%` }} />
            </div>
          </div>

          <div className="daily-goal-setter">
            <label htmlFor="pomodoro-daily-goal-input" className="goal-input-label">
              <span>{t.dailyGoalLabel}</span>
              <div className="goal-input-group">
                <input
                  id="pomodoro-daily-goal-input"
                  type="number"
                  min="10"
                  max="480"
                  value={dailyGoal}
                  onChange={(event) => {
                    const goal = Math.max(10, Number(event.target.value));
                    setDailyGoal(goal);
                    persistDailyGoal(goal);
                  }}
                />
                <span className="goal-unit-tag">min</span>
              </div>
            </label>
          </div>
        </div>

        {/* Sustainable Focus Tip Card */}
        <div className="panel-card pomodoro-tip-box">
          <span className="tip-kicker">DICA TÉCNICA</span>
          <h4>{t.tipTitle}</h4>
          <p>{t.tipText}</p>
        </div>
      </aside>
    </div>
  );
}

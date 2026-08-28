"use client";

import { Bell, BellRing, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ValidLocale } from "@/lib/i18n";
import { loadProgress, recordPomodoro, setDailyGoal as persistDailyGoal } from "@/lib/progress";

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
    phases: { foco: "Sessão de foco", "pausa-curta": "Pausa curta", "pausa-longa": "Pausa longa" },
    custom: "Personalizado",
    focusLabel: "Foco",
    breakLabel: "Pausa",
    pauseBtn: "Pausar",
    resumeBtn: "Continuar",
    startBtn: "Iniciar",
    focusBtn: "Foco",
    shortBreakBtn: "Pausa curta",
    longBreakBtn: "Pausa longa",
    sessionKicker: "SESSÃO ATUAL",
    subjectLabel: "Matéria",
    subjects: ["Teoria de voo", "Meteorologia", "Navegação", "Regulamentos", "Performance", "Voo IFR", "Multimotor"],
    notifEnabled: "Notificações ativadas",
    notifEnableBtn: "Ativar notificações",
    todayKicker: "HOJE",
    minStudied: "min estudados",
    sessionsCount: "sessões",
    ofGoal: "da meta",
    dailyGoalLabel: "Meta diária",
    tipTitle: "Ritmo sustentável",
    tipText: "Durante o foco, elimine distrações e defina uma meta pontual. Na pausa, levante-se e descanse a visão.",
    notifBodyFocus: "Sessão concluída. Hora de respirar.",
    notifBodyBreak: "Pausa concluída. Pronto para continuar?",
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
    shortBreakBtn: "Short break",
    longBreakBtn: "Long break",
    sessionKicker: "CURRENT SESSION",
    subjectLabel: "Subject",
    subjects: ["Principles of Flight", "Meteorology", "Navigation", "Air Law & Regs", "Performance", "IFR Flight", "Multi-Engine"],
    notifEnabled: "Notifications enabled",
    notifEnableBtn: "Enable notifications",
    todayKicker: "TODAY",
    minStudied: "minutes studied",
    sessionsCount: "sessions",
    ofGoal: "of goal",
    dailyGoalLabel: "Daily target",
    tipTitle: "Sustainable Focus",
    tipText: "During focus intervals, eliminate tab switching and focus on one concept. Take active short breaks to consolidate memory.",
    notifBodyFocus: "Focus session complete. Time for a short break.",
    notifBodyBreak: "Break finished. Ready for the next flight block?",
  },
  es: {
    phases: { foco: "Sesión de foco", "pausa-curta": "Pausa corta", "pausa-longa": "Pausa larga" },
    custom: "Personalizado",
    focusLabel: "Foco",
    breakLabel: "Pausa",
    pauseBtn: "Pausar",
    resumeBtn: "Continuar",
    startBtn: "Iniciar",
    focusBtn: "Foco",
    shortBreakBtn: "Pausa corta",
    longBreakBtn: "Pausa larga",
    sessionKicker: "SESIÓN ACTUAL",
    subjectLabel: "Materia",
    subjects: ["Principios de vuelo", "Meteorología", "Navegación", "Reglamentación", "Rendimiento", "Vuelo IFR", "Multimotor"],
    notifEnabled: "Notificaciones activadas",
    notifEnableBtn: "Activar notificaciones",
    todayKicker: "HOY",
    minStudied: "min estudiados",
    sessionsCount: "sesiones",
    ofGoal: "de la meta",
    dailyGoalLabel: "Meta diaria",
    tipTitle: "Ritmo sostenible",
    tipText: "Durante el foco, cierra distracciones y define un objetivo claro. En la pausa, levántate y descansa la vista.",
    notifBodyFocus: "Sesión completada. Momento de tomar una pausa.",
    notifBodyBreak: "Pausa terminada. ¿Listo para continuar?",
  },
  fr: {
    phases: { foco: "Session de focus", "pausa-curta": "Pause courte", "pausa-longa": "Pause longue" },
    custom: "Personnalisé",
    focusLabel: "Focus",
    breakLabel: "Pause",
    pauseBtn: "Pause",
    resumeBtn: "Reprendre",
    startBtn: "Démarrer",
    focusBtn: "Focus",
    shortBreakBtn: "Pause courte",
    longBreakBtn: "Pause longue",
    sessionKicker: "SESSION EN COURS",
    subjectLabel: "Matière",
    subjects: ["Principes du vol", "Météorologie", "Navigation", "Réglementation", "Performances", "Vol IFR", "Multi-moteurs"],
    notifEnabled: "Notifications activées",
    notifEnableBtn: "Activer les notifications",
    todayKicker: "AUJOURD'HUI",
    minStudied: "min étudiées",
    sessionsCount: "sessions",
    ofGoal: "de l'objectif",
    dailyGoalLabel: "Objectif quotidien",
    tipTitle: "Rythme soutenu",
    tipText: "Durant la session, isolez-vous des distractions. Lors de la pause, levez-vous et reposez vos yeux.",
    notifBodyFocus: "Session terminée. Prenez une pause méritée.",
    notifBodyBreak: "Pause achevée. Prêt pour le décollage ?",
  },
};

export function PomodoroApp({ locale = "pt-br" }: { locale?: ValidLocale }) {
  const t = STRINGS[locale] || STRINGS["pt-br"];
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [phase, setPhase] = useState<Phase>("foco");
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(50);
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [subject, setSubject] = useState(t.subjects[0]);
  const completedRef = useRef(false);

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

  const beep = useCallback(() => {
    if (!sound) return;
    try {
      const AudioContextType = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const context = new AudioContextType();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = 740;
      gain.gain.setValueAtTime(0.08, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.7);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.7);
    } catch {
      // Ignorar erros de áudio se bloqueado pelo navegador
    }
  }, [sound]);

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
      beep();
      if (notifications && typeof Notification !== "undefined") {
        new Notification("FOX SIM", {
          body: phase === "foco" ? t.notifBodyFocus : t.notifBodyBreak,
        });
      }
      if (phase === "foco") {
        recordPomodoro(focusMinutes, dailyGoal);
        setSessions(loadProgress().pomodoroSessions);
        setTodayMinutes(loadProgress().dailyMinutes);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [remaining, notifications, phase, focusMinutes, dailyGoal, beep, t]);

  const setPreset = (focus: number, pause: number) => {
    setFocusMinutes(focus);
    setShortBreak(pause);
    setPhase("foco");
    setRemaining(focus * 60);
    setRunning(false);
    completedRef.current = false;
  };

  const switchPhase = (next: Phase) => {
    const minutes = next === "foco" ? focusMinutes : next === "pausa-curta" ? shortBreak : 15;
    setPhase(next);
    setRemaining(minutes * 60);
    setRunning(false);
    completedRef.current = false;
  };

  const reset = () => switchPhase(phase);

  const requestNotifications = async () => {
    if (typeof Notification === "undefined") return;
    const permission = await Notification.requestPermission();
    setNotifications(permission === "granted");
  };

  const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
  const seconds = (remaining % 60).toString().padStart(2, "0");
  const totalForPhase = (phase === "foco" ? focusMinutes : phase === "pausa-curta" ? shortBreak : 15) * 60;
  const clockProgress = Math.max(0, Math.min(100, ((totalForPhase - remaining) / (totalForPhase || 1)) * 100));

  return (
    <div className="pomodoro-layout">
      <section className="pomodoro-clock panel-card">
        <div className="preset-tabs">
          <button className={focusMinutes === 25 && shortBreak === 5 ? "active" : ""} onClick={() => setPreset(25, 5)}>25 / 5</button>
          <button className={focusMinutes === 50 && shortBreak === 10 ? "active" : ""} onClick={() => setPreset(50, 10)}>50 / 10</button>
          <button className={![25, 50].includes(focusMinutes) ? "active" : ""} onClick={() => setPreset(40, 8)}>{t.custom}</button>
        </div>

        {![25, 50].includes(focusMinutes) && (
          <div className="custom-times">
            <label>
              {t.focusLabel}{" "}
              <input
                type="number"
                min="1"
                max="120"
                value={focusMinutes}
                onChange={(event) => setPreset(Math.max(1, Number(event.target.value)), shortBreak)}
              />{" "}
              min
            </label>
            <label>
              {t.breakLabel}{" "}
              <input
                type="number"
                min="1"
                max="30"
                value={shortBreak}
                onChange={(event) => setPreset(focusMinutes, Math.max(1, Number(event.target.value)))}
              />{" "}
              min
            </label>
          </div>
        )}

        <span className="clock-phase"><i />{t.phases[phase]}</span>

        <div className="clock-face" style={{ "--clock-progress": `${clockProgress}%` } as React.CSSProperties}>
          <div>
            <strong>{minutes}</strong><i>:</i><strong>{seconds}</strong>
            <small>{subject}</small>
          </div>
        </div>

        <div className="clock-controls">
          <button type="button" className="round-control" onClick={reset} aria-label="Resetar">
            <RotateCcw size={20} />
          </button>
          <button
            type="button"
            className="play-control"
            onClick={() => {
              completedRef.current = false;
              setRunning(!running);
            }}
          >
            {running ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" />}
            {running ? t.pauseBtn : remaining < totalForPhase ? t.resumeBtn : t.startBtn}
          </button>
          <button
            type="button"
            className="round-control"
            onClick={() => setSound(!sound)}
            aria-label={sound ? "Desativar som" : "Ativar som"}
          >
            {sound ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="break-switch">
          <button className={phase === "foco" ? "active" : ""} onClick={() => switchPhase("foco")}>{t.focusBtn}</button>
          <button className={phase === "pausa-curta" ? "active" : ""} onClick={() => switchPhase("pausa-curta")}>{t.shortBreakBtn}</button>
          <button className={phase === "pausa-longa" ? "active" : ""} onClick={() => switchPhase("pausa-longa")}>{t.longBreakBtn}</button>
        </div>
      </section>

      <aside className="pomodoro-settings">
        <div className="panel-card setting-card">
          <span className="section-kicker">{t.sessionKicker}</span>
          <label>
            {t.subjectLabel}
            <select value={subject} onChange={(event) => setSubject(event.target.value)}>
              {t.subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <button
            className={notifications ? "notification-button active" : "notification-button"}
            onClick={requestNotifications}
          >
            {notifications ? <BellRing size={18} /> : <Bell size={18} />} {notifications ? t.notifEnabled : t.notifEnableBtn}
          </button>
        </div>

        <div className="panel-card today-card">
          <span className="section-kicker">{t.todayKicker}</span>
          <div>
            <strong>{todayMinutes}</strong>
            <span>{t.minStudied}</span>
          </div>
          <div className="today-stats">
            <span><b>{sessions}</b> {t.sessionsCount}</span>
            <span><b>{Math.min(100, Math.round((todayMinutes / (dailyGoal || 1)) * 100))}%</b> {t.ofGoal}</span>
          </div>
          <div className="goal-bar">
            <i style={{ width: `${Math.min(100, (todayMinutes / (dailyGoal || 1)) * 100)}%` }} />
          </div>
          <label>
            {t.dailyGoalLabel}{" "}
            <input
              type="number"
              min="10"
              max="480"
              value={dailyGoal}
              onChange={(event) => {
                const goal = Math.max(10, Number(event.target.value));
                setDailyGoal(goal);
                persistDailyGoal(goal);
              }}
            />{" "}
            min
          </label>
        </div>

        <div className="panel-card pomodoro-tip">
          <b>{t.tipTitle}</b>
          <p>{t.tipText}</p>
        </div>
      </aside>
    </div>
  );
}

"use client";

import { Bell, BellRing, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { loadProgress, recordPomodoro, setDailyGoal as persistDailyGoal } from "@/lib/progress";

type Phase = "foco" | "pausa-curta" | "pausa-longa";
const phaseLabels: Record<Phase, string> = { foco: "Sessão de foco", "pausa-curta": "Pausa curta", "pausa-longa": "Pausa longa" };

export function PomodoroApp() {
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
  const [subject, setSubject] = useState("Teoria de voo");
  const completedRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const progress = loadProgress(); const today = new Date().toLocaleDateString("en-CA"); setSessions(progress.pomodoroSessions); setTodayMinutes(progress.dailyMinutesDate === today ? progress.dailyMinutes : 0); setDailyGoal(progress.dailyGoal);
      setNotifications(typeof Notification !== "undefined" && Notification.permission === "granted");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const beep = useCallback(() => {
    if (!sound) return;
    const AudioContextType = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const context = new AudioContextType(); const oscillator = context.createOscillator(); const gain = context.createGain(); oscillator.frequency.value = 740; gain.gain.setValueAtTime(0.08, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.7); oscillator.connect(gain).connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + 0.7);
  }, [sound]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (remaining !== 0 || completedRef.current) return;
    const timer = window.setTimeout(() => {
      completedRef.current = true; setRunning(false); beep();
      if (notifications && typeof Notification !== "undefined") new Notification("FOX SIM", { body: phase === "foco" ? "Sessão concluída. Hora de respirar." : "Pausa concluída. Pronto para continuar?" });
      if (phase === "foco") { recordPomodoro(focusMinutes, dailyGoal); setSessions(loadProgress().pomodoroSessions); setTodayMinutes(loadProgress().dailyMinutes); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [remaining, notifications, phase, focusMinutes, dailyGoal, beep]);

  const setPreset = (focus: number, pause: number) => { setFocusMinutes(focus); setShortBreak(pause); setPhase("foco"); setRemaining(focus * 60); setRunning(false); completedRef.current = false; };
  const switchPhase = (next: Phase) => { const minutes = next === "foco" ? focusMinutes : next === "pausa-curta" ? shortBreak : 15; setPhase(next); setRemaining(minutes * 60); setRunning(false); completedRef.current = false; };
  const reset = () => switchPhase(phase);
  const requestNotifications = async () => { if (typeof Notification === "undefined") return; const permission = await Notification.requestPermission(); setNotifications(permission === "granted"); };
  const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
  const seconds = (remaining % 60).toString().padStart(2, "0");
  const totalForPhase = (phase === "foco" ? focusMinutes : phase === "pausa-curta" ? shortBreak : 15) * 60;
  const clockProgress = Math.max(0, Math.min(100, ((totalForPhase - remaining) / totalForPhase) * 100));

  return (
    <div className="pomodoro-layout">
      <section className="pomodoro-clock panel-card">
        <div className="preset-tabs"><button className={focusMinutes === 25 && shortBreak === 5 ? "active" : ""} onClick={() => setPreset(25, 5)}>25 / 5</button><button className={focusMinutes === 50 && shortBreak === 10 ? "active" : ""} onClick={() => setPreset(50, 10)}>50 / 10</button><button className={![25,50].includes(focusMinutes) ? "active" : ""} onClick={() => setPreset(40, 8)}>Personalizado</button></div>
        {![25,50].includes(focusMinutes) && <div className="custom-times"><label>Foco <input type="number" min="1" max="120" value={focusMinutes} onChange={(event) => setPreset(Math.max(1, Number(event.target.value)), shortBreak)} /> min</label><label>Pausa <input type="number" min="1" max="30" value={shortBreak} onChange={(event) => setPreset(focusMinutes, Math.max(1, Number(event.target.value)))} /> min</label></div>}
        <span className="clock-phase"><i />{phaseLabels[phase]}</span>
        <div className="clock-face" style={{ "--clock-progress": `${clockProgress}%` } as React.CSSProperties}><div><strong>{minutes}</strong><i>:</i><strong>{seconds}</strong><small>{subject}</small></div></div>
        <div className="clock-controls"><button type="button" className="round-control" onClick={reset} aria-label="Resetar"><RotateCcw size={20} /></button><button type="button" className="play-control" onClick={() => { completedRef.current = false; setRunning(!running); }}>{running ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" />}{running ? "Pausar" : remaining < totalForPhase ? "Continuar" : "Iniciar"}</button><button type="button" className="round-control" onClick={() => setSound(!sound)} aria-label={sound ? "Desativar som" : "Ativar som"}>{sound ? <Volume2 size={20} /> : <VolumeX size={20} />}</button></div>
        <div className="break-switch"><button className={phase === "foco" ? "active" : ""} onClick={() => switchPhase("foco")}>Foco</button><button className={phase === "pausa-curta" ? "active" : ""} onClick={() => switchPhase("pausa-curta")}>Pausa curta</button><button className={phase === "pausa-longa" ? "active" : ""} onClick={() => switchPhase("pausa-longa")}>Pausa longa</button></div>
      </section>

      <aside className="pomodoro-settings">
        <div className="panel-card setting-card"><span className="section-kicker">SESSÃO ATUAL</span><label>Matéria<select value={subject} onChange={(event) => setSubject(event.target.value)}><option>Teoria de voo</option><option>Meteorologia</option><option>Navegação</option><option>Regulamentos</option><option>Performance</option><option>Voo IFR</option><option>Multimotor</option></select></label><button className={notifications ? "notification-button active" : "notification-button"} onClick={requestNotifications}>{notifications ? <BellRing size={18} /> : <Bell size={18} />} {notifications ? "Notificações ativadas" : "Ativar notificações"}</button></div>
        <div className="panel-card today-card"><span className="section-kicker">HOJE</span><div><strong>{todayMinutes}</strong><span>min estudados</span></div><div className="today-stats"><span><b>{sessions}</b> sessões</span><span><b>{Math.min(100, Math.round((todayMinutes / dailyGoal) * 100))}%</b> da meta</span></div><div className="goal-bar"><i style={{ width: `${Math.min(100, (todayMinutes / dailyGoal) * 100)}%` }} /></div><label>Meta diária <input type="number" min="10" max="480" value={dailyGoal} onChange={(event) => { const goal = Math.max(10, Number(event.target.value)); setDailyGoal(goal); persistDailyGoal(goal); }} /> min</label></div>
        <div className="panel-card pomodoro-tip"><b>Ritmo sustentável</b><p>Durante o foco, feche distrações e defina uma entrega pequena. Na pausa, levante e descanse os olhos.</p></div>
      </aside>
    </div>
  );
}

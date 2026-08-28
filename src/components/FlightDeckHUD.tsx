"use client";

import { useEffect, useState, useRef } from "react";
import { Compass, Clock, Radio, Volume2, VolumeX, Sparkles, Activity, AlertTriangle } from "lucide-react";
import { ValidLocale } from "@/lib/i18n";

interface FlightDeckHUDProps {
  locale?: ValidLocale;
}

export function FlightDeckHUD({ locale = "pt-br" }: FlightDeckHUDProps) {
  const [utcTime, setUtcTime] = useState("");
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const [squawk, setSquawk] = useState("7000");
  const [qnh, setQnh] = useState(1013);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [alertPlaying, setAlertPlaying] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Live UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, "0");
      const m = String(now.getUTCMinutes()).padStart(2, "0");
      const s = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${h}:${m}:${s}Z`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio API Synth for realistic Cockpit beeps & altitude chime
  const playAvionicsBeep = (freq: number = 880, duration: number = 0.12, type: OscillatorType = "sine") => {
    if (!audioEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context fallback
    }
  };

  const playAltitudeChime = () => {
    if (!audioEnabled) {
      setAudioEnabled(true);
    }
    setAlertPlaying(true);
    setTimeout(() => setAlertPlaying(false), 800);
    playAvionicsBeep(587.33, 0.15, "triangle"); // D5
    setTimeout(() => playAvionicsBeep(880, 0.25, "triangle"), 150); // A5
  };

  // Mouse hover interactive tilt on artificial horizon
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const newRoll = Math.max(-25, Math.min(25, (x / (rect.width / 2)) * 25));
    const newPitch = Math.max(-15, Math.min(15, (-y / (rect.height / 2)) * 15));
    setRoll(Math.round(newRoll));
    setPitch(Math.round(newPitch));
  };

  const handleMouseLeave = () => {
    setRoll(0);
    setPitch(0);
  };

  const generateSquawk = () => {
    const codes = ["1200", "7000", "2000", "7500", "7600", "7700", "0021", "4412"];
    const nextCode = codes[(codes.indexOf(squawk) + 1) % codes.length];
    setSquawk(nextCode);
    playAvionicsBeep(1200, 0.08);
  };

  return (
    <div className="telemetry-hud-container" ref={panelRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Top HUD Status Row */}
      <div className="telemetry-hud-top-bar">
        <div className="telemetry-status-item">
          <span className="telemetry-live-beacon" />
          <span className="telemetry-label">AVIONICS HUD</span>
        </div>
        <div className="telemetry-utc-clock" title="Tempo Universal Coordenado (Zulu)">
          <Clock size={13} className="telemetry-icon" />
          <strong>{utcTime || "00:00:00Z"}</strong>
        </div>
        <button
          type="button"
          className={audioEnabled ? "telemetry-audio-btn active" : "telemetry-audio-btn"}
          onClick={() => {
            setAudioEnabled(!audioEnabled);
            if (!audioEnabled) playAvionicsBeep(600, 0.1);
          }}
          title={audioEnabled ? "Som do cockpit ativado" : "Ativar áudio de bordo"}
          aria-label="Toggle avionics audio"
        >
          {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span>{audioEnabled ? "AUDIO ON" : "AUDIO MUTE"}</span>
        </button>
      </div>

      {/* Interactive Artificial Horizon Instrument Display */}
      <div className="horizon-dial-wrapper">
        <div
          className="artificial-horizon-dial"
          style={{
            transform: `rotate(${-roll}deg)`,
          }}
        >
          <div
            className="horizon-sky"
            style={{
              transform: `translateY(${pitch * 1.8}px)`,
            }}
          >
            <div className="horizon-pitch-lines">
              <span className="pitch-mark p10">+10°</span>
              <span className="pitch-mark p5">+5°</span>
              <div className="horizon-center-line" />
              <span className="pitch-mark m5">-5°</span>
              <span className="pitch-mark m10">-10°</span>
            </div>
          </div>
          <div className="horizon-ground" style={{ transform: `translateY(${pitch * 1.8}px)` }} />
        </div>

        {/* Aircraft Fixed Reference Wings */}
        <div className="fixed-aircraft-symbol">
          <div className="wing-left" />
          <div className="center-dot" />
          <div className="wing-right" />
        </div>

        {/* Dynamic Roll & Pitch Readout Tags */}
        <div className="horizon-telemetry-overlay">
          <span className="pitch-readout">PITCH {pitch > 0 ? `+${pitch}°` : `${pitch}°`}</span>
          <span className="roll-readout">ROLL {roll > 0 ? `+${roll}°` : `${roll}°`}</span>
        </div>
      </div>

      {/* Bottom Telemetry Micro-Controls */}
      <div className="telemetry-micro-controls">
        <button
          type="button"
          className="hud-micro-btn"
          onClick={generateSquawk}
          title="Clique para alternar transponder"
        >
          <Radio size={13} />
          <span>XPDR: <b>{squawk}</b></span>
        </button>

        <button
          type="button"
          className="hud-micro-btn"
          onClick={() => {
            const nextQnh = qnh === 1013 ? 1018 : qnh === 1018 ? 1008 : 1013;
            setQnh(nextQnh);
            playAvionicsBeep(950, 0.08);
          }}
          title="Ajuste Altímetro QNH"
        >
          <Activity size={13} />
          <span>QNH: <b>{qnh} hPa</b></span>
        </button>

        <button
          type="button"
          className={alertPlaying ? "hud-micro-btn alert is-active" : "hud-micro-btn alert"}
          onClick={playAltitudeChime}
          title="Testar alerta sonoro de altitude"
        >
          <Sparkles size={13} />
          <span>CHIME</span>
        </button>
      </div>
    </div>
  );
}

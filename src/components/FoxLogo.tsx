import React from "react";

interface FoxLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  animate?: boolean;
}

export function FoxEmblem({ size = 36, animate = false }: { size?: number; animate?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`fox-emblem-svg ${animate ? "animate-pulse-glow" : ""}`}
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        {/* Neon Cyan Gradient */}
        <linearGradient id="foxCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7efff5" />
          <stop offset="50%" stopColor="#4fe3db" />
          <stop offset="100%" stopColor="#00b4d8" />
        </linearGradient>

        {/* Deep Wing Shadow Gradient */}
        <linearGradient id="foxDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0e3a4f" />
          <stop offset="100%" stopColor="#061c28" />
        </linearGradient>

        {/* Mid-Tone Aerodynamic Wing Gradient */}
        <linearGradient id="foxMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a5b78" />
          <stop offset="100%" stopColor="#0d3244" />
        </linearGradient>

        {/* Core Cockpit Gradient */}
        <linearGradient id="foxCoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#a5f3fc" />
          <stop offset="100%" stopColor="#4fe3db" />
        </linearGradient>

        {/* Outer Squircle Background Gradient */}
        <linearGradient id="foxBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#091c2b" />
          <stop offset="100%" stopColor="#040b12" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="foxNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hex/Squircle Base Shield with Cyan Tech Border */}
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="24"
        fill="url(#foxBgGrad)"
        stroke="rgba(79, 227, 219, 0.3)"
        strokeWidth="2"
      />

      {/* Subtle HUD Radar Target Rings in Background */}
      <circle cx="50" cy="50" r="38" stroke="rgba(79, 227, 219, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="24" stroke="rgba(79, 227, 219, 0.06)" strokeWidth="1" />

      {/* Outer Fox Ears / Canted Jet Stabilizers */}
      {/* Left Ear Wing */}
      <polygon
        points="50,22 18,14 26,48 42,40"
        fill="url(#foxCyanGrad)"
      />
      {/* Right Ear Wing */}
      <polygon
        points="50,22 82,14 74,48 58,40"
        fill="url(#foxCyanGrad)"
      />

      {/* Inner Ear / Shadow Facet */}
      <polygon
        points="50,26 26,20 32,44 46,38"
        fill="url(#foxDeepGrad)"
      />
      <polygon
        points="50,26 74,20 68,44 54,38"
        fill="url(#foxMidGrad)"
      />

      {/* Cheeks / Swept Delta Wings */}
      {/* Left Cheek */}
      <polygon
        points="14,46 44,70 34,50"
        fill="url(#foxCyanGrad)"
      />
      {/* Right Cheek */}
      <polygon
        points="86,46 56,70 66,50"
        fill="url(#foxCyanGrad)"
      />

      {/* Lateral Wing Shadow Plates */}
      <polygon
        points="14,46 34,50 40,64 26,62"
        fill="url(#foxDeepGrad)"
      />
      <polygon
        points="86,46 66,50 60,64 74,62"
        fill="url(#foxMidGrad)"
      />

      {/* Supersonic Fox Snout / Jet Fuselage Core */}
      <polygon
        points="50,32 38,58 50,86 62,58"
        fill="url(#foxCoreGrad)"
        filter="url(#foxNeonGlow)"
      />

      {/* Center Dividing Keel Line */}
      <polygon
        points="50,32 50,86 62,58"
        fill="rgba(0, 180, 216, 0.35)"
      />

      {/* Sleek Fox Eyes / Cockpit HUD Sensors */}
      <polygon
        points="36,46 44,52 38,54"
        fill="#ffffff"
      />
      <polygon
        points="64,46 56,52 62,54"
        fill="#ffffff"
      />

      {/* Glowing Nose Beacon Point */}
      <circle cx="50" cy="84" r="2.5" fill="#ffffff" />
      <circle cx="50" cy="84" r="4.5" fill="none" stroke="#7efff5" strokeWidth="1" opacity="0.8" />
    </svg>
  );
}

export function FoxLogo({ size = 36, showText = true, className = "", animate = false }: FoxLogoProps) {
  return (
    <div className={`fox-brand-container ${className}`}>
      <FoxEmblem size={size} animate={animate} />
      {showText && (
        <div className="fox-brand-text">
          <div className="fox-brand-title">
            <span className="fox-text-fox">FOX</span>
            <span className="fox-text-sim">SIM</span>
          </div>
          <span className="fox-brand-sub">FLIGHT ACADEMY</span>
        </div>
      )}
    </div>
  );
}

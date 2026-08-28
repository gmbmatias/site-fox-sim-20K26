import { ImageResponse } from "next/og";

export const alt = "FOX SIM — Conhecimento para voar mais longe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "72px",
          alignItems: "center",
          background: "radial-gradient(circle at 80% 40%, #0d3848 0%, #06121d 60%)",
          color: "#eef6f8",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, zIndex: 2 }}>
          {/* Top Brand Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#07131e",
                borderRadius: "18px",
                border: "2.5px solid #4fe3db",
                boxShadow: "0 0 20px rgba(79, 227, 219, 0.4)",
              }}
            >
              <svg width="46" height="46" viewBox="0 0 100 100" fill="none">
                <polygon points="50,22 18,14 26,48 42,40" fill="#4fe3db" />
                <polygon points="50,22 82,14 74,48 58,40" fill="#4fe3db" />
                <polygon points="50,26 26,20 32,44 46,38" fill="#0e3a4f" />
                <polygon points="50,26 74,20 68,44 54,38" fill="#1a5b78" />
                <polygon points="14,46 44,70 34,50" fill="#4fe3db" />
                <polygon points="86,46 56,70 66,50" fill="#4fe3db" />
                <polygon points="50,32 38,58 50,86 62,58" fill="#ffffff" />
                <polygon points="36,46 44,52 38,54" fill="#4fe3db" />
                <polygon points="64,46 56,52 62,54" fill="#4fe3db" />
                <circle cx="50" cy="84" r="3" fill="#ffffff" />
              </svg>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, fontSize: 32, fontWeight: 900, letterSpacing: 4 }}>
              <span style={{ color: "#ffffff" }}>FOX</span>
              <span style={{ color: "#4fe3db" }}>SIM</span>
            </div>
          </div>

          {/* Main Headline */}
          <div style={{ display: "flex", flexDirection: "column", fontSize: 68, lineHeight: 1.05, fontWeight: 800, letterSpacing: -2 }}>
            <span>Conhecimento para</span>
            <span style={{ color: "#4fe3db" }}>voar mais longe.</span>
          </div>

          <div style={{ fontSize: 24, color: "#9bb0ba" }}>
            Trilhas de Estudo · Questões ANAC · Simulados · Cockpit HUD
          </div>
        </div>

        {/* Decorative Radar Ring */}
        <div
          style={{
            position: "absolute",
            right: -100,
            width: 650,
            height: 650,
            border: "2px solid rgba(79, 227, 219, 0.2)",
            borderRadius: "50%",
            boxShadow: "inset 0 0 0 100px rgba(79, 227, 219, 0.02), inset 0 0 0 200px rgba(79, 227, 219, 0.015)",
          }}
        />
      </div>
    ),
    size
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07131e",
          borderRadius: "18px",
          border: "2.5px solid #4fe3db",
          boxShadow: "0 0 16px rgba(79, 227, 219, 0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vector Fox Face Silhouette */}
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Ears */}
          <polygon points="50,22 18,14 26,48 42,40" fill="#4fe3db" />
          <polygon points="50,22 82,14 74,48 58,40" fill="#4fe3db" />

          {/* Inner Ear Shadows */}
          <polygon points="50,26 26,20 32,44 46,38" fill="#0e3a4f" />
          <polygon points="50,26 74,20 68,44 54,38" fill="#1a5b78" />

          {/* Swept Cheeks */}
          <polygon points="14,46 44,70 34,50" fill="#4fe3db" />
          <polygon points="86,46 56,70 66,50" fill="#4fe3db" />

          {/* Cheek Shadows */}
          <polygon points="14,46 34,50 40,64 26,62" fill="#0e3a4f" />
          <polygon points="86,46 66,50 60,64 74,62" fill="#1a5b78" />

          {/* Jet Snout Center */}
          <polygon points="50,32 38,58 50,86 62,58" fill="#a5f3fc" />
          <polygon points="50,32 50,86 62,58" fill="#00b4d8" />

          {/* Eyes */}
          <polygon points="36,46 44,52 38,54" fill="#ffffff" />
          <polygon points="64,46 56,52 62,54" fill="#ffffff" />

          {/* Nose Tip */}
          <circle cx="50" cy="84" r="3" fill="#ffffff" />
        </svg>
      </div>
    ),
    size
  );
}

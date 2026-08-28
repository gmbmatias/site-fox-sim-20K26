"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSense() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Falha silenciosa caso o script ainda não tenha sido carregado pelo navegador ou adblocker esteja ativo
    }
  }, []);

  return null;
}

interface AdBannerProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style = { display: "block" },
}: AdBannerProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-3918433594573040";

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Ignora erro se adsbygoogle não estiver carregado ou bloqueado
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`.trim()} style={{ overflow: "hidden", minHeight: "90px" }}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

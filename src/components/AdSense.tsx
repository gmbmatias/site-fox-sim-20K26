"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function AdSense() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const [consented, setConsented] = useState(false);
  useEffect(() => {
    const update = () => setConsented(window.localStorage.getItem("foxsim-cookie-choice") === "accepted");
    const timer = window.setTimeout(update, 0);
    window.addEventListener("foxsim-consent", update);
    return () => { window.clearTimeout(timer); window.removeEventListener("foxsim-consent", update); };
  }, []);
  if (!client || !client.startsWith("ca-pub-") || !consented) return null;
  return <Script id="foxsim-adsense" async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`} />;
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(!window.localStorage.getItem("foxsim-cookie-choice")), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const choose = (choice: "essential" | "accepted") => {
    window.localStorage.setItem("foxsim-cookie-choice", choice);
    window.dispatchEvent(new Event("foxsim-consent"));
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <aside className="cookie-banner" aria-label="Preferências de cookies">
      <div><b>Privacidade e Cookies</b><p>Usamos armazenamento local para salvar seu progresso e cookies para métricas e exibição de anúncios. <Link href="/cookies">Saiba mais</Link>.</p></div>
      <div className="cookie-actions"><button type="button" onClick={() => choose("essential")}>Somente essenciais</button><button className="button-primary" type="button" onClick={() => choose("accepted")}>Aceitar todos</button></div>
    </aside>
  );
}

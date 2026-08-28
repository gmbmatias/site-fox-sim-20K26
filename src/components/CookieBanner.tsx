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
      <div><b>Seu controle de privacidade</b><p>Usamos armazenamento local para salvar progresso e preferências. Publicidade não está ativa. <Link href="/cookies">Saiba mais</Link>.</p></div>
      <div className="cookie-actions"><button type="button" onClick={() => choose("essential")}>Somente essenciais</button><button className="button-primary" type="button" onClick={() => choose("accepted")}>Aceitar</button></div>
    </aside>
  );
}

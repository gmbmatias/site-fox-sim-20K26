"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/estudos", label: "Estudos" },
  { href: "/questoes", label: "Questões" },
  { href: "/simulados", label: "Simulados" },
  { href: "/pomodoro", label: "Pomodoro" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/artigos", label: "Artigos" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand" href="/" aria-label="FOX SIM — início">
          <span className="brand-mark">F</span><span>FOX SIM</span>
        </Link>
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={pathname.startsWith(link.href) ? "active" : ""}>{link.label}</Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/painel">Meu painel</Link>
        <button className="menu-button" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

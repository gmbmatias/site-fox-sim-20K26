"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ValidLocale, normalizeLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader({ initialLocale }: { initialLocale?: ValidLocale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "";

  // Extract locale from pathname (e.g. /pt-br/... or /en/...)
  const segments = pathname.split("/").filter(Boolean);
  const detectedLocale = segments[0] && ["pt-br", "en", "es", "fr"].includes(segments[0].toLowerCase())
    ? (segments[0].toLowerCase() as ValidLocale)
    : initialLocale || "pt-br";

  const locale = normalizeLocale(detectedLocale);
  const ui = getUi(locale);

  const links = [
    { href: `/${locale}/estudos`, match: `/${locale}/estudos`, label: ui.nav.studies },
    { href: `/${locale}/questoes`, match: `/${locale}/questoes`, label: ui.nav.questions },
    { href: `/${locale}/simulados`, match: `/${locale}/simulados`, label: ui.nav.simulations },
    { href: `/${locale}/pomodoro`, match: `/${locale}/pomodoro`, label: ui.nav.pomodoro },
    { href: `/${locale}/ferramentas`, match: `/${locale}/ferramentas`, label: ui.nav.tools },
    { href: `/${locale}/artigos`, match: `/${locale}/artigos`, label: ui.nav.articles },
    { href: `/${locale}/glossario`, match: `/${locale}/glossario`, label: ui.nav.glossary },
    { href: `/${locale}/guias`, match: `/${locale}/guias`, label: ui.nav.guides },
  ];

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand" href={`/${locale}`} aria-label={`FOX SIM — ${ui.tagline}`}>
          <span className="brand-mark">F</span>
          <span>FOX SIM</span>
        </Link>

        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label={ui.siteName}>
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.match}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={isActive ? "active" : ""}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions">
          <LanguageSwitcher currentLocale={locale} />
          <Link className="nav-cta" href={`/${locale}/painel`}>
            {ui.nav.openPanel}
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

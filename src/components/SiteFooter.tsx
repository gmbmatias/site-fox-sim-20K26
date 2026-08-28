"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cookie } from "lucide-react";
import { ValidLocale, normalizeLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";

export function SiteFooter({ initialLocale }: { initialLocale?: ValidLocale }) {
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  const detectedLocale = segments[0] && ["pt-br", "en", "es", "fr"].includes(segments[0].toLowerCase())
    ? (segments[0].toLowerCase() as ValidLocale)
    : initialLocale || "pt-br";

  const locale = normalizeLocale(detectedLocale);
  const ui = getUi(locale);

  const openCookieModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("foxsim-open-cookie-modal"));
    }
  };

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand" href={`/${locale}`}>
            <span className="brand-mark">F</span>
            <span>FOX SIM</span>
          </Link>
          <p>{ui.footer.aboutText}</p>
          <span className="educational-label">{ui.footer.educationalNotice}</span>
        </div>

        <div>
          <b>{ui.footer.colLearn}</b>
          <Link href={`/${locale}/estudos`}>{ui.nav.studies}</Link>
          <Link href={`/${locale}/questoes`}>{ui.nav.questions}</Link>
          <Link href={`/${locale}/simulados`}>{ui.nav.simulations}</Link>
          <Link href={`/${locale}/artigos`}>{ui.nav.articles}</Link>
          <Link href={`/${locale}/glossario`}>{ui.nav.glossary}</Link>
          <Link href={`/${locale}/guias`}>{ui.nav.guides}</Link>
        </div>

        <div>
          <b>{ui.footer.colTools}</b>
          <Link href={`/${locale}/pomodoro`}>{ui.nav.pomodoro}</Link>
          <Link href={`/${locale}/ferramentas`}>{ui.nav.tools}</Link>
          <Link href={`/${locale}/painel`}>{ui.nav.dashboard}</Link>
          <Link href={`/${locale}/meu-progresso`}>{ui.breadcrumbs.progress}</Link>
        </div>

        <div>
          <b>{ui.footer.colPlatform}</b>
          <Link href={`/${locale}/sobre`}>{ui.footer.about}</Link>
          <Link href={`/${locale}/contato`}>{ui.footer.contact}</Link>
          <Link href={`/${locale}/politica-de-privacidade`}>{ui.footer.privacy}</Link>
          <Link href={`/${locale}/termos`}>{ui.footer.terms}</Link>
          <Link href={`/${locale}/cookies`}>{ui.footer.cookies}</Link>
          <button type="button" className="footer-cookie-trigger" onClick={openCookieModal}>
            <Cookie size={12} /> {ui.footer.manageCookies}
          </button>
          <Link href={`/${locale}/disclaimer`}>{ui.footer.disclaimer}</Link>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} FOX SIM. {ui.footer.copyright}</span>
        <span>{ui.footer.motto}</span>
      </div>
    </footer>
  );
}

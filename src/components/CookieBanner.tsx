"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import { ValidLocale, normalizeLocale } from "@/lib/i18n";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
}

const COOKIE_STORAGE_KEY = "foxsim-cookie-consent";

const COOKIE_STRINGS: Record<ValidLocale, {
  bannerTitle: string;
  bannerText: string;
  privacyLink: string;
  cookiesLink: string;
  btnManage: string;
  btnReject: string;
  btnConsent: string;
  modalTitle: string;
  modalSub: string;
  modalDesc: string;
  cat1Title: string;
  cat1Badge: string;
  cat1Desc: string;
  cat2Title: string;
  cat2Badge: string;
  cat2Desc: string;
  cat3Title: string;
  cat3Badge: string;
  cat3Desc: string;
  btnRejectNonEssential: string;
  btnSave: string;
  btnAcceptAll: string;
  termsLink: string;
}> = {
  "pt-br": {
    bannerTitle: "Privacidade e Gestão de Cookies",
    bannerText: "Utilizamos cookies e armazenamento local para garantir o funcionamento das ferramentas de estudo, salvar seu progresso (PP, PC, IFR), analisar o uso da plataforma e exibir anúncios relevantes via Google AdSense. Você pode personalizar suas preferências a qualquer momento.",
    privacyLink: "Política de Privacidade",
    cookiesLink: "Saiba mais sobre cookies",
    btnManage: "Gerenciar opções",
    btnReject: "Não consentir",
    btnConsent: "Consentir",
    modalTitle: "Centro de Preferências de Privacidade",
    modalSub: "FOX SIM · Gestão de cookies e consentimento",
    modalDesc: "Respeitamos a sua privacidade. Abaixo você pode escolher quais categorias de cookies e dados deseja permitir durante sua navegação. Suas escolhas podem ser alteradas a qualquer momento no rodapé do site.",
    cat1Title: "Cookies Estritamente Necessários",
    cat1Badge: "Sempre ativo",
    cat1Desc: "Essenciais para a navegação básica, segurança do portal e persistência local das suas aulas, simulados resolvidos, histórico Pomodoro e ferramentas de cálculo.",
    cat2Title: "Cookies de Desempenho e Métricas",
    cat2Badge: "Opcional",
    cat2Desc: "Permitem entender de forma anônima quais trilhas, questões e ferramentas são mais utilizadas, ajudando a aprimorar a plataforma educacional continuamente.",
    cat3Title: "Cookies de Publicidade (Google AdSense)",
    cat3Badge: "Opcional",
    cat3Desc: "Utilizados pelo Google AdSense e parceiros certificados para exibir anúncios contextualizados, auxiliando a manter a FOX SIM gratuita para estudantes.",
    btnRejectNonEssential: "Rejeitar não essenciais",
    btnSave: "Salvar preferências",
    btnAcceptAll: "Aceitar todos",
    termsLink: "Termos de Uso",
  },
  en: {
    bannerTitle: "Privacy & Cookie Management",
    bannerText: "We use cookies and local storage to power study features, save your ground school progress (Private Pilot, Commercial, IFR), analyze site performance, and display relevant ads via Google AdSense. You can customize your preferences anytime.",
    privacyLink: "Privacy Policy",
    cookiesLink: "Learn more about cookies",
    btnManage: "Manage options",
    btnReject: "Do not consent",
    btnConsent: "Consent",
    modalTitle: "Privacy Preference Center",
    modalSub: "FOX SIM · Cookie and consent settings",
    modalDesc: "We respect your privacy. Below you can choose which cookie and data categories to allow during your visit. You can update these settings at any time in the footer.",
    cat1Title: "Strictly Necessary Cookies",
    cat1Badge: "Always active",
    cat1Desc: "Essential for core navigation, website security, and local storage of lesson progress, quiz attempts, Pomodoro sessions, and flight calculation history.",
    cat2Title: "Performance & Analytics Cookies",
    cat2Badge: "Optional",
    cat2Desc: "Help us understand anonymously which study tracks and flight tools are most visited, allowing continuous educational enhancements.",
    cat3Title: "Advertising Cookies (Google AdSense)",
    cat3Badge: "Optional",
    cat3Desc: "Used by Google AdSense and certified partners to serve relevant advertising that keeps FOX SIM freely accessible for students worldwide.",
    btnRejectNonEssential: "Reject non-essential",
    btnSave: "Save preferences",
    btnAcceptAll: "Accept all",
    termsLink: "Terms of Use",
  },
  es: {
    bannerTitle: "Privacidad y Gestión de Cookies",
    bannerText: "Utilizamos cookies y almacenamiento local para garantizar el funcionamiento de las herramientas de estudio, guardar tu progreso (PP, PC, IFR), analizar el uso de la plataforma y mostrar anuncios relevantes vía Google AdSense. Puedes personalizar tus opciones en cualquier momento.",
    privacyLink: "Política de Privacidad",
    cookiesLink: "Más información sobre cookies",
    btnManage: "Gestionar opciones",
    btnReject: "No consentir",
    btnConsent: "Consentir",
    modalTitle: "Centro de Preferencias de Privacidad",
    modalSub: "FOX SIM · Gestión de cookies y consentimiento",
    modalDesc: "Respetamos tu privacidad. A continuación puedes seleccionar qué categorías de cookies deseas autorizar durante tu navegación. Puedes cambiar tu elección en el pie de página.",
    cat1Title: "Cookies Estrictamente Necesarias",
    cat1Badge: "Siempre activo",
    cat1Desc: "Esenciales para la navegación básica, seguridad del portal y almacenamiento local de cursos, exámenes, registros de Pomodoro y calculadoras aeronáuticas.",
    cat2Title: "Cookies de Rendimiento y Análisis",
    cat2Badge: "Opcional",
    cat2Desc: "Permiten analizar de forma anónima qué cursos y herramientas se consultan más, optimizando continuamente la plataforma educativa.",
    cat3Title: "Cookies de Publicidad (Google AdSense)",
    cat3Badge: "Opcional",
    cat3Desc: "Utilizadas por Google AdSense y socios certificados para mostrar publicidad relevante y mantener la plataforma gratuita para los estudiantes.",
    btnRejectNonEssential: "Rechazar no esenciales",
    btnSave: "Guardar preferencias",
    btnAcceptAll: "Aceptar todas",
    termsLink: "Términos de Uso",
  },
  fr: {
    bannerTitle: "Confidentialité et Gestion des Cookies",
    bannerText: "Nous utilisons des cookies et le stockage local pour assurer le fonctionnement des outils d'étude, sauvegarder votre progression (PPL, CPL, IFR), analyser les performances et afficher des annonces via Google AdSense. Vous pouvez modifier vos choix à tout moment.",
    privacyLink: "Politique de confidentialité",
    cookiesLink: "En savoir plus sur les cookies",
    btnManage: "Gérer les options",
    btnReject: "Refuser",
    btnConsent: "Accepter",
    modalTitle: "Centre de Préférences de Confidentialité",
    modalSub: "FOX SIM · Paramètres des cookies et consentement",
    modalDesc: "Nous respectons votre vie privée. Vous pouvez choisir ci-dessous quelles catégories de cookies activer lors de votre navigation. Vos préférences sont modifiables dans le pied de page.",
    cat1Title: "Cookies Strictement Nécessaires",
    cat1Badge: "Toujours actif",
    cat1Desc: "Indispensables à la navigation de base, à la sécurité et à la sauvegarde locale de vos leçons, examens blancs, sessions Pomodoro et calculateurs.",
    cat2Title: "Cookies de Performance et d'Analyse",
    cat2Badge: "Optionnel",
    cat2Desc: "Permettent de comprendre de manière anonyme les cours et outils les plus consultés afin d'améliorer continuellement le contenu éducatif.",
    cat3Title: "Cookies Publicitaires (Google AdSense)",
    cat3Badge: "Optionnel",
    cat3Desc: "Utilisés par Google AdSense et des partenaires certifiés pour diffuser des annonces adaptées permettant de maintenir l'accès gratuit pour tous les élèves.",
    btnRejectNonEssential: "Refuser les non essentiels",
    btnSave: "Enregistrer mes choix",
    btnAcceptAll: "Tout accepter",
    termsLink: "Conditions d'utilisation",
  },
};

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [analytics, setAnalytics] = useState(true);
  const [advertising, setAdvertising] = useState(true);

  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  const detectedLocale = segments[0] && ["pt-br", "en", "es", "fr"].includes(segments[0].toLowerCase())
    ? (segments[0].toLowerCase() as ValidLocale)
    : "pt-br";

  const locale = normalizeLocale(detectedLocale);
  const str = COOKIE_STRINGS[locale] || COOKIE_STRINGS["pt-br"];

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!stored) {
      const timer = window.setTimeout(() => setBannerVisible(true), 600);
      return () => window.clearTimeout(timer);
    } else {
      try {
        const parsed: CookiePreferences = JSON.parse(stored);
        setAnalytics(parsed.analytics ?? true);
        setAdvertising(parsed.advertising ?? true);
      } catch {
        setBannerVisible(true);
      }
    }

    const handleOpenModal = () => setModalOpen(true);
    window.addEventListener("foxsim-open-cookie-modal", handleOpenModal);
    return () => window.removeEventListener("foxsim-open-cookie-modal", handleOpenModal);
  }, []);

  const savePreferences = (prefs: { necessary: boolean; analytics: boolean; advertising: boolean }) => {
    const data: CookiePreferences = {
      ...prefs,
      timestamp: new Date().toISOString(),
    };
    window.localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(data));
    window.localStorage.setItem("foxsim-cookie-choice", prefs.advertising ? "accepted" : "essential");
    window.dispatchEvent(new Event("foxsim-consent"));
    setBannerVisible(false);
    setModalOpen(false);
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setAdvertising(true);
    savePreferences({ necessary: true, analytics: true, advertising: true });
  };

  const handleRejectNonEssential = () => {
    setAnalytics(false);
    setAdvertising(false);
    savePreferences({ necessary: true, analytics: false, advertising: false });
  };

  const handleSaveCustom = () => {
    savePreferences({ necessary: true, analytics, advertising });
  };

  if (!mounted) return null;

  return (
    <>
      {bannerVisible && !modalOpen && (
        <aside className="cookie-banner" aria-label={str.bannerTitle}>
          <div className="cookie-banner-content">
            <div className="cookie-banner-title">
              <Cookie size={18} className="cookie-icon" />
              <strong>{str.bannerTitle}</strong>
            </div>
            <p>
              {str.bannerText}{" "}
              <Link href={`/${locale}/politica-de-privacidade`}>{str.privacyLink}</Link> ·{" "}
              <Link href={`/${locale}/cookies`}>{str.cookiesLink}</Link>.
            </p>
          </div>
          <div className="cookie-actions">
            <button type="button" className="cookie-btn cookie-btn-ghost" onClick={() => setModalOpen(true)}>
              <Settings2 size={13} /> {str.btnManage}
            </button>
            <button type="button" className="cookie-btn cookie-btn-secondary" onClick={handleRejectNonEssential}>
              {str.btnReject}
            </button>
            <button type="button" className="cookie-btn cookie-btn-primary button-primary" onClick={handleAcceptAll}>
              <Check size={13} /> {str.btnConsent}
            </button>
          </div>
        </aside>
      )}

      {modalOpen && (
        <div className="cookie-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
          <div className="cookie-modal">
            <header className="cookie-modal-header">
              <div className="cookie-modal-headline">
                <ShieldCheck size={22} className="cookie-icon" />
                <div>
                  <h3 id="cookie-modal-title">{str.modalTitle}</h3>
                  <span>{str.modalSub}</span>
                </div>
              </div>
              <button
                type="button"
                className="cookie-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </header>

            <div className="cookie-modal-body">
              <p className="cookie-modal-desc">{str.modalDesc}</p>

              <div className="cookie-category-list">
                <div className="cookie-category-card">
                  <div className="cookie-category-header">
                    <div>
                      <strong>{str.cat1Title}</strong>
                      <span className="cookie-badge cookie-badge-required">{str.cat1Badge}</span>
                    </div>
                  </div>
                  <p>{str.cat1Desc}</p>
                </div>

                <div className="cookie-category-card">
                  <div className="cookie-category-header">
                    <div>
                      <strong>{str.cat2Title}</strong>
                      <span className="cookie-badge">{str.cat2Badge}</span>
                    </div>
                    <label className="cookie-switch">
                      <input
                        type="checkbox"
                        checked={analytics}
                        onChange={(e) => setAnalytics(e.target.checked)}
                      />
                      <span className="cookie-slider" />
                    </label>
                  </div>
                  <p>{str.cat2Desc}</p>
                </div>

                <div className="cookie-category-card">
                  <div className="cookie-category-header">
                    <div>
                      <strong>{str.cat3Title}</strong>
                      <span className="cookie-badge">{str.cat3Badge}</span>
                    </div>
                    <label className="cookie-switch">
                      <input
                        type="checkbox"
                        checked={advertising}
                        onChange={(e) => setAdvertising(e.target.checked)}
                      />
                      <span className="cookie-slider" />
                    </label>
                  </div>
                  <p>{str.cat3Desc}</p>
                </div>
              </div>
            </div>

            <footer className="cookie-modal-footer">
              <div className="cookie-modal-links">
                <Link href={`/${locale}/politica-de-privacidade`}>{str.privacyLink}</Link>
                <Link href={`/${locale}/cookies`}>{str.cookiesLink}</Link>
                <Link href={`/${locale}/termos`}>{str.termsLink}</Link>
              </div>
              <div className="cookie-modal-actions">
                <button type="button" className="cookie-btn cookie-btn-secondary" onClick={handleRejectNonEssential}>
                  {str.btnRejectNonEssential}
                </button>
                <button type="button" className="cookie-btn cookie-btn-secondary" onClick={handleSaveCustom}>
                  {str.btnSave}
                </button>
                <button type="button" className="cookie-btn cookie-btn-primary button-primary" onClick={handleAcceptAll}>
                  {str.btnAcceptAll}
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

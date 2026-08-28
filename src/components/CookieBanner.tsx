"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Cookie, Settings2, ShieldCheck, X } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
}

const COOKIE_STORAGE_KEY = "foxsim-cookie-consent";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [analytics, setAnalytics] = useState(true);
  const [advertising, setAdvertising] = useState(true);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!stored) {
      // Pequeno atraso para entrada suave
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
      {/* Banner Principal de Consentimento */}
      {bannerVisible && !modalOpen && (
        <aside className="cookie-banner" aria-label="Aviso e preferências de cookies">
          <div className="cookie-banner-content">
            <div className="cookie-banner-title">
              <Cookie size={18} className="cookie-icon" />
              <strong>Privacidade e Gestão de Cookies</strong>
            </div>
            <p>
              Utilizamos cookies e armazenamento local para garantir o funcionamento das ferramentas de estudo, salvar seu
              progresso (PP, PC, IFR), analisar o uso da plataforma e exibir anúncios relevantes via Google AdSense. Você pode
              personalizar suas preferências a qualquer momento.{" "}
              <Link href="/politica-de-privacidade">Política de Privacidade</Link> ·{" "}
              <Link href="/cookies">Saiba mais sobre cookies</Link>.
            </p>
          </div>
          <div className="cookie-actions">
            <button type="button" className="cookie-btn cookie-btn-ghost" onClick={() => setModalOpen(true)}>
              <Settings2 size={13} /> Gerenciar opções
            </button>
            <button type="button" className="cookie-btn cookie-btn-secondary" onClick={handleRejectNonEssential}>
              Não consentir
            </button>
            <button type="button" className="cookie-btn cookie-btn-primary button-primary" onClick={handleAcceptAll}>
              <Check size={13} /> Consentir
            </button>
          </div>
        </aside>
      )}

      {/* Modal de Gestão de Preferências */}
      {modalOpen && (
        <div className="cookie-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
          <div className="cookie-modal">
            <header className="cookie-modal-header">
              <div className="cookie-modal-headline">
                <ShieldCheck size={22} className="cookie-icon" />
                <div>
                  <h3 id="cookie-modal-title">Centro de Preferências de Privacidade</h3>
                  <span>FOX SIM · Gestão de cookies e consentimento</span>
                </div>
              </div>
              <button
                type="button"
                className="cookie-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>
            </header>

            <div className="cookie-modal-body">
              <p className="cookie-modal-desc">
                Respeitamos a sua privacidade. Abaixo você pode escolher quais categorias de cookies e dados deseja permitir
                durante sua navegação. Suas escolhas podem ser alteradas a qualquer momento no rodapé do site.
              </p>

              <div className="cookie-category-list">
                {/* Categoria 1: Necessários */}
                <div className="cookie-category-card">
                  <div className="cookie-category-header">
                    <div>
                      <strong>Cookies Estritamente Necessários</strong>
                      <span className="cookie-badge cookie-badge-required">Sempre ativo</span>
                    </div>
                  </div>
                  <p>
                    Essenciais para a navegação básica, segurança do portal e persistência local das suas aulas, simulados
                    resolvidos, histórico Pomodoro e calculadora de descida no dispositivo.
                  </p>
                </div>

                {/* Categoria 2: Análise e Desempenho */}
                <div className="cookie-category-card">
                  <div className="cookie-category-header">
                    <div>
                      <strong>Cookies de Desempenho e Métricas</strong>
                      <span className="cookie-badge">Opcional</span>
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
                  <p>
                    Permitem entender de forma anônima quais trilhas, questões e ferramentas são mais utilizadas, ajudando a
                    aprimorar a plataforma educacional continuamente.
                  </p>
                </div>

                {/* Categoria 3: Publicidade e AdSense */}
                <div className="cookie-category-card">
                  <div className="cookie-category-header">
                    <div>
                      <strong>Cookies de Publicidade (Google AdSense)</strong>
                      <span className="cookie-badge">Opcional</span>
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
                  <p>
                    Utilizados pelo Google AdSense e parceiros certificados para exibir anúncios contextualizados com o seu
                    interesse, auxiliando a manter a FOX SIM gratuita para estudantes.
                  </p>
                </div>
              </div>
            </div>

            <footer className="cookie-modal-footer">
              <div className="cookie-modal-links">
                <Link href="/politica-de-privacidade">Privacidade</Link>
                <Link href="/cookies">Cookies</Link>
                <Link href="/termos">Termos</Link>
              </div>
              <div className="cookie-modal-actions">
                <button type="button" className="cookie-btn cookie-btn-secondary" onClick={handleRejectNonEssential}>
                  Rejeitar não essenciais
                </button>
                <button type="button" className="cookie-btn cookie-btn-secondary" onClick={handleSaveCustom}>
                  Salvar preferências
                </button>
                <button type="button" className="cookie-btn cookie-btn-primary button-primary" onClick={handleAcceptAll}>
                  Aceitar todos
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

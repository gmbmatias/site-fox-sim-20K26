"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, Plane, X, Volume2, VolumeX, Sparkles, BookOpen, FileText, Wrench, Compass, HelpCircle, ArrowRight, MessageSquare } from "lucide-react";
import { ValidLocale, normalizeLocale } from "@/lib/i18n";
import { getArticles } from "@/lib/translations/articles";
import { getGlossaryTerms } from "@/lib/translations/glossary";
import { getGuides } from "@/lib/translations/guides";
import { FoxCopilotChat, DISCORD_LINK, WHATSAPP_LINK, DiscordIcon, WhatsAppIcon } from "./FoxCopilotChat";

// Web Audio API Sound Synthesizer for Cockpit Sound Effects
class CockpitSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.08, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.15);
    });
  }

  public playChirp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.06);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }
}

export const soundEngine = new CockpitSoundEngine();

type SearchItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: "article" | "glossary" | "guide" | "tool" | "quiz" | "study";
  url: string;
};

export function GlobalInteractivity({ locale: initialLocale }: { locale?: ValidLocale }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  const locale = normalizeLocale(
    segments[0] && ["pt-br", "en", "es", "fr"].includes(segments[0].toLowerCase())
      ? (segments[0].toLowerCase() as ValidLocale)
      : initialLocale || "pt-br"
  );

  // Scroll progress & back-to-top visibility
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isTakingOff, setIsTakingOff] = useState(false);

  // Global search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Audio effects enabled state
  const [soundActive, setSoundActive] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "info">("info");
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize sound preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("foxsim_sound_enabled");
      if (saved === "true") {
        soundEngine.enabled = true;
        setSoundActive(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleSound = () => {
    const next = !soundActive;
    soundEngine.enabled = next;
    setSoundActive(next);
    try {
      localStorage.setItem("foxsim_sound_enabled", String(next));
    } catch {
      // ignore
    }
    if (next) {
      soundEngine.playSuccess();
      showToast("Áudio do Cockpit Ativado 🔊", "success");
    } else {
      showToast("Áudio Silenciado 🔇", "info");
    }
  };

  const showToast = useCallback((msg: string, type: "success" | "info" = "info") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    setToastType(type);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Global toast listener
  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type?: "success" | "info" }>;
      if (customEvent.detail && customEvent.detail.message) {
        showToast(customEvent.detail.message, customEvent.detail.type || "info");
      }
    };

    const handleOpenSearch = () => {
      setIsSearchOpen(true);
    };

    window.addEventListener("foxsim-toast", handleToastEvent);
    window.addEventListener("foxsim-open-search", handleOpenSearch);
    return () => {
      window.removeEventListener("foxsim-toast", handleToastEvent);
      window.removeEventListener("foxsim-open-search", handleOpenSearch);
    };
  }, [showToast]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
        setScrollProgress(progress);
      }
      setShowBackToTop(totalScroll > 320);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Keyboard Shortcuts (Ctrl/Cmd + K to search, Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        soundEngine.playClick();
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Focus search input when open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  // Generate Search Index Data
  const searchIndex: SearchItem[] = useRef<SearchItem[]>([]).current;
  useEffect(() => {
    const articles = getArticles(locale);
    const terms = getGlossaryTerms(locale);
    const guides = getGuides(locale);

    const items: SearchItem[] = [
      // Articles
      ...articles.map((a) => ({
        id: `art-${a.slug}`,
        title: a.title,
        subtitle: a.description,
        category: a.category,
        type: "article" as const,
        url: `/${locale}/artigos/${a.slug}`,
      })),
      // Glossary
      ...terms.map((t) => ({
        id: `glo-${t.slug}`,
        title: `${t.term} — ${t.phoneticOrAcronym}`,
        subtitle: t.shortDefinition,
        category: t.category,
        type: "glossary" as const,
        url: `/${locale}/glossario/${t.slug}`,
      })),
      // Guides
      ...guides.map((g) => ({
        id: `gui-${g.slug}`,
        title: g.title,
        subtitle: g.description,
        category: g.category,
        type: "guide" as const,
        url: `/${locale}/guias/${g.slug}`,
      })),
      // Core Tools & Hubs
      {
        id: "tool-metar",
        title: "Calculadora de Vento Cruzado e Través",
        subtitle: "Decompõe componentes de vento de proa e través para pouso e decolagem",
        category: "Ferramentas",
        type: "tool",
        url: `/${locale}/ferramentas`,
      },
      {
        id: "tool-tod",
        title: "Calculadora Top of Descent (TOD)",
        subtitle: "Cálculo de ponto ideal de descida, razão de descida (FPM) e perfil vertical",
        category: "Ferramentas",
        type: "tool",
        url: `/${locale}/ferramentas`,
      },
      {
        id: "tool-alt",
        title: "Calculadora de Altitude Densidade",
        subtitle: "Avalie impacto de pressão e temperatura no desempenho da aeronave",
        category: "Ferramentas",
        type: "tool",
        url: `/${locale}/ferramentas`,
      },
      {
        id: "quiz-pp",
        title: "Simulado de Piloto Privado (ANAC)",
        subtitle: "Banco com mais de 300 questões comentadas de Teoria de Voo, MET, NAV e Regulamentos",
        category: "Simulados",
        type: "quiz",
        url: `/${locale}/simulados`,
      },
      {
        id: "pomodoro-cockpit",
        title: "Pomodoro Aeronáutico & Sons de Cockpit",
        subtitle: "Cronômetro de estudo imersivo com telemetria e foco para pilotos",
        category: "Produtividade",
        type: "study",
        url: `/${locale}/pomodoro`,
      },
      {
        id: "study-tracks",
        title: "Trilhas de Estudo Estruturadas",
        subtitle: "Módulos passo a passo para Piloto Privado, IFR e Meteorologia",
        category: "Estudos",
        type: "study",
        url: `/${locale}/estudos`,
      },
    ];

    searchIndex.length = 0;
    searchIndex.push(...items);
  }, [locale, searchIndex]);

  // Filter items based on query
  const filteredResults = searchQuery.trim() === ""
    ? searchIndex.slice(0, 7)
    : searchIndex.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }).slice(0, 10);

  // Handle Search Modal Keyboard Navigation
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (filteredResults.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
      soundEngine.playClick();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
      soundEngine.playClick();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredResults[selectedIndex];
      if (target) {
        soundEngine.playSuccess();
        setIsSearchOpen(false);
        router.push(target.url);
      }
    }
  };

  const scrollToTop = () => {
    soundEngine.playChirp();
    setIsTakingOff(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setIsTakingOff(false);
    }, 900);
  };

  const getResultIcon = (type: SearchItem["type"]) => {
    switch (type) {
      case "article":
        return <FileText size={16} className="search-res-icon text-cyan" />;
      case "glossary":
        return <BookOpen size={16} className="search-res-icon text-amber" />;
      case "guide":
        return <Compass size={16} className="search-res-icon text-green" />;
      case "tool":
        return <Wrench size={16} className="search-res-icon text-cyan" />;
      case "quiz":
        return <HelpCircle size={16} className="search-res-icon text-purple" />;
      default:
        return <Sparkles size={16} className="search-res-icon text-cyan" />;
    }
  };

  return (
    <>
      {/* 1. Neon Cyan Scroll Progress Bar */}
      <div
        className="global-scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* 2. Floating Aviation Control Dock (Bottom-Right) */}
      <aside className="floating-aviation-dock" aria-label="Controles Rápidos">
        {/* Sound Toggle Button */}
        <button
          type="button"
          onClick={toggleSound}
          className={`dock-btn sound-dock-btn ${soundActive ? "is-active" : ""}`}
          title={soundActive ? "Desativar efeitos sonoros" : "Ativar áudio do cockpit"}
          aria-label={soundActive ? "Desativar som" : "Ativar som"}
        >
          {soundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Global Search Trigger Button */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            setIsSearchOpen(true);
          }}
          className="dock-btn search-dock-btn"
          title="Busca Rápida (Ctrl + K)"
          aria-label="Abrir busca global"
        >
          <Search size={16} />
          <span className="dock-shortcut-badge">Ctrl K</span>
        </button>

        {/* Back-to-Top Jet Button */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className={`dock-btn back-to-top-btn ${isTakingOff ? "is-taking-off" : ""}`}
            title="Voltar ao topo da página"
            aria-label="Voltar ao topo"
          >
            <Plane size={18} className="plane-takeoff-icon" />
          </button>
        )}
      </aside>

      {/* 3. Interactive Fox Copilot Chat Widget */}
      <FoxCopilotChat locale={locale} />

      {/* 4. Global Toast Feedback Notification */}
      {toastMessage && (
        <div className={`global-cockpit-toast ${toastType}`} role="alert">
          <Sparkles size={16} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4. Global Quick Search Modal (Ctrl/Cmd + K) */}
      {isSearchOpen && (
        <div
          className="search-modal-backdrop"
          onClick={() => setIsSearchOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Busca Rápida FOX SIM"
        >
          <div
            className="search-modal-container"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleSearchKeyDown}
          >
            <div className="search-input-header">
              <Search size={20} className="search-header-icon" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Pesquise por METAR, TAF, ILS, VOR, Piloto Privado, QNH, Simulados..."
                aria-label="Digite para pesquisar"
              />
              <button
                type="button"
                className="search-close-btn"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Fechar busca"
              >
                <X size={18} />
              </button>
            </div>

            <div className="search-results-body">
              {filteredResults.length === 0 ? (
                <div className="search-empty-state">
                  <p>Nenhum resultado encontrado para &ldquo;{searchQuery}&rdquo;</p>
                  <small>Tente buscar por termos como <code>METAR</code>, <code>ILS</code>, <code>QNH</code> ou <code>PP</code>.</small>
                </div>
              ) : (
                <ul className="search-results-list" role="listbox">
                  {filteredResults.map((item, idx) => (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={idx === selectedIndex}
                      className={`search-result-item ${idx === selectedIndex ? "is-selected" : ""}`}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => {
                        soundEngine.playSuccess();
                        setIsSearchOpen(false);
                        router.push(item.url);
                      }}
                    >
                      <div className="search-item-icon-wrap">
                        {getResultIcon(item.type)}
                      </div>
                      <div className="search-item-details">
                        <div className="search-item-title-row">
                          <strong>{item.title}</strong>
                          <span className="search-item-badge">{item.category}</span>
                        </div>
                        <p className="search-item-subtitle">{item.subtitle}</p>
                      </div>
                      <ArrowRight size={14} className="search-item-arrow" />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="search-modal-footer">
              <div className="search-keys-legend">
                <span><kbd>↑</kbd> <kbd>↓</kbd> Navegar</span>
                <span><kbd>Enter</kbd> Abrir</span>
                <span><kbd>Esc</kbd> Fechar</span>
              </div>
              <span className="search-brand-tag">FOX SIM TELEMETRY</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

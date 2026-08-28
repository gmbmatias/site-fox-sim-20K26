"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Clock3, 
  Calendar, 
  User, 
  Share2, 
  Check, 
  Copy, 
  Volume2, 
  VolumeX, 
  Type, 
  Bookmark, 
  BookmarkCheck, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  BookOpen
} from "lucide-react";
import { ValidLocale } from "@/lib/i18n";
import { Article } from "@/lib/translations/articles";
import { soundEngine } from "./GlobalInteractivity";

// Mini quiz questions tailored for aviation topics
const TOPIC_QUIZZES: Record<string, { question: string; options: string[]; answer: number; explanation: string }[]> = {
  "como-interpretar-metar": [
    {
      question: "No METAR '14012G22KT', o que significa 'G22'?",
      options: [
        "Direção magnética de 22 graus",
        "Rajadas máximas de vento de 22 nós",
        "Variação angular de 22 graus",
        "Visibilidade horizontal de 2,2 km"
      ],
      answer: 1,
      explanation: "A letra 'G' representa Gusts (rajadas). 14012G22KT indica vento de proa/direção 140° com 12 nós sustentados e rajadas de até 22 nós."
    },
    {
      question: "Qual das seguintes coberturas de nuvens constitui TETO (Ceiling) operacional para regras VFR/IFR?",
      options: [
        "FEW (1 a 2 oitavos)",
        "SCT (3 a 4 oitavos)",
        "BKN (5 a 7 oitavos) ou OVC (8 oitavos)",
        "Apenas CB (Cumulonimbus)"
      ],
      answer: 2,
      explanation: "Por definição aeronáutica da OACI/DECEA, teto é a altura da base da camada mais baixa de nuvens que cubra mais da metade do céu (BKN - Broken ou OVC - Overcast)."
    }
  ],
  "como-interpretar-taf": [
    {
      question: "O que o indicador 'FM' (From) sinaliza em uma previsão TAF?",
      options: [
        "Uma mudança rápida e completa substituindo todos os parâmetros anteriores",
        "Uma oscilação temporária com menos de 1 hora de duração",
        "Uma transição lenta ao longo de um intervalo de várias horas",
        "Probabilidade de 40% de chuva leve"
      ],
      answer: 0,
      explanation: "O grupo FM (From) estabelece uma mudança brusca e definitiva: todas as condições meteorológicas anteriores são anuladas a partir do horário especificado."
    }
  ],
  "default": [
    {
      question: "Qual é a principal publicação oficial que deve ser consultada para regras de rota e aeródromos no Brasil?",
      options: [
        "AIP-Brasil e ROTAER (DECEA)",
        "Apenas manuais não oficiais de voo",
        "Cartas rodoviárias de navegação",
        "Boletins informativos de redes sociais"
      ],
      answer: 0,
      explanation: "A publicação AIP-Brasil e o ROTAER, emitidos pelo DECEA, são os documentos oficiais e mandatórios para qualquer operação aérea no território brasileiro."
    }
  ]
};

export function ArticleInteractiveViewer({
  article,
  locale,
  bcp47,
  ui,
  relatedArticles,
}: {
  article: Article;
  locale: ValidLocale;
  bcp47: string;
  ui: {
    common: {
      publishedAt: string;
      allArticles: string;
      relatedContent: string;
    };
  };
  relatedArticles: (Article | undefined)[];
}) {
  // Reading font size: normal (16px), large (18px), xlarge (20px)
  const [fontSizeLevel, setFontSizeLevel] = useState<"normal" | "large" | "xlarge">("normal");
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  // Mini-Quiz interactive state
  const quizQuestions = TOPIC_QUIZZES[article.slug] || TOPIC_QUIZZES["default"];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Section references for scroll-spy
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const savedArticles = JSON.parse(localStorage.getItem("foxsim_saved_articles") || "[]");
      setIsSaved(savedArticles.includes(article.slug));
    } catch {
      // ignore
    }
  }, [article.slug]);

  // Toggle save / bookmark
  const toggleSaveArticle = () => {
    soundEngine.playChirp();
    try {
      const savedArticles: string[] = JSON.parse(localStorage.getItem("foxsim_saved_articles") || "[]");
      let next: string[];
      if (savedArticles.includes(article.slug)) {
        next = savedArticles.filter((s) => s !== article.slug);
        setIsSaved(false);
        triggerToast("Artigo removido dos seus salvos");
      } else {
        next = [...savedArticles, article.slug];
        setIsSaved(true);
        soundEngine.playSuccess();
        triggerToast("Artigo salvo em seu painel de estudos! ⭐", "success");
      }
      localStorage.setItem("foxsim_saved_articles", JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const triggerToast = (message: string, type: "success" | "info" = "info") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foxsim-toast", { detail: { message, type } }));
    }
  };

  const handleCopyLink = () => {
    soundEngine.playClick();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      triggerToast("Link do artigo copiado com sucesso! 📋", "success");
      setTimeout(() => setCopied(false), 2400);
    }
  };

  // Text to Speech (TTS)
  const toggleTextToSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      triggerToast("Seu navegador não suporta reprodução de voz");
      return;
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      triggerToast("Leitura pausada 🔇");
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.intro}. ${article.sections.map((s) => `${s.title}. ${s.body.join(" ")}`).join(" ")}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = bcp47;
      utterance.rate = 1.0;
      utterance.onend = () => setIsReadingAloud(false);
      utterance.onerror = () => setIsReadingAloud(false);
      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
      soundEngine.playChirp();
      triggerToast("Iniciando leitura em áudio... 🔊", "success");
    }
  };

  // Stop speech when navigating away
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Scroll-spy observer for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      sectionRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {
          setActiveSectionIdx(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (idx: number) => {
    soundEngine.playClick();
    const target = sectionRefs.current[idx];
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const cycleFontSize = () => {
    soundEngine.playClick();
    if (fontSizeLevel === "normal") setFontSizeLevel("large");
    else if (fontSizeLevel === "large") setFontSizeLevel("xlarge");
    else setFontSizeLevel("normal");
  };

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    soundEngine.playClick();
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  return (
    <div className={`article-interactive-root font-size-${fontSizeLevel}`}>
      {/* 1. Article Utility HUD Toolbar */}
      <div className="article-reader-toolbar panel-card">
        <div className="toolbar-left">
          <div className="toolbar-pill">
            <span className="live-dot" />
            <span>MODO LEITURA ATIVO</span>
          </div>
          <button
            type="button"
            onClick={cycleFontSize}
            className="toolbar-btn"
            title="Ajustar tamanho da fonte"
            aria-label="Tamanho da fonte"
          >
            <Type size={15} />
            <span>{fontSizeLevel === "normal" ? "A" : fontSizeLevel === "large" ? "A+" : "A++"}</span>
          </button>
          <button
            type="button"
            onClick={toggleTextToSpeech}
            className={`toolbar-btn ${isReadingAloud ? "is-active" : ""}`}
            title="Ouvir artigo em áudio (Text-to-Speech)"
            aria-label="Ouvir áudio"
          >
            {isReadingAloud ? <Volume2 size={15} className="pulse-icon" /> : <VolumeX size={15} />}
            <span>{isReadingAloud ? "Pausar Áudio" : "Ouvir Artigo"}</span>
          </button>
        </div>

        <div className="toolbar-right">
          <button
            type="button"
            onClick={toggleSaveArticle}
            className={`toolbar-btn ${isSaved ? "is-saved" : ""}`}
            title={isSaved ? "Artigo salvo" : "Salvar artigo para estudar depois"}
            aria-label="Salvar artigo"
          >
            {isSaved ? <BookmarkCheck size={15} className="text-cyan" /> : <Bookmark size={15} />}
            <span>{isSaved ? "Salvo" : "Salvar"}</span>
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="toolbar-btn"
            title="Copiar link permanente"
            aria-label="Copiar link"
          >
            {copied ? <Check size={15} className="text-cyan" /> : <Copy size={15} />}
            <span>{copied ? "Copiado!" : "Copiar Link"}</span>
          </button>
        </div>
      </div>

      {/* 2. Main 2-Column Article Layout */}
      <div className="article-layout-grid">
        {/* Main Article Content Column */}
        <main className="article-primary-column">
          {/* Metadata Header Bar */}
          <header className="article-meta-header-box panel-card">
            <div className="article-meta-tags">
              <span className="meta-category-badge">{article.category}</span>
              <span className="meta-readtime-badge">
                <Clock3 size={13} /> {article.readTime} min de leitura
              </span>
            </div>
            <div className="article-meta-info-row">
              <span className="meta-author">
                <User size={14} className="meta-icon" /> {article.author}
              </span>
              <span className="meta-date">
                <Calendar size={14} className="meta-icon" /> {ui.common.publishedAt}{" "}
                {new Intl.DateTimeFormat(bcp47, { dateStyle: "long" }).format(new Date(article.publishedAt))}
              </span>
            </div>
          </header>

          {/* Intro Briefing Card */}
          <div className="article-intro-briefing panel-card">
            <div className="briefing-header">
              <Sparkles size={16} className="text-cyan" />
              <strong>BRIEFING ESSENCIAL</strong>
            </div>
            <p className="briefing-text">{article.intro}</p>
          </div>

          {/* Article Structured Body Sections */}
          <div className="article-sections-container">
            {article.sections.map((section, idx) => (
              <section
                key={section.title}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                className="article-section-card panel-card"
                id={`section-${idx}`}
              >
                <div className="section-title-wrap">
                  <span className="section-num-badge">0{idx + 1}</span>
                  <h2>{section.title}</h2>
                </div>

                <div className="section-body-paragraphs">
                  {section.body.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Interactive Knowledge Retention Check (Mini-Quiz) */}
          <div className="article-quiz-box panel-card">
            <div className="quiz-header">
              <HelpCircle size={20} className="text-cyan" />
              <div>
                <h3>Checagem Rápida de Fixação</h3>
                <p>Teste o que você acabou de aprender antes de continuar para a próxima matéria.</p>
              </div>
            </div>

            <div className="quiz-questions-list">
              {quizQuestions.map((q, qIdx) => {
                const userSelected = selectedAnswers[qIdx];
                const hasAnswered = userSelected !== undefined;
                const isCorrect = userSelected === q.answer;

                return (
                  <div key={qIdx} className="quiz-card-item">
                    <strong className="quiz-q-title">
                      Questão {qIdx + 1}: {q.question}
                    </strong>

                    <div className="quiz-options-group">
                      {q.options.map((opt, oIdx) => {
                        let btnClass = "quiz-opt-btn";
                        if (hasAnswered) {
                          if (oIdx === q.answer) btnClass += " is-correct";
                          else if (oIdx === userSelected) btnClass += " is-wrong";
                        } else if (userSelected === oIdx) {
                          btnClass += " is-selected";
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(qIdx, oIdx)}
                            className={btnClass}
                            disabled={hasAnswered}
                          >
                            <span className="opt-letter">{String.fromCharCode(65 + oIdx)}</span>
                            <span className="opt-text">{opt}</span>
                            {hasAnswered && oIdx === q.answer && <CheckCircle2 size={16} className="opt-status-icon text-green" />}
                          </button>
                        );
                      })}
                    </div>

                    {hasAnswered && (
                      <div className={`quiz-explanation-box ${isCorrect ? "correct-box" : "wrong-box"}`}>
                        <strong>{isCorrect ? "✓ Resposta Correta!" : "✕ Quase lá!"}</strong>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cockpit Safety & Operational Disclaimer */}
          <div className="article-caution-box panel-card">
            <div className="caution-icon-col">
              <AlertTriangle size={22} className="text-orange" />
            </div>
            <div className="caution-content">
              <strong>Nota de Segurança e Responsabilidade Aeronáutica</strong>
              <p>
                Este conteúdo destina-se exclusivamente a fins de estudo teórico, nivelamento técnico e simulação de voo.
                Para operações de voo real, consulte obrigatoriamente as publicações oficiais em vigor (AIP, ROTAER, NOTAM, cartas DECEA)
                e os manuais aprovados do fabricante da respectiva aeronave (POH / AFM).
              </p>
            </div>
          </div>

          {/* Navigation Controls Bottom */}
          <div className="article-footer-nav">
            <Link href={`/${locale}/artigos`} className="button button-secondary">
              <ArrowLeft size={16} /> {ui.common.allArticles}
            </Link>
            <Link href={`/${locale}/questoes`} className="button button-primary">
              Praticar Questões Comentadas <ArrowRight size={16} />
            </Link>
          </div>
        </main>

        {/* Sticky Sidebar: Table of Contents & Related Articles */}
        <aside className="article-sticky-sidebar">
          {/* Table of Contents Box */}
          <div className="panel-card sidebar-toc-card">
            <span className="sidebar-kicker">SUMÁRIO DO ARTIGO</span>
            <nav className="toc-nav-list" aria-label="Sumário do artigo">
              {article.sections.map((sec, idx) => (
                <button
                  key={sec.title}
                  type="button"
                  onClick={() => scrollToSection(idx)}
                  className={`toc-nav-item ${activeSectionIdx === idx ? "is-active" : ""}`}
                >
                  <span className="toc-index">0{idx + 1}</span>
                  <span className="toc-title">{sec.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Related Articles Card */}
          {relatedArticles.length > 0 && (
            <div className="panel-card sidebar-related-card">
              <span className="sidebar-kicker">{ui.common.relatedContent}</span>
              <div className="sidebar-articles-grid">
                {relatedArticles.map((rel) => {
                  if (!rel) return null;
                  return (
                    <Link
                      key={rel.slug}
                      href={`/${locale}/artigos/${rel.slug}`}
                      className="sidebar-article-card"
                    >
                      <span className="rel-card-cat">{rel.category}</span>
                      <strong className="rel-card-title">{rel.title}</strong>
                      <div className="rel-card-footer">
                        <span>{rel.readTime} min de leitura</span>
                        <ArrowRight size={14} className="rel-arrow" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Study Recommendation */}
          <div className="panel-card sidebar-action-card">
            <div className="sidebar-action-header">
              <BookOpen size={18} className="text-cyan" />
              <strong>Treinamento Ativo</strong>
            </div>
            <p>Combine a teoria deste artigo com a rotina de questões do simulador para reter até 85% a mais do conteúdo.</p>
            <Link href={`/${locale}/simulados`} className="button button-secondary sidebar-full-btn">
              Abrir Simulador ANAC
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

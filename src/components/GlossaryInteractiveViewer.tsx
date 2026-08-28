"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Wrench, 
  Volume2, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  HelpCircle,
  Play,
  Gauge,
  RotateCcw,
  Sliders
} from "lucide-react";
import { ValidLocale } from "@/lib/i18n";
import { GlossaryTerm } from "@/lib/translations/glossary";
import { Article } from "@/lib/translations/articles";
import { soundEngine } from "./GlobalInteractivity";

// Tokenized explanations for formula elements
const FORMULA_TOKEN_EXPLANATIONS: Record<string, string> = {
  "[Aeródromo]": "Código ICAO de 4 letras do aeródromo de referência (Ex: SBGR = Guarulhos, SBRJ = Santos Dumont, SBBR = Brasília).",
  "[Data/Hora UTC]": "Dia do mês (2 dígitos) seguido de horário UTC/Zulu (4 dígitos) e letra Z (Ex: 281400Z = dia 28 às 14:00 UTC).",
  "[Vento]": "Direção magnética verdadeira em 3 dígitos e velocidade em nós (Ex: 14012G22KT = vento 140° a 12 nós com rajadas de 22 kt).",
  "[Visibilidade]": "Visibilidade horizontal em metros (Ex: 9999 = 10 km ou mais; 4000 = 4.000 metros; 0800 = 800 metros).",
  "[Fenômenos]": "Intensidade (+/-) + Descritor + Tipo (Ex: -RA = chuva leve, +TSRA = trovoada com chuva forte, FG = nevoeiro, BR = névoa úmida).",
  "[Nuvens]": "Quantidade em oitavos (FEW 1-2, SCT 3-4, BKN 5-7, OVC 8) + altura da base em centenas de pés (Ex: BKN025 = teto a 2.500 ft; OVC010 = teto a 1.000 ft).",
  "[Temp/Orvalho]": "Temperatura do ar e ponto de orvalho em °C (Ex: 24/18 = temp 24°C, orvalho 18°C; M02/M05 = temp -2°C, orvalho -5°C).",
  "[QNH]": "Ajuste de altímetro barométrico em hectopascais/hPa (Ex: Q1016) ou polegadas de mercúrio nos EUA (Ex: A2992).",
  "[Tendência]": "Projeção de tendência para as próximas 2 horas: NOSIG (sem mudança significativa), TEMPO (temporário) ou BECMG (em transição).",
  "[Glide Slope]": "Rampa eletrônica de descida vertical com inclinação padrão de 3.0 graus projetada pela antena de solo.",
  "[Localizer]": "Feixe direcional VHF de altíssima precisão que fornece orientação no alinhamento central da pista.",
  "[Radial]": "Um dos 360 rumos magnéticos emitidos pela estação transmissora VOR a partir do centro da antena para fora."
};

// Preset METAR examples for interactive simulation
const METAR_PRESETS = [
  {
    code: "SBGR 281400Z 14012G22KT 9999 BKN025 24/18 Q1016",
    station: "SBGR (São Paulo / Guarulhos)",
    category: "VFR",
    wind: "140° a 12 nós (Rajadas de 22 nós)",
    vis: "10 km ou mais (Excelente)",
    clouds: "Broken (5 a 7 oitavos) a 2.500 pés",
    temp: "24°C / Orvalho 18°C",
    qnh: "1016 hPa"
  },
  {
    code: "SBRJ 281500Z 18008KT 6000 -RA SCT015 BKN030 21/19 Q1013",
    station: "SBRJ (Rio de Janeiro / Santos Dumont)",
    category: "MVFR",
    wind: "180° a 8 nós",
    vis: "6.000 metros com Chuva Leve (-RA)",
    clouds: "SCT a 1.500 ft, Teto BKN a 3.000 pés",
    temp: "21°C / Orvalho 19°C",
    qnh: "1013 hPa"
  },
  {
    code: "SBGL 281200Z 00000KT 0800 FG OVC002 18/18 Q1018",
    station: "SBGL (Rio de Janeiro / Galeão)",
    category: "LIFR",
    wind: "Calmo (00000KT)",
    vis: "800 metros em Nevoeiro Denso (FG)",
    clouds: "Teto Baixo Overcast (8/8) a 200 pés",
    temp: "18°C / Orvalho 18°C (Saturação 100%)",
    qnh: "1018 hPa"
  }
];

export function GlossaryInteractiveViewer({
  term,
  locale,
  bcp47,
  ui,
  relatedArticle,
}: {
  term: GlossaryTerm;
  locale: ValidLocale;
  bcp47: string;
  ui: {
    common: {
      allTerms: string;
    };
  };
  relatedArticle?: Article;
}) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeToken, setActiveToken] = useState<string | null>(null);

  // METAR Interactive Simulator state
  const [selectedMetarIdx, setSelectedMetarIdx] = useState(0);
  const [customMetarText, setCustomMetarText] = useState(METAR_PRESETS[0].code);

  // QNH Interactive Simulator state
  const [qnhValue, setQnhValue] = useState(1013);

  const triggerToast = (message: string, type: "success" | "info" = "info") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foxsim-toast", { detail: { message, type } }));
    }
  };

  const handleCopyDefinition = () => {
    soundEngine.playClick();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      const fullText = `${term.term} (${term.phoneticOrAcronym}): ${term.shortDefinition}`;
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      triggerToast("Definição copiada para a área de transferência! 📋", "success");
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handlePronounce = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      triggerToast("Síntese de voz não suportada");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const text = `${term.term}. ${term.phoneticOrAcronym}. ${term.shortDefinition}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = bcp47;
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      soundEngine.playChirp();
      triggerToast("Pronunciando termo técnico... 🔊", "success");
    }
  };

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelectMetarPreset = (idx: number) => {
    soundEngine.playClick();
    setSelectedMetarIdx(idx);
    setCustomMetarText(METAR_PRESETS[idx].code);
  };

  const currentMetar = METAR_PRESETS[selectedMetarIdx];

  // Tokenize formula string into clickable tags
  const renderFormulaTokens = (formula: string) => {
    const parts = formula.split(/(\[[^\]]+\])/g);
    return (
      <div className="formula-tokens-wrap">
        {parts.map((part, pIdx) => {
          if (part.startsWith("[") && part.endsWith("]")) {
            const explanation = FORMULA_TOKEN_EXPLANATIONS[part];
            const isSelected = activeToken === part;
            return (
              <button
                key={pIdx}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveToken(isSelected ? null : part);
                }}
                className={`formula-token-chip ${isSelected ? "is-selected" : ""}`}
                title={explanation || "Clique para ver detalhes"}
              >
                <code>{part}</code>
              </button>
            );
          }
          return <span key={pIdx} className="formula-plain-text">{part}</span>;
        })}
      </div>
    );
  };

  const isMetarOrTaf = term.slug === "metar" || term.slug === "taf";
  const isAltimetry = term.slug === "qnh" || term.slug === "qfe" || term.slug === "qne";

  return (
    <div className="glossary-interactive-root">
      {/* 2-Column Grid Layout */}
      <div className="glossary-detail-grid">
        {/* Main Column */}
        <main className="glossary-primary-column">
          {/* Featured Snippet Card (Resumo Direto) */}
          <div className="featured-snippet-box panel-card">
            <div className="snippet-top-bar">
              <span className="section-kicker">RESUMO DIRETO</span>
              <div className="snippet-actions">
                <button
                  type="button"
                  onClick={handlePronounce}
                  className={`snippet-action-btn ${isSpeaking ? "is-active" : ""}`}
                  title="Ouvir pronúncia da sigla e definição"
                  aria-label="Ouvir pronúncia"
                >
                  <Volume2 size={15} />
                  <span>{isSpeaking ? "Pausar" : "Pronúncia"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyDefinition}
                  className="snippet-action-btn"
                  title="Copiar definição completa"
                  aria-label="Copiar definição"
                >
                  {copied ? <Check size={15} className="text-cyan" /> : <Copy size={15} />}
                  <span>{copied ? "Copiado!" : "Copiar"}</span>
                </button>
              </div>
            </div>

            <div className="snippet-title-row">
              <h2>O que é {term.term}?</h2>
              <span className="phonetic-badge">{term.phoneticOrAcronym}</span>
            </div>

            <p className="snippet-lead-text">{term.shortDefinition}</p>
          </div>

          {/* Interactive Formula Inspector */}
          {term.keyFormulaOrRules && (
            <div className="formula-interactive-box panel-card">
              <div className="formula-header">
                <div className="formula-title-left">
                  <Sliders size={16} className="text-cyan" />
                  <strong>ESTRUTURA & REGRA PRÁTICA INTERATIVA</strong>
                </div>
                <small className="formula-hint-tag">Clique nos blocos para decodificar</small>
              </div>

              <div className="formula-body">
                {renderFormulaTokens(term.keyFormulaOrRules)}
              </div>

              {activeToken && FORMULA_TOKEN_EXPLANATIONS[activeToken] && (
                <div className="formula-token-tooltip panel-card">
                  <div className="tooltip-head">
                    <Sparkles size={14} className="text-cyan" />
                    <strong>Decodificação de {activeToken}:</strong>
                  </div>
                  <p>{FORMULA_TOKEN_EXPLANATIONS[activeToken]}</p>
                </div>
              )}
            </div>
          )}

          {/* Interactive Live METAR Decoder Widget */}
          {isMetarOrTaf && (
            <div className="interactive-widget-box panel-card">
              <div className="widget-header">
                <Gauge size={18} className="text-cyan" />
                <div>
                  <h3>Decodificador METAR / TAF em Tempo Real</h3>
                  <p>Alterne entre aeródromos ou insira um boletim para ver a decodificação instantânea.</p>
                </div>
              </div>

              <div className="metar-presets-row">
                {METAR_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.station}
                    type="button"
                    onClick={() => handleSelectMetarPreset(idx)}
                    className={`preset-btn ${selectedMetarIdx === idx ? "is-active" : ""}`}
                  >
                    <span>{preset.station.split(" ")[0]}</span>
                    <small className={`category-tag ${preset.category.toLowerCase()}`}>{preset.category}</small>
                  </button>
                ))}
              </div>

              <div className="metar-raw-display">
                <code>{currentMetar.code}</code>
              </div>

              <div className="metar-decoded-grid">
                <div className="decoded-cell">
                  <small>VENTO & RAJADAS</small>
                  <strong>{currentMetar.wind}</strong>
                </div>
                <div className="decoded-cell">
                  <small>VISIBILIDADE</small>
                  <strong>{currentMetar.vis}</strong>
                </div>
                <div className="decoded-cell">
                  <small>CAMADA DE NUVENS</small>
                  <strong>{currentMetar.clouds}</strong>
                </div>
                <div className="decoded-cell">
                  <small>TEMP / ORVALHO</small>
                  <strong>{currentMetar.temp}</strong>
                </div>
                <div className="decoded-cell">
                  <small>AJUSTE QNH</small>
                  <strong>{currentMetar.qnh}</strong>
                </div>
                <div className="decoded-cell">
                  <small>CONDIÇÃO DE VOO</small>
                  <strong className={`condition-tag ${currentMetar.category.toLowerCase()}`}>{currentMetar.category}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Altimeter Pressure Calculator */}
          {isAltimetry && (
            <div className="interactive-widget-box panel-card">
              <div className="widget-header">
                <Gauge size={18} className="text-cyan" />
                <div>
                  <h3>Simulador de Ajuste Altimétrico (QNH / QNE / QFE)</h3>
                  <p>Ajuste a subescala de pressão barométrica e veja o comportamento da leitura altimétrica.</p>
                </div>
              </div>

              <div className="altimeter-slider-control">
                <label htmlFor="qnh-range">
                  <span>Pressão Ajustada: <strong>{qnhValue} hPa</strong> ({(qnhValue * 0.02953).toFixed(2)} inHg)</span>
                  <button type="button" onClick={() => setQnhValue(1013)} className="reset-alt-btn">
                    <RotateCcw size={12} /> Padrão ISA (1013 hPa)
                  </button>
                </label>
                <input
                  id="qnh-range"
                  type="range"
                  min="980"
                  max="1040"
                  value={qnhValue}
                  onChange={(e) => setQnhValue(Number(e.target.value))}
                  className="pressure-range-input"
                />
              </div>

              <div className="altimeter-results-grid">
                <div className="alt-res-card">
                  <small>TIPO DE AJUSTE</small>
                  <strong>{qnhValue === 1013 ? "QNE (Nível de Voo / FL)" : qnhValue > 1013 ? "QNH (Alta Pressão)" : "QNH (Baixa Pressão)"}</strong>
                </div>
                <div className="alt-res-card">
                  <small>DESVIO DA PADRÃO (ISA)</small>
                  <strong>{qnhValue - 1013 > 0 ? `+${qnhValue - 1013}` : qnhValue - 1013} hPa</strong>
                </div>
                <div className="alt-res-card">
                  <small>DIFERENÇA DE ALTURA APROX.</small>
                  <strong>{((qnhValue - 1013) * 30).toFixed(0)} pés</strong>
                </div>
              </div>
            </div>
          )}

          {/* Full Technical Explanation Content */}
          <div className="glossary-depth-card panel-card">
            <div className="depth-header">
              <Compass size={18} className="text-cyan" />
              <h3>Explicação Técnica Completa</h3>
            </div>
            <div className="depth-paragraphs">
              {term.fullExplanation.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Back to Glossary Directory */}
          <div className="glossary-footer-nav">
            <Link href={`/${locale}/glossario`} className="button button-secondary">
              <ArrowLeft size={16} /> {ui.common.allTerms}
            </Link>
          </div>
        </main>

        {/* Sidebar: Related Guide, Tools & Cross References */}
        <aside className="glossary-sticky-sidebar">
          {/* Related Pillar Guide Card */}
          {relatedArticle && (
            <div className="panel-card sidebar-guide-card">
              <span className="sidebar-kicker">GUIA RELACIONADO</span>
              <h3>{relatedArticle.title}</h3>
              <p>{relatedArticle.description}</p>
              <Link href={`/${locale}/artigos/${relatedArticle.slug}`} className="button button-primary sidebar-full-btn">
                <BookOpen size={16} /> Ler artigo completo
              </Link>
            </div>
          )}

          {/* Tool Recommendation Card */}
          <div className="panel-card sidebar-tool-card">
            <span className="sidebar-kicker">CALCULADORAS & FERRAMENTAS</span>
            <h3>Pratique Cálculos de Voo</h3>
            <p>Utilize nossas calculadoras aeronáuticas para vento de través, gradiente de subida e descida TOD.</p>
            <Link href={`/${locale}/ferramentas`} className="button button-secondary sidebar-full-btn">
              <Wrench size={16} /> Abrir ferramentas
            </Link>
          </div>

          {/* ANAC Question Bank Card */}
          <div className="panel-card sidebar-action-card">
            <div className="sidebar-action-header">
              <HelpCircle size={18} className="text-cyan" />
              <strong>Questões da ANAC</strong>
            </div>
            <p>Verifique questões de prova comentadas sobre <strong>{term.term}</strong> e outros tópicos essenciais.</p>
            <Link href={`/${locale}/questoes`} className="button button-secondary sidebar-full-btn">
              Banco de Questões
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

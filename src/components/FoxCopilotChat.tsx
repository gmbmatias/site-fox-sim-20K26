"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles, MessageCircle, Users, ExternalLink, HelpCircle, ArrowRight, Radio, Compass, BookOpen, Check } from "lucide-react";
import { soundEngine } from "./GlobalInteractivity";
import { FoxEmblem } from "./FoxLogo";
import { ValidLocale } from "@/lib/i18n";

export const DISCORD_LINK = "https://discord.gg/crGYnvWpG";
export const WHATSAPP_LINK = "https://chat.whatsapp.com/HCttsfRx1rUAMgV2p82vTD";

export function DiscordIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.893a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.979-.954 1.18-.175.2-.351.225-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.783-1.675-2.083-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.235-.244-.587-.493-.507-.678-.517-.175-.009-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.054 1.03-1.054 2.511s1.079 2.912 1.23 3.113c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.722.23 1.379.197 1.899.12.579-.087 1.78-.727 2.03-1.429.251-.702.251-1.303.176-1.429-.076-.125-.276-.2-.577-.35zM12.042 21.916c-1.815 0-3.593-.49-5.147-1.417l-.369-.219-3.826 1.003 1.021-3.73-.24-.382a9.923 9.923 0 0 1-1.521-5.271c0-5.502 4.477-9.98 9.983-9.98 2.665 0 5.17 1.038 7.054 2.922 1.884 1.884 2.921 4.389 2.921 7.054 0 5.504-4.478 9.98-9.982 9.98zm0-19.916c-6.602 0-11.975 5.373-11.975 11.975 0 2.109.549 4.168 1.593 5.98l-1.693 6.185 6.331-1.661c1.742.95 3.705 1.451 5.744 1.451 6.602 0 11.975-5.373 11.975-11.975 0-3.2-1.246-6.208-3.509-8.47-2.262-2.263-5.27-3.51-8.471-3.51z"/>
    </svg>
  );
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actionLinks?: Array<{ label: string; url: string; isExternal?: boolean; icon?: string }>;
}

const AVIATION_KNOWLEDGE: Array<{
  keywords: string[];
  response: string;
  actionLinks?: Array<{ label: string; url: string; isExternal?: boolean; icon?: string }>;
}> = [
  {
    keywords: ["metar", "taf", "tempo", "vento", "nuvem", "visibilidade", "clima"],
    response:
      "O METAR é o informe meteorológico regular de aeródromo emitido de hora em hora. Para decodificar:\n• Vento: ex. 09012KT (Direção 090° a 12 nós)\n• Visibilidade: ex. 9999 (10 km ou mais)\n• Nuvens: FEW (1-2 oitavos), SCT (3-4), BKN (5-7) e OVC (8/8 de teto)\n• Ajuste: Q1013 (QNH em hPa)",
    actionLinks: [
      { label: "Abrir Decodificador METAR", url: "/pt-br/glossario/metar" },
      { label: "Guia de Meteorologia", url: "/pt-br/artigos/como-interpretar-metar" },
    ],
  },
  {
    keywords: ["qnh", "qne", "qfe", "altimetro", "pressao", "altitude"],
    response:
      "Ajustes de altímetro fundamentais na aviação:\n• QNH: Ajuste que faz o altímetro indicar a altitude real em relação ao nível médio do mar (MSL).\n• QNE: Ajuste padrão internacional de 1013,25 hPa (29.92 inHg) usado acima da Altitude de Transição (Níveis de Voo - FL).\n• QFE: Ajuste barométrico local que faz o altímetro marcar zero no solo da pista (altura).",
    actionLinks: [
      { label: "Simulador de QNH", url: "/pt-br/ferramentas" },
      { label: "Glossário: QNH vs QNE", url: "/pt-br/glossario/qnh" },
    ],
  },
  {
    keywords: ["discord", "comunidade", "grupo", "whatsapp", "zap", "duvida", "tirar duvida", "ajuda", "contato"],
    response:
      "Junte-se à comunidade oficial de pilotos e alunos da FOX SIM! Você pode tirar dúvidas diretamente com instrutores, compartilhar planos de voo e participar de simulados em grupo nos links abaixo:",
    actionLinks: [
      { label: "Entrar no Discord Oficial", url: DISCORD_LINK, isExternal: true, icon: "discord" },
      { label: "Entrar no Grupo de WhatsApp", url: WHATSAPP_LINK, isExternal: true, icon: "whatsapp" },
    ],
  },
  {
    keywords: ["pp", "piloto privado", "horas", "banca", "anac", "prova"],
    response:
      "O curso de Piloto Privado (PP) abrange 5 matérias teóricas na banca da ANAC: Regulamentos de Voo, Meteorologia, Navegação, Conhecimentos Técnicos e Teoria de Voo. Recomendamos fazer 1 simulado por dia e reforçar os temas com acerto abaixo de 70%.",
    actionLinks: [
      { label: "Trilha de Piloto Privado", url: "/pt-br/estudos/pp" },
      { label: "Simulado Geral PP", url: "/pt-br/simulados?curso=pp" },
    ],
  },
  {
    keywords: ["ifr", "voo por instrumentos", "ils", "vor", "ndb", "gnss"],
    response:
      "O voo IFR (Regras de Voo por Instrumentos) exige domínio de navegação rádio (ILS, VOR, RNP), interpretação de cartas IAC/SID/STAR e limites de teto e visibilidade. Todos os cálculos de razão de descida (GS × 5) e estimados de consumo podem ser praticados na nossa aba de Ferramentas.",
    actionLinks: [
      { label: "Trilha IFR Completa", url: "/pt-br/estudos/ifr" },
      { label: "Calculadora de Glideslope 3°", url: "/pt-br/ferramentas" },
    ],
  },
  {
    keywords: ["vento cruzado", "crosswind", "pouso", "pista"],
    response:
      "O componente de vento de través é obtido pela fórmula: Vento Cruzado = Velocidade do Vento × Seno(Ângulo Relativo). Acesse nossa calculadora visual de pista para ver o diagrama de rumo em tempo real!",
    actionLinks: [
      { label: "Calculadora de Vento Cruzado", url: "/pt-br/ferramentas" },
    ],
  },
];

const PRESET_QUESTIONS = [
  "Como interpretar METAR e TAF?",
  "O que é QNH, QNE e QFE?",
  "Como entrar no Discord e WhatsApp?",
  "Como me preparar para a banca da ANAC?",
];

export function FoxCopilotChat({ locale = "pt-br" }: { locale?: ValidLocale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Olá, Comandante! Sou o FOX Copilot, seu assistente aeronáutico de estudos. Como posso ajudar seu voo hoje?",
      timestamp: "Agora",
      actionLinks: [
        { label: "Entrar no Discord", url: DISCORD_LINK, isExternal: true, icon: "discord" },
        { label: "Grupo de WhatsApp", url: WHATSAPP_LINK, isExternal: true, icon: "whatsapp" },
      ],
    },
  ]);

  // Listen to open chat custom events
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("foxsim-open-chat", handleOpenChat);
    return () => window.removeEventListener("foxsim-open-chat", handleOpenChat);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    soundEngine.playClick();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      soundEngine.playSuccess();
      const lower = query.toLowerCase();

      let matched = AVIATION_KNOWLEDGE.find((item) =>
        item.keywords.some((kw) => lower.includes(kw))
      );

      let botReplyText = "";
      let botLinks = undefined;

      if (matched) {
        botReplyText = matched.response;
        botLinks = matched.actionLinks;
      } else {
        botReplyText =
          "Excelente pergunta técnica! Nossos instrutores e a comunidade de pilotos respondem em tempo real no nosso canal do Discord e no grupo de WhatsApp. Junte-se a nós para debater com outros comandantes:";
        botLinks = [
          { label: "Perguntar no Discord", url: DISCORD_LINK, isExternal: true, icon: "discord" },
          { label: "Perguntar no WhatsApp", url: WHATSAPP_LINK, isExternal: true, icon: "whatsapp" },
        ];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        actionLinks: botLinks,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        type="button"
        className={`copilot-floating-trigger ${isOpen ? "is-active" : ""}`}
        onClick={() => {
          soundEngine.playChirp();
          setIsOpen(!isOpen);
        }}
        title="FOX Copilot — Dúvidas e Comunidade"
        aria-label="Abrir assistente FOX Copilot"
      >
        <span className="copilot-beacon-dot" />
        <MessageCircle size={20} className="copilot-icon" />
        <span className="copilot-trigger-text">DÚVIDAS & COMUNIDADE</span>
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="copilot-chat-window panel-card">
          {/* Header */}
          <div className="copilot-chat-header">
            <div className="copilot-header-info">
              <FoxEmblem size={28} />
              <div>
                <div className="copilot-title-row">
                  <strong>FOX COPILOT</strong>
                  <span className="copilot-status-badge">● ONLINE</span>
                </div>
                <small>Torre de Controle & Dúvidas 24/7</small>
              </div>
            </div>
            <button
              type="button"
              className="copilot-close-btn"
              onClick={() => {
                soundEngine.playClick();
                setIsOpen(false);
              }}
              aria-label="Fechar chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Community Links Quick Banner */}
          <div className="copilot-community-banner">
            <span>Comunidade de Pilotos:</span>
            <div className="copilot-banner-links">
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="copilot-community-pill discord"
                onClick={() => soundEngine.playClick()}
              >
                <DiscordIcon size={14} />
                <span>Discord</span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="copilot-community-pill whatsapp"
                onClick={() => soundEngine.playClick()}
              >
                <WhatsAppIcon size={14} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Message History Body */}
          <div className="copilot-chat-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`copilot-msg-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}
              >
                {msg.sender === "bot" && (
                  <div className="copilot-msg-avatar">
                    <Bot size={16} className="text-cyan" />
                  </div>
                )}
                <div className="copilot-msg-bubble">
                  <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
                  
                  {msg.actionLinks && msg.actionLinks.length > 0 && (
                    <div className="copilot-msg-actions">
                      {msg.actionLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target={link.isExternal ? "_blank" : undefined}
                          rel={link.isExternal ? "noopener noreferrer" : undefined}
                          className={`copilot-action-btn ${link.icon || ""}`}
                          onClick={() => soundEngine.playClick()}
                        >
                          {link.icon === "discord" && <DiscordIcon size={14} />}
                          {link.icon === "whatsapp" && <WhatsAppIcon size={14} />}
                          <span>{link.label}</span>
                          <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  )}

                  <span className="copilot-msg-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="copilot-msg-row bot-row">
                <div className="copilot-msg-avatar">
                  <Bot size={16} className="text-cyan" />
                </div>
                <div className="copilot-msg-bubble is-typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Questions */}
          <div className="copilot-presets-row">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                className="copilot-preset-chip"
                onClick={() => handleSend(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            className="copilot-chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida aeronáutica..."
              aria-label="Mensagem para o assistente"
            />
            <button
              type="submit"
              className="copilot-send-btn"
              disabled={!input.trim()}
              aria-label="Enviar mensagem"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

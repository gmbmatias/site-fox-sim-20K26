"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Clock3, 
  Users, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  CheckSquare, 
  Square,
  Compass,
  Bookmark,
  BookmarkCheck,
  Layers,
  GraduationCap
} from "lucide-react";
import { ValidLocale } from "@/lib/i18n";
import { PillarGuide } from "@/lib/translations/guides";
import { soundEngine } from "./GlobalInteractivity";

export function GuideInteractiveViewer({
  guide,
  locale,
  ui,
}: {
  guide: PillarGuide;
  locale: ValidLocale;
  ui: {
    common: {
      allGuides: string;
    };
  };
}) {
  // FAQ accordion active state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Guide study checklist state (stored in localStorage)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Dynamic study steps checklist generated from guide sections
  const checklistItems = guide.sections.map((s) => s.heading);

  useEffect(() => {
    try {
      const savedKey = `foxsim_guide_checklist_${guide.slug}`;
      const savedData = JSON.parse(localStorage.getItem(savedKey) || "{}");
      setCheckedItems(savedData);

      const completedCount = Object.values(savedData).filter(Boolean).length;
      if (checklistItems.length > 0 && completedCount === checklistItems.length) {
        setIsCompleted(true);
      }
    } catch {
      // ignore
    }
  }, [guide.slug, checklistItems.length]);

  const toggleCheckItem = (idx: number) => {
    soundEngine.playChirp();
    const next = { ...checkedItems, [idx]: !checkedItems[idx] };
    setCheckedItems(next);

    try {
      const savedKey = `foxsim_guide_checklist_${guide.slug}`;
      localStorage.setItem(savedKey, JSON.stringify(next));
    } catch {
      // ignore
    }

    const completedCount = Object.values(next).filter(Boolean).length;
    if (completedCount === checklistItems.length && checklistItems.length > 0) {
      setIsCompleted(true);
      soundEngine.playSuccess();
      triggerToast("🎉 Parabéns! Você concluiu todos os tópicos deste Guia!", "success");
    } else {
      setIsCompleted(false);
    }
  };

  const triggerToast = (message: string, type: "success" | "info" = "info") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foxsim-toast", { detail: { message, type } }));
    }
  };

  const toggleFaq = (idx: number) => {
    soundEngine.playClick();
    setOpenFaqIdx((prev) => (prev === idx ? null : idx));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = checklistItems.length > 0 ? Math.round((completedCount / checklistItems.length) * 100) : 0;

  return (
    <div className="guide-interactive-root">
      {/* 2-Column Grid Layout */}
      <div className="guide-layout-grid">
        {/* Main Content Column */}
        <main className="guide-primary-column">
          {/* Guide Summary Highlight Card */}
          <div className="guide-summary-card panel-card">
            <div className="guide-summary-meta-bar">
              <div className="guide-meta-tag-item">
                <Clock3 size={15} className="text-cyan" />
                <span>{guide.readTime} min de leitura</span>
              </div>
              <div className="guide-meta-tag-item">
                <Users size={15} className="text-cyan" />
                <span>{guide.targetAudience}</span>
              </div>
            </div>

            <div className="guide-summary-lead-box">
              <span className="summary-kicker">OBJETIVO DO MANUAL</span>
              <p className="guide-summary-text">{guide.summary}</p>
            </div>

            {/* Live Progress Bar for Checklist */}
            <div className="guide-checklist-progress-bar">
              <div className="progress-label-row">
                <span>Progresso de Estudo: <strong>{progressPercent}%</strong> ({completedCount}/{checklistItems.length} módulos)</span>
                {isCompleted && <span className="completed-badge">✓ MÓDULO CONCLUÍDO</span>}
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Guide Sections Content */}
          <div className="guide-sections-list">
            {guide.sections.map((sec, idx) => (
              <section key={sec.heading} className="guide-section-card panel-card">
                <div className="guide-section-header">
                  <span className="guide-section-number">0{idx + 1}</span>
                  <h2>{sec.heading}</h2>
                </div>

                <div className="guide-section-paragraphs">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Bullet Points with Aviation Icons */}
                {sec.bulletPoints && (
                  <div className="guide-bullets-card">
                    <span className="bullets-kicker">PONTOS-CHAVE DE DOMÍNIO:</span>
                    <ul className="guide-custom-bullets">
                      {sec.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx}>
                          <CheckCircle2 size={16} className="bullet-check-icon text-cyan" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommended Platform Resources */}
                {sec.linkedResources && (
                  <div className="guide-resources-box panel-card">
                    <div className="resources-head">
                      <BookOpen size={16} className="text-cyan" />
                      <strong>Recursos Práticos Recomendados:</strong>
                    </div>
                    <div className="resources-grid">
                      {sec.linkedResources.map((res) => (
                        <Link
                          key={res.url}
                          href={`/${locale}${res.url}`}
                          className="resource-card-link"
                          onClick={() => soundEngine.playClick()}
                        >
                          <div className="res-icon-wrap">
                            <GraduationCap size={16} />
                          </div>
                          <span className="res-label">{res.label}</span>
                          <ArrowRight size={14} className="res-arrow" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Interactive FAQ Accordion Block */}
          {guide.faqList && guide.faqList.length > 0 && (
            <div className="guide-faq-section panel-card">
              <div className="faq-main-header">
                <HelpCircle size={22} className="text-cyan" />
                <div>
                  <h2>Perguntas Frequentes</h2>
                  <p>Dúvidas mais comuns sobre este manual e a preparação para a prova.</p>
                </div>
              </div>

              <div className="faq-accordion-list">
                {guide.faqList.map((faq, fIdx) => {
                  const isOpen = openFaqIdx === fIdx;
                  return (
                    <div key={fIdx} className={`faq-accordion-item ${isOpen ? "is-open" : ""}`}>
                      <button
                        type="button"
                        onClick={() => toggleFaq(fIdx)}
                        className="faq-accordion-trigger"
                        aria-expanded={isOpen}
                      >
                        <span className="faq-q-text">{faq.question}</span>
                        <div className="faq-chevron-wrap">
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </button>
                      {isOpen && (
                        <div className="faq-accordion-content">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Back & Action Buttons */}
          <div className="guide-footer-nav">
            <Link href={`/${locale}/guias`} className="button button-secondary">
              <ArrowLeft size={16} /> {ui.common.allGuides}
            </Link>
            <Link href={`/${locale}/simulados`} className="button button-primary">
              Iniciar Simulado da Matéria <ArrowRight size={16} />
            </Link>
          </div>
        </main>

        {/* Sticky Sidebar: Study Checklist & Next Steps */}
        <aside className="guide-sticky-sidebar">
          {/* Interactive Study Checklist Box */}
          <div className="panel-card sidebar-checklist-card">
            <div className="checklist-card-header">
              <CheckSquare size={18} className="text-cyan" />
              <strong>Checklist de Domínio</strong>
            </div>
            <p className="checklist-desc">Marque os tópicos conforme for dominando o conteúdo:</p>
            <div className="checklist-items-list">
              {checklistItems.map((itemHeading, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheckItem(idx)}
                    className={`checklist-item-row ${isChecked ? "is-checked" : ""}`}
                  >
                    <div className="check-box-icon">
                      {isChecked ? <CheckCircle2 size={16} className="text-cyan" /> : <Square size={16} className="text-muted" />}
                    </div>
                    <span className="check-item-text">{itemHeading}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cockpit Recommendation Card */}
          <div className="panel-card sidebar-action-card">
            <div className="sidebar-action-header">
              <Compass size={18} className="text-cyan" />
              <strong>Treino no Simulador</strong>
            </div>
            <p>Aplique estes conceitos na prática em simuladores como MSFS ou X-Plane com cartas reais para consolidar o aprendizado.</p>
            <Link href={`/${locale}/ferramentas`} className="button button-secondary sidebar-full-btn">
              Abrir Ferramentas de Voo
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

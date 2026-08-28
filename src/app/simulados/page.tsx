import type { Metadata } from "next";
import { Suspense } from "react";
import { BarChart3, Clock3, ListChecks } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { QuizEngine } from "@/components/QuizEngine";

export const metadata: Metadata = { title: "Simulados de aviação", description: "Simulados cronometrados de PP, PC, IFR e MLTE com resultado por matéria e histórico local.", alternates: { canonical: "/simulados" } };
export default function SimulationsPage() { return <main><PageHero eyebrow="CHECK DE CONHECIMENTO" title="Treine sob tempo. Revise com dados." description="Simulados educacionais cronometrados, resultado final, desempenho por matéria e registro no seu painel." crumbs={[{ label: "Início", href: "/" }, { label: "Simulados" }]} aside={<div className="hero-feature-list"><span><Clock3 size={17} /> 30 minutos</span><span><ListChecks size={17} /> 6 questões por sessão</span><span><BarChart3 size={17} /> Histórico de desempenho</span></div>} /><section className="content-section quiz-section"><div className="shell"><Suspense fallback={<div className="panel-card loading-panel">Montando o simulado…</div>}><QuizEngine mode="simulado" /></Suspense></div></section></main>; }

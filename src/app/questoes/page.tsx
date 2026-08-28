import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock3, MessageSquareText, Target } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { QuizEngine } from "@/components/QuizEngine";

export const metadata: Metadata = { title: "Banco de questões", description: "Questões educacionais de PP, PC, IFR e MLTE com correção e explicação.", alternates: { canonical: "/questoes" } };
export default function QuestionsPage() { return <main><PageHero eyebrow="PRÁTICA ATIVA" title="Questões para entender, não decorar." description="Escolha uma trilha, responda no seu ritmo e veja a explicação de cada alternativa corrigida." crumbs={[{ label: "Início", href: "/" }, { label: "Questões" }]} aside={<div className="hero-feature-list"><span><MessageSquareText size={17} /> Comentários imediatos</span><span><Target size={17} /> Desempenho por matéria</span><span><Clock3 size={17} /> Cronômetro progressivo</span></div>} /><section className="content-section quiz-section"><div className="shell"><Suspense fallback={<div className="panel-card loading-panel">Preparando as questões…</div>}><QuizEngine mode="questoes" /></Suspense></div></section></main>; }

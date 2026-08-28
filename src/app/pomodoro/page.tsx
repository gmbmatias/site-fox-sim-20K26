import type { Metadata } from "next";
import { BellRing, Brain, TimerReset } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PomodoroApp } from "@/components/PomodoroApp";

export const metadata: Metadata = { title: "Pomodoro para estudos", description: "Timer Pomodoro 25/5, 50/10 e personalizado com matéria, metas e progresso local.", alternates: { canonical: "/pomodoro" } };
export default function PomodoroPage() { return <main><PageHero eyebrow="FOCUS MODE" title="Foco no painel. Distrações em espera." description="Escolha seu ciclo, defina a matéria e construa uma rotina de estudo sustentável — uma sessão de cada vez." crumbs={[{ label: "Início", href: "/" }, { label: "Pomodoro" }]} aside={<div className="hero-feature-list"><span><TimerReset size={17} /> Ciclos flexíveis</span><span><Brain size={17} /> Matéria por sessão</span><span><BellRing size={17} /> Som e notificações opcionais</span></div>} /><section className="content-section"><div className="shell"><PomodoroApp /></div></section></main>; }

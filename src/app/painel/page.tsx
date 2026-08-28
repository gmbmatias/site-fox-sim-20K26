import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProgressDashboard } from "@/components/ProgressDashboard";
export const metadata: Metadata = { title: "Painel do aluno", description: "Acompanhe tempo de estudo, questões, simulados, trilhas e assuntos para revisão.", alternates: { canonical: "/painel" } };
export default function DashboardPage() { return <main><PageHero eyebrow="STUDENT DECK" title="Seu progresso, no mesmo painel." description="Tempo de estudo, precisão, trilhas e revisões reunidos para orientar sua próxima sessão." crumbs={[{ label: "Início", href: "/" }, { label: "Painel" }]} /><section className="content-section dashboard-section-wrap"><div className="shell"><ProgressDashboard /></div></section></main>; }

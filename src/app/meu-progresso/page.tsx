import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProgressDashboard } from "@/components/ProgressDashboard";
export const metadata: Metadata = { title: "Meu progresso", description: "Histórico local de estudos, desempenho e metas na FOX SIM.", alternates: { canonical: "/meu-progresso" } };
export default function ProgressPage() { return <main><PageHero eyebrow="LOGBOOK DE ESTUDOS" title="Evolução que você consegue enxergar." description="Acompanhe sua constância e transforme resultados em uma próxima ação clara." crumbs={[{ label: "Início", href: "/" }, { label: "Meu progresso" }]} /><section className="content-section dashboard-section-wrap"><div className="shell"><ProgressDashboard /></div></section></main>; }

import type { Metadata } from "next";
import { Calculator, Gauge, Wind } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Toolbox } from "@/components/Toolbox";
export const metadata: Metadata = { title: "Ferramentas de aviação", description: "Conversores e calculadoras educacionais para distância, velocidade, consumo, TOD, UTC e vento cruzado.", alternates: { canonical: "/ferramentas" } };
export default function ToolsPage() { return <main><PageHero eyebrow="FLIGHT TOOLS" title="Cálculos rápidos. Decisões conscientes." description="Conversores e estimativas para estudo, planejamento em simuladores e conferência de raciocínio." crumbs={[{ label: "Início", href: "/" }, { label: "Ferramentas" }]} aside={<div className="hero-feature-list"><span><Calculator size={17} /> 10 calculadoras</span><span><Gauge size={17} /> Resultado instantâneo</span><span><Wind size={17} /> Vento e planejamento</span></div>} /><section className="content-section"><div className="shell"><Toolbox /></div></section></main>; }

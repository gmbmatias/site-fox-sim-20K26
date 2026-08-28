import type { Metadata } from "next";
import { BookOpen, Clock3, Library } from "lucide-react";
import { ArticleGrid } from "@/components/ArticleGrid";
import { PageHero } from "@/components/PageHero";
import { articleCategories, articles } from "@/lib/content";
export const metadata: Metadata = { title: "Artigos de aviação", description: "Guias úteis sobre meteorologia, navegação, IFR, performance e simuladores de voo.", alternates: { canonical: "/artigos" } };
export default function ArticlesPage() { return <main><PageHero eyebrow="BIBLIOTECA FOX SIM" title="Conteúdo para consultar. E compreender." description="Guias diretos sobre aviação, planejamento, instrumentos e simulação — sem texto de preenchimento." crumbs={[{ label: "Início", href: "/" }, { label: "Artigos" }]} aside={<div className="hero-feature-list"><span><Library size={17} /> {articles.length} guias</span><span><BookOpen size={17} /> {articleCategories.length} categorias</span><span><Clock3 size={17} /> Leitura objetiva</span></div>} /><section className="content-section"><div className="shell"><ArticleGrid /></div></section></main>; }

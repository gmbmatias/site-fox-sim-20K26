import { PageHero } from "./PageHero";

export type LegalSection = { title: string; paragraphs: string[]; bullets?: string[] };
export function LegalPage({ eyebrow, title, description, path, updated = "28 de agosto de 2026", sections }: { eyebrow: string; title: string; description: string; path: string; updated?: string; sections: LegalSection[] }) {
  const displayHost = (process.env.NEXT_PUBLIC_SITE_URL || "https://foxsim.blog").replace(/^https?:\/\//, "");
  return <main><PageHero eyebrow={eyebrow} title={title} description={description} crumbs={[{ label: "Início", href: "/" }, { label: title }]} /><section className="content-section legal-wrap"><div className="shell legal-layout"><aside><b>DOCUMENTO</b><span>Última atualização</span><strong>{updated}</strong><p>URL permanente<br />{displayHost}{path}</p></aside><article className="legal-content">{sections.map((section, index) => <section key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</article></div></section></main>;
}

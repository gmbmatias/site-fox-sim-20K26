import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageHero({ eyebrow, title, description, crumbs, aside }: { eyebrow: string; title: string; description: string; crumbs: { label: string; href?: string }[]; aside?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="page-grid" aria-hidden="true" />
      <div className="shell page-hero-inner">
        <div>
          <Breadcrumbs items={crumbs} />
          <span className="eyebrow"><i />{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {aside && <div className="page-hero-aside">{aside}</div>}
      </div>
    </section>
  );
}

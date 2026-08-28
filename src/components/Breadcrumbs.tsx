import Link from "next/link";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://foxsim.vercel.app";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };
  return (
    <>
      <nav className="breadcrumbs" aria-label="Navegação estrutural">
        {items.map((item, index) => (
          <span key={`${item.label}-${index}`}>{index > 0 && <i>/</i>}{item.href ? <Link href={item.href}>{item.label}</Link> : <b>{item.label}</b>}</span>
        ))}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}

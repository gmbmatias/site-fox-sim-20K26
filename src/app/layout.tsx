import type { Metadata, Viewport } from "next";
import { AdSense } from "@/components/AdSense";
import { CookieBanner } from "@/components/CookieBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://foxsim.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "FOX SIM — Estudos e aviação virtual", template: "%s | FOX SIM" },
  description: "Estude aviação com trilhas de PP, PC, IFR e MLTE, questões, simulados, Pomodoro e ferramentas práticas.",
  applicationName: "FOX SIM",
  authors: [{ name: "FOX SIM" }],
  creator: "FOX SIM",
  publisher: "FOX SIM",
  category: "education",
  keywords: ["aviação", "aviação virtual", "Piloto Privado", "Piloto Comercial", "IFR", "MLTE", "simulados", "MSFS", "X-Plane", "VATSIM", "IVAO"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", url: siteUrl, siteName: "FOX SIM", title: "FOX SIM — Conhecimento para voar mais longe", description: "Trilhas de aviação, questões, simulados e ferramentas em uma experiência feita para estudar." },
  twitter: { card: "summary_large_image", title: "FOX SIM — Estudos e aviação virtual", description: "Conhecimento para voar mais longe." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  other: process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.startsWith("ca-pub-") ? { "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT } : undefined,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#071019", colorScheme: "dark" };

const globalSchema = [
  { "@context": "https://schema.org", "@type": "Organization", name: "FOX SIM", url: siteUrl, logo: `${siteUrl}/icon` },
  { "@context": "https://schema.org", "@type": "WebSite", name: "FOX SIM", url: siteUrl, inLanguage: "pt-BR", description: "Portal educacional de aviação e simulação de voo.", publisher: { "@type": "Organization", name: "FOX SIM" } },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <CookieBanner />
        <AdSense />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }} />
      </body>
    </html>
  );
}

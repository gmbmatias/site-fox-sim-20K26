import type { Metadata, Viewport } from "next";
import { AdSense } from "@/components/AdSense";
import { CookieBanner } from "@/components/CookieBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LOCALES, ValidLocale, getAlternateLanguages, getBcp47Lang, getSiteUrl, normalizeLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";
import "@/app/globals.css";

const siteUrl = getSiteUrl();
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-3918433594573040";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);
  const alternates = getAlternateLanguages("/");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${ui.siteName} — ${ui.tagline}`,
      template: `%s | ${ui.siteName}`,
    },
    description: ui.description,
    applicationName: "FOX SIM",
    authors: [{ name: "FOX SIM" }],
    creator: "FOX SIM",
    publisher: "FOX SIM",
    category: "education",
    keywords: [
      "aviação",
      "aviação virtual",
      "Piloto Privado",
      "Piloto Comercial",
      "IFR",
      "MLTE",
      "simulados",
      "aviation ground school",
      "flight simulation",
      "METAR",
      "TAF",
      "ILS",
      "MSFS",
      "X-Plane",
      "VATSIM",
      "IVAO",
    ],
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      type: "website",
      locale: getBcp47Lang(locale).replace("-", "_"),
      url: `${siteUrl}/${locale}`,
      siteName: "FOX SIM",
      title: `${ui.siteName} — ${ui.tagline}`,
      description: ui.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${ui.siteName} — ${ui.tagline}`,
      description: ui.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "google-adsense-account": adsenseClient,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071019",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const bcp47 = getBcp47Lang(locale);
  const ui = getUi(locale);

  const globalSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "FOX SIM",
      url: siteUrl,
      logo: `${siteUrl}/icon`,
      sameAs: ["https://github.com/gmbmatias/site-fox-sim-20K26"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "FOX SIM",
      url: `${siteUrl}/${locale}`,
      inLanguage: bcp47,
      description: ui.description,
      publisher: {
        "@type": "Organization",
        name: "FOX SIM",
      },
    },
  ];

  return (
    <html lang={bcp47}>
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <SiteHeader initialLocale={locale} />
        {children}
        <SiteFooter initialLocale={locale} />
        <CookieBanner />
        <AdSense />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </body>
    </html>
  );
}

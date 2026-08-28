export type ValidLocale = "pt-br" | "en" | "es" | "fr";

export const LOCALES: ValidLocale[] = ["pt-br", "en", "es", "fr"];
export const DEFAULT_LOCALE: ValidLocale = "pt-br";

export const LOCALE_LABELS: Record<ValidLocale, { label: string; code: string; bcp47: string; flag: string }> = {
  "pt-br": { label: "Português", code: "PT", bcp47: "pt-BR", flag: "🇧🇷" },
  en: { label: "English", code: "EN", bcp47: "en", flag: "🇺🇸" },
  es: { label: "Español", code: "ES", bcp47: "es", flag: "🇪🇸" },
  fr: { label: "Français", code: "FR", bcp47: "fr", flag: "🇫🇷" },
};

export function isValidLocale(locale: string): locale is ValidLocale {
  return LOCALES.includes(locale.toLowerCase() as ValidLocale);
}

export function normalizeLocale(locale?: string): ValidLocale {
  if (!locale) return DEFAULT_LOCALE;
  const lower = locale.toLowerCase();
  if (lower === "pt" || lower === "pt-br" || lower === "pt_br") return "pt-br";
  if (lower.startsWith("en")) return "en";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("fr")) return "fr";
  return isValidLocale(lower) ? lower : DEFAULT_LOCALE;
}

export function getBcp47Lang(locale: ValidLocale): string {
  return LOCALE_LABELS[locale]?.bcp47 || "pt-BR";
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://foxsim.blog";

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || SITE_URL).replace(/\/$/, "");
}

/**
 * Generates hreflang alternate links for SEO metadata
 */
export function getAlternateLanguages(path: string) {
  const baseUrl = getSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedPath = cleanPath.replace(/^\/(pt-br|en|es|fr)/i, "");

  return {
    canonical: `${baseUrl}/pt-br${normalizedPath}`,
    languages: {
      "pt-BR": `${baseUrl}/pt-br${normalizedPath}`,
      en: `${baseUrl}/en${normalizedPath}`,
      es: `${baseUrl}/es${normalizedPath}`,
      fr: `${baseUrl}/fr${normalizedPath}`,
      "x-default": `${baseUrl}/pt-br${normalizedPath}`,
    },
  };
}

/**
 * Returns the localized URL for a specific path and target locale
 */
export function getLocalizedUrl(path: string, targetLocale: ValidLocale): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const pathWithoutLocale = cleanPath.replace(/^\/(pt-br|en|es|fr)/i, "");
  return `/${targetLocale}${pathWithoutLocale}`;
}

export function createPageMetadata({
  locale,
  path,
  title,
  description,
  authors,
  category,
}: {
  locale: ValidLocale;
  path: string;
  title: string;
  description: string;
  authors?: { name: string }[];
  category?: string;
}) {
  const siteUrl = getSiteUrl();
  const alternates = getAlternateLanguages(path);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const pathWithoutLocale = cleanPath.replace(/^\/(pt-br|en|es|fr)/i, "");

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    authors,
    category,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}${pathWithoutLocale}`,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}

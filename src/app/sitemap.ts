import type { MetadataRoute } from "next";
import { LOCALES, ValidLocale, getAlternateLanguages, getSiteUrl } from "@/lib/i18n";
import { getArticles } from "@/lib/translations/articles";
import { CourseCode } from "@/lib/translations/courses";
import { getGlossaryTerms } from "@/lib/translations/glossary";
import { getGuides } from "@/lib/translations/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const baseRoutes = [
    "",
    "/estudos",
    "/questoes",
    "/simulados",
    "/pomodoro",
    "/ferramentas",
    "/artigos",
    "/glossario",
    "/guias",
    "/painel",
    "/meu-progresso",
    "/sobre",
    "/contato",
    "/politica-de-privacidade",
    "/termos",
    "/cookies",
    "/disclaimer",
  ];

  const courseCodes: CourseCode[] = ["pp", "pc", "ifr", "mlte"];
  const articlesList = getArticles("pt-br");
  const glossaryList = getGlossaryTerms("pt-br");
  const guidesList = getGuides("pt-br");

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Helper to add a route with all 4 locales and hreflang alternates
  const addLocalizedEntry = (
    route: string,
    priority: number,
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  ) => {
    const alternates = getAlternateLanguages(route);

    LOCALES.forEach((locale) => {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: alternates.languages,
        },
      });
    });
  };

  // 1. Base routes
  baseRoutes.forEach((route) => {
    const priority = route === "" ? 1.0 : route.startsWith("/estudos") ? 0.9 : 0.7;
    const changeFreq = route === "" ? ("weekly" as const) : ("monthly" as const);
    addLocalizedEntry(route, priority, changeFreq);
  });

  // 2. Courses routes
  courseCodes.forEach((code) => {
    addLocalizedEntry(`/estudos/${code}`, 0.85, "monthly");
  });

  // 3. Articles routes
  articlesList.forEach((article) => {
    addLocalizedEntry(`/artigos/${article.slug}`, 0.8, "monthly");
  });

  // 4. Glossary terms routes
  glossaryList.forEach((term) => {
    addLocalizedEntry(`/glossario/${term.slug}`, 0.75, "monthly");
  });

  // 5. Pillar guides routes
  guidesList.forEach((guide) => {
    addLocalizedEntry(`/guias/${guide.slug}`, 0.9, "monthly");
  });

  return sitemapEntries;
}

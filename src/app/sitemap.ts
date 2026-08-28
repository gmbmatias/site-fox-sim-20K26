import type { MetadataRoute } from "next";
import { articles, courseList } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://foxsim.blog";
  const pages = ["", "/estudos", "/questoes", "/simulados", "/pomodoro", "/painel", "/meu-progresso", "/ferramentas", "/artigos", "/sobre", "/contato", "/politica-de-privacidade", "/termos", "/cookies", "/disclaimer"];
  const now = new Date();
  return [
    ...pages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/estudos") ? 0.9 : 0.7,
    })),
    ...courseList.map((course) => ({
      url: `${siteUrl}/estudos/${course.code}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/artigos/${article.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}


"use client";

import Link from "next/link";
import { ArrowUpRight, Clock3, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ValidLocale } from "@/lib/i18n";
import { getArticles, getArticleCategories } from "@/lib/translations/articles";
import { getUi } from "@/lib/translations/ui";

const STRINGS: Record<ValidLocale, {
  searchPlaceholder: string;
  allFilter: string;
  readTime: string;
  noResultsTitle: string;
  noResultsDesc: string;
}> = {
  "pt-br": {
    searchPlaceholder: "Buscar guia ou assunto...",
    allFilter: "Todos",
    readTime: "min de leitura",
    noResultsTitle: "Nenhum artigo encontrado",
    noResultsDesc: "Tente outro termo ou limpe o filtro de categoria.",
  },
  en: {
    searchPlaceholder: "Search guides or aviation topics...",
    allFilter: "All",
    readTime: "min read",
    noResultsTitle: "No articles found",
    noResultsDesc: "Try adjusting your search query or resetting filters.",
  },
  es: {
    searchPlaceholder: "Buscar guías o materias aeronáuticas...",
    allFilter: "Todos",
    readTime: "min de lectura",
    noResultsTitle: "No se encontraron artículos",
    noResultsDesc: "Intenta con otro término o selecciona otra categoría.",
  },
  fr: {
    searchPlaceholder: "Rechercher un guide ou sujet...",
    allFilter: "Tous",
    readTime: "min de lecture",
    noResultsTitle: "Aucun article trouvé",
    noResultsDesc: "Essayez un autre mot-clé ou effacez le filtre de catégorie.",
  },
};

export function ArticleGrid({ locale = "pt-br" }: { locale?: ValidLocale }) {
  const t = STRINGS[locale] || STRINGS["pt-br"];
  const ui = getUi(locale);
  const articles = getArticles(locale);
  const categories = getArticleCategories(locale);

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    return articles.filter((article) => {
      const matchesCat = category === "all" || article.category === category;
      const matchesSearch = `${article.title} ${article.description}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [articles, category, search]);

  return (
    <>
      <div className="article-filters">
        <div className="search-box">
          <Search size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
          />
        </div>
        <div className="category-tabs">
          <button
            className={category === "all" ? "active" : ""}
            onClick={() => setCategory("all")}
          >
            {t.allFilter}
          </button>
          {categories.map((item) => (
            <button
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="article-grid">
        {visible.map((article, index) => (
          <Link
            className="article-card"
            href={`/${locale}/artigos/${article.slug}`}
            key={article.slug}
          >
            <div className={`article-visual visual-${index % 5}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
              <b>FOX // KNOWLEDGE</b>
            </div>
            <div className="article-card-body">
              <span>{article.category}</span>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <footer>
                <small>
                  <Clock3 size={14} /> {article.readTime} {t.readTime}
                </small>
                <ArrowUpRight size={18} />
              </footer>
            </div>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="no-results">
          <b>{t.noResultsTitle}</b>
          <p>{t.noResultsDesc}</p>
        </div>
      )}
    </>
  );
}

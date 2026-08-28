"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ValidLocale } from "@/lib/i18n";
import { getArticles, getArticleCategories } from "@/lib/translations/articles";
import { getUi } from "@/lib/translations/ui";

const STRINGS: Record<ValidLocale, {
  searchPlaceholder: string;
  allFilter: string;
  readTime: string;
  showingCount: string;
  noResultsTitle: string;
  noResultsDesc: string;
  clearFilters: string;
}> = {
  "pt-br": {
    searchPlaceholder: "Buscar por guia, conceito ou tema aeronáutico (ex: METAR, IFR, Altimetria)...",
    allFilter: "Todos os assuntos",
    readTime: "min de leitura",
    showingCount: "{count} artigos e guias técnicos",
    noResultsTitle: "Nenhum artigo encontrado",
    noResultsDesc: "Tente buscar por outro termo ou selecione outra categoria temática.",
    clearFilters: "Limpar busca",
  },
  en: {
    searchPlaceholder: "Search by guide, concept or topic (e.g. METAR, IFR, Altimetry)...",
    allFilter: "All topics",
    readTime: "min read",
    showingCount: "{count} technical guides & articles",
    noResultsTitle: "No articles found",
    noResultsDesc: "Try adjusting your search query or reset category filters.",
    clearFilters: "Clear search",
  },
  es: {
    searchPlaceholder: "Buscar por guía, concepto o materia (ej: METAR, IFR, Altimetría)...",
    allFilter: "Todos los temas",
    readTime: "min de lectura",
    showingCount: "{count} guías y artículos técnicos",
    noResultsTitle: "No se encontraron artículos",
    noResultsDesc: "Intenta con otro término o selecciona otra categoría temática.",
    clearFilters: "Limpiar búsqueda",
  },
  fr: {
    searchPlaceholder: "Rechercher un guide, concept ou sujet (ex : METAR, IFR, Altimétrie)...",
    allFilter: "Tous les sujets",
    readTime: "min de lecture",
    showingCount: "{count} guides & articles techniques",
    noResultsTitle: "Aucun article trouvé",
    noResultsDesc: "Essayez un autre mot-clé ou réinitialisez les filtres de catégorie.",
    clearFilters: "Effacer la recherche",
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
    const query = search.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCat = category === "all" || article.category === category;
      const matchesSearch =
        !query ||
        `${article.title} ${article.description} ${article.category}`
          .toLowerCase()
          .includes(query);
      return matchesCat && matchesSearch;
    });
  }, [articles, category, search]);

  return (
    <div className="articles-directory-wrap">
      {/* Search & Category Filter Controls */}
      <div className="articles-controls-panel panel-card">
        <div className="articles-search-input-box">
          <Search size={18} className="articles-search-icon" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
          />
          {search && (
            <button
              type="button"
              className="articles-clear-btn"
              onClick={() => setSearch("")}
              aria-label={t.clearFilters}
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="articles-category-pills">
          <button
            type="button"
            className={category === "all" ? "category-pill-btn active" : "category-pill-btn"}
            onClick={() => setCategory("all")}
          >
            {t.allFilter}
          </button>
          {categories.map((item) => (
            <button
              type="button"
              className={category === item ? "category-pill-btn active" : "category-pill-btn"}
              onClick={() => setCategory(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="articles-stats-bar">
          <span className="articles-count-tag">
            {t.showingCount.replace("{count}", String(visible.length))}
          </span>
          {(search || category !== "all") && (
            <button
              type="button"
              className="articles-reset-link"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
            >
              {t.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* 3-Column Articles Grid */}
      {visible.length > 0 ? (
        <div className="articles-cards-grid">
          {visible.map((article, index) => (
            <Link
              className="article-card panel-card"
              href={`/${locale}/artigos/${article.slug}`}
              key={article.slug}
            >
              <div className="article-visual-band">
                <span className="article-number-badge">{String(index + 1).padStart(2, "0")}</span>
                <span className="article-brand-kicker">FOX // KNOWLEDGE</span>
              </div>
              <div className="article-card-body">
                <span className="article-category-badge">{article.category}</span>
                <h2 className="article-card-title">{article.title}</h2>
                <p className="article-card-excerpt">{article.description}</p>
                <footer className="article-card-footer">
                  <span className="article-read-time">
                    <Clock3 size={13} /> {article.readTime} {t.readTime}
                  </span>
                  <span className="article-arrow-icon">
                    <ArrowUpRight size={16} />
                  </span>
                </footer>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="articles-empty-box panel-card">
          <div className="empty-icon-ring">
            <BookOpen size={24} />
          </div>
          <h3>{t.noResultsTitle}</h3>
          <p>{t.noResultsDesc}</p>
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
          >
            {t.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}

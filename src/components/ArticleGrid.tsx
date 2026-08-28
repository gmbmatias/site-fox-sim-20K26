"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3, Search, X, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { ValidLocale } from "@/lib/i18n";
import { getArticles, getArticleCategories } from "@/lib/translations/articles";
import { getUi } from "@/lib/translations/ui";
import { soundEngine } from "./GlobalInteractivity";

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

  const handleSelectCategory = (cat: string) => {
    soundEngine.playClick();
    setCategory(cat);
  };

  const handleClear = () => {
    soundEngine.playChirp();
    setSearch("");
    setCategory("all");
  };

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
              onClick={handleClear}
              aria-label={t.clearFilters}
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="articles-category-pills" role="radiogroup" aria-label="Categorias de artigos">
          <button
            type="button"
            className={category === "all" ? "filter-pill active" : "filter-pill"}
            onClick={() => handleSelectCategory("all")}
          >
            {t.allFilter} ({articles.length})
          </button>
          {categories.map((cat) => {
            const count = articles.filter((a) => a.category === cat).length;
            return (
              <button
                type="button"
                key={cat}
                className={category === cat ? "filter-pill active" : "filter-pill"}
                onClick={() => handleSelectCategory(cat)}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Count Bar */}
        <div className="articles-stats-bar">
          <span className="articles-count-tag">
            {t.showingCount.replace("{count}", String(visible.length))}
          </span>
          {(search || category !== "all") && (
            <button
              type="button"
              className="articles-reset-link"
              onClick={handleClear}
            >
              {t.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* 3-Column Grid of Articles */}
      {visible.length === 0 ? (
        <div className="panel-card articles-empty-box">
          <BookOpen size={36} className="text-cyan mb-3" />
          <h3>{t.noResultsTitle}</h3>
          <p>{t.noResultsDesc}</p>
          <button
            type="button"
            className="button button-secondary mt-3"
            onClick={handleClear}
          >
            {t.clearFilters}
          </button>
        </div>
      ) : (
        <div className="articles-cards-grid">
          {visible.map((article, idx) => (
            <article className="article-card panel-card" key={article.slug}>
              <div className="article-visual-band">
                <span className="article-number-badge">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="article-brand-kicker">FOX SIM KNOWLEDGE</span>
              </div>
              <div className="article-card-body">
                <span className="article-category-badge">{article.category}</span>
                <h2 className="article-card-title">{article.title}</h2>
                <p className="article-card-excerpt">{article.description}</p>
                <footer className="article-card-footer">
                  <span className="article-read-time">
                    <Clock3 size={13} /> {article.readTime} {t.readTime}
                  </span>
                  <Link
                    className="button button-primary article-card-btn"
                    href={`/${locale}/artigos/${article.slug}`}
                    onClick={() => soundEngine.playClick()}
                  >
                    <span>Ler artigo</span>
                    <ArrowUpRight size={15} className="article-arrow-icon" />
                  </Link>
                </footer>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

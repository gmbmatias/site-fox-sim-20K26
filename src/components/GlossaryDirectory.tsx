"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Search, X } from "lucide-react";
import { ValidLocale } from "@/lib/i18n";
import { type GlossaryTerm } from "@/lib/translations/glossary";

interface GlossaryDirectoryProps {
  locale: ValidLocale;
  terms: GlossaryTerm[];
}

const STRINGS: Record<ValidLocale, {
  searchPlaceholder: string;
  allCategory: string;
  showingCount: string;
  noResultsTitle: string;
  noResultsDesc: string;
  clearFilters: string;
  readDetailed: string;
}> = {
  "pt-br": {
    searchPlaceholder: "Buscar por sigla, termo técnico ou conceito (ex: METAR, ILS, QNH)...",
    allCategory: "Todas as categorias",
    showingCount: "{count} termos indexados",
    noResultsTitle: "Nenhum termo encontrado",
    noResultsDesc: "Tente buscar por outra sigla ou selecione outra categoria.",
    clearFilters: "Limpar busca",
    readDetailed: "Ver explicação detalhada",
  },
  en: {
    searchPlaceholder: "Search by acronym, term or concept (e.g. METAR, ILS, QNH)...",
    allCategory: "All categories",
    showingCount: "{count} indexed terms",
    noResultsTitle: "No glossary terms found",
    noResultsDesc: "Try searching with a different keyword or reset filters.",
    clearFilters: "Clear search",
    readDetailed: "View technical breakdown",
  },
  es: {
    searchPlaceholder: "Buscar por sigla, término o concepto (ej: METAR, ILS, QNH)...",
    allCategory: "Todas las categorías",
    showingCount: "{count} términos indexados",
    noResultsTitle: "No se encontraron términos",
    noResultsDesc: "Intenta con otra sigla o selecciona otra categoría.",
    clearFilters: "Limpiar búsqueda",
    readDetailed: "Ver explicación detallada",
  },
  fr: {
    searchPlaceholder: "Rechercher par sigle, terme ou notion (ex : METAR, ILS, QNH)...",
    allCategory: "Toutes les catégories",
    showingCount: "{count} termes indexés",
    noResultsTitle: "Aucun terme trouvé",
    noResultsDesc: "Essayez avec un autre sigle ou réinitialisez les filtres.",
    clearFilters: "Effacer la recherche",
    readDetailed: "Voir l'explication complète",
  },
};

export function GlossaryDirectory({ locale = "pt-br", terms }: GlossaryDirectoryProps) {
  const t = STRINGS[locale] || STRINGS["pt-br"];
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    terms.forEach((term) => set.add(term.category));
    return Array.from(set).sort();
  }, [terms]);

  const filteredTerms = useMemo(() => {
    const query = search.trim().toLowerCase();
    return terms.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesQuery =
        !query ||
        item.term.toLowerCase().includes(query) ||
        item.slug.toLowerCase().includes(query) ||
        item.phoneticOrAcronym.toLowerCase().includes(query) ||
        item.shortDefinition.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [terms, search, selectedCategory]);

  return (
    <div className="glossary-directory-wrap">
      {/* Search & Category Filter Controls */}
      <div className="glossary-controls-panel panel-card">
        <div className="glossary-search-input-box">
          <Search size={18} className="glossary-search-icon" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
          />
          {search && (
            <button
              type="button"
              className="glossary-clear-btn"
              onClick={() => setSearch("")}
              aria-label={t.clearFilters}
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="glossary-category-pills">
          <button
            type="button"
            className={selectedCategory === "all" ? "category-pill-btn active" : "category-pill-btn"}
            onClick={() => setSelectedCategory("all")}
          >
            {t.allCategory}
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              className={selectedCategory === cat ? "category-pill-btn active" : "category-pill-btn"}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="glossary-stats-bar">
          <span className="glossary-count-tag">
            {t.showingCount.replace("{count}", String(filteredTerms.length))}
          </span>
          {(search || selectedCategory !== "all") && (
            <button
              type="button"
              className="glossary-reset-link"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
            >
              {t.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* 3-Column Glossary Cards Grid */}
      {filteredTerms.length > 0 ? (
        <div className="glossary-cards-grid">
          {filteredTerms.map((term) => (
            <article key={term.slug} className="glossary-card panel-card">
              <header className="glossary-card-header">
                <div className="glossary-card-top-meta">
                  <span className="glossary-badge">{term.category}</span>
                  {term.phoneticOrAcronym && (
                    <small className="glossary-acronym-tag">{term.phoneticOrAcronym}</small>
                  )}
                </div>
                <h2 className="glossary-card-term">
                  <Link href={`/${locale}/glossario/${term.slug}`}>{term.term}</Link>
                </h2>
              </header>
              <p className="glossary-card-def">{term.shortDefinition}</p>
              <footer className="glossary-card-footer">
                <Link href={`/${locale}/glossario/${term.slug}`} className="glossary-read-link">
                  <span>{t.readDetailed}</span>
                  <ArrowUpRight size={15} />
                </Link>
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <div className="glossary-empty-box panel-card">
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
              setSelectedCategory("all");
            }}
          >
            {t.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}

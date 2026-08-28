"use client";

import Link from "next/link";
import { ArrowUpRight, Clock3, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { articleCategories, articles } from "@/lib/content";

export function ArticleGrid() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const visible = useMemo(() => articles.filter((article) => (category === "Todos" || article.category === category) && `${article.title} ${article.description}`.toLowerCase().includes(search.toLowerCase())), [category, search]);
  return (
    <>
      <div className="article-filters"><div className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar guia ou assunto" aria-label="Buscar artigos" /></div><div className="category-tabs"><button className={category === "Todos" ? "active" : ""} onClick={() => setCategory("Todos")}>Todos</button>{articleCategories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></div>
      <div className="article-grid">{visible.map((article, index) => <Link className="article-card" href={`/artigos/${article.slug}`} key={article.slug}><div className={`article-visual visual-${index % 5}`}><span>{String(index + 1).padStart(2, "0")}</span><i /><b>FOX // KNOWLEDGE</b></div><div className="article-card-body"><span>{article.category}</span><h2>{article.title}</h2><p>{article.description}</p><footer><small><Clock3 size={14} /> {article.readTime} min de leitura</small><ArrowUpRight size={18} /></footer></div></Link>)}</div>
      {visible.length === 0 && <div className="no-results"><b>Nenhum artigo encontrado</b><p>Tente outro termo ou limpe o filtro de categoria.</p></div>}
    </>
  );
}

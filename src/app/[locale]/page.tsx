import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CheckCircle2, ChevronRight, Compass, Flame, Layers, Sparkles, Timer, Wrench, Shield, Award } from "lucide-react";
import { ValidLocale, getAlternateLanguages, getBcp47Lang, getSiteUrl, normalizeLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";
import { getCourses } from "@/lib/translations/courses";
import { getArticles } from "@/lib/translations/articles";
import { getGlossaryTerms } from "@/lib/translations/glossary";
import { getGuides } from "@/lib/translations/guides";

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
    title: `${ui.siteName} — ${ui.tagline}`,
    description: ui.description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: `${ui.siteName} — ${ui.tagline}`,
      description: ui.description,
      url: `${getSiteUrl()}/${locale}`,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);
  const courses = getCourses(locale);
  const articles = getArticles(locale).slice(0, 3);
  const glossaryTerms = getGlossaryTerms(locale).slice(0, 6);
  const guides = getGuides(locale);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-sky-grid" aria-hidden="true" />
        <div className="shell hero-layout">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="kicker-dot" />
              <span>{ui.home.heroEyebrow}</span>
            </div>
            <h1 className="hero-title">
              {ui.home.heroTitle1} <em>{ui.home.heroTitleEm}</em>
            </h1>
            <p className="hero-desc">{ui.home.heroDesc}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href={`/${locale}/estudos`}>
                {ui.home.startStudying} <span>→</span>
              </Link>
              <Link className="button button-secondary" href={`/${locale}/simulados`}>
                {ui.home.startSimulation}
              </Link>
            </div>
            <div className="hero-proof">
              <div>
                <strong>04</strong>
                <span>{ui.home.proofTracks}</span>
              </div>
              <div>
                <strong>24+</strong>
                <span>{ui.home.proofQuestions}</span>
              </div>
              <div>
                <strong>10</strong>
                <span>{ui.home.proofTools}</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="flight-deck-card">
              <div className="deck-header">
                <span>{ui.home.flightDeck}</span>
                <span className="deck-live"><i /> ONLINE</span>
              </div>
              <div className="deck-main">
                <small>{ui.home.featuredTrack}</small>
                <strong>{courses[0]?.title || "Piloto Privado"}</strong>
                <p>{courses[0]?.description}</p>
              </div>
              <div className="deck-stats">
                <div>
                  <small>STATUS</small>
                  <b>ICAO / ANAC</b>
                </div>
                <div>
                  <small>CARGA</small>
                  <b>{courses[0]?.estimatedHours} {ui.common.hours}</b>
                </div>
                <div>
                  <small>AULAS</small>
                  <b>{courses[0]?.modules.flatMap(m => m.lessons).length} {ui.home.lessonsCount}</b>
                </div>
              </div>
              <div className="deck-hud">
                <span>HDG 045°</span>
                <span>ALT 4500 FT</span>
                <span>IAS 120 KT</span>
                <span>V/S 0 FPM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="content-section">
        <div className="shell">
          <div className="section-head">
            <span className="section-kicker">{ui.home.platformKicker}</span>
            <h2>{ui.home.platformTitle}</h2>
            <p>{ui.home.platformSubtitle}</p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <span className="feature-icon"><Layers size={22} /></span>
              <h3>{ui.home.feature1Title}</h3>
              <p>{ui.home.feature1Text}</p>
              <Link href={`/${locale}/estudos`}>
                {ui.home.explore} <span>→</span>
              </Link>
            </article>

            <article className="feature-card">
              <span className="feature-icon"><CheckCircle2 size={22} /></span>
              <h3>{ui.home.feature2Title}</h3>
              <p>{ui.home.feature2Text}</p>
              <Link href={`/${locale}/questoes`}>
                {ui.home.explore} <span>→</span>
              </Link>
            </article>

            <article className="feature-card">
              <span className="feature-icon"><Timer size={22} /></span>
              <h3>{ui.home.feature3Title}</h3>
              <p>{ui.home.feature3Text}</p>
              <Link href={`/${locale}/pomodoro`}>
                {ui.home.explore} <span>→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Study Tracks Showcase */}
      <section className="content-section alternate">
        <div className="shell">
          <div className="section-head">
            <span className="section-kicker">{ui.home.coursesKicker}</span>
            <h2>{ui.home.coursesTitle}</h2>
          </div>

          <div className="courses-grid">
            {courses.map((course) => {
              const lessonsCount = course.modules.flatMap((m) => m.lessons).length;
              return (
                <article className="course-card" key={course.code}>
                  <header>
                    <span
                      className="course-badge"
                      style={{ color: course.accent, borderColor: `${course.accent}44` }}
                    >
                      {course.shortTitle}
                    </span>
                    <span className="course-hours">{course.estimatedHours} {ui.common.hours}</span>
                  </header>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span>{course.modules.length} {ui.home.modulesCount}</span>
                    <span>·</span>
                    <span>{lessonsCount} {ui.common.lessons}</span>
                    <span>·</span>
                    <span>{course.level}</span>
                  </div>
                  <Link className="course-link" href={`/${locale}/estudos/${course.code}`}>
                    {ui.common.continueStudying} <span>→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillar Guides Showcase */}
      <section className="content-section">
        <div className="shell">
          <div className="section-head">
            <span className="section-kicker">GUIAS PILARES</span>
            <h2>Guias estruturados para dominar a aviação.</h2>
            <p>Conteúdo aprofundado para estudantes, pilotos e entusiastas de simulação.</p>
          </div>

          <div className="guides-grid">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${locale}/guias/${guide.slug}`}
                className="guide-card panel-card"
              >
                <div className="guide-card-top">
                  <span className="guide-category">{guide.category}</span>
                  <span className="guide-readtime">{guide.readTime} min</span>
                </div>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <span className="guide-cta">Acessar guia completo →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Control & Tools */}
      <section className="content-section alternate">
        <div className="shell">
          <div className="mission-box">
            <div className="mission-copy">
              <span className="section-kicker">{ui.home.missionKicker}</span>
              <h2>{ui.home.missionTitle}</h2>
              <p>{ui.home.missionDesc}</p>
              <Link className="button button-primary" href={`/${locale}/ferramentas`}>
                {ui.home.openTools} <span>→</span>
              </Link>
            </div>
            <div className="mission-hud">
              <div className="hud-card">
                <Compass size={18} />
                <span>{ui.home.missionCard1}</span>
              </div>
              <div className="hud-card">
                <Wrench size={18} />
                <span>{ui.home.missionCard2}</span>
              </div>
              <div className="hud-card">
                <Flame size={18} />
                <span>{ui.home.missionCard3}</span>
              </div>
              <div className="hud-card">
                <Timer size={18} />
                <span>{ui.home.missionCard4}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aviation Glossary Teaser */}
      <section className="content-section">
        <div className="shell">
          <div className="section-head">
            <span className="section-kicker">GLOSSÁRIO AERONÁUTICO</span>
            <h2>Termos técnicos explicados com clareza.</h2>
            <p>Definições diretas, siglas e exemplos práticos para consulta rápida.</p>
          </div>

          <div className="glossary-chips-grid">
            {glossaryTerms.map((term) => (
              <Link
                key={term.slug}
                href={`/${locale}/glossario/${term.slug}`}
                className="glossary-chip panel-card"
              >
                <div className="chip-header">
                  <strong>{term.term}</strong>
                  <span className="chip-category">{term.category}</span>
                </div>
                <p>{term.shortDefinition}</p>
              </Link>
            ))}
          </div>
          <div className="glossary-more-link">
            <Link href={`/${locale}/glossario`} className="button button-secondary">
              Ver todos os termos do glossário →
            </Link>
          </div>
        </div>
      </section>

      {/* Library & Articles Section */}
      <section className="content-section alternate">
        <div className="shell">
          <div className="section-head flex-head">
            <div>
              <span className="section-kicker">{ui.home.libraryKicker}</span>
              <h2>{ui.home.libraryTitle}</h2>
            </div>
            <Link className="link-arrow" href={`/${locale}/artigos`}>
              {ui.home.exploreArticles} <span>→</span>
            </Link>
          </div>

          <div className="article-grid">
            {articles.map((article, index) => (
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
                    <small>{article.readTime} {ui.home.readTimeMin}</small>
                    <ArrowUpRight size={18} />
                  </footer>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="cta-section">
        <div className="shell">
          <div className="cta-box">
            <span className="section-kicker">{ui.home.ctaKicker}</span>
            <h2>{ui.home.ctaTitle}</h2>
            <p>{ui.home.ctaDesc}</p>
            <Link className="button button-primary" href={`/${locale}/estudos`}>
              {ui.home.chooseTrack} <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CheckCircle2, ChevronRight, Compass, Flame, Layers, Sparkles, Timer, Wrench, Shield, Award, ExternalLink } from "lucide-react";
import { ValidLocale, createPageMetadata, normalizeLocale } from "@/lib/i18n";
import { getUi } from "@/lib/translations/ui";
import { getCourses } from "@/lib/translations/courses";
import { getArticles } from "@/lib/translations/articles";
import { getGlossaryTerms } from "@/lib/translations/glossary";
import { getGuides } from "@/lib/translations/guides";
import { FlightDeckHUD } from "@/components/FlightDeckHUD";
import { DISCORD_LINK, WHATSAPP_LINK, DiscordIcon, WhatsAppIcon } from "@/components/FoxCopilotChat";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const ui = getUi(locale);

  return createPageMetadata({
    locale,
    path: "/",
    title: `${ui.siteName} — ${ui.tagline}`,
    description: ui.description,
  });
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

  const featuredCourse = courses[0] || {
    code: "pp",
    title: "Piloto Privado",
    description: "A base indispensável para compreender aerodinâmica, meteorologia, navegação e operação segura.",
    estimatedHours: 32,
    modules: [],
  };

  const featuredLessonsCount = featuredCourse.modules.flatMap((m) => m.lessons).length || 9;

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-radar-bg" aria-hidden="true" />
        <div className="shell hero-grid">
          {/* Left Column: Copy & Actions */}
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
              <div className="proof-item">
                <strong>04</strong>
                <span>{ui.home.proofTracks}</span>
              </div>
              <div className="proof-item">
                <strong>24+</strong>
                <span>{ui.home.proofQuestions}</span>
              </div>
              <div className="proof-item">
                <strong>10</strong>
                <span>{ui.home.proofTools}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Flight Deck Panel */}
          <div className="hero-visual">
            <div className="flight-deck-panel panel-card">
              <div className="deck-header">
                <span className="deck-tag">{ui.home.flightDeck}</span>
                <span className="deck-status-live">
                  <span className="live-pulse" /> ONLINE
                </span>
              </div>

              <div className="deck-featured-body">
                <span className="deck-eyebrow">{ui.home.featuredTrack}</span>
                <h3 className="deck-title">{featuredCourse.title}</h3>
                <p className="deck-desc">{featuredCourse.description}</p>
              </div>

              <div className="deck-stats-grid">
                <div className="deck-stat-col">
                  <span className="stat-label">STATUS</span>
                  <strong className="stat-value">ICAO / ANAC</strong>
                </div>
                <div className="deck-stat-col">
                  <span className="stat-label">CARGA</span>
                  <strong className="stat-value">{featuredCourse.estimatedHours} {ui.common.hours}</strong>
                </div>
                <div className="deck-stat-col">
                  <span className="stat-label">AULAS</span>
                  <strong className="stat-value">{featuredLessonsCount} {ui.home.lessonsCount}</strong>
                </div>
              </div>

              {/* Interactive Cockpit HUD with Artificial Horizon & UTC Clock */}
              <FlightDeckHUD locale={locale} />

              <div className="deck-footer-action">
                <Link className="button button-primary deck-cta" href={`/${locale}/estudos/${featuredCourse.code}`}>
                  {ui.common.continueStudying} <span>→</span>
                </Link>
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
            <article className="feature-card panel-card">
              <div className="feature-icon-box">
                <Layers size={22} />
              </div>
              <h3>{ui.home.feature1Title}</h3>
              <p>{ui.home.feature1Text}</p>
              <Link href={`/${locale}/estudos`} className="feature-link">
                {ui.home.explore} <span>→</span>
              </Link>
            </article>

            <article className="feature-card panel-card">
              <div className="feature-icon-box">
                <CheckCircle2 size={22} />
              </div>
              <h3>{ui.home.feature2Title}</h3>
              <p>{ui.home.feature2Text}</p>
              <Link href={`/${locale}/questoes`} className="feature-link">
                {ui.home.explore} <span>→</span>
              </Link>
            </article>

            <article className="feature-card panel-card">
              <div className="feature-icon-box">
                <Timer size={22} />
              </div>
              <h3>{ui.home.feature3Title}</h3>
              <p>{ui.home.feature3Text}</p>
              <Link href={`/${locale}/pomodoro`} className="feature-link">
                {ui.home.explore} <span>→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Study Tracks Showcase (2x2 Grid) */}
      <section className="content-section alternate">
        <div className="shell">
          <div className="section-head">
            <span className="section-kicker">{ui.home.coursesKicker}</span>
            <h2>{ui.home.coursesTitle}</h2>
          </div>

          <div className="course-grid-2x2">
            {courses.map((course) => {
              const lessonsCount = course.modules.flatMap((m) => m.lessons).length;
              return (
                <article className="course-compact-card panel-card" key={course.code}>
                  <div className="course-compact-header">
                    <span
                      className="course-compact-badge"
                      style={{ color: course.accent, borderColor: `${course.accent}66`, backgroundColor: `${course.accent}14` }}
                    >
                      {course.shortTitle}
                    </span>
                    <span className="course-compact-hours">{course.estimatedHours} {ui.common.hours}</span>
                  </div>
                  
                  <h3 className="course-compact-title">{course.title}</h3>
                  <p className="course-compact-desc">{course.description}</p>
                  
                  <div className="course-compact-meta">
                    <span className="meta-pill">{course.modules.length} {ui.home.modulesCount}</span>
                    <span className="meta-pill">{lessonsCount} {ui.common.lessons}</span>
                    <span className="meta-pill">{course.level}</span>
                  </div>
                  
                  <div className="course-compact-footer">
                    <Link className="course-compact-link" href={`/${locale}/estudos/${course.code}`}>
                      {ui.common.continueStudying} <span>→</span>
                    </Link>
                  </div>
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
          <div className="mission-layout">
            <div className="mission-copy">
              <span className="section-kicker">{ui.home.missionKicker}</span>
              <h2>{ui.home.missionTitle}</h2>
              <p>{ui.home.missionDesc}</p>
              <Link className="button button-primary" href={`/${locale}/ferramentas`}>
                {ui.home.openTools} <span>→</span>
              </Link>
            </div>
            
            <div className="mission-cards-grid">
              {ui.home.missionCards.map((card, idx) => {
                const icons = [
                  <Compass key="1" size={22} />,
                  <Wrench key="2" size={22} />,
                  <Flame key="3" size={22} />,
                  <Timer key="4" size={22} />,
                ];
                return (
                  <Link href={`/${locale}/ferramentas`} key={card.title} className="mission-card panel-card">
                    <div className="mission-card-icon">
                      {icons[idx]}
                    </div>
                    <div className="mission-card-content">
                      <strong>{card.title}</strong>
                      <span>{card.subtitle}</span>
                    </div>
                  </Link>
                );
              })}
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
                <span className="glossary-card-arrow">Ver explicação completa →</span>
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

      {/* Official Aviation Community Section */}
      <section className="content-section alternate">
        <div className="shell">
          <div className="section-head">
            <span className="section-kicker">COMUNIDADE AERONÁUTICA</span>
            <h2>Voe em Esquadrilha. Junte-se à nossa Comunidade.</h2>
            <p>Tire dúvidas sobre matérias da ANAC, troque experiências de simulação de voo e estude com outros comandantes.</p>
          </div>

          <div className="home-community-grid">
            <div className="community-card panel-card discord">
              <div className="community-card-icon discord">
                <DiscordIcon size={28} />
              </div>
              <div className="community-card-body">
                <span className="community-badge discord">CANAL OFICIAL DISCORD</span>
                <h3>Servidor FOX SIM</h3>
                <p>Salas de voz para voos multiplayer no MSFS e X-Plane, canais de meteorologia ao vivo e suporte para simuladores.</p>
                <a
                  href={DISCORD_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary community-btn discord"
                >
                  <DiscordIcon size={18} />
                  <span>Entrar no Discord</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="community-card panel-card whatsapp">
              <div className="community-card-icon whatsapp">
                <WhatsAppIcon size={28} />
              </div>
              <div className="community-card-body">
                <span className="community-badge whatsapp">GRUPO OFICIAL WHATSAPP</span>
                <h3>Comunidade WhatsApp</h3>
                <p>Discussões diárias sobre questões de prova, dicas rápidas de teoria de voo e avisos operacionais diretamente no seu celular.</p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary community-btn whatsapp"
                >
                  <WhatsAppIcon size={18} />
                  <span>Entrar no Grupo WhatsApp</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="cta-section">
        <div className="shell">
          <div className="cta-card panel-card">
            <div className="cta-content">
              <span className="section-kicker">{ui.home.ctaKicker}</span>
              <h2>{ui.home.ctaTitle}</h2>
              <p>{ui.home.ctaDesc}</p>
            </div>
            <div className="cta-actions">
              <Link className="button button-primary" href={`/${locale}/estudos`}>
                {ui.home.chooseTrack} <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

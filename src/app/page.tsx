import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, CheckCircle2, Clock3, Gauge, Target, TimerReset } from "lucide-react";
import { articles, courseList, questions } from "@/lib/content";

const featureCards = [
  { icon: BookOpen, code: "STUDY", title: "Trilhas que fazem sentido", text: "Módulos de PP, PC, IFR e MLTE organizados em uma sequência clara, com objetivos e progresso local.", href: "/estudos" },
  { icon: CheckCircle2, code: "CHECK", title: "Prática com explicação", text: "Questões educacionais com correção imediata, comentários e desempenho por matéria.", href: "/questoes" },
  { icon: TimerReset, code: "FOCUS", title: "Foco que vira rotina", text: "Pomodoro completo, meta diária, escolha de matéria e registro das sessões de estudo.", href: "/pomodoro" },
];

export default function Home() {
  return (
    <main>
      <section className="hero home-hero">
        <div className="radar-grid" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Plataforma de estudos em aviação</div>
            <h1>Conhecimento para<br /><em>voar mais longe.</em></h1>
            <p>Trilhas completas para PP, PC, IFR e MLTE, banco de questões, simulados e ferramentas para transformar estudo em evolução real.</p>
            <div className="hero-actions"><Link className="button button-primary" href="/estudos">Começar a estudar <ArrowRight size={17} /></Link><Link className="button button-ghost" href="/simulados">Fazer simulado</Link></div>
            <div className="hero-proof"><span><b>04</b> trilhas de formação</span><span><b>{questions.length}</b> questões comentadas</span><span><b>10</b> ferramentas práticas</span></div>
          </div>
          <div className="flight-display" aria-label="Prévia do painel de estudos">
            <div className="display-topline"><span>FOX // STUDY DECK</span><span className="live-dot">ONLINE</span></div>
            <div className="display-main"><div><small>TRILHA EM DESTAQUE</small><strong>Voo por Instrumentos</strong><p>Varredura · navegação · procedimentos</p></div><div className="progress-orbit"><span>03<small> módulos</small></span></div></div>
            <div className="display-metrics"><div><small>AULAS</small><b>09</b></div><div><small>ESTIMATIVA</small><b>38h</b></div><div><small>NÍVEL</small><b>IFR</b></div></div>
            <div className="display-route"><span className="route-point active" /><i /><span className="route-point" /><i /><span className="route-point" /><p><b>PAINEL</b><b>RADIONAV</b><b>PROCED.</b></p></div>
          </div>
        </div>
        <a className="scroll-cue" href="#plataforma"><span /> Conheça a plataforma</a>
      </section>

      <section className="home-section" id="plataforma">
        <div className="shell">
          <div className="section-heading"><div><span className="section-kicker">UMA PLATAFORMA, TODO O FLUXO</span><h2>Estude. Pratique. Meça.<br />Continue evoluindo.</h2></div><p>Menos tempo decidindo o que fazer. Mais tempo construindo conhecimento que permanece.</p></div>
          <div className="feature-grid">{featureCards.map(({ icon: Icon, ...feature }, index) => <Link href={feature.href} className="feature-card" key={feature.code}><header><span>{String(index + 1).padStart(2, "0")}</span><b>{feature.code}</b></header><Icon size={28} /><h3>{feature.title}</h3><p>{feature.text}</p><footer>Explorar <ArrowRight size={16} /></footer></Link>)}</div>
        </div>
      </section>

      <section className="home-section courses-section">
        <div className="shell">
          <div className="section-heading compact"><div><span className="section-kicker">TRILHAS DE FORMAÇÃO</span><h2>Seu próximo nível começa aqui.</h2></div><Link href="/estudos">Ver todas as trilhas <ArrowRight size={16} /></Link></div>
          <div className="course-grid">{courseList.map((course, index) => { const lessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0); return <Link href={`/estudos/${course.code}`} className="course-card" key={course.code} style={{ "--course-accent": course.accent } as React.CSSProperties}><div className="course-card-top"><span>{String(index + 1).padStart(2, "0")}</span><b>{course.shortTitle}</b></div><div><small>{course.level}</small><h3>{course.title}</h3><p>{course.description}</p></div><footer><span><BookOpen size={15} /> {lessons} aulas</span><span><Clock3 size={15} /> {course.estimatedHours}h</span><ArrowRight size={18} /></footer></Link>; })}</div>
        </div>
      </section>

      <section className="mission-section">
        <div className="mission-grid" aria-hidden="true" />
        <div className="shell mission-layout"><div><span className="section-kicker">MISSION CONTROL</span><h2>Ferramentas para o estudo sair do papel.</h2><p>Planeje uma descida, converta unidades, calcule vento cruzado e organize seu foco sem sair da FOX SIM.</p><Link href="/ferramentas" className="button button-primary">Abrir ferramentas <ArrowRight size={16} /></Link></div><div className="mission-console"><div><Calculator size={22} /><span>CONVERSORES</span><b>NM · FT · KT · °C</b></div><div><Gauge size={22} /><span>PLANEJAMENTO</span><b>TOD · RAZÃO · AUTONOMIA</b></div><div><Target size={22} /><span>CONDIÇÕES</span><b>UTC · VENTO CRUZADO</b></div><div><TimerReset size={22} /><span>FOCO</span><b>POMODORO · METAS</b></div></div></div>
      </section>

      <section className="home-section">
        <div className="shell"><div className="section-heading compact"><div><span className="section-kicker">BIBLIOTECA FOX SIM</span><h2>Guias para consultar e voltar.</h2></div><Link href="/artigos">Explorar {articles.length} artigos <ArrowRight size={16} /></Link></div><div className="home-articles">{articles.slice(0, 3).map((article, index) => <Link href={`/artigos/${article.slug}`} key={article.slug}><span>0{index + 1} / {article.category}</span><h3>{article.title}</h3><p>{article.description}</p><footer>{article.readTime} min de leitura <ArrowRight size={16} /></footer></Link>)}</div></div>
      </section>

      <section className="home-cta"><div className="shell"><div><span className="section-kicker">PRONTO PARA COMEÇAR?</span><h2>Seu estudo merece um plano de voo.</h2><p>Escolha uma trilha, registre seu progresso e transforme cada sessão em um passo adiante.</p></div><div><Link className="button button-primary" href="/estudos">Escolher trilha <ArrowRight size={16} /></Link><Link className="button button-ghost" href="/painel">Abrir meu painel</Link></div></div></section>
    </main>
  );
}

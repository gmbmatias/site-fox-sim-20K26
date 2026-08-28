import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand" href="/"><span className="brand-mark">F</span><span>FOX SIM</span></Link>
          <p>Estudo de aviação e simulação com método, ferramentas práticas e evolução no seu ritmo.</p>
          <span className="educational-label">Conteúdo educacional · não substitui publicações oficiais</span>
        </div>
        <div>
          <b>Aprender</b>
          <Link href="/estudos">Trilhas de estudo</Link><Link href="/questoes">Banco de questões</Link><Link href="/simulados">Simulados</Link><Link href="/artigos">Artigos</Link>
        </div>
        <div>
          <b>Ferramentas</b>
          <Link href="/pomodoro">Pomodoro</Link><Link href="/ferramentas">Calculadoras</Link><Link href="/painel">Meu painel</Link><Link href="/meu-progresso">Meu progresso</Link>
        </div>
        <div>
          <b>FOX SIM</b>
          <Link href="/sobre">Sobre</Link><Link href="/contato">Contato</Link><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos">Termos</Link><Link href="/cookies">Cookies</Link><Link href="/disclaimer">Disclaimer</Link>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} FOX SIM.</span><span>Feito para quem estuda o céu.</span></div>
    </footer>
  );
}

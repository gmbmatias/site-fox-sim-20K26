import Link from "next/link";
export default function NotFound() { return <main className="not-found"><div className="radar-grid" /><div><span>404 // FORA DA ROTA</span><h1>Página não encontrada.</h1><p>O endereço pode ter mudado ou nunca ter existido. Retorne ao portal e escolha um novo caminho.</p><Link className="button button-primary" href="/">Voltar ao início →</Link></div></main>; }

import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="shell not-found-layout">
        <div className="panel-card not-found-card">
          <div className="not-found-icon">
            <Compass size={40} />
          </div>
          <span className="section-kicker">ERRO 404 · ROTA FORA DO PLANO DE VOO</span>
          <h1>Página não encontrada</h1>
          <p>
            A coordenada solicitada não existe ou foi movida. Verifique o link digitado ou retorne
            para a página inicial.
          </p>
          <div className="not-found-actions">
            <Link href="/pt-br" className="button button-primary">
              <ArrowLeft size={16} /> Voltar para o início
            </Link>
            <Link href="/pt-br/estudos" className="button button-secondary">
              Ver trilhas de estudo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

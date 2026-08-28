import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Entenda o uso de cookies, publicidade do Google AdSense e armazenamento local no portal FOX SIM.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="PREFERÊNCIAS"
      title="Política de cookies"
      description="Como cookies e armazenamento local são utilizados e como gerenciar suas opções."
      path="/cookies"
      sections={[
        {
          title: "Armazenamento Essencial e Preferências Locais",
          paragraphs: [
            "A FOX SIM utiliza LocalStorage no seu navegador para salvar seu progresso nas aulas, respostas dos simulados, metas do Pomodoro e a confirmação do banner de privacidade. Esses itens são essenciais para manter sua experiência de estudo salva no seu dispositivo sem a necessidade de login.",
          ],
        },
        {
          title: "Cookies de Publicidade do Google AdSense",
          paragraphs: [
            "Para manter o portal gratuito e acessível a estudantes e entusiastas de aviação, utilizamos o Google AdSense. O Google e seus parceiros podem configurar cookies no seu navegador para exibir anúncios relevantes e medir o desempenho das campanhas.",
            "Esses cookies ajudam a identificar se um anúncio já foi exibido e a adequar a publicidade aos interesses do usuário de forma segura.",
          ],
        },
        {
          title: "Como Gerenciar ou Desativar Cookies",
          paragraphs: [
            "Você pode desativar cookies de publicidade personalizada diretamente nas Configurações de Anúncios do Google (https://www.google.com/settings/ads) ou por meio do site www.aboutads.info.",
            "Também é possível configurar seu navegador para bloquear, recusar ou excluir todos os cookies e limpar os dados de armazenamento local nas opções de privacidade do navegador.",
          ],
        },
      ]}
    />
  );
}

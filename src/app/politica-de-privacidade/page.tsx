import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a FOX SIM trata preferências, cookies, publicidade do Google AdSense e dados técnicos.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="PRIVACIDADE"
      title="Política de privacidade"
      description="Transparência sobre informações locais, publicidade, cookies do Google AdSense e seus controles."
      path="/politica-de-privacidade"
      sections={[
        {
          title: "Escopo",
          paragraphs: [
            "Esta política descreve o funcionamento do portal FOX SIM. O site oferece conteúdo educacional, questões, simulados, Pomodoro e ferramentas de apoio aos estudos de aviação e simulação de voo.",
          ],
        },
        {
          title: "Dados salvos no dispositivo",
          paragraphs: [
            "Progresso de aulas, respostas de simulados, metas e sessões Pomodoro são armazenados localmente no navegador (LocalStorage) para manter sua continuidade de estudo. Esses dados não são transferidos a bancos de dados externos da FOX SIM.",
          ],
          bullets: [
            "Você pode apagar esses dados limpando o armazenamento do navegador a qualquer momento.",
            "Navegadores ou dispositivos diferentes mantêm históricos independentes.",
            "Sessões em janela anônima ou privada são descartadas ao fechar a janela.",
          ],
        },
        {
          title: "Publicidade do Google AdSense e Cookies de Terceiros",
          paragraphs: [
            "O portal FOX SIM utiliza o Google AdSense para veiculação de anúncios publicitários. Fornecedores terceiros, incluindo o Google, utilizam cookies para veicular anúncios com base em visitas anteriores do usuário a este ou a outros sites na Internet.",
            "O uso de cookies de publicidade pelo Google permite que ele e seus parceiros exibam anúncios para os usuários com base em visitas feitas à FOX SIM e/ou a outros sites na web.",
            "Você pode desativar a publicidade personalizada a qualquer momento visitando as Configurações de Anúncios do Google (https://www.google.com/settings/ads) ou acessando o portal www.aboutads.info para desativar o uso de cookies de terceiros em publicidade direcionada.",
          ],
          bullets: [
            "Configurações de Anúncios do Google: https://www.google.com/settings/ads",
            "Desativação de cookies de publicidade de terceiros: https://www.aboutads.info/choices/",
          ],
        },
        {
          title: "Dados técnicos de hospedagem e segurança",
          paragraphs: [
            "A infraestrutura de servidores e CDN pode coletar registros técnicos padrão (como endereço IP, tipo de navegador, páginas acessadas e data/hora) para fins estritos de segurança, integridade, mitigação de abusos e entrega otimizada de conteúdo.",
          ],
        },
        {
          title: "Seus direitos e controles",
          paragraphs: [
            "Você pode ajustar as configurações do seu navegador para bloquear ou excluir cookies, gerenciar preferências no banner de consentimento e utilizar ferramentas de privacidade para navegar sem personalização de anúncios.",
          ],
        },
        {
          title: "Atualizações desta política",
          paragraphs: [
            "Esta política pode ser periodicamente revisada para refletir mudanças em funcionalidades, requisitos regulatórios ou diretrizes de serviços de terceiros.",
          ],
        },
      ]}
    />
  );
}

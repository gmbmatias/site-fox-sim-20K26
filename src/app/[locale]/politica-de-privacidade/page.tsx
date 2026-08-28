import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { ValidLocale, getAlternateLanguages, normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  const alternates = getAlternateLanguages("/politica-de-privacidade");

  return {
    title: "Política de Privacidade e Proteção de Dados",
    description: "Saiba como a FOX SIM coleta, utiliza e protege suas informações de navegação, cookies e Google AdSense.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);

  return (
    <LegalPage
      eyebrow="PRIVACIDADE E LGPD / GDPR"
      title="Política de Privacidade"
      description="Transparência total sobre a coleta de dados, armazenamento local, publicidade e seus direitos como usuário."
      path={`/${locale}/politica-de-privacidade`}
      sections={[
        {
          title: "1. Introdução e Compromisso",
          paragraphs: [
            "A FOX SIM (https://foxsim.blog) valoriza e respeita a privacidade de todos os seus visitantes. Esta Política de Privacidade descreve as práticas de tratamento de dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), o Regulamento Geral sobre a Proteção de Dados da União Europeia (GDPR) e as políticas de consentimento do Google.",
          ],
        },
        {
          title: "2. Dados Coletados e Armazenamento Local",
          paragraphs: [
            "A FOX SIM não exige cadastro obrigatório para acesso aos conteúdos educacionais. Para oferecer uma experiência personalizada sem necessidade de login em servidores remotos, utilizamos o armazenamento local do seu navegador (LocalStorage) para salvar:",
          ],
          bullets: [
            "Progresso de conclusão das aulas em cada módulo (PP, PC, IFR, Multimotor).",
            "Histórico de questões resolvidas e pontuação em simulados cronometrados.",
            "Registros de sessões e meta diária do temporizador Pomodoro.",
            "Preferências de consentimento de cookies selecionadas no banner.",
          ],
        },
        {
          title: "3. Google AdSense e Cookies de Publicidade",
          paragraphs: [
            "Utilizamos o serviço Google AdSense para veiculação de anúncios publicitários. O Google e seus parceiros terceirizados utilizam cookies (como o cookie DoubleClick) para exibir anúncios relevantes com base em visitas anteriores dos usuários a este e a outros sites na internet.",
            "Usuários no Espaço Econômico Europeu (EEE), no Reino Unido e na Suíça têm controle total para conceder ou revogar seu consentimento para publicidade personalizada a qualquer momento através do nosso Centro de Preferências de Privacidade (link 'Gerenciar cookies' no rodapé).",
            "Você também pode desativar a publicidade personalizada visitando as Configurações de Anúncios do Google (adssettings.google.com) ou através do portal optout.aboutads.info.",
          ],
        },
        {
          title: "4. Ferramentas de Análise (Google Analytics)",
          paragraphs: [
            "Podemos utilizar ferramentas de métricas anônimas (como Google Analytics 4) para mensurar o volume de acessos às páginas, tempo de permanência e erros de navegação. Nenhum dado de identificação individual é coletado ou vendido.",
          ],
        },
        {
          title: "5. Direitos do Usuário e Contato",
          paragraphs: [
            "Como titular de dados, você tem o direito de solicitar esclarecimentos sobre o tratamento de informações através do e-mail gustavomatiasbernardo2@gmail.com ou contato@foxsim.blog. Para apagar todo o seu progresso local armazenado no navegador, basta limpar os dados do site nas configurações do seu navegador.",
          ],
        },
      ]}
    />
  );
}

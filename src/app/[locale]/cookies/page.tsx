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
  const alternates = getAlternateLanguages("/cookies");

  return {
    title: "Política de Cookies e Consentimento",
    description: "Entenda detalhadamente como os cookies, LocalStorage e identificadores são utilizados na FOX SIM.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function CookiesPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);

  return (
    <LegalPage
      eyebrow="TRANSPARÊNCIA"
      title="Política de Cookies"
      description="Como utilizamos cookies, armazenamento local e como você pode gerenciar suas preferências a qualquer momento."
      path={`/${locale}/cookies`}
      sections={[
        {
          title: "1. O que são Cookies e Armazenamento Local?",
          paragraphs: [
            "Cookies são pequenos arquivos de texto baixados no seu dispositivo quando você visita um site. Além dos cookies tradicionais, a FOX SIM utiliza a tecnologia LocalStorage do HTML5 para manter suas configurações e registros de estudos salvos diretamente no seu computador ou celular.",
          ],
        },
        {
          title: "2. Categorias de Cookies Utilizadas",
          paragraphs: [
            "Classificamos as ferramentas de armazenamento e cookies nas seguintes categorias transparentes:",
          ],
          bullets: [
            "Cookies Estritamente Necessários: Mantêm as funcionalidades fundamentais ativas, como o salvamento de aulas concluídas, progresso em simulados e estado do banner de consentimento.",
            "Cookies de Desempenho e Métricas: Registram métricas agregadas anônimas para identificar as páginas mais úteis e aprimorar a velocidade do site.",
            "Cookies de Publicidade (Google AdSense): Utilizados pelo Google e fornecedores autorizados para fornecer anúncios relevantes e limitar a repetição de publicidade.",
          ],
        },
        {
          title: "3. Como Gerenciar Suas Preferências",
          paragraphs: [
            "Você pode alterar suas escolhas de consentimento a qualquer instante clicando no botão 'Preferências de cookies' localizado no rodapé de qualquer página da FOX SIM.",
          ],
        },
      ]}
    />
  );
}

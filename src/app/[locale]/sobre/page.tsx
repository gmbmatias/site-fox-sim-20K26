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
  const alternates = getAlternateLanguages("/sobre");

  return {
    title: "Sobre a FOX SIM",
    description: "Conheça a missão da FOX SIM: democratizar o conhecimento aeronáutico e elevar a simulação de voo a um nível de excelência.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);

  return (
    <LegalPage
      eyebrow="INSTITUCIONAL"
      title="Sobre a FOX SIM"
      description="Conhecimento técnico, ferramentas práticas e método para quem estuda o céu."
      path={`/${locale}/sobre`}
      sections={[
        {
          title: "Nossa Missão",
          paragraphs: [
            "A FOX SIM nasceu para preencher a lacuna entre o estudo teórico de aviação e a prática operacional moderna em simuladores de voo.",
            "Nosso objetivo é fornecer uma plataforma aberta, rigorosa e agradável onde pilotos estudantes, aviadores comerciais e entusiastas de simulação possam consolidar conceitos sem barreiras de acesso.",
          ],
        },
        {
          title: "Pilares Educacionais",
          paragraphs: [
            "Acreditamos no estudo ativo: não basta memorizar regras; é necessário compreender os princípios físicos da aerodinâmica, a dinâmica da atmosfera e a geometria da navegação aérea.",
          ],
          bullets: [
            "Trilhas estruturadas do básico ao avançado (PP, PC, IFR, Multimotor).",
            "Banco de questões comentadas com explicações que ensinam o raciocínio.",
            "Calculadoras aeronáuticas rápidas para planejamento e conferência.",
            "Artigos e glossários fundamentados nos padrões ICAO e ANAC.",
          ],
        },
        {
          title: "Compromisso com a Segurança",
          paragraphs: [
            "Toda a produção de conteúdo da FOX SIM valoriza a cultura de segurança operacional, o gerenciamento de recursos de tripulação (CRM) e o gerenciamento de ameaças e erros (TEM).",
          ],
        },
      ]}
    />
  );
}

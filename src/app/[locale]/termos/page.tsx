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
  const alternates = getAlternateLanguages("/termos");

  return {
    title: "Termos de Uso",
    description: "Termos e condições de uso da plataforma educacional de aviação FOX SIM.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);

  return (
    <LegalPage
      eyebrow="TERMOS E CONDIÇÕES"
      title="Termos de Uso"
      description="Regras de utilização dos conteúdos, simuladores, ferramentas e recursos da FOX SIM."
      path={`/${locale}/termos`}
      sections={[
        {
          title: "1. Finalidade Exclusivamente Educacional",
          paragraphs: [
            "A FOX SIM é uma plataforma voltada exclusivamente para o aprendizado teórico e simulação de voo. Os conteúdos, calculadoras, trilhas e questões não substituem publicações aeronáuticas oficiais vigentes (AIP, ROTAER, NOTAM) nem o treinamento ministrado por Centros de Instrução de Aviação Civil (CIAC) homologados.",
          ],
        },
        {
          title: "2. Propriedade Intelectual",
          paragraphs: [
            "A estrutura do site, o código-fonte, os textos dos artigos e as questões comentadas são protegidos pela legislação de direitos autorais. É proibida a reprodução comercial sem prévia autorização por escrito.",
          ],
        },
        {
          title: "3. Limitação de Responsabilidade",
          paragraphs: [
            "Os desenvolvedores da FOX SIM não se responsabilizam por decisões operacionais tomadas no planejamento ou condução de voos reais com base nos cálculos ou informações da plataforma.",
          ],
        },
      ]}
    />
  );
}

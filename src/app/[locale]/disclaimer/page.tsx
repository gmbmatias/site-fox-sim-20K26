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
  const alternates = getAlternateLanguages("/disclaimer");

  return {
    title: "Aviso Legal e Educacional (Disclaimer)",
    description: "Declaração de responsabilidade sobre a natureza exclusivamente educacional da plataforma FOX SIM.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);

  return (
    <LegalPage
      eyebrow="AVISO IMPORTANTE"
      title="Aviso Legal e Educacional"
      description="Declaração explícita sobre a finalidade de estudo e limites operacionais da FOX SIM."
      path={`/${locale}/disclaimer`}
      sections={[
        {
          title: "1. Finalidade Educacional e de Simulação",
          paragraphs: [
            "A FOX SIM é um portal de apoio ao estudo e simulação de voo. Todos os cálculos (como Top of Descent, componentes de vento e conversões), artigos, resumos e questões comentadas são disponibilizados exclusivamente para fins didáticos.",
          ],
        },
        {
          title: "2. Não Substituição de Manuais Oficiais",
          paragraphs: [
            "Nenhuma informação deste portal substitui publicações de informações aeronáuticas oficiais vigentes (AIP, AIC, ROTAER, NOTAM, cartas DECEA/FAA/Jeppesen), nem os manuais de voo da aeronave (AFM/POH) ou o julgamento profissional de um piloto habilitado em comando.",
          ],
        },
        {
          title: "3. Simulação de Voo Virtual",
          paragraphs: [
            "Módulos e guias voltados para softwares como Microsoft Flight Simulator, X-Plane, Prepar3D e redes online (VATSIM, IVAO) buscam reproduzir com alta fidelidade a operação aeronáutica, mas operam sob as regras específicas dessas redes virtuais.",
          ],
        },
      ]}
    />
  );
}

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
  const alternates = getAlternateLanguages("/contato");

  return {
    title: "Contato e Suporte",
    description: "Entre em contato com a equipe FOX SIM para dúvidas, sugestões editoriais e parcerias.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);

  return (
    <LegalPage
      eyebrow="COMUNICAÇÃO"
      title="Contato e Suporte"
      description="Canais oficiais de atendimento, dúvidas pedagógicas e parcerias com a FOX SIM."
      path={`/${locale}/contato`}
      sections={[
        {
          title: "Canais de Atendimento",
          paragraphs: [
            "Para entrar em contato com a equipe de desenvolvimento, sugestões de novos artigos ou reporte de correções técnicas em questões, utilize os canais abaixo:",
          ],
          bullets: [
            "E-mail institucional: contato@foxsim.blog",
            "Suporte técnico e parcerias: gustavomatiasbernardo2@gmail.com",
            "Repositório oficial: github.com/gmbmatias/site-fox-sim-20K26",
          ],
        },
        {
          title: "Sugestões e Contribuições Editoriais",
          paragraphs: [
            "Nosso banco de questões e biblioteca de artigos são atualizados continuamente. Caso encontre alguma divergência em publicações aeronáuticas recentes (ICAO/ANAC), envie-nos sua observação detalhada para pronta revisão.",
          ],
        },
      ]}
    />
  );
}

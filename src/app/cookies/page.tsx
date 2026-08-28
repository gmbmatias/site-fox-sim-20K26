import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Política de cookies", description: "Entenda o uso de LocalStorage e preferências no portal FOX SIM.", alternates: { canonical: "/cookies" } };
export default function CookiesPage() { return <LegalPage eyebrow="PREFERÊNCIAS" title="Política de cookies" description="O que fica salvo no navegador e como gerenciar suas escolhas." path="/cookies" sections={[
  { title: "Tecnologias usadas", paragraphs: ["No lançamento inicial, a FOX SIM usa principalmente LocalStorage, e não cookies de publicidade, para guardar progresso, resultados, metas e a escolha exibida no banner."] },
  { title: "Armazenamento essencial", paragraphs: ["A preferência do banner evita mostrar a mesma mensagem em todas as visitas. O progresso local permite retomar aulas, histórico e Pomodoro no mesmo navegador."] },
  { title: "Publicidade futura", paragraphs: ["O código do AdSense só é carregado quando um identificador real é configurado. Antes de ativar publicidade que use cookies ou identificadores, será necessário aplicar consentimento compatível e atualizar esta política."] },
  { title: "Como apagar", paragraphs: ["Abra as configurações de privacidade do navegador, localize os dados do site FOX SIM e remova-os. Isso reinicia painel, metas, histórico e preferências neste dispositivo."] },
]} />; }

import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Termos de uso", description: "Condições de uso do conteúdo e das ferramentas da FOX SIM.", alternates: { canonical: "/termos" } };
export default function TermsPage() { return <LegalPage eyebrow="CONDIÇÕES" title="Termos de uso" description="Regras simples para usar a FOX SIM de forma consciente e responsável." path="/termos" sections={[
  { title: "Aceitação", paragraphs: ["Ao utilizar o portal, você concorda com estes termos e com a política de privacidade. Se não concordar, interrompa o uso."] },
  { title: "Finalidade educacional", paragraphs: ["O conteúdo apoia estudo e simulação. Não substitui instrução de voo, regulamentos, cartas, NOTAM, manuais aprovados, dados de performance ou decisão de um profissional habilitado."] },
  { title: "Questões e simulados", paragraphs: ["As questões são elaboradas pela FOX SIM com base nos conceitos apresentados. Não são apresentadas como questões oficiais da ANAC e não garantem aprovação em exame."] },
  { title: "Ferramentas", paragraphs: ["Conversores e calculadoras produzem estimativas. O usuário deve conferir fórmulas, unidades, arredondamentos e dados aprovados antes de qualquer aplicação fora do estudo ou da simulação."] },
  { title: "Uso permitido", paragraphs: ["Você pode consultar e compartilhar links para fins pessoais e educacionais."], bullets: ["Não tente comprometer o site ou outros usuários.", "Não apresente o conteúdo como certificação oficial.", "Não copie integralmente o portal para exploração comercial sem autorização."] },
  { title: "Disponibilidade e mudanças", paragraphs: ["Funcionalidades podem ser corrigidas, alteradas ou interrompidas. Empregamos esforço razoável de qualidade, mas não prometemos disponibilidade ininterrupta ou ausência absoluta de erros."] },
]} />; }

import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Disclaimer educacional", description: "Limites do conteúdo educacional e das calculadoras da FOX SIM.", alternates: { canonical: "/disclaimer" } };
export default function DisclaimerPage() { return <LegalPage eyebrow="AVISO IMPORTANTE" title="Disclaimer educacional" description="A diferença entre aprender na plataforma e tomar uma decisão operacional real." path="/disclaimer" sections={[
  { title: "Não é instrução oficial", paragraphs: ["A FOX SIM é um portal independente de estudos e aviação virtual. Não representa ANAC, DECEA, fabricantes, operadores, IVAO, VATSIM, Microsoft, Laminar Research ou Lockheed Martin."] },
  { title: "Operação real", paragraphs: ["Nenhuma página deve ser usada como única fonte para planejar ou conduzir um voo real. Use regulamentação e informação aeronáutica vigentes, manuais aprovados, meteorologia oficial e orientação de profissionais habilitados."] },
  { title: "Simuladores e redes", paragraphs: ["Nomes e marcas identificam plataformas e comunidades citadas em contexto informativo. Procedimentos de cada rede e produto podem mudar; consulte seus canais oficiais."] },
  { title: "Exatidão e atualização", paragraphs: ["Revisamos o material com cuidado, porém podem existir erros ou conteúdo desatualizado. Relate correções com uma fonte verificável pela página de contato."] },
]} />; }

import { ValidLocale } from "../i18n";

export type PillarGuide = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  accent: string;
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  author: string;
  summary: string;
  targetAudience: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
    linkedResources?: { label: string; url: string }[];
  }[];
  faqList?: { question: string; answer: string }[];
};

export const GUIDES_DATA: Record<ValidLocale, PillarGuide[]> = {
  "pt-br": [
    {
      slug: "guia-piloto-privado",
      title: "Guia Completo de Piloto Privado: Teoria, Prova e Prática",
      shortTitle: "Guia Piloto Privado",
      description: "O mapa definitivo para quem está iniciando na aviação: matérias da banca teórica, aerodinâmica, meteorologia, navegação e dicas de estudo ativo.",
      category: "Formação Básica",
      accent: "#5de4df",
      readTime: 12,
      publishedAt: "2026-03-01T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Equipe Editorial FOX SIM",
      targetAudience: "Estudantes de aviação, candidatos à banca de PP da ANAC e entusiastas de simulação de voo.",
      summary: "Tudo o que você precisa saber para construir uma base sólida no curso de Piloto Privado, dominar as matérias essenciais e conquistar sua aprovação teórica.",
      sections: [
        {
          heading: "1. As 5 Matérias Fundamentais do Piloto Privado",
          paragraphs: [
            "A formação teórica de Piloto Privado é estruturada sobre cinco pilares: Teoria de Voo (Aerodinâmica), Meteorologia Aeronáutica, Navegação Aérea, Regulamentos de Tráfego Aéreo e Conhecimentos Técnicos de Aeronaves.",
            "Cada matéria constrói um modelo mental indispensável: a teoria explica por que o avião voa, a meteorologia avalia o ambiente da atmosfera, a navegação orienta a trajetória no espaço, os regulamentos garantem a convivência segura e os conhecimentos técnicos permitem operar os sistemas sem exceder limites.",
          ],
          bulletPoints: [
            "Teoria de Voo: Sustentação, arrasto, estol, eixos e estabilidade.",
            "Meteorologia: Pressão, nuvens, frentes, METAR e TAF.",
            "Navegação: Cartas, rumos, ventos, deriva e altimetria.",
            "Regulamentos: Espaço aéreo, regras do ar (VFR) e separação.",
            "Conhecimentos Técnicos: Motores a pistão, sistemas elétricos e instrumentos.",
          ],
        },
        {
          heading: "2. Como Estruturar sua Rotina de Estudos",
          paragraphs: [
            "Evite o erro comum de apenas reler apostilas passivamente. O aprendizado sólido em aviação é construído pela combinação de leitura focada (Pomodoro), resolução diária de questões comentadas e aplicação prática em simuladores de voo.",
          ],
          linkedResources: [
            { label: "Trilha de Piloto Privado da FOX SIM", url: "/estudos/pp" },
            { label: "Banco de Questões Comentadas", url: "/questoes" },
            { label: "Temporizador Pomodoro de Foco", url: "/pomodoro" },
          ],
        },
      ],
      faqList: [
        { question: "Quantas questões tem o exame teórico de Piloto Privado?", answer: "No Brasil (ANAC), a prova contém 20 questões por matéria (totalizando 100 questões), exigindo aproveitamento mínimo de 70% em cada uma das 5 matérias." },
        { question: "O simulador de voo ajuda no estudo teórico?", answer: "Sim. Praticar varredura de instrumentos, atitudes, navegação e leitura de cartas em simuladores modernos como MSFS ou X-Plane fixa os conceitos teóricos com velocidade muito superior à leitura isolada." },
      ],
    },
    {
      slug: "guia-ifr-voo-instrumentos",
      title: "Guia Definitivo de Voo por Instrumentos (IFR): Da Varredura aos Mínimos",
      shortTitle: "Guia de IFR",
      description: "Domine a disciplina de painel, radionavegação VOR/ILS, cartas SID/STAR/IAC, performance PBN/RNP e aproximações de precisão.",
      category: "Especialização",
      accent: "#8ab4f8",
      readTime: 14,
      publishedAt: "2026-03-10T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Equipe Editorial FOX SIM",
      targetAudience: "Pilotos em fase de habilitação IFR, estudantes de Piloto Comercial e comandantes virtuais em redes VATSIM/IVAO.",
      summary: "O guia técnico mais completo para compreender a sistemática do voo IFR, leitura de cartas ICAO e voo sem visibilidade externa.",
      sections: [
        {
          heading: "1. O Método Fundamental da Pilotagem IFR",
          paragraphs: [
            "No voo IFR, a visão externa é substituída pela leitura contínua e disciplinada do painel de instrumentos através da equação Atitude + Potência = Desempenho.",
            "Dominar o escaneamento dos instrumentos do 'T básico' ou das telas PFD evita a desorientação espacial e garante que desvios sejam corrigidos antes de comprometerem a segurança.",
          ],
        },
        {
          heading: "2. Cartas e Procedimentos Padronizados",
          paragraphs: [
            "Um voo IFR de sucesso é executado em fases: saída (SID), rota de aerovia, chegada padronizada (STAR) e aproximação final de precisão (ILS) ou não-precisão (RNP/RNAV/VOR).",
          ],
          linkedResources: [
            { label: "Artigo: Entendendo o ILS", url: "/artigos/entendendo-ils" },
            { label: "Artigo: Guia de SID e STAR", url: "/artigos/sid-e-star" },
            { label: "Trilha IFR na FOX SIM", url: "/estudos/ifr" },
          ],
        },
      ],
      faqList: [
        { question: "O que é DA e MDA no voo por instrumentos?", answer: "DA (Decision Altitude) é a altitude de decisão em aproximações de precisão (ILS); MDA (Minimum Descent Altitude) é a altitude mínima de descida em aproximações de não-precisão (VOR, RNAV LNAV)." },
      ],
    },
    {
      slug: "guia-meteorologia-aeronautica",
      title: "Guia de Meteorologia Aeronáutica: METAR, TAF, Frentes e Segurança",
      shortTitle: "Guia de Meteorologia",
      description: "Aprenda a analisar as condições atmosféricas, interpretar cartas de vento e tempo significativo, decodificar mensagens e antecipar perigos operacionais.",
      category: "Meteorologia",
      accent: "#f4a261",
      readTime: 12,
      publishedAt: "2026-03-20T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Equipe Editorial FOX SIM",
      targetAudience: "Pilotos VFR e IFR, despachantes operacionais e entusiastas de simulação de voo.",
      summary: "Compreenda a atmosfera real, sistemas frontais, nevoeiros, trovoadas e cartas sinóticas de maneira prática e visual.",
      sections: [
        {
          heading: "1. A Dinâmica da Atmosfera para o Piloto",
          paragraphs: [
            "A atmosfera nunca é estática. A variação de calor solar sobre a superfície terrestre cria gradientes de pressão, ventos, convecção e nuvens.",
            "Reconhecer a diferença entre ar estável (nuvens estratiformes, visibilidade reduzida por névoa) e ar instável (nuvens cumuliformes, turbulência e pancadas de chuva) é o primeiro passo para voar com segurança.",
          ],
        },
      ],
    },
    {
      slug: "guia-simulacao-voo-avancada",
      title: "Guia de Simulação de Voo: MSFS, X-Plane, Prepar3D, VATSIM e IVAO",
      shortTitle: "Guia de Simulação",
      description: "Como transformar seu simulador doméstico em um ambiente de treinamento de alta fidelidade: escolha de aeronaves, periféricos, meteorologia real e voo online.",
      category: "Simulação de Voo",
      accent: "#c8a7ff",
      readTime: 15,
      publishedAt: "2026-04-01T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Equipe Editorial FOX SIM",
      targetAudience: "Simuladores de voo, pilotos reais praticando em casa e entusiastas de aviação virtual.",
      summary: "Tudo sobre Microsoft Flight Simulator (2020/2024), X-Plane 12, Prepar3D, aeronaves 'study-level' (PMDG, Fenix) e redes de controle de tráfego aéreo online.",
      sections: [
        {
          heading: "1. Escolhendo a Plataforma Ideal",
          paragraphs: [
            "O ecossistema contemporâneo de simulação divide-se entre MSFS (com visual global fotorrealista e enorme catálogo de add-ons), X-Plane 12 (com precisão aerodinâmica superior de pás e física pura) e Prepar3D (amplamente estabelecido em simuladores de treinamento).",
          ],
        },
      ],
    },
  ],
  en: [
    {
      slug: "guia-piloto-privado",
      title: "Private Pilot Ground School Guide: Flight Theory & Exam Mastery",
      shortTitle: "Private Pilot Guide",
      description: "The definitive guide for student pilots: aerodynamics, aviation weather, flight navigation, air regulations, and active study strategies.",
      category: "Aviation Foundations",
      accent: "#5de4df",
      readTime: 12,
      publishedAt: "2026-03-01T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "FOX SIM Editorial Team",
      targetAudience: "Student pilots, FAA/EASA private pilot candidates, and serious flight simulation enthusiasts.",
      summary: "Everything you need to build unbreakable aviation ground school knowledge, master private pilot exams, and fly with precision.",
      sections: [
        {
          heading: "1. The 5 Core Pillars of Private Pilot Ground School",
          paragraphs: [
            "Private pilot ground training is anchored by five fundamental subjects: Principles of Flight (Aerodynamics), Aviation Meteorology, Flight Navigation, Air Law & Air Traffic Regulations, and Aircraft Systems.",
          ],
        },
      ],
      faqList: [
        { question: "How should I prepare for the Private Pilot Written Exam?", answer: "Combine structured module study with active recall using explained question banks and flight simulator procedure practice." },
      ],
    },
    {
      slug: "guia-ifr-voo-instrumentos",
      title: "Instrument Rating (IFR) Master Guide: Scan to Minimums",
      shortTitle: "IFR Master Guide",
      description: "Master attitude instrument scan, VOR/ILS tracking, SID/STAR/IAC procedures, PBN/RNP specifications, and precision approaches.",
      category: "Specialization",
      accent: "#8ab4f8",
      readTime: 14,
      publishedAt: "2026-03-10T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "FOX SIM Editorial Team",
      targetAudience: "Instrument rating candidates, commercial pilots, and virtual aviators on VATSIM/IVAO.",
      summary: "The comprehensive technical manual for understanding instrument flight rules, ICAO procedure charts, and zero-visibility operations.",
      sections: [
        {
          heading: "1. The Attitude + Power = Performance Foundation",
          paragraphs: [
            "In IFR flying, outside visual cues are replaced by systematic cross-checks across the primary flight display and standby instruments.",
          ],
        },
      ],
    },
    {
      slug: "guia-meteorologia-aeronautica",
      title: "Aviation Meteorology Guide: METAR, TAF, Fronts & Flight Safety",
      shortTitle: "Aviation Weather Guide",
      description: "Learn how to analyze atmospheric soundings, interpret significant weather charts, decode METAR/TAF bulletins, and anticipate enroute hazards.",
      category: "Aviation Weather",
      accent: "#f4a261",
      readTime: 12,
      publishedAt: "2026-03-20T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "FOX SIM Editorial Team",
      targetAudience: "VFR and IFR pilots, flight dispatchers, and aviation simulation students.",
      summary: "Understand atmospheric dynamics, cloud families, frontal boundaries, fog types, thunderstorms, and synoptic chart interpretation.",
      sections: [
        {
          heading: "1. Atmospheric Dynamics for Pilots",
          paragraphs: [
            "Solar heating differentials across the Earth drive airmass pressure gradients, winds, convective instability, and cloud formation.",
          ],
        },
      ],
    },
    {
      slug: "guia-simulacao-voo-avancada",
      title: "Advanced Flight Simulation Guide: MSFS, X-Plane, P3D, VATSIM & IVAO",
      shortTitle: "Flight Simulation Guide",
      description: "How to configure a desktop flight simulator into a professional training environment: hardware controls, study-level airliners, real-world weather, and live ATC.",
      category: "Flight Simulation",
      accent: "#c8a7ff",
      readTime: 15,
      publishedAt: "2026-04-01T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "FOX SIM Editorial Team",
      targetAudience: "Flight sim enthusiasts, real-world pilots training at home, and virtual airline crew.",
      summary: "A complete overview of MSFS 2020/2024, X-Plane 12, Prepar3D, study-level aircraft (PMDG, Fenix), and live virtual ATC networks.",
      sections: [
        {
          heading: "1. Selecting Your Simulation Platform",
          paragraphs: [
            "Modern flight simulation divides into MSFS (global photogrammetry and rich addon marketplace), X-Plane 12 (pure blade-element physics and flight dynamic modeling), and Prepar3D (institutional procedure trainers).",
          ],
        },
      ],
    },
  ],
  es: [
    {
      slug: "guia-piloto-privado",
      title: "Guía de Piloto Privado: Teoría de Vuelo, Meteorología y Exámenes",
      shortTitle: "Guía Piloto Privado",
      description: "La guía definitiva para estudiantes de piloto privado: aerodinámica, meteorología aeronáutica, navegación aérea y estrategia de estudio.",
      category: "Formación Básica",
      accent: "#5de4df",
      readTime: 12,
      publishedAt: "2026-03-01T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Equipo Editorial FOX SIM",
      targetAudience: "Alumnos de piloto privado, opositores a exámenes teóricos y aficionados a la simulación de vuelo.",
      summary: "Todo lo necesario para consolidar conocimientos teóricos aeronáuticos y aprobar los exámenes oficiales con solvencia.",
      sections: [
        {
          heading: "1. Los 5 Pilares Teóricos de la Formación de Piloto",
          paragraphs: [
            "La formación teórica de piloto privado se fundamenta en: Principios de Vuelo, Meteorología Aeronáutica, Navegación Aérea, Reglamentación y Conocimiento General de la Aeronave.",
          ],
        },
      ],
    },
    {
      slug: "guia-ifr-voo-instrumentos",
      title: "Guía Maestra de Vuelo por Instrumentos (IFR): Escaneo y Mínimos",
      shortTitle: "Guía de IFR",
      description: "Domina el escaneo instrumental, radionavegación VOR/ILS, cartas SID/STAR/IAC, especificaciones PBN/RNP y aproximaciones de precisión.",
      category: "Especialización",
      accent: "#8ab4f8",
      readTime: 14,
      publishedAt: "2026-03-10T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Equipo Editorial FOX SIM",
      targetAudience: "Pilotos IFR, estudiantes de comercial y pilotos virtuales en VATSIM/IVAO.",
      summary: "Manual técnico completo para comprender las reglas de vuelo por instrumentos, cartas OACI y vuelos sin visibilidad exterior.",
      sections: [
        {
          heading: "1. El Método Actitud + Potencia = Rendimiento",
          paragraphs: [
            "En IFR, las referencias visuales se sustituyen por el escaneo disciplinado del panel primario de instrumentos.",
          ],
        },
      ],
    },
    {
      slug: "guia-meteorologia-aeronautica",
      title: "Guía de Meteorología Aeronáutica: METAR, TAF, Frentes y Seguridad",
      shortTitle: "Guía de Meteorología",
      description: "Aprende a analizar la atmósfera, interpretar cartas de tiempo significativo, decodificar boletines METAR/TAF y prevenir peligros en ruta.",
      category: "Meteorología",
      accent: "#f4a261",
      readTime: 12,
      publishedAt: "2026-03-20T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Equipo Editorial FOX SIM",
      targetAudience: "Pilotos VFR e IFR, despachadores de vuelo y estudiantes de aviación.",
      summary: "Comprende la atmósfera, frentes fríos y cálidos, nieblas, tormentas y cartas sinópticas de forma clara.",
      sections: [
        {
          heading: "1. Dinámica Atmosférica Aplicada al Vuelo",
          paragraphs: [
            "El calentamiento solar desigual genera gradientes de presión, vientos y nubosidad convectiva.",
          ],
        },
      ],
    },
    {
      slug: "guia-simulacao-voo-avancada",
      title: "Guía de Simulación de Vuelo: MSFS, X-Plane, P3D, VATSIM e IVAO",
      shortTitle: "Guía de Simulación",
      description: "Convierte tu simulador en una herramienta de aprendizaje rigurosa: periféricos, aviones complejos, meteorología real y control aéreo online.",
      category: "Simulación de Vuelo",
      accent: "#c8a7ff",
      readTime: 15,
      publishedAt: "2026-04-01T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Equipo Editorial FOX SIM",
      targetAudience: "Simuladores de vuelo, pilotos reales y aficionados a la aviación virtual.",
      summary: "Análisis de MSFS, X-Plane 12, Prepar3D y redes de vuelo en línea con controladores reales.",
      sections: [
        {
          heading: "1. Selección de la Plataforma Adecuada",
          paragraphs: [
            "El mercado actual destaca por el realismo gráfico de MSFS y la precisión aerodinámica de X-Plane 12.",
          ],
        },
      ],
    },
  ],
  fr: [
    {
      slug: "guia-piloto-privado",
      title: "Guide Complet du Pilote Privé (PPL) : Théorie du Vol & Examens",
      shortTitle: "Guide Pilote Privé",
      description: "Le guide de référence pour les élèves pilotes : principes du vol, météorologie, navigation, réglementation et méthodes d'apprentissage.",
      category: "Fondamentaux",
      accent: "#5de4df",
      readTime: 12,
      publishedAt: "2026-03-01T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Équipe Éditoriale FOX SIM",
      targetAudience: "Élèves pilotes privés (PPL), candidats aux examens théoriques et passionnés de simulation.",
      summary: "Tout pour construire une base aéronautique solide et réussir ses examens théoriques.",
      sections: [
        {
          heading: "1. Les 5 Disciplines Fondamentales du PPL",
          paragraphs: [
            "La formation théorique du pilote privé repose sur : Principes du vol, Météorologie, Navigation, Réglementation et Connaissance des aéronefs.",
          ],
        },
      ],
    },
    {
      slug: "guia-ifr-voo-instrumentos",
      title: "Guide Maître du Vol aux Instruments (IFR) : Circuit Visuel & Minimas",
      shortTitle: "Guide IFR",
      description: "Maîtrisez le circuit visuel, le suivi VOR/ILS, les cartes SID/STAR/IAC, les spécifications PBN/RNP et les approches de précision.",
      category: "Spécialisation",
      accent: "#8ab4f8",
      readTime: 14,
      publishedAt: "2026-03-10T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Équipe Éditoriale FOX SIM",
      targetAudience: "Pilotes IFR, élèves CPL et commandants de bord virtuels sur VATSIM/IVAO.",
      summary: "Manuel technique complet pour comprendre les procédures IFR et le vol sans visibilité extérieure.",
      sections: [
        {
          heading: "1. Méthode Assiette + Puissance = Performance",
          paragraphs: [
            "En IFR, les repères visuels sont remplacés par un balayage méthodique des instruments principaux.",
          ],
        },
      ],
    },
    {
      slug: "guia-meteorologia-aeronautica",
      title: "Guide de Météorologie Aéronautique : METAR, TAF, Fronts & Sécurité",
      shortTitle: "Guide Météo Aéronautique",
      description: "Analysez l'atmosphère, interprétez les cartes TEMSI/WINTEM, décodez les bulletins METAR/TAF et anticipez les risques en route.",
      category: "Météorologie",
      accent: "#f4a261",
      readTime: 12,
      publishedAt: "2026-03-20T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Équipe Éditoriale FOX SIM",
      targetAudience: "Pilotes VFR et IFR, agents d'opérations et élèves pilotes.",
      summary: "Comprendre l'atmosphère, les masses d'air, brouillards et orages de façon concrète.",
      sections: [
        {
          heading: "1. Dynamique de l'Atmosphère",
          paragraphs: [
            "L'échauffement solaire inégal engendre gradients de pression, vents et instabilités orageuses.",
          ],
        },
      ],
    },
    {
      slug: "guia-simulacao-voo-avancada",
      title: "Guide de Simulation de Vol : MSFS, X-Plane, P3D, VATSIM & IVAO",
      shortTitle: "Guide Simulation",
      description: "Configurez votre simulateur en un outil d'entraînement performant : commandes de vol, avions complexes, météo réelle et contrôle en ligne.",
      category: "Simulation de Vol",
      accent: "#c8a7ff",
      readTime: 15,
      publishedAt: "2026-04-01T10:00:00Z",
      updatedAt: "2026-08-28T00:00:00Z",
      author: "Équipe Éditoriale FOX SIM",
      targetAudience: "Pilotes virtuels, pilotes réels s'entraînant à domicile et passionnés d'aviation.",
      summary: "Panorama complet de MSFS, X-Plane 12, Prepar3D et des réseaux de contrôle aérien en direct.",
      sections: [
        {
          heading: "1. Choisir sa Plateforme de Simulation",
          paragraphs: [
            "MSFS se distingue par son rendu visuel mondial et X-Plane 12 par sa précision aérodynamique.",
          ],
        },
      ],
    },
  ],
};

export function getGuides(locale: ValidLocale): PillarGuide[] {
  return GUIDES_DATA[locale] || GUIDES_DATA["pt-br"];
}

export function getGuideBySlug(locale: ValidLocale, slug: string): PillarGuide | undefined {
  const list = getGuides(locale);
  return list.find((g) => g.slug === slug);
}

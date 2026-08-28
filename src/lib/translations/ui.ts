import { ValidLocale } from "../i18n";

export interface UiTranslations {
  siteName: string;
  tagline: string;
  description: string;
  nav: {
    studies: string;
    questions: string;
    simulations: string;
    pomodoro: string;
    tools: string;
    articles: string;
    glossary: string;
    guides: string;
    dashboard: string;
    openPanel: string;
  };
  footer: {
    aboutText: string;
    educationalNotice: string;
    colLearn: string;
    colTools: string;
    colPlatform: string;
    manageCookies: string;
    privacy: string;
    terms: string;
    cookies: string;
    disclaimer: string;
    about: string;
    contact: string;
    copyright: string;
    motto: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle1: string;
    heroTitleEm: string;
    heroDesc: string;
    startStudying: string;
    startSimulation: string;
    proofTracks: string;
    proofQuestions: string;
    proofTools: string;
    scrollCue: string;
    flightDeck: string;
    featuredTrack: string;
    modulesCount: string;
    lessonsCount: string;
    studyDeck: string;
    platformKicker: string;
    platformTitle: string;
    platformSubtitle: string;
    explore: string;
    feature1Title: string;
    feature1Text: string;
    feature2Title: string;
    feature2Text: string;
    feature3Title: string;
    feature3Text: string;
    coursesKicker: string;
    coursesTitle: string;
    viewAllTracks: string;
    missionKicker: string;
    missionTitle: string;
    missionDesc: string;
    openTools: string;
    missionCard1: string;
    missionCard2: string;
    missionCard3: string;
    missionCard4: string;
    libraryKicker: string;
    libraryTitle: string;
    exploreArticles: string;
    readTimeMin: string;
    ctaKicker: string;
    ctaTitle: string;
    ctaDesc: string;
    chooseTrack: string;
  };
  breadcrumbs: {
    home: string;
    studies: string;
    questions: string;
    simulations: string;
    pomodoro: string;
    tools: string;
    articles: string;
    glossary: string;
    guides: string;
    dashboard: string;
    progress: string;
  };
  common: {
    level: string;
    hours: string;
    lessons: string;
    search: string;
    filterAll: string;
    readMore: string;
    continueStudying: string;
    relatedContent: string;
    back: string;
    allArticles: string;
    allTerms: string;
    allGuides: string;
    next: string;
    previous: string;
    score: string;
    correct: string;
    incorrect: string;
    explanation: string;
    startNow: string;
    finish: string;
    authorLabel: string;
    publishedAt: string;
    updatedAt: string;
  };
}

export const UI_TRANSLATIONS: Record<ValidLocale, UiTranslations> = {
  "pt-br": {
    siteName: "FOX SIM",
    tagline: "Estudos e aviação virtual",
    description: "Estude aviação com trilhas completas de PP, PC, IFR e MLTE, questões, simulados, Pomodoro e ferramentas aeronáuticas práticas.",
    nav: {
      studies: "Trilhas",
      questions: "Questões",
      simulations: "Simulados",
      pomodoro: "Pomodoro",
      tools: "Ferramentas",
      articles: "Artigos",
      glossary: "Glossário",
      guides: "Guias",
      dashboard: "Painel",
      openPanel: "Meu painel",
    },
    footer: {
      aboutText: "Estudo de aviação e simulação com método, ferramentas práticas e evolução no seu ritmo.",
      educationalNotice: "Conteúdo educacional · não substitui publicações oficiais ou instrução habilitada",
      colLearn: "Aprender",
      colTools: "Ferramentas",
      colPlatform: "FOX SIM",
      manageCookies: "Preferências de cookies",
      privacy: "Privacidade",
      terms: "Termos",
      cookies: "Cookies",
      disclaimer: "Disclaimer",
      about: "Sobre",
      contact: "Contato",
      copyright: "© 2026 FOX SIM. Todos os direitos reservados.",
      motto: "Feito para quem estuda o céu.",
    },
    home: {
      heroEyebrow: "Plataforma de estudos em aviação",
      heroTitle1: "Conhecimento para",
      heroTitleEm: "voar mais longe.",
      heroDesc: "Trilhas completas para Piloto Privado, Comercial, IFR e Multimotor, banco de questões comentadas, simulados e calculadoras para transformar estudo em evolução real.",
      startStudying: "Começar a estudar",
      startSimulation: "Fazer simulado",
      proofTracks: "trilhas de formação",
      proofQuestions: "questões comentadas",
      proofTools: "ferramentas práticas",
      scrollCue: "Conheça a plataforma",
      flightDeck: "FOX // STUDY DECK",
      featuredTrack: "TRILHA EM DESTAQUE",
      modulesCount: "módulos",
      lessonsCount: "AULAS",
      studyDeck: "Varredura · navegação · procedimentos",
      platformKicker: "UMA PLATAFORMA, TODO O FLUXO",
      platformTitle: "Estude. Pratique. Meça.\nContinue evoluindo.",
      platformSubtitle: "Menos tempo decidindo o que fazer. Mais tempo construindo conhecimento que permanece.",
      explore: "Explorar",
      feature1Title: "Trilhas que fazem sentido",
      feature1Text: "Módulos de PP, PC, IFR e MLTE organizados em uma sequência clara, com objetivos e progresso local.",
      feature2Title: "Prática com explicação",
      feature2Text: "Questões educacionais com correção imediata, comentários detalhados e desempenho por matéria.",
      feature3Title: "Foco que vira rotina",
      feature3Text: "Pomodoro aeronáutico completo, meta diária, escolha de matéria e registro contínuo das sessões.",
      coursesKicker: "TRILHAS DE FORMAÇÃO",
      coursesTitle: "Seu próximo nível começa aqui.",
      viewAllTracks: "Ver todas as trilhas",
      missionKicker: "MISSION CONTROL",
      missionTitle: "Ferramentas para o estudo sair do papel.",
      missionDesc: "Planeje uma descida (TOD), converta unidades, calcule vento cruzado e altitude-densidade sem sair da FOX SIM.",
      openTools: "Abrir ferramentas",
      missionCard1: "CONVERSORES (NM · FT · KT · °C)",
      missionCard2: "PLANEJAMENTO (TOD · RAZÃO · AUTONOMIA)",
      missionCard3: "CONDIÇÕES (UTC · VENTO CRUZADO · ISA)",
      missionCard4: "FOCO (POMODORO · METAS · LOGS)",
      libraryKicker: "BIBLIOTECA FOX SIM",
      libraryTitle: "Guias para consultar e compreender.",
      exploreArticles: "Explorar artigos",
      readTimeMin: "min de leitura",
      ctaKicker: "PRONTO PARA COMEÇAR?",
      ctaTitle: "Seu estudo merece um plano de voo.",
      ctaDesc: "Escolha uma trilha, registre seu progresso e transforme cada sessão em um passo adiante.",
      chooseTrack: "Escolher trilha",
    },
    breadcrumbs: {
      home: "Início",
      studies: "Estudos",
      questions: "Questões",
      simulations: "Simulados",
      pomodoro: "Pomodoro",
      tools: "Ferramentas",
      articles: "Artigos",
      glossary: "Glossário",
      guides: "Guias",
      dashboard: "Painel",
      progress: "Meu Progresso",
    },
    common: {
      level: "Nível",
      hours: "horas",
      lessons: "aulas",
      search: "Pesquisar...",
      filterAll: "Todos",
      readMore: "Ler artigo completo",
      continueStudying: "Continue estudando",
      relatedContent: "Conteúdo relacionado",
      back: "Voltar",
      allArticles: "Todos os artigos",
      allTerms: "Todos os termos",
      allGuides: "Todos os guias",
      next: "Próximo",
      previous: "Anterior",
      score: "Pontuação",
      correct: "Correta",
      incorrect: "Incorreta",
      explanation: "Explicação comentada",
      startNow: "Iniciar agora",
      finish: "Finalizar",
      authorLabel: "Equipe Editorial FOX SIM",
      publishedAt: "Publicado em",
      updatedAt: "Atualizado em",
    },
  },
  en: {
    siteName: "FOX SIM",
    tagline: "Aviation Ground School & Flight Simulation",
    description: "Master aviation with structured ground school tracks (Private Pilot, Commercial, IFR, Multi-Engine), question banks, timed practice exams, Pomodoro focus timer, and flight tools.",
    nav: {
      studies: "Courses",
      questions: "Questions",
      simulations: "Mock Exams",
      pomodoro: "Pomodoro",
      tools: "Calculators",
      articles: "Articles",
      glossary: "Glossary",
      guides: "Guides",
      dashboard: "Dashboard",
      openPanel: "My Dashboard",
    },
    footer: {
      aboutText: "Aviation study and flight simulation with clear structure, practical tools, and self-paced progress.",
      educationalNotice: "Educational content · does not replace official aviation publications or certified flight instruction",
      colLearn: "Learn",
      colTools: "Flight Tools",
      colPlatform: "FOX SIM",
      manageCookies: "Cookie Preferences",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      cookies: "Cookie Policy",
      disclaimer: "Disclaimer",
      about: "About",
      contact: "Contact",
      copyright: "© 2026 FOX SIM. All rights reserved.",
      motto: "Built for those who study the skies.",
    },
    home: {
      heroEyebrow: "Aviation Study & Flight Simulation Platform",
      heroTitle1: "Knowledge to",
      heroTitleEm: "fly further.",
      heroDesc: "Comprehensive study tracks for Private Pilot, Commercial, Instrument Rating (IFR), and Multi-Engine, practice questions with explanations, timed exams, and aviation calculators.",
      startStudying: "Start Studying",
      startSimulation: "Take Mock Exam",
      proofTracks: "study tracks",
      proofQuestions: "explained questions",
      proofTools: "flight calculators",
      scrollCue: "Explore the platform",
      flightDeck: "FOX // STUDY DECK",
      featuredTrack: "FEATURED TRACK",
      modulesCount: "modules",
      lessonsCount: "LESSONS",
      studyDeck: "Scan technique · navigation · procedures",
      platformKicker: "ONE PLATFORM, COMPLETE WORKFLOW",
      platformTitle: "Study. Practice. Track.\nKeep leveling up.",
      platformSubtitle: "Less time wondering what to study. More time building lasting aviation knowledge.",
      explore: "Explore",
      feature1Title: "Structured Learning Tracks",
      feature1Text: "PP, PC, IFR, and Multi-Engine modules organized in logical sequence with clear learning objectives and local progress tracking.",
      feature2Title: "Practice with Detailed Feedback",
      feature2Text: "Aviation practice questions with instant corrections, in-depth explanations, and performance breakdowns by subject.",
      feature3Title: "Focus Engineered for Retention",
      feature3Text: "Full aviation Pomodoro timer, daily targets, subject tagging, and uninterrupted study log history.",
      coursesKicker: "GROUND SCHOOL TRACKS",
      coursesTitle: "Your next aviation rating starts here.",
      viewAllTracks: "View All Courses",
      missionKicker: "MISSION CONTROL",
      missionTitle: "Flight tools to streamline your calculations.",
      missionDesc: "Calculate Top of Descent (TOD), convert aeronautical units, compute crosswind components, and estimate density altitude inside FOX SIM.",
      openTools: "Open Flight Tools",
      missionCard1: "CONVERTERS (NM · FT · KT · °C)",
      missionCard2: "DESCENT PLANNING (TOD · RATE · RANGE)",
      missionCard3: "WEATHER (UTC · CROSSWIND · ISA)",
      missionCard4: "FOCUS (POMODORO · GOALS · LOGS)",
      libraryKicker: "FOX SIM LIBRARY",
      libraryTitle: "Aviation guides to study and master.",
      exploreArticles: "Explore Articles",
      readTimeMin: "min read",
      ctaKicker: "READY FOR TAKEOFF?",
      ctaTitle: "Your study deserves a flight plan.",
      ctaDesc: "Choose a ground school track, log your progress, and transform each session into genuine aviation proficiency.",
      chooseTrack: "Choose a Track",
    },
    breadcrumbs: {
      home: "Home",
      studies: "Courses",
      questions: "Questions",
      simulations: "Exams",
      pomodoro: "Pomodoro",
      tools: "Tools",
      articles: "Articles",
      glossary: "Glossary",
      guides: "Guides",
      dashboard: "Dashboard",
      progress: "My Progress",
    },
    common: {
      level: "Level",
      hours: "hours",
      lessons: "lessons",
      search: "Search...",
      filterAll: "All",
      readMore: "Read full article",
      continueStudying: "Continue Studying",
      relatedContent: "Related Content",
      back: "Back",
      allArticles: "All Articles",
      allTerms: "All Terms",
      allGuides: "All Guides",
      next: "Next",
      previous: "Previous",
      score: "Score",
      correct: "Correct",
      incorrect: "Incorrect",
      explanation: "Detailed Explanation",
      startNow: "Start Now",
      finish: "Finish",
      authorLabel: "FOX SIM Editorial Team",
      publishedAt: "Published on",
      updatedAt: "Updated on",
    },
  },
  es: {
    siteName: "FOX SIM",
    tagline: "Estudios y aviación virtual",
    description: "Estudia aviación con cursos completos de Piloto Privado, Comercial, IFR y Multimotor, banco de preguntas explicadas, simuladores de exámenes, Pomodoro y calculadoras aeronáuticas.",
    nav: {
      studies: "Cursos",
      questions: "Preguntas",
      simulations: "Exámenes",
      pomodoro: "Pomodoro",
      tools: "Calculadoras",
      articles: "Artículos",
      glossary: "Glosario",
      guides: "Guías",
      dashboard: "Panel",
      openPanel: "Mi Panel",
    },
    footer: {
      aboutText: "Estudio aeronáutico y simulación de vuelo con método, herramientas prácticas y progreso a tu propio ritmo.",
      educationalNotice: "Contenido educativo · no reemplaza publicaciones oficiales de aviación ni instrucción certificada",
      colLearn: "Aprender",
      colTools: "Herramientas",
      colPlatform: "FOX SIM",
      manageCookies: "Preferencias de cookies",
      privacy: "Privacidad",
      terms: "Términos",
      cookies: "Cookies",
      disclaimer: "Descargo de responsabilidad",
      about: "Acerca de",
      contact: "Contacto",
      copyright: "© 2026 FOX SIM. Todos los derechos reservados.",
      motto: "Creado para quienes estudian el cielo.",
    },
    home: {
      heroEyebrow: "Plataforma de estudio aeronáutico y simulación",
      heroTitle1: "Conocimiento para",
      heroTitleEm: "volar más lejos.",
      heroDesc: "Cursos completos para Piloto Privado, Comercial, IFR y Multimotor, banco de preguntas con explicaciones, simuladores de examen y calculadoras aeronáuticas para un aprendizaje sólido.",
      startStudying: "Comenzar a estudiar",
      startSimulation: "Realizar examen",
      proofTracks: "cursos de formación",
      proofQuestions: "preguntas explicadas",
      proofTools: "calculadoras prácticas",
      scrollCue: "Conoce la plataforma",
      flightDeck: "FOX // STUDY DECK",
      featuredTrack: "CURSO DESTACADO",
      modulesCount: "módulos",
      lessonsCount: "LECCIONES",
      studyDeck: "Escaneo instrumental · navegación · procedimientos",
      platformKicker: "UNA PLATAFORMA, TODO EL FLUJO",
      platformTitle: "Estudia. Practica. Mide.\nContinúa evolucionando.",
      platformSubtitle: "Menos tiempo dudando qué estudiar. Más tiempo construyendo conocimiento aeronáutico duradero.",
      explore: "Explorar",
      feature1Title: "Cursos estructurados con lógica",
      feature1Text: "Módulos de PP, PC, IFR y MLTE organizados en secuencia clara, con objetivos precisos y seguimiento local.",
      feature2Title: "Práctica con retroalimentación inmediata",
      feature2Text: "Preguntas de aviación con corrección instantánea, explicaciones detalladas y análisis de rendimiento por materia.",
      feature3Title: "Enfoque constante en tu rutina",
      feature3Text: "Pomodoro aeronáutico completo, metas diarias, asignación por materia y registro continuo de tus sesiones.",
      coursesKicker: "CURSOS DE FORMACIÓN",
      coursesTitle: "Tu siguiente habilitación comienza aquí.",
      viewAllTracks: "Ver todos los cursos",
      missionKicker: "MISSION CONTROL",
      missionTitle: "Herramientas de cálculo para tu vuelo.",
      missionDesc: "Calcula el Top of Descent (TOD), convierte unidades aeronáuticas, estima viento cruzado y altitud de densidad en FOX SIM.",
      openTools: "Abrir herramientas",
      missionCard1: "CONVERSORES (NM · FT · KT · °C)",
      missionCard2: "PLAN DE DESCENSO (TOD · RÉGIMEN · AUTONOMÍA)",
      missionCard3: "METEOROLOGÍA (UTC · VIENTO CRUZADO · ISA)",
      missionCard4: "FOCO (POMODORO · METAS · REGISTROS)",
      libraryKicker: "BIBLIOTECA FOX SIM",
      libraryTitle: "Guías aeronáuticas para consultar y dominar.",
      exploreArticles: "Explorar artículos",
      readTimeMin: "min de lectura",
      ctaKicker: "¿LISTO PARA DESPEGAR?",
      ctaTitle: "Tu estudio merece un plan de vuelo.",
      ctaDesc: "Elige un curso, registra tu progreso y transforma cada sesión en competencia aeronáutica real.",
      chooseTrack: "Elegir curso",
    },
    breadcrumbs: {
      home: "Inicio",
      studies: "Cursos",
      questions: "Preguntas",
      simulations: "Exámenes",
      pomodoro: "Pomodoro",
      tools: "Herramientas",
      articles: "Artículos",
      glossary: "Glosario",
      guides: "Guías",
      dashboard: "Panel",
      progress: "Mi Progreso",
    },
    common: {
      level: "Nivel",
      hours: "horas",
      lessons: "lecciones",
      search: "Buscar...",
      filterAll: "Todos",
      readMore: "Leer artículo completo",
      continueStudying: "Continuar estudiando",
      relatedContent: "Contenido relacionado",
      back: "Volver",
      allArticles: "Todos los artículos",
      allTerms: "Todos los términos",
      allGuides: "Todas las guías",
      next: "Siguiente",
      previous: "Anterior",
      score: "Puntuación",
      correct: "Correcta",
      incorrect: "Incorrecta",
      explanation: "Explicación comentada",
      startNow: "Iniciar ahora",
      finish: "Finalizar",
      authorLabel: "Equipo Editorial FOX SIM",
      publishedAt: "Publicado el",
      updatedAt: "Actualizado el",
    },
  },
  fr: {
    siteName: "FOX SIM",
    tagline: "Études aéronautiques & simulation de vol",
    description: "Étudiez l'aviation avec des parcours structurés (Pilote Privé, Commercial, IFR, Multi-moteurs), banques de questions commentées, examens blancs, Pomodoro et calculateurs aéronautiques.",
    nav: {
      studies: "Formations",
      questions: "Questions",
      simulations: "Examens",
      pomodoro: "Pomodoro",
      tools: "Calculateurs",
      articles: "Articles",
      glossary: "Glossaire",
      guides: "Guides",
      dashboard: "Tableau de bord",
      openPanel: "Mon Tableau",
    },
    footer: {
      aboutText: "Étude de l'aviation et simulation de vol avec méthode, outils pratiques et progression à votre rythme.",
      educationalNotice: "Contenu éducatif · ne remplace pas les publications officielles de l'aviation ni l'instruction homologuée",
      colLearn: "Apprendre",
      colTools: "Outils de vol",
      colPlatform: "FOX SIM",
      manageCookies: "Préférences de cookies",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      cookies: "Politique de cookies",
      disclaimer: "Avertissement",
      about: "À propos",
      contact: "Contact",
      copyright: "© 2026 FOX SIM. Tous droits réservés.",
      motto: "Conçu pour ceux qui étudient le ciel.",
    },
    home: {
      heroEyebrow: "Plateforme d'études aéronautiques et simulation",
      heroTitle1: "La connaissance pour",
      heroTitleEm: "voler plus loin.",
      heroDesc: "Parcours complets pour Pilote Privé, Commercial, IFR et Multi-moteurs, banque de questions avec explications, examens chronométrés et calculateurs aéronautiques pour une progression réelle.",
      startStudying: "Commencer à étudier",
      startSimulation: "Passer un examen",
      proofTracks: "parcours de formation",
      proofQuestions: "questions commentées",
      proofTools: "calculateurs pratiques",
      scrollCue: "Découvrir la plateforme",
      flightDeck: "FOX // STUDY DECK",
      featuredTrack: "PARCOURS EN VEDETTE",
      modulesCount: "modules",
      lessonsCount: "LEÇONS",
      studyDeck: "Circuit visuel · radionavigation · procédures",
      platformKicker: "UNE PLATEFORME, TOUT LE FLUX",
      platformTitle: "Étudiez. Pratiquez. Mesurez.\nContinuez d'évoluer.",
      platformSubtitle: "Moins de temps à hésiter sur quoi étudier. Plus de temps à construire un savoir aéronautique durable.",
      explore: "Explorer",
      feature1Title: "Parcours logiques et structurés",
      feature1Text: "Modules PPL, CPL, IFR et MEP organisés selon une séquence claire avec objectifs et suivi local.",
      feature2Title: "Pratique avec explications détaillées",
      feature2Text: "Questions d'aviation avec correction instantanée, explications complètes et analyse par matière.",
      feature3Title: "Concentration au service de la routine",
      feature3Text: "Pomodoro aéronautique complet, objectifs quotidiens, attribution par matière et journal de session.",
      coursesKicker: "PARCOURS DE FORMATION",
      coursesTitle: "Votre prochaine qualification commence ici.",
      viewAllTracks: "Voir toutes les formations",
      missionKicker: "MISSION CONTROL",
      missionTitle: "Outils de vol pour concrétiser vos calculs.",
      missionDesc: "Calculez le début de descente (TOD), convertissez les unités aéronautiques, estimez le vent de travers et l'altitude-densité dans FOX SIM.",
      openTools: "Ouvrir les outils",
      missionCard1: "CONVERTISSEURS (NM · FT · KT · °C)",
      missionCard2: "PLAN DE DESCENTE (TOD · TAUX · AUTONOMIE)",
      missionCard3: "MÉTÉO (UTC · VENT DE TRAVERS · ISA)",
      missionCard4: "FOCUS (POMODORO · OBJECTIFS · LOGS)",
      libraryKicker: "BIBLIOTHÈQUE FOX SIM",
      libraryTitle: "Guides aéronautiques à consulter et maîtriser.",
      exploreArticles: "Explorer les articles",
      readTimeMin: "min de lecture",
      ctaKicker: "PRÊT POUR LE DÉCOLLAGE ?",
      ctaTitle: "Votre étude mérite un plan de vol.",
      ctaDesc: "Choisissez une formation, suivez votre progression et transformez chaque session en réelle compétence.",
      chooseTrack: "Choisir un parcours",
    },
    breadcrumbs: {
      home: "Accueil",
      studies: "Formations",
      questions: "Questions",
      simulations: "Examens",
      pomodoro: "Pomodoro",
      tools: "Outils",
      articles: "Articles",
      glossary: "Glossaire",
      guides: "Guides",
      dashboard: "Tableau de bord",
      progress: "Ma Progression",
    },
    common: {
      level: "Niveau",
      hours: "heures",
      lessons: "leçons",
      search: "Rechercher...",
      filterAll: "Tous",
      readMore: "Lire l'article complet",
      continueStudying: "Continuer à étudier",
      relatedContent: "Contenu connexe",
      back: "Retour",
      allArticles: "Tous les articles",
      allTerms: "Tous les termes",
      allGuides: "Tous les guides",
      next: "Suivant",
      previous: "Précédent",
      score: "Score",
      correct: "Correcte",
      incorrect: "Incorrecte",
      explanation: "Explication détaillée",
      startNow: "Démarrer",
      finish: "Terminer",
      authorLabel: "Équipe Éditoriale FOX SIM",
      publishedAt: "Publié le",
      updatedAt: "Mis à jour le",
    },
  },
};

export function getUi(locale: ValidLocale): UiTranslations {
  return UI_TRANSLATIONS[locale] || UI_TRANSLATIONS["pt-br"];
}

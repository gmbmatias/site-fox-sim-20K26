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
    missionCards: {
      title: string;
      subtitle: string;
    }[];
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
      lessonsCount: "aulas",
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
      missionCards: [
        { title: "Conversores", subtitle: "NM · FT · KT · °C" },
        { title: "Planejamento", subtitle: "TOD · Razão · Autonomia" },
        { title: "Condições", subtitle: "UTC · Vento Cruzado · ISA" },
        { title: "Foco", subtitle: "Pomodoro · Metas · Logs" },
      ],
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
      studies: "Trilhas de Estudo",
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
      search: "Buscar artigos e conceitos...",
      filterAll: "Todas as categorias",
      readMore: "Ler artigo completo",
      continueStudying: "Continuar estudando",
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
      explanation: "Explicação técnica",
      startNow: "Iniciar",
      finish: "Finalizar",
      authorLabel: "Autor",
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
      lessonsCount: "lessons",
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
      missionTitle: "Flight tools to bridge theory and cockpit reality.",
      missionDesc: "Compute Top of Descent (TOD), convert units, compute crosswind components and density altitude without leaving FOX SIM.",
      openTools: "Open Flight Tools",
      missionCards: [
        { title: "Converters", subtitle: "NM · FT · KT · °C" },
        { title: "Planning", subtitle: "TOD · Descent Rate · Endurance" },
        { title: "Atmosphere", subtitle: "UTC Zulu · Crosswind · ISA" },
        { title: "Focus", subtitle: "Pomodoro · Goals · Session Logs" },
      ],
      libraryKicker: "TECHNICAL LIBRARY",
      libraryTitle: "In-depth guides for reference and mastery.",
      exploreArticles: "Explore Articles",
      readTimeMin: "min read",
      ctaKicker: "READY FOR TAKEOFF?",
      ctaTitle: "Your aviation study deserves a clear flight plan.",
      ctaDesc: "Choose a ground school track, log your progress, and turn each session into real aviation mastery.",
      chooseTrack: "Choose Course",
    },
    breadcrumbs: {
      home: "Home",
      studies: "Study Tracks",
      questions: "Practice Questions",
      simulations: "Mock Exams",
      pomodoro: "Pomodoro Timer",
      tools: "Flight Tools",
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
      search: "Search articles and concepts...",
      filterAll: "All categories",
      readMore: "Read full article",
      continueStudying: "Continue studying",
      relatedContent: "Related content",
      back: "Back",
      allArticles: "All articles",
      allTerms: "All terms",
      allGuides: "All guides",
      next: "Next",
      previous: "Previous",
      score: "Score",
      correct: "Correct",
      incorrect: "Incorrect",
      explanation: "Technical explanation",
      startNow: "Start",
      finish: "Finish",
      authorLabel: "Author",
      publishedAt: "Published on",
      updatedAt: "Updated on",
    },
  },
  es: {
    siteName: "FOX SIM",
    tagline: "Estudios Aeronáuticos y Simulación de Vuelo",
    description: "Estudia aviación con cursos estructurados de Piloto Privado, Comercial, IFR y Multimotor, banco de preguntas explicadas, exámenes cronometrados, temporizador Pomodoro y calculadoras aeronáuticas.",
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
      aboutText: "Estudio de aviación y simulación con método, herramientas prácticas y avance a tu ritmo.",
      educationalNotice: "Contenido educativo · no sustituye publicaciones oficiales ni instrucción habilitada",
      colLearn: "Aprender",
      colTools: "Herramientas de Vuelo",
      colPlatform: "FOX SIM",
      manageCookies: "Preferencias de cookies",
      privacy: "Política de Privacidad",
      terms: "Términos de Uso",
      cookies: "Política de Cookies",
      disclaimer: "Aviso Legal",
      about: "Sobre Nosotros",
      contact: "Contacto",
      copyright: "© 2026 FOX SIM. Todos los derechos reservados.",
      motto: "Hecho para quienes estudian el cielo.",
    },
    home: {
      heroEyebrow: "Plataforma de Formación Aeronáutica",
      heroTitle1: "Conocimiento para",
      heroTitleEm: "volar más lejos.",
      heroDesc: "Cursos estructurados para Piloto Privado, Comercial, IFR y Multimotor, banco de preguntas comentadas, exámenes cronometrados y calculadoras para transformar el estudio en dominio real.",
      startStudying: "Comenzar a estudiar",
      startSimulation: "Hacer simulacro",
      proofTracks: "cursos de formación",
      proofQuestions: "preguntas explicadas",
      proofTools: "calculadoras de vuelo",
      scrollCue: "Explora la plataforma",
      flightDeck: "FOX // STUDY DECK",
      featuredTrack: "CURSO DESTACADO",
      modulesCount: "módulos",
      lessonsCount: "lecciones",
      studyDeck: "Técnica de escaneo · navegación · procedimientos",
      platformKicker: "UNA PLATAFORMA, TODO EL FLUJO",
      platformTitle: "Estudia. Practica. Mide.\nSigue progresando.",
      platformSubtitle: "Menos tiempo dudando qué estudiar. Más tiempo construyendo conocimiento duradero.",
      explore: "Explorar",
      feature1Title: "Cursos que tienen sentido",
      feature1Text: "Módulos de PP, PC, IFR y Multimotor organizados con secuencia lógica, objetivos claros y registro de progreso.",
      feature2Title: "Práctica con explicación",
      feature2Text: "Preguntas de examen con corrección inmediata, comentarios detallados y desglose por materia.",
      feature3Title: "Enfoque que crea hábito",
      feature3Text: "Pomodoro aeronáutico con metas diarias, asignación por materias y registro continuo de sesiones.",
      coursesKicker: "CURSOS DE FORMACIÓN",
      coursesTitle: "Tu próxima habilitación comienza aquí.",
      viewAllTracks: "Ver todos los cursos",
      missionKicker: "MISSION CONTROL",
      missionTitle: "Herramientas para llevar la teoría a la cabina.",
      missionDesc: "Calcula el Top of Descent (TOD), convierte unidades, determina el viento cruzado y la altitud de densidad.",
      openTools: "Abrir herramientas",
      missionCards: [
        { title: "Conversores", subtitle: "NM · FT · KT · °C" },
        { title: "Planificación", subtitle: "TOD · Régimen · Autonomía" },
        { title: "Condiciones", subtitle: "UTC Zulu · Viento Cruzado · ISA" },
        { title: "Enfoque", subtitle: "Pomodoro · Metas · Registros" },
      ],
      libraryKicker: "BIBLIOTECA TÉCNICA",
      libraryTitle: "Guías para consultar y dominar conceptos.",
      exploreArticles: "Explorar artículos",
      readTimeMin: "min de lectura",
      ctaKicker: "¿LISTO PARA DESPEGAR?",
      ctaTitle: "Tu estudio de aviación merece un plan de vuelo.",
      ctaDesc: "Elige un curso, registra tu progreso y convierte cada sesión de estudio en un avance seguro.",
      chooseTrack: "Elegir curso",
    },
    breadcrumbs: {
      home: "Inicio",
      studies: "Cursos de Estudio",
      questions: "Preguntas de Examen",
      simulations: "Exámenes Simulados",
      pomodoro: "Temporizador Pomodoro",
      tools: "Calculadoras de Vuelo",
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
      search: "Buscar artículos y conceptos...",
      filterAll: "Todas las categorías",
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
      explanation: "Explicación técnica",
      startNow: "Iniciar",
      finish: "Finalizar",
      authorLabel: "Autor",
      publishedAt: "Publicado el",
      updatedAt: "Actualizado el",
    },
  },
  fr: {
    siteName: "FOX SIM",
    tagline: "Études Théoriques & Simulation de Vol",
    description: "Apprenez l'aviation avec des parcours complets pour PPL, CPL, IFR et Multi-moteurs, des questions commentées, des examens blancs chronométrés, un minuteur Pomodoro et des calculateurs de vol.",
    nav: {
      studies: "Formations",
      questions: "Questions",
      simulations: "Examens Blancs",
      pomodoro: "Pomodoro",
      tools: "Calculateurs",
      articles: "Articles",
      glossary: "Glossaire",
      guides: "Guides",
      dashboard: "Tableau de Bord",
      openPanel: "Mon Tableau de Bord",
    },
    footer: {
      aboutText: "Étude de l'aviation et simulation de vol avec méthode, outils pratiques et progression à votre rythme.",
      educationalNotice: "Contenu éducatif · ne remplace pas les publications aéronautiques officielles ni l'instruction certifiée",
      colLearn: "Apprendre",
      colTools: "Outils de Vol",
      colPlatform: "FOX SIM",
      manageCookies: "Préférences cookies",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      cookies: "Politique de Cookies",
      disclaimer: "Avertissement Légal",
      about: "À Propos",
      contact: "Contact",
      copyright: "© 2026 FOX SIM. Tous droits réservés.",
      motto: "Conçu pour ceux qui étudient le ciel.",
    },
    home: {
      heroEyebrow: "Plateforme d'Études Aéronautiques",
      heroTitle1: "La connaissance pour",
      heroTitleEm: "voler plus loin.",
      heroDesc: "Parcours complets pour Pilote Privé (PPL), Pilote Professionnel (CPL), IFR et Multi-moteurs, banque de questions commentées, examens chronométrés et calculateurs aéronautiques.",
      startStudying: "Commencer à étudier",
      startSimulation: "Passer un examen",
      proofTracks: "parcours d'études",
      proofQuestions: "questions commentées",
      proofTools: "calculateurs de vol",
      scrollCue: "Découvrir la plateforme",
      flightDeck: "FOX // STUDY DECK",
      featuredTrack: "FORMATION EN VEDETTE",
      modulesCount: "modules",
      lessonsCount: "leçons",
      studyDeck: "Circuit visuel · navigation · procédures",
      platformKicker: "UNE PLATEFORME, TOUT LE FLUX",
      platformTitle: "Étudiez. Pratiquez. Mesurez.\nProgressez sans cesse.",
      platformSubtitle: "Moins de temps à hésiter sur quoi réviser. Plus de temps à ancrer des connaissances durables.",
      explore: "Explorer",
      feature1Title: "Parcours Structurés",
      feature1Text: "Modules PPL, CPL, IFR et Multi-moteurs organisés avec rigueur, objectifs clairs et suivi local de progression.",
      feature2Title: "Pratique avec Explications",
      feature2Text: "Questions d'entraînement avec correction instantanée, explications techniques et bilan par matière.",
      feature3Title: "Concentration Régulière",
      feature3Text: "Minuteur Pomodoro aéronautique avec objectifs quotidiens, choix de matière et historique des sessions.",
      coursesKicker: "FORMATIONS THÉORIQUES",
      coursesTitle: "Votre prochaine qualification commence ici.",
      viewAllTracks: "Voir toutes les formations",
      missionKicker: "MISSION CONTROL",
      missionTitle: "Des outils pour relier la théorie au cockpit.",
      missionDesc: "Calculez le Top of Descent (TOD), convertissez les unités, évaluez le vent traversier et l'altitude-densité.",
      openTools: "Ouvrir les outils",
      missionCards: [
        { title: "Convertisseurs", subtitle: "NM · FT · KT · °C" },
        { title: "Planification", subtitle: "TOD · Taux · Autonomie" },
        { title: "Conditions", subtitle: "UTC Zulu · Vent Traversier · ISA" },
        { title: "Focus", subtitle: "Pomodoro · Objectifs · Logs" },
      ],
      libraryKicker: "BIBLIOTHÈQUE TECHNIQUE",
      libraryTitle: "Des dossiers complets pour comprendre.",
      exploreArticles: "Explorer les articles",
      readTimeMin: "min de lecture",
      ctaKicker: "PRÊT AU DÉCOLLAGE ?",
      ctaTitle: "Vos révisions méritent un plan de vol.",
      ctaDesc: "Choisissez une formation, enregistrez votre progression et faites de chaque session une vraie avancée.",
      chooseTrack: "Choisir un parcours",
    },
    breadcrumbs: {
      home: "Accueil",
      studies: "Formations Théoriques",
      questions: "Questions d'Entraînement",
      simulations: "Examens Blancs",
      pomodoro: "Minuteur Pomodoro",
      tools: "Calculateurs de Vol",
      articles: "Articles",
      glossary: "Glossaire",
      guides: "Guides",
      dashboard: "Tableau de Bord",
      progress: "Mon Profil",
    },
    common: {
      level: "Niveau",
      hours: "heures",
      lessons: "leçons",
      search: "Rechercher des articles et notions...",
      filterAll: "Toutes les catégories",
      readMore: "Lire l'article complet",
      continueStudying: "Continuer l'étude",
      relatedContent: "Contenu connexe",
      back: "Retour",
      allArticles: "Tous les articles",
      allTerms: "Tous les termes",
      allGuides: "Tous les guides",
      next: "Suivant",
      previous: "Précédent",
      score: "Score",
      correct: "Correct",
      incorrect: "Incorrect",
      explanation: "Explication technique",
      startNow: "Démarrer",
      finish: "Terminer",
      authorLabel: "Auteur",
      publishedAt: "Publié le",
      updatedAt: "Mis à jour le",
    },
  },
};

export function getUi(locale: ValidLocale): UiTranslations {
  return UI_TRANSLATIONS[locale] || UI_TRANSLATIONS["pt-br"];
}

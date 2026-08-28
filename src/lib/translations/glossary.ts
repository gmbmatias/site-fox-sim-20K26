import { ValidLocale } from "../i18n";

export type GlossaryTerm = {
  slug: string;
  term: string;
  shortDefinition: string;
  category: string;
  phoneticOrAcronym: string;
  fullExplanation: string[];
  keyFormulaOrRules?: string;
  relatedArticleSlug?: string;
  relatedTool?: string;
};

export const GLOSSARY_DATA: Record<ValidLocale, GlossaryTerm[]> = {
  "pt-br": [
    {
      slug: "metar",
      term: "METAR",
      phoneticOrAcronym: "Meteorological Aerodrome Report",
      category: "Meteorologia",
      shortDefinition: "O METAR é um boletim meteorológico padronizado internacionalmente que descreve as condições observadas à superfície em um aeródromo em determinado horário.",
      fullExplanation: [
        "Emitido rotineiramente a cada hora ou meia hora pelos órgãos de meteorologia aeronáutica, o METAR fornece dados vitais sobre vento verdadeiro, rajadas, visibilidade horizontal, alcance visual na pista (RVR), tempo presente, cobertura e altura da base das nuvens, temperatura do ar, ponto de orvalho e ajuste altimétrico (QNH).",
        "Quando ocorrem variações meteorológicas bruscas e significativas antes do horário de emissão regular, publica-se um informe especial denominado SPECI.",
      ],
      keyFormulaOrRules: "Formato padrão: METAR [Aeródromo] [Data/Hora UTC] [Vento] [Visibilidade] [Fenômenos] [Nuvens] [Temp/Orvalho] [QNH] [Tendência]",
      relatedArticleSlug: "como-interpretar-metar",
    },
    {
      slug: "taf",
      term: "TAF",
      phoneticOrAcronym: "Terminal Aerodrome Forecast",
      category: "Meteorologia",
      shortDefinition: "O TAF é uma previsão meteorológica oficial elaborada para a área terminal de um aeródromo, cobrindo uma janela temporal de 24 a 30 horas.",
      fullExplanation: [
        "Ao contrário do METAR (que relata o tempo presente observado), o TAF projeta a evolução das condições meteorológicas futuras através de grupos de mudança como FM (From), BECMG (Becoming) e TEMPO (Temporary), além de probabilidades (PROB30/PROB40).",
        "É a peça-chave para o planejamento IFR e a seleção regulamentar de aeródromos alternados.",
      ],
      relatedArticleSlug: "como-interpretar-taf",
    },
    {
      slug: "ils",
      term: "ILS",
      phoneticOrAcronym: "Instrument Landing System",
      category: "Radionavegação",
      shortDefinition: "O ILS é um sistema de aproximação de precisão por instrumentos que fornece orientação lateral no eixo da pista (Localizer) e vertical de descida (Glide Slope).",
      fullExplanation: [
        "O Localizer opera em frequências VHF (108.10 a 111.95 MHz) e guia o piloto exatamente no alinhamento central da pista.",
        "O Glide Slope opera em UHF e projeta a rampa eletrônica padrão de 3 graus até a cabeceira, permitindo aproximações seguras com baixa visibilidade até a Altitude de Decisão (DA/DH).",
      ],
      relatedArticleSlug: "entendendo-ils",
    },
    {
      slug: "vor",
      term: "VOR",
      phoneticOrAcronym: "VHF Omnidirectional Range",
      category: "Radionavegação",
      shortDefinition: "O VOR é uma estação transmissora terrestre de radionavegação em VHF que emite 360 radiais magnéticas para orientação e marcação de posição.",
      fullExplanation: [
        "Cada radial representa um rumo magnético que emana da estação. Com o instrumento CDI (Course Deviation Indicator) e o seletor OBS, o piloto pode voar para a estação (TO) ou afastando-se dela (FROM).",
      ],
      relatedArticleSlug: "vor-na-pratica",
    },
    {
      slug: "rnav",
      term: "RNAV",
      phoneticOrAcronym: "Area Navigation (Navegação de Área)",
      category: "Navegação IFR",
      shortDefinition: "RNAV é um método de navegação aérea que permite o voo direto entre quaisquer waypoints definidos por coordenadas geográficas, sem necessidade de sobrevoar antenas terrestres.",
      fullExplanation: [
        "Baseia-se em receptores GNSS (GPS/Galileo), sistemas inerciais (INS/IRS) e triangulação DME/DME.",
        "Proporciona rotas mais curtas, menor consumo de combustível e procedimentos terminais otimizados.",
      ],
      relatedArticleSlug: "rnav-e-rnp",
    },
    {
      slug: "rnp",
      term: "RNP",
      phoneticOrAcronym: "Required Navigation Performance",
      category: "Navegação IFR",
      shortDefinition: "RNP é uma especificação de navegação baseada em performance (PBN) que exige sistemas a bordo com monitoramento contínuo e alerta automático de precisão.",
      fullExplanation: [
        "A especificação define a precisão lateral em milhas náuticas em 95% do tempo (ex: RNP 1 = 1 NM; RNP 0.3 = 0,3 NM).",
        "Caso o sinal satellite seja degradado, o sistema alerta a tripulação instantaneamente para descontinuar o procedimento.",
      ],
      relatedArticleSlug: "rnav-e-rnp",
    },
    {
      slug: "sid",
      term: "SID",
      phoneticOrAcronym: "Standard Instrument Departure",
      category: "Procedimentos IFR",
      shortDefinition: "A SID é uma rota padronizada de saída por instrumentos que conecta a pista de decolagem à estrutura de aerovias em rota.",
      fullExplanation: [
        "Define trajetórias de subida, restrições obrigatórias de altitude e velocidade, além de gradientes mínimos de subida para garantir separação segura de obstáculos e outros tráfegos.",
      ],
      relatedArticleSlug: "sid-e-star",
    },
    {
      slug: "star",
      term: "STAR",
      phoneticOrAcronym: "Standard Terminal Arrival Route",
      category: "Procedimentos IFR",
      shortDefinition: "A STAR é uma rota padronizada de chegada por instrumentos que conduz a aeronave da aerovia até os fixos de aproximação terminal (IAF) do aeródromo.",
      fullExplanation: [
        "Organiza e sequencia o fluxo de descida de múltiplos tráfegos, especificando restrições de altitude em cada fixo e limites de velocidade.",
      ],
      relatedArticleSlug: "sid-e-star",
    },
    {
      slug: "qnh",
      term: "QNH",
      phoneticOrAcronym: "Ajuste Barométrico Altimétrico ao Nível Médio do Mar",
      category: "Altimetria",
      shortDefinition: "O QNH é o ajuste barométrico no altímetro que faz o instrumento indicar a altitude real em relação ao nível médio do mar (MSL).",
      fullExplanation: [
        "Quando o altímetro é ajustado com o QNH no solo de um aeródromo, ele indicará exatamente a elevação oficial daquele aeródromo.",
      ],
      relatedArticleSlug: "qnh-qfe-qne",
    },
    {
      slug: "qfe",
      term: "QFE",
      phoneticOrAcronym: "Ajuste Barométrico Altimétrico ao Nível do Aeródromo",
      category: "Altimetria",
      shortDefinition: "O QFE é o ajuste barométrico no qual o altímetro passa a indicar a altura da aeronave diretamente acima da cabeceira do aeródromo.",
      fullExplanation: [
        "Com o QFE ajustado no solo do aeródromo, o altímetro indicará rigorosamente zero pés de altura.",
      ],
      relatedArticleSlug: "qnh-qfe-qne",
    },
    {
      slug: "qne",
      term: "QNE",
      phoneticOrAcronym: "Ajuste de Pressão Padrão (1013.2 hPa / 29.92 inHg)",
      category: "Altimetria",
      shortDefinition: "QNE refere-se à altitude de pressão indicada quando o altímetro é calibrado na pressão atmosférica padrão de 1013.2 hPa / 29.92 inHg.",
      fullExplanation: [
        "Utilizado por todas as aeronaves em voo de cruzeiro acima da altitude de transição para garantir separação vertical padronizada nos Níveis de Voo (FL).",
      ],
      relatedArticleSlug: "niveis-de-voo",
    },
    {
      slug: "tod",
      term: "Top of Descent (TOD)",
      phoneticOrAcronym: "Ponto Ideal de Início de Descida",
      category: "Planejamento",
      shortDefinition: "O Top of Descent (TOD) é o ponto geográfico calculado ao longo da rota em que a aeronave deve iniciar a descida do nível de cruzeiro para atingir a altitude alvo no perfil ideal de 3 graus.",
      fullExplanation: [
        "Calculado mentalmente através da Regra 3:1 (Altitude a perder em milhares de pés × 3 = milhas náuticas de distância).",
      ],
      keyFormulaOrRules: "Distância (NM) = (Altitude Atual - Altitude Alvo) / 1000 × 3 + Margem de Desaceleração",
      relatedArticleSlug: "top-of-descent",
      relatedTool: "tod",
    },
    {
      slug: "dme",
      term: "DME",
      phoneticOrAcronym: "Distance Measuring Equipment",
      category: "Radionavegação",
      shortDefinition: "O DME é um equipamento de radionavegação que mede a distância em linha de visada (Slant Range) entre a aeronave e a antena transmissora no solo em milhas náuticas.",
      fullExplanation: [
        "Como mede a hipotenusa da distância real, quando a aeronave sobrevoa diretamente a antena do DME em grande altitude, o instrumento indicará a altura em milhas em vez de zero.",
      ],
      relatedArticleSlug: "entendendo-ils",
    },
    {
      slug: "vfr",
      term: "VFR",
      phoneticOrAcronym: "Visual Flight Rules",
      category: "Regulamentos",
      shortDefinition: "VFR são as Regras de Voo Visual sob as quais a aeronave é operada mantendo referências visuais com o terreno e o horizonte natural em condições VMC.",
      fullExplanation: [
        "A tripulação é responsável primária pela separação de obstáculos e outras aeronaves através do princípio 'ver e evitar'.",
      ],
      relatedArticleSlug: "vfr-x-ifr",
    },
    {
      slug: "ifr",
      term: "IFR",
      phoneticOrAcronym: "Instrument Flight Rules",
      category: "Regulamentos",
      shortDefinition: "IFR são as Regras de Voo por Instrumentos sob as quais o voo é conduzido com base exclusiva nos instrumentos de bordo e sob controle de tráfego aéreo (ATC).",
      fullExplanation: [
        "Permite a operação segura em Condições Meteorológicas de Voo por Instrumentos (IMC), dentro de nuvens e em baixa visibilidade.",
      ],
      relatedArticleSlug: "vfr-x-ifr",
    },
    {
      slug: "notam",
      term: "NOTAM",
      phoneticOrAcronym: "Notice to Air Missions / Notice to Airmen",
      category: "Informação Aeronáutica",
      shortDefinition: "O NOTAM é um aviso oficial internacional que contém informações relativas ao estabelecimento, condição ou modificação de qualquer instalação aeronáutica, serviço, procedimento ou perigo.",
      fullExplanation: [
        "Avisos de pistas fechadas, balizamentos inoperantes, restrições de espaço aéreo militar ou obras em aeródromos são divulgados via NOTAM.",
      ],
      relatedArticleSlug: "planejamento-ifr",
    },
  ],
  en: [
    {
      slug: "metar",
      term: "METAR",
      phoneticOrAcronym: "Meteorological Aerodrome Report",
      category: "Aviation Weather",
      shortDefinition: "A METAR is a standardized international aviation routine weather report describing observed surface conditions at an aerodrome at a specific time.",
      fullExplanation: [
        "Issued hourly or half-hourly by aeronautical weather stations, a METAR details true wind direction, gusts, horizontal visibility, Runway Visual Range (RVR), weather phenomena, cloud coverage layers, temperature, dew point, and altimeter setting (QNH/Altimeter).",
      ],
      keyFormulaOrRules: "Standard syntax: METAR [Station] [Timestamp UTC] [Wind] [Visibility] [Phenomena] [Clouds] [Temp/Dew] [Altimeter] [Remarks]",
      relatedArticleSlug: "como-interpretar-metar",
    },
    {
      slug: "taf",
      term: "TAF",
      phoneticOrAcronym: "Terminal Aerodrome Forecast",
      category: "Aviation Weather",
      shortDefinition: "A TAF is an official airport terminal weather forecast established for a 5-statute-mile radius over a 24 to 30-hour period.",
      fullExplanation: [
        "Unlike a METAR (which reports observed present weather), a TAF outlines expected future atmospheric developments using change groups (FM, BECMG, TEMPO) and probability intervals (PROB30/40).",
      ],
      relatedArticleSlug: "como-interpretar-taf",
    },
    {
      slug: "ils",
      term: "ILS",
      phoneticOrAcronym: "Instrument Landing System",
      category: "Radio Navigation",
      shortDefinition: "An ILS is a standard precision instrument approach system providing lateral runway centerline guidance (Localizer) and vertical glide path guidance (Glide Slope).",
      fullExplanation: [
        "The Localizer operates on VHF (108.10 to 111.95 MHz) to provide azimuth runway alignment. The Glide Slope operates on paired UHF frequencies providing a standard 3-degree descent profile down to Decision Altitude (DA).",
      ],
      relatedArticleSlug: "entendendo-ils",
    },
    {
      slug: "vor",
      term: "VOR",
      phoneticOrAcronym: "VHF Omnidirectional Range",
      category: "Radio Navigation",
      shortDefinition: "A VOR is a ground-based radio navigation transmitter that radiates 360 magnetic radials outward for aircraft course tracking and position fixing.",
      fullExplanation: [
        "Pilots select radial courses on their Course Deviation Indicator (CDI) with the Omni Bearing Selector (OBS), utilizing TO/FROM flags to navigate toward or away from the beacon.",
      ],
      relatedArticleSlug: "vor-na-pratica",
    },
    {
      slug: "rnav",
      term: "RNAV",
      phoneticOrAcronym: "Area Navigation",
      category: "IFR Navigation",
      shortDefinition: "RNAV is a flight navigation method allowing direct point-to-point routing between geographic waypoints without the need to overfly ground-based navigation aids.",
      fullExplanation: [
        "RNAV utilizes GNSS (GPS/Galileo), Inertial Reference Systems (IRS), and multi-DME triangulation to optimize routes and shorten flight times.",
      ],
      relatedArticleSlug: "rnav-e-rnp",
    },
    {
      slug: "rnp",
      term: "RNP",
      phoneticOrAcronym: "Required Navigation Performance",
      category: "IFR Navigation",
      shortDefinition: "RNP is a Performance-Based Navigation (PBN) specification requiring onboard performance monitoring and alerting (OPMA) to guarantee containment accuracy.",
      fullExplanation: [
        "Defines required navigation accuracy in nautical miles 95% of flight time (e.g., RNP 1 = 1 NM; RNP 0.3 = 0.3 NM). If accuracy degrades, avionics alert the flight crew immediately.",
      ],
      relatedArticleSlug: "rnav-e-rnp",
    },
    {
      slug: "sid",
      term: "SID",
      phoneticOrAcronym: "Standard Instrument Departure",
      category: "IFR Procedures",
      shortDefinition: "A SID is a published IFR departure route linking the takeoff runway end to enroute airway structures with obstacle clearance climb gradients.",
      fullExplanation: [
        "Specifies departure headings, minimum climb gradients, altitude constraints, and enroute transition fixes to ensure efficient air traffic separation.",
      ],
      relatedArticleSlug: "sid-e-star",
    },
    {
      slug: "star",
      term: "STAR",
      phoneticOrAcronym: "Standard Terminal Arrival Route",
      category: "IFR Procedures",
      shortDefinition: "A STAR is a published IFR arrival procedure channeling aircraft from cruising airways down to initial approach fixes (IAF) in terminal airspace.",
      fullExplanation: [
        "Organizes arrival streams, enforces speed/altitude restrictions at waypoints, and prepares aircraft for final instrument approaches.",
      ],
      relatedArticleSlug: "sid-e-star",
    },
    {
      slug: "qnh",
      term: "QNH",
      phoneticOrAcronym: "Altimeter Setting Referenced to Mean Sea Level (MSL)",
      category: "Altimetry",
      shortDefinition: "QNH is the barometric altimeter setting that calibrates the instrument to display true altitude above Mean Sea Level (MSL).",
      fullExplanation: [
        "When QNH is set on the ground at an airport, the altimeter displays the surveyed official field elevation of the airfield.",
      ],
      relatedArticleSlug: "qnh-qfe-qne",
    },
    {
      slug: "qfe",
      term: "QFE",
      phoneticOrAcronym: "Altimeter Setting Referenced to Airfield Pressure",
      category: "Altimetry",
      shortDefinition: "QFE is the barometric altimeter setting that zeroes the instrument on the runway surface, displaying height above airport level (AGL).",
      fullExplanation: [
        "With QFE set on the ground, the altimeter reads exactly zero feet.",
      ],
      relatedArticleSlug: "qnh-qfe-qne",
    },
    {
      slug: "qne",
      term: "QNE",
      phoneticOrAcronym: "Standard Altimeter Pressure Datum (29.92 inHg / 1013.2 hPa)",
      category: "Altimetry",
      shortDefinition: "QNE refers to standard pressure altitude indicated when the barometric subscale is set to the standard datum of 29.92 inHg / 1013.2 hPa.",
      fullExplanation: [
        "Mandatory for all cruising aircraft above transition altitude to ensure standardized vertical separation at designated Flight Levels (FL).",
      ],
      relatedArticleSlug: "niveis-de-voo",
    },
    {
      slug: "tod",
      term: "Top of Descent (TOD)",
      phoneticOrAcronym: "Calculated Descent Initiation Point",
      category: "Flight Planning",
      shortDefinition: "Top of Descent (TOD) is the computed geographic point along a flight route where an aircraft must begin descending from cruise altitude to reach the target fix on a 3-degree descent profile.",
      fullExplanation: [
        "Calculated using the standard 3:1 aviation rule (Altitude to lose in thousands of feet × 3 = nautical miles before target fix).",
      ],
      keyFormulaOrRules: "Descent Distance (NM) = (Cruise Altitude - Target Altitude) / 1000 × 3 + Deceleration Buffer",
      relatedArticleSlug: "top-of-descent",
      relatedTool: "tod",
    },
    {
      slug: "dme",
      term: "DME",
      phoneticOrAcronym: "Distance Measuring Equipment",
      category: "Radio Navigation",
      shortDefinition: "DME is a radio navigation transponder that measures the slant-range distance in nautical miles between an aircraft and a ground beacon.",
      fullExplanation: [
        "Because it measures direct slant range (hypotenuse), flying directly over a DME station at high altitude displays altitude in nautical miles rather than zero.",
      ],
      relatedArticleSlug: "entendendo-ils",
    },
    {
      slug: "vfr",
      term: "VFR",
      phoneticOrAcronym: "Visual Flight Rules",
      category: "Aviation Regulations",
      shortDefinition: "VFR are Visual Flight Rules under which an aircraft is flown with continuous visual reference to the ground and natural horizon in Visual Meteorological Conditions (VMC).",
      fullExplanation: [
        "Pilots are primarily responsible for obstacle and traffic separation under the see-and-avoid principle.",
      ],
      relatedArticleSlug: "vfr-x-ifr",
    },
    {
      slug: "ifr",
      term: "IFR",
      phoneticOrAcronym: "Instrument Flight Rules",
      category: "Aviation Regulations",
      shortDefinition: "IFR are Instrument Flight Rules allowing aircraft operations in Instrument Meteorological Conditions (IMC) solely with cockpit instruments under ATC separation.",
      fullExplanation: [
        "Enables safe flight inside clouds, fog, and low visibility environments along coded airway networks.",
      ],
      relatedArticleSlug: "vfr-x-ifr",
    },
    {
      slug: "notam",
      term: "NOTAM",
      phoneticOrAcronym: "Notice to Air Missions",
      category: "Aeronautical Information",
      shortDefinition: "A NOTAM is an official telecommunication notice containing vital information concerning the establishment, condition, or change in any aeronautical facility, service, or hazard.",
      fullExplanation: [
        "Contains crucial alerts about closed runways, unserviceable navigation aids, military airspace restrictions, and temporary flight hazards.",
      ],
      relatedArticleSlug: "planejamento-ifr",
    },
  ],
  es: [
    {
      slug: "metar",
      term: "METAR",
      phoneticOrAcronym: "Meteorological Aerodrome Report",
      category: "Meteorología",
      shortDefinition: "El METAR es el informe meteorológico estandarizado internacional que describe las condiciones observadas en superficie en un aeródromo en una hora determinada.",
      fullExplanation: [
        "Publicado cada hora o media hora, detalla dirección y rachas de viento, visibilidad horizontal, alcance visual en pista (RVR), fenómenos meteorológicos, cobertura nubosa, temperatura, punto de rocío y calaje QNH.",
      ],
      keyFormulaOrRules: "Formato: METAR [Aeródromo] [Fecha/Hora UTC] [Viento] [Visibilidad] [Fenómenos] [Nubes] [Temp/Rocío] [QNH]",
      relatedArticleSlug: "como-interpretar-metar",
    },
    {
      slug: "taf",
      term: "TAF",
      phoneticOrAcronym: "Terminal Aerodrome Forecast",
      category: "Meteorología",
      shortDefinition: "El TAF es el pronóstico meteorológico oficial elaborado para el área terminal de un aeródromo para un periodo de 24 a 30 horas.",
      fullExplanation: [
        "A diferencia del METAR, proyecta la evolución meteorológica futura mediante grupos de cambio (FM, BECMG, TEMPO) y probabilidades (PROB30/40).",
      ],
      relatedArticleSlug: "como-interpretar-taf",
    },
    {
      slug: "ils",
      term: "ILS",
      phoneticOrAcronym: "Instrument Landing System",
      category: "Radionavegación",
      shortDefinition: "El ILS es un sistema de aproximación de precisión por instrumentos que proporciona guía lateral en el eje de pista (Localizador) y vertical de descenso (Glide Slope).",
      fullExplanation: [
        "El Localizador opera en VHF para alineación con el eje de pista y el Glide Slope opera en UHF proyectando una senda de 3 grados hasta la altitud de decisión (DA).",
      ],
      relatedArticleSlug: "entendendo-ils",
    },
    {
      slug: "vor",
      term: "VOR",
      phoneticOrAcronym: "VHF Omnidirectional Range",
      category: "Radionavegación",
      shortDefinition: "El VOR es una estación terrestre de radionavegación en VHF que emite 360 radiales magnéticas para seguimiento de derrota y orientación espacial.",
      fullExplanation: [
        "Cada radial emana de la estación. El piloto selecciona el curso en el OBS y utiliza las banderas TO/FROM para navegar hacia o desde la radioayuda.",
      ],
      relatedArticleSlug: "vor-na-pratica",
    },
    {
      slug: "rnav",
      term: "RNAV",
      phoneticOrAcronym: "Area Navigation (Navegación de Área)",
      category: "Navegación IFR",
      shortDefinition: "RNAV es un método de navegación que permite volar trayectorias directas entre waypoints definidos por coordenadas, sin sobrevolar radioayudas en tierra.",
      fullExplanation: [
        "Se apoya en receptores GNSS, sistemas inerciales y triangulación DME/DME para acortar rutas y optimizar el consumo de combustible.",
      ],
      relatedArticleSlug: "rnav-e-rnp",
    },
    {
      slug: "rnp",
      term: "RNP",
      phoneticOrAcronym: "Required Navigation Performance",
      category: "Navegación IFR",
      shortDefinition: "RNP es una especificación PBN que exige monitorización y alerta de rendimiento a bordo (OPMA) para garantizar precisión y contención lateral.",
      fullExplanation: [
        "Define la precisión en millas náuticas el 95% del tiempo (ej: RNP 1 = 1 NM). Si el sistema pierde integridad, alerta a la tripulación inmediatamente.",
      ],
      relatedArticleSlug: "rnav-e-rnp",
    },
    {
      slug: "sid",
      term: "SID",
      phoneticOrAcronym: "Standard Instrument Departure",
      category: "Procedimientos IFR",
      shortDefinition: "La SID es una ruta de salida instrumental normalizada que conecta el despegue con la estructura de aerovías en ruta.",
      fullExplanation: [
        "Fija rumbos de salida, gradientes mínimos de ascenso para franqueamiento de obstáculos y restricciones de velocidad y altitud.",
      ],
      relatedArticleSlug: "sid-e-star",
    },
    {
      slug: "star",
      term: "STAR",
      phoneticOrAcronym: "Standard Terminal Arrival Route",
      category: "Procedimientos IFR",
      shortDefinition: "La STAR es una ruta de llegada instrumental normalizada que canaliza el tráfico desde las aerovías hasta los fijos de aproximación terminal (IAF).",
      fullExplanation: [
        "Estandariza los descensos hacia el área terminal y programa restricciones de altitud y velocidad en cada punto.",
      ],
      relatedArticleSlug: "sid-e-star",
    },
    {
      slug: "qnh",
      term: "QNH",
      phoneticOrAcronym: "Calaje Altimétrico al Nivel Medio del Mar",
      category: "Altimetría",
      shortDefinition: "El QNH es el calaje barométrico que referencia el altímetro a la presión a nivel del mar (MSL), marcando la elevación del aeródromo en tierra.",
      fullExplanation: [
        "Permite mantener conciencia de altitud real respecto al terreno y obstáculos durante despegues, aproximaciones y vuelos visuales.",
      ],
      relatedArticleSlug: "qnh-qfe-qne",
    },
    {
      slug: "qfe",
      term: "QFE",
      phoneticOrAcronym: "Calaje Altimétrico al Nivel del Aeródromo",
      category: "Altimetría",
      shortDefinition: "El QFE es el calaje barométrico en el cual el altímetro marca cero pies de altura sobre la pista en tierra.",
      fullExplanation: [
        "Indica altura relativa directamente sobre la elevación del aeródromo de referencia.",
      ],
      relatedArticleSlug: "qnh-qfe-qne",
    },
    {
      slug: "qne",
      term: "QNE",
      phoneticOrAcronym: "Calaje Altimétrico Estándar (1013.2 hPa / 29.92 inHg)",
      category: "Altimetría",
      shortDefinition: "QNE es la altitud de presión indicada cuando el altímetro se cala en la presión estándar de 1013.2 hPa / 29.92 inHg.",
      fullExplanation: [
        "Obligatorio para todas las aeronaves en crucero por encima de la altitud de transición para estandarizar los Niveles de Vuelo (FL).",
      ],
      relatedArticleSlug: "niveis-de-voo",
    },
    {
      slug: "tod",
      term: "Top of Descent (TOD)",
      phoneticOrAcronym: "Punto de Inicio de Descenso",
      category: "Planificación",
      shortDefinition: "El Top of Descent (TOD) es el punto geográfico en ruta donde el avión debe iniciar el descenso para alcanzar la altitud objetivo en un perfil estabilizado de 3 grados.",
      fullExplanation: [
        "Calculado con la Regra 3:1 (Altitud a perder en miles de pies × 3 = distancia en millas náuticas).",
      ],
      keyFormulaOrRules: "Distancia (NM) = (Altitud de Crucero - Altitud Objetivo) / 1000 × 3 + Margen de Desaceleración",
      relatedArticleSlug: "top-of-descent",
      relatedTool: "tod",
    },
    {
      slug: "dme",
      term: "DME",
      phoneticOrAcronym: "Distance Measuring Equipment",
      category: "Radionavegación",
      shortDefinition: "El DME mide la distancia en línea de visión oblicua (Slant Range) en millas náuticas entre el avión y la estación terrestre.",
      fullExplanation: [
        "Al medir la distancia directa hipotenusa, sobrevolar una antena DME a gran altitud indicará la altura en millas en lugar de cero.",
      ],
      relatedArticleSlug: "entendendo-ils",
    },
    {
      slug: "vfr",
      term: "VFR",
      phoneticOrAcronym: "Visual Flight Rules",
      category: "Regulaciones",
      shortDefinition: "VFR son las Reglas de Vuelo Visual bajo las cuales el piloto navega con referencia visual constante al terreno y al horizonte en condiciones VMC.",
      fullExplanation: [
        "La tripulación es responsable primaria de la separación respecto a obstáculos y otros tráficos mediante 'ver y evitar'.",
      ],
      relatedArticleSlug: "vfr-x-ifr",
    },
    {
      slug: "ifr",
      term: "IFR",
      phoneticOrAcronym: "Instrument Flight Rules",
      category: "Regulaciones",
      shortDefinition: "IFR son las Reglas de Vuelo Instrumental que permiten volar en condiciones meteorológicas adversas (IMC) basados únicamente en instrumentos y control ATC.",
      fullExplanation: [
        "Permite operaciones seguras dentro de nubes y baja visibilidad a lo largo de la red de aerovías.",
      ],
      relatedArticleSlug: "vfr-x-ifr",
    },
    {
      slug: "notam",
      term: "NOTAM",
      phoneticOrAcronym: "Notice to Air Missions",
      category: "Información Aeronáutica",
      shortDefinition: "Un NOTAM es un aviso oficial que contiene información esencial sobre el estado, cambios o peligros en instalaciones, servicios y procedimientos aeronáuticos.",
      fullExplanation: [
        "Avisos de pistas cerradas, radioayudas inoperativas o zonas de vuelo restringidas se notifican mediante NOTAM.",
      ],
      relatedArticleSlug: "planejamento-ifr",
    },
  ],
  fr: [
    {
      slug: "metar",
      term: "METAR",
      phoneticOrAcronym: "Meteorological Aerodrome Report",
      category: "Météorologie",
      shortDefinition: "Le METAR est le message d'observation météorologique d'aérodrome standardisé décrivant les conditions en surface à une heure précise.",
      fullExplanation: [
        "Émis toutes les heures ou demi-heures, il détaille le vent vrai, les rafales, la visibilité, la portée visuelle de piste (RVR), le temps présent, la nébulosité, la température, le point de rosée et le calage QNH.",
      ],
      keyFormulaOrRules: "Syntaxe : METAR [Aérodrome] [Date/Heure UTC] [Vent] [Visibilité] [Phénomènes] [Nuages] [Temp/Rosée] [QNH]",
      relatedArticleSlug: "como-interpretar-metar",
    },
    {
      slug: "taf",
      term: "TAF",
      phoneticOrAcronym: "Terminal Aerodrome Forecast",
      category: "Météorologie",
      shortDefinition: "Le TAF est une prévision météorologique officielle établie pour la zone terminale d'un aérodrome sur une période de 24 à 30 heures.",
      fullExplanation: [
        "À la différence du METAR, il projette l'évolution atmosphérique future par des groupes d'évolution (FM, BECMG, TEMPO) et des probabilités (PROB30/40).",
      ],
      relatedArticleSlug: "como-interpretar-taf",
    },
    {
      slug: "ils",
      term: "ILS",
      phoneticOrAcronym: "Instrument Landing System",
      category: "Radionavigation",
      shortDefinition: "L'ILS est un système d'approche aux instruments de précision assurant le guidage latéral d'axe de piste (Localizer) et vertical de descente (Glide Slope).",
      fullExplanation: [
        "Le Localizer émet en VHF pour l'alignement de piste ; le Glide Slope émet en UHF projetant le plan de descente standard à 3 degrés jusqu'à la Decision Altitude (DA).",
      ],
      relatedArticleSlug: "entendendo-ils",
    },
    {
      slug: "vor",
      term: "VOR",
      phoneticOrAcronym: "VHF Omnidirectional Range",
      category: "Radionavigation",
      shortDefinition: "Le VOR est une balise terrestre de radionavigation en VHF émettant 360 radiales magnétiques pour le guidage de route et le recalage de position.",
      fullExplanation: [
        "Le pilote sélectionne une radiale avec le bouton OBS et suit l'indicateur CDI avec les drapeaux TO/FROM pour voler vers ou depuis la station.",
      ],
      relatedArticleSlug: "vor-na-pratica",
    },
    {
      slug: "rnav",
      term: "RNAV",
      phoneticOrAcronym: "Area Navigation (Navigation de Surface)",
      category: "Navigation IFR",
      shortDefinition: "La RNAV est une méthode de navigation permettant des trajectoires directes entre waypoints géographiques sans survol de balises au sol.",
      fullExplanation: [
        "S'appuie sur le GNSS (GPS/Galileo), les centrales à inertie (IRS) et la triangulation DME/DME pour optimiser les routes aériennes.",
      ],
      relatedArticleSlug: "rnav-e-rnp",
    },
    {
      slug: "rnp",
      term: "RNP",
      phoneticOrAcronym: "Required Navigation Performance",
      category: "Navigation IFR",
      shortDefinition: "La RNP est une spécification PBN imposant la surveillance et l'alerte de performance à bord (OPMA) pour garantir le maintien dans le couloir de guidage.",
      fullExplanation: [
        "Définit la précision en nautiques 95 % du temps (ex : RNP 1 = 1 NM). En cas de dégradation du signal satellite, le système alerte immédiatement l'équipage.",
      ],
      relatedArticleSlug: "rnav-e-rnp",
    },
    {
      slug: "sid",
      term: "SID",
      phoneticOrAcronym: "Standard Instrument Departure",
      category: "Procédures IFR",
      shortDefinition: "La SID est une procédure de départ normalisée aux instruments reliant la piste de décollage aux voies aériennes de croisière.",
      fullExplanation: [
        "Fixe trajectoire de montée, gradients minimaux pour l'évitement des obstacles et contraintes d'altitude et de vitesse.",
      ],
      relatedArticleSlug: "sid-e-star",
    },
    {
      slug: "star",
      term: "STAR",
      phoneticOrAcronym: "Standard Terminal Arrival Route",
      category: "Procédures IFR",
      shortDefinition: "La STAR est une procédure d'arrivée normalisée aux instruments guidant l'avion des voies aériennes vers les repères d'approche initiale (IAF).",
      fullExplanation: [
        "Organise les flux de descente terminale et échelonne les contraintes d'altitude et de vitesse à chaque repère.",
      ],
      relatedArticleSlug: "sid-e-star",
    },
    {
      slug: "qnh",
      term: "QNH",
      phoneticOrAcronym: "Calage Altimétrique par rapport au Niveau de la Mer (MSL)",
      category: "Altimétrie",
      shortDefinition: "Le QNH est le calage barométrique qui référence l'altimètre par rapport au niveau moyen de la mer (MSL), indiquant l'élévation du terrain au sol.",
      fullExplanation: [
        "Permet de conserver la marge de franchissement des obstacles et du relief lors des départs et approches.",
      ],
      relatedArticleSlug: "qnh-qfe-qne",
    },
    {
      slug: "qfe",
      term: "QFE",
      phoneticOrAcronym: "Calage Altimétrique par rapport au Niveau du Terrain",
      category: "Altimétrie",
      shortDefinition: "Le QFE est le calage barométrique qui remet l'altimètre à zéro sur la piste, affichant la hauteur au-dessus de l'aérodrome.",
      fullExplanation: [
        "Indique directement la hauteur par rapport au seuil de piste de l'aérodrome.",
      ],
      relatedArticleSlug: "qnh-qfe-qne",
    },
    {
      slug: "qne",
      term: "QNE",
      phoneticOrAcronym: "Calage de Pression Standard (1013.2 hPa / 29.92 inHg)",
      category: "Altimétrie",
      shortDefinition: "Le QNE correspond à l'altitude-pression indiquée lorsque l'altimètre est calé sur la pression standard de 1013.2 hPa / 29.92 inHg.",
      fullExplanation: [
        "Obligatoire pour tous les aéronefs en croisière au-dessus de l'altitude de transition pour standardiser les niveaux de vol (FL).",
      ],
      relatedArticleSlug: "niveis-de-voo",
    },
    {
      slug: "tod",
      term: "Top of Descent (TOD)",
      phoneticOrAcronym: "Début de Descente Calculé",
      category: "Planification",
      shortDefinition: "Le Top of Descent (TOD) est le point géographique en route où l'avion doit débuter sa descente de croisière pour rejoindre l'altitude cible sur un plan standard à 3 degrés.",
      fullExplanation: [
        "Calculé selon la Règle 3:1 (Altitude à perdre en milliers de pieds × 3 = distance en nautiques).",
      ],
      keyFormulaOrRules: "Distance (NM) = (Altitude Croisière - Altitude Cible) / 1000 × 3 + Marge de Décélération",
      relatedArticleSlug: "top-of-descent",
      relatedTool: "tod",
    },
    {
      slug: "dme",
      term: "DME",
      phoneticOrAcronym: "Distance Measuring Equipment",
      category: "Radionavigation",
      shortDefinition: "Le DME mesure la distance oblique directe (Slant Range) en nautiques entre l'aéronef et la balise au sol.",
      fullExplanation: [
        "Mesurant l'hypoténuse, le survol d'une balise DME à haute altitude affichera la hauteur en nautiques au lieu de zéro.",
      ],
      relatedArticleSlug: "entendendo-ils",
    },
    {
      slug: "vfr",
      term: "VFR",
      phoneticOrAcronym: "Visual Flight Rules",
      category: "Réglementation",
      shortDefinition: "Le VFR désigne les Règles de Vol à Vue selon lesquelles le pilote navigue avec référence visuelle continue au sol et à l'horizon en conditions VMC.",
      fullExplanation: [
        "L'équipage assure la prévention des abordages et l'évitement des obstacles selon le principe 'voir et éviter'.",
      ],
      relatedArticleSlug: "vfr-x-ifr",
    },
    {
      slug: "ifr",
      term: "IFR",
      phoneticOrAcronym: "Instrument Flight Rules",
      category: "Réglementation",
      shortDefinition: "L'IFR désigne les Règles de Vol aux Instruments permettant d'évoluer en conditions météorologiques sans visibilité (IMC) sous contrôle ATC.",
      fullExplanation: [
        "Permet de voler en toute sécurité à l'intérieur des nuages et par faible visibilité sur les voies aériennes.",
      ],
      relatedArticleSlug: "vfr-x-ifr",
    },
    {
      slug: "notam",
      term: "NOTAM",
      phoneticOrAcronym: "Notice to Air Missions",
      category: "Information Aéronautique",
      shortDefinition: "Un NOTAM est un avis officiel diffusant des informations indispensables relatives à l'état, la modification ou le danger d'équipements ou de procédures aéronautiques.",
      fullExplanation: [
        "Pistes fermées, balises hors service ou zones militaires actives sont publiées via NOTAM.",
      ],
      relatedArticleSlug: "planejamento-ifr",
    },
  ],
};

export function getGlossaryTerms(locale: ValidLocale): GlossaryTerm[] {
  return GLOSSARY_DATA[locale] || GLOSSARY_DATA["pt-br"];
}

export function getGlossaryTermBySlug(locale: ValidLocale, slug: string): GlossaryTerm | undefined {
  const list = getGlossaryTerms(locale);
  return list.find((t) => t.slug === slug);
}

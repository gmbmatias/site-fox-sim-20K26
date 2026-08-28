import { ValidLocale } from "../i18n";

export type CourseCode = "pp" | "pc" | "ifr" | "mlte";

export type Lesson = {
  id: string;
  title: string;
  duration: number;
  summary: string;
  objectives: string[];
};

export type Course = {
  code: CourseCode;
  title: string;
  shortTitle: string;
  description: string;
  accent: string;
  estimatedHours: number;
  level: string;
  regulatoryNote?: string;
  modules: { title: string; description: string; lessons: Lesson[] }[];
};

export const COURSES_DATA: Record<ValidLocale, Record<CourseCode, Course>> = {
  "pt-br": {
    pp: {
      code: "pp",
      title: "Piloto Privado",
      shortTitle: "PP",
      description: "A base indispensável para compreender aerodinâmica, meteorologia, navegação e operação segura.",
      accent: "#5de4df",
      estimatedHours: 32,
      level: "Fundamentos",
      regulatoryNote: "Conteúdo focado nos fundamentos teóricos exigidos na banca de Piloto Privado da ANAC e padronização ICAO.",
      modules: [
        {
          title: "Fundamentos do voo",
          description: "As forças, os controles de voo e o comportamento aerodinâmico básico da aeronave.",
          lessons: [
            { id: "pp-forcas", title: "As quatro forças do voo", duration: 28, summary: "Sustentação, peso, tração e arrasto formam o equilíbrio dinâmico do voo. Mudanças de atitude, potência e configuração alteram esse equilíbrio.", objectives: ["Relacionar velocidade e sustentação", "Distinguir arrasto induzido e parasita", "Interpretar voo reto, subida e descida"] },
            { id: "pp-controles", title: "Eixos, comandos e estabilidade", duration: 32, summary: "Ailerons comandam rolagem, profundor comanda arfagem e leme atua na guinada. A estabilidade descreve a tendência de retornar ou afastar-se de uma condição inicial.", objectives: ["Identificar os três eixos da aeronave", "Associar comandos e movimentos", "Compreender estabilidade longitudinal e lateral"] },
            { id: "pp-estol", title: "Ângulo de ataque e estol", duration: 35, summary: "O estol ocorre quando o ângulo de ataque crítico é excedido, não por uma velocidade fixa. Peso, fator de carga e configuração mudam a velocidade indicada na qual ele pode ocorrer.", objectives: ["Reconhecer sinais de aproximação do estol", "Explicar o efeito do fator de carga", "Reforçar prioridade de redução do ângulo de ataque"] },
          ],
        },
        {
          title: "Meteorologia básica",
          description: "Estrutura da atmosfera, fenômenos meteorológicos e leitura de mensagens.",
          lessons: [
            { id: "pp-atmosfera", title: "Pressão, temperatura e densidade", duration: 30, summary: "Pressão, temperatura e umidade influenciam a densidade do ar e o desempenho do motor. Ar quente e aeródromos elevados tendem a aumentar a altitude-densidade.", objectives: ["Diferenciar altitude indicada e altitude-densidade", "Entender o gradiente térmico padrão", "Antecipar efeitos sobre decolagem e subida"] },
            { id: "pp-nuvens", title: "Nuvens, frentes e estabilidade", duration: 38, summary: "O formato das nuvens revela movimentos verticais da atmosfera. Frentes organizam mudanças de vento, temperatura, pressão e precipitação que exigem avaliação antes do voo.", objectives: ["Reconhecer famílias de nuvens", "Distinguir frente fria e frente quente", "Relacionar instabilidade atmosférica e convecção"] },
            { id: "pp-metar", title: "Primeiros passos no METAR e TAF", duration: 42, summary: "METAR descreve uma observação real do aeródromo; TAF apresenta uma previsão detalhada. A leitura deve ser combinada com cartas e avisos.", objectives: ["Decodificar vento e visibilidade", "Ler teto e fenômenos meteorológicos", "Distinguir observação real de previsão"] },
          ],
        },
        {
          title: "Navegação e operação",
          description: "Orientação espacial, altimetria barométrica, planejamento e tomada de decisão.",
          lessons: [
            { id: "pp-rumos", title: "Rumo, proa, rota e deriva", duration: 36, summary: "Rota é o caminho sobre o solo; proa é para onde aponta o eixo longitudinal da aeronave. O vento cria deriva e altera a velocidade em relação ao solo (GS).", objectives: ["Separar proa e rota", "Aplicar correção de deriva", "Distinguir velocidade indicada (IAS) e solo (GS)"] },
            { id: "pp-altimetria", title: "Altimetria e ajustes barométricos", duration: 34, summary: "O altímetro estima altitude pela pressão estática. QNH, QFE e ajuste padrão (1013.2 hPa) produzem referências diferentes e precisam ser aplicados no contexto correto.", objectives: ["Interpretar QNH e QFE", "Entender altitude de pressão e nível de voo", "Reconhecer riscos de ajuste altimétrico incorreto"] },
            { id: "pp-decisao", title: "Planejamento de voo e decisão", duration: 40, summary: "Um plano seguro considera aeronave, ambiente, piloto e pressões externas. Margens conservadoras e pontos de decisão evitam a continuação indevida do voo para o perigo.", objectives: ["Usar avaliação PAVE / IMSAFE", "Definir aeródromos alternativos viáveis", "Identificar vieses e pressões operacionais"] },
          ],
        },
      ],
    },
    pc: {
      code: "pc",
      title: "Piloto Comercial",
      shortTitle: "PC",
      description: "Aprofunde aerodinâmica avançada, limites de peso e balanceamento, meteorologia operacional e CRM.",
      accent: "#f4a261",
      estimatedHours: 44,
      level: "Intermediário",
      regulatoryNote: "Conhecimentos aprofundados compatíveis com a banca teórica de Piloto Comercial de Avião (PCA).",
      modules: [
        {
          title: "Aerodinâmica aplicada",
          description: "Conceitos para interpretar envelopes de voo e limites de performance com precisão.",
          lessons: [
            { id: "pc-polar", title: "Polar de arrasto e velocidades ótimas", duration: 38, summary: "A polar relaciona coeficientes de sustentação e arrasto. A razão L/D máxima representa a condição de melhor eficiência aerodinâmica em uma configuração definida.", objectives: ["Interpretar L/D máximo", "Relacionar peso e velocidades características", "Comparar planeio e potência necessária"] },
            { id: "pc-carga", title: "Fator de carga e envelope V-n", duration: 40, summary: "O envelope de voo combina limites aerodinâmicos e estruturais. Rajadas, manobras e velocidade determinam as cargas impostas à estrutura da aeronave.", objectives: ["Ler um diagrama de envelope V-n", "Relacionar inclinação em curva e fator de carga", "Compreender velocidade de manobra (Va)"] },
            { id: "pc-alta", title: "Voo em grandes altitudes e compressibilidade", duration: 35, summary: "Com o aumento da altitude, densidade, potência disponível e margens de velocidade mudam. Aeronaves de alta performance exigem atenção ao número Mach.", objectives: ["Diferenciar IAS, CAS, TAS e Mach", "Entender teto de serviço e absoluto", "Reconhecer limites aerodinâmicos em altitude"] },
          ],
        },
        {
          title: "Peso, balanceamento e performance",
          description: "Como a distribuição de carga e o ambiente determinam limites operacionais rígidos.",
          lessons: [
            { id: "pc-cg", title: "Centro de gravidade e momentos", duration: 42, summary: "O centro de gravidade (CG) precisa permanecer no envelope aprovado pelo fabricante. Posições dianteiras e traseiras alteram estabilidade e comando.", objectives: ["Calcular momento e braço de alavanca", "Plotar o CG no gráfico do envelope", "Avaliar efeitos de CG traseiro na recuperação de estol"] },
            { id: "pc-pista", title: "Desempenho de decolagem e pouso", duration: 40, summary: "Distância disponível, vento, gradiente de pista, contaminação e temperatura precisam ser aplicados às tabelas do POH da aeronave.", objectives: ["Identificar fatores de cálculo de decolagem", "Aplicar margens de segurança operacionais", "Evitar extrapolação indevida de tabelas"] },
            { id: "pc-combustivel", title: "Planejamento e gerenciamento de combustível", duration: 34, summary: "O planejamento distingue combustível de táxi, etapa, contingência, alternativa e reserva regulamentar.", objectives: ["Montar uma tabela de combustível completa", "Converter consumo horário, vazão e tempo", "Reavaliar consumo e autonomia em rota"] },
          ],
        },
        {
          title: "Operação profissional e tomada de decisão",
          description: "Meteorologia em rota, Crew Resource Management (CRM) e Threat & Error Management (TEM).",
          lessons: [
            { id: "pc-meteo", title: "Meteorologia operacional e cartas sinóticas", duration: 45, summary: "Cartas SIGWX, imagens de satélite, radar, SIGMET e tendências complementam METAR e TAF para decisões seguras em rota.", objectives: ["Integrar diferentes fontes meteorológicas", "Identificar convecção, turbulência e gelo", "Montar uma linha do tempo de evolução do tempo"] },
            { id: "pc-crm", title: "CRM e comunicação assertiva", duration: 35, summary: "CRM utiliza todos os recursos disponíveis: pessoas, procedimentos, equipamentos e informação para minimizar erros humanos.", objectives: ["Aplicar comunicação assertiva sem ruído", "Conduzir briefings estruturados", "Reconhecer o gradiente de autoridade na cabine"] },
            { id: "pc-tem", title: "Gerenciamento de Ameaças e Erros (TEM)", duration: 38, summary: "Threat and Error Management organiza ameaças latentes, erros da tripulação e estados indesejados da aeronave.", objectives: ["Distinguir ameaça externa e erro de pilotagem", "Planejar contramedidas eficazes", "Definir gatilhos para descontinuação de aproximação"] },
          ],
        },
      ],
    },
    ifr: {
      code: "ifr",
      title: "Voo por Instrumentos",
      shortTitle: "IFR",
      description: "Construa disciplina rigorosa de varredura no painel, radionavegação e cartas de procedimentos ICAO.",
      accent: "#8ab4f8",
      estimatedHours: 38,
      level: "Especialização",
      regulatoryNote: "Conhecimento de navegação instrumental aplicável tanto à banca teórica IFR quanto à operação em simuladores avançados e redes virtuais (VATSIM/IVAO).",
      modules: [
        {
          title: "Pilotagem básica por instrumentos",
          description: "Varredura de instrumentos, atitude-potência-desempenho e controle preciso sem visão externa.",
          lessons: [
            { id: "ifr-scan", title: "Técnicas de varredura instrumental (Scan)", duration: 35, summary: "Uma varredura eficiente seleciona, interpreta e cruza instrumentos de controle e desempenho. Fixação, omissão e ênfase indevida são os erros mais comuns.", objectives: ["Organizar fluxo de varredura em T básico e glass cockpit", "Aplicar método Atitude + Potência = Desempenho", "Reconhecer falhas parciais de instrumentos"] },
            { id: "ifr-giros", title: "Sistemas pitot-estático e giroscópios", duration: 42, summary: "Bloqueios no tubo de pitot ou nas tomadas estáticas produzem indicações enganosas características no altímetro, velocímetro e variômetro.", objectives: ["Mapear linhas de pressão estática e dinâmica", "Identificar sintomas de tubo de pitot congelado", "Comparar instrumentos giroscópicos e sensores AHRS"] },
            { id: "ifr-desorientacao", title: "Desorientação espacial e ilusões", duration: 30, summary: "Sem referências visuais, o sistema vestibular pode gerar falsas sensações de curva, subida ou mergulho. A única defesa é confiar plenamente nos instrumentos.", objectives: ["Reconhecer ilusões somatogíricas e somatográvicas", "Evitar movimentos bruscos de cabeça no IMC", "Priorizar indicações confiáveis do horizonte artificial"] },
          ],
        },
        {
          title: "Radionavegação e navegação de área",
          description: "Operação de VOR, DME, ILS, GNSS, RNAV e Performance Baseada em Navegação (PBN/RNP).",
          lessons: [
            { id: "ifr-vor", title: "VOR, radiais e técnicas de interceptação", duration: 45, summary: "O VOR fornece 360 radiais magnéticas a partir da estação. A seleção de curso (OBS), indicação TO/FROM e posição relativa orientam a interceptação.", objectives: ["Interpretar bandeira TO/FROM e desvio no CDI", "Determinar a radial em que a aeronave se encontra", "Calcular e executar ângulo de interceptação de 30° a 45°"] },
            { id: "ifr-ils", title: "ILS: Localizer, Glide Slope e aproximação de precisão", duration: 44, summary: "O ILS fornece orientação lateral precisa (Localizer) e trajetória de descida vertical (Glide Slope) até os mínimos (DA/DH).", objectives: ["Identificar componentes terrestres e aéreos do ILS", "Entender a sensibilidade geométrica crescente próxima à cabeceira", "Manter aproximação estabilizada no cone do glide slope"] },
            { id: "ifr-rnav", title: "Navegação RNAV, GNSS e especificação RNP", duration: 46, summary: "RNAV permite trajetórias diretas entre waypoints sem depender de sobrevoo de estações terrestres. RNP adiciona monitoramento e alerta de integridade a bordo.", objectives: ["Distinguir navegação convencional, RNAV e RNP", "Entender o significado dos valores RNP 1, RNP 0.3 e RAIM", "Verificar sequenciamento correto no FMS/GPS"] },
          ],
        },
        {
          title: "Cartas, procedimentos e planejamento IFR",
          description: "Saídas por instrumentos (SID), chegadas (STAR), aproximações (IAC) e critérios de aeródromos alternados.",
          lessons: [
            { id: "ifr-sid-star", title: "Interpretação de cartas SID e STAR", duration: 40, summary: "Cartas de saída e chegada organizam o fluxo de tráfego entre aeródromos e aerovias, especificando gradientes mínimos, restrições e transições.", objectives: ["Ler e cumprir restrições de altitude e velocidade (cross at/above)", "Identificar transições de rota (Enroute Transition)", "Conduzir um briefing de partida e chegada padronizado"] },
            { id: "ifr-aproximacao", title: "Cartas de aproximação por instrumentos (IAC)", duration: 50, summary: "Uma carta IAC reúne rumo final, fixos de aproximação (IAF, IF, FAF, MAPt), mínimos (DA/MDA) e procedimento de arremetida perdida.", objectives: ["Localizar o FAF e calcular início da descida final", "Diferenciar aproximação de precisão (DA) e não-precisão (MDA)", "Revisar previamente o perfil de aproximação perdida (Missed Approach)"] },
            { id: "ifr-alternado", title: "Mínimos de planejamento e escolha de alternados", duration: 38, summary: "O planejamento IFR exige cálculo rigoroso de combustível para etapa, desvio ao alternado e reserva, considerando previsões meteorológicas e NOTAM.", objectives: ["Aplicar regras de escolha de aeródromo alternado IFR", "Calcular reserva regulamentar de combustível", "Definir pontos de decisão em rota (Point of Safe Return / PNR)"] },
          ],
        },
      ],
    },
    mlte: {
      code: "mlte",
      title: "Multimotor Terrestre",
      shortTitle: "MLTE",
      description: "Entenda aerodinâmica assimétrica, velocidade de controle mínimo (VMC), motor crítico e falha de motor.",
      accent: "#c8a7ff",
      estimatedHours: 28,
      level: "Habilitação",
      regulatoryNote: "Conceitos fundamentais de aeronaves bimotores a pistão e turboélices para operação monomotor segura.",
      modules: [
        {
          title: "Sistemas de aeronaves multimotoras",
          description: "Arquitetura de propulsão redundante, hélices de passo variável e sistemas de combustível cruzado.",
          lessons: [
            { id: "mlte-motores", title: "Motores e hélices de velocidade constante", duration: 38, summary: "Hélices com passo automático e sistema de embandeiramento por mola e contrapesos reduzem o arrasto imediatamente após a parada de um motor.", objectives: ["Relacionar pressão de óleo, passo da hélice e RPM", "Compreender o mecanismo de embandeiramento automático e manual", "Revisar limitações de embandeiramento abaixo de certas RPMs"] },
            { id: "mlte-combustivel", title: "Alimentação cruzada (Crossfeed) e elétrica", duration: 36, summary: "Configurações de combustível em bimotores permitem alimentar motores a partir de tanques opostos para balanceamento lateral em emergência.", objectives: ["Mapear o diagrama de fluxo de combustível", "Operar válvulas de crossfeed conforme checklist do fabricante", "Gerenciar barramentos elétricos com gerador inoperante"] },
            { id: "mlte-trem", title: "Sistemas hidráulicos, trem de pouso e flapes", duration: 32, summary: "A falha de um motor pode afetar a bomba hidráulica principal, exigindo extensão manual de emergência do trem de pouso.", objectives: ["Identificar fontes de pressão hidráulica e sistemas acionados", "Executar procedimentos de extensão alternativa de trem", "Avaliar o impacto de portas de trem e flapes na razão de subida"] },
          ],
        },
        {
          title: "Aerodinâmica assimétrica e motor crítico",
          description: "Forças de guinada e rolagem provocadas pela assimetria de tração e determinação da VMC.",
          lessons: [
            { id: "mlte-vmc", title: "VMC: Fatores determinantes e definição", duration: 48, summary: "VMC é a velocidade mínima calibrada na qual é possível manter controle direcional após a falha súbita do motor crítico, com até 5° de inclinação de asas.", objectives: ["Listar os fatores de certificação FAR/RBAC que afetam a VMC", "Separar claramente capacidade de controle direcional de performance de subida", "Identificar a linha radial vermelha no velocímetro"] },
            { id: "mlte-critico", title: "Os 4 fatores do motor crítico", duration: 38, summary: "Fator P (empuxo assimétrico das pás), torque, fluxo espiral do ar (slipstream) e precessão giroscópica tornam a falha de um motor mais severa.", objectives: ["Explicar por que o motor esquerdo é crítico em motores convencionais", "Analisar motores de rotação contra-rotativa (sem motor crítico)", "Aplicar a inclinação de 3° a 5° em direção ao motor operativo"] },
            { id: "mlte-arrasto", title: "Arrasto da hélice em molinete e identificação", duration: 34, summary: "Uma hélice girando em molinete (windmilling) cria arrasto gigantesco que degrada quase toda a capacidade de subida da aeronave.", objectives: ["Memorizar a rotina: Controle, Potência Máxima, Configuração Limpa, Identificar, Verificar", "Confirmar motor inoperativo pelo pé morto (Dead foot = Dead engine)", "Executar embandeiramento rápido e preciso antes de RPM crítica"] },
          ],
        },
        {
          title: "Performance monomotor e procedimentos de emergência",
          description: "Gradiente de subida monomotor, teto monomotor (drift-down) e tomada de decisão na decolagem.",
          lessons: [
            { id: "mlte-single", title: "Tabelas de performance monomotor e teto prático", duration: 44, summary: "A perda de 50% dos motores resulta frequentemente na perda de 80% a 90% da razão de subida excedente.", objectives: ["Calcular razão de subida monomotor para temperatura e peso do dia", "Determinar teto monomotor (Single-engine service ceiling)", "Planejar procedimento de descida gradual (Drift-down) sobre terreno elevado"] },
            { id: "mlte-falha", title: "Falha de motor durante e após a decolagem", duration: 46, summary: "A decisão entre abortar a decolagem ou prosseguir depende da velocidade atingida em relação à Vyse (Blue Line) e pista remanescente.", objectives: ["Definir critérios de rejeição de decolagem abaixo de Vmcg/Vr", "Manter atitude e Vyse rigorosa após decolagem confirmada", "Não tentar recolher o trem de pouso sem controle positivo estabelecido"] },
            { id: "mlte-planejamento", title: "Briefing de decolagem multimotor e segurança", duration: 35, summary: "Um briefing estruturado elimina hesitações em momentos de alta carga de trabalho próximos ao solo.", objectives: ["Conduzir briefing de emergência antes do alinhamento", "Identificar obstáculos no setor de subida monomotor", "Estabelecer margens operacionais conservadoras de peso máximo de decolagem"] },
          ],
        },
      ],
    },
  },
  en: {
    pp: {
      code: "pp",
      title: "Private Pilot Ground School",
      shortTitle: "PPL",
      description: "The foundational ground school covering aerodynamics, aviation weather, flight navigation, and flight safety.",
      accent: "#5de4df",
      estimatedHours: 32,
      level: "Foundations",
      regulatoryNote: "Covers core FAA / EASA / ICAO private pilot aeronautical knowledge syllabus.",
      modules: [
        {
          title: "Principles of Flight & Aerodynamics",
          description: "The four forces of flight, aircraft flight controls, and core stability principles.",
          lessons: [
            { id: "pp-forcas", title: "The Four Forces of Flight", duration: 28, summary: "Lift, weight, thrust, and drag create the dynamic equilibrium of flight. Changes in attitude, power, and configuration alter this equilibrium.", objectives: ["Relate airspeed and lift production", "Differentiate induced and parasite drag", "Analyze straight-and-level, climbing, and descending flight"] },
            { id: "pp-controles", title: "Aircraft Axes, Primary Controls & Stability", duration: 32, summary: "Ailerons control roll (longitudinal axis), elevator controls pitch (lateral axis), and rudder controls yaw (vertical axis). Stability governs recovery tendencies.", objectives: ["Identify the three flight axes", "Associate control surfaces with rotational movements", "Understand static and dynamic longitudinal stability"] },
            { id: "pp-estol", title: "Angle of Attack & Aerodynamic Stalls", duration: 35, summary: "An aerodynamic stall occurs whenever the critical angle of attack is exceeded, regardless of airspeed, pitch attitude, or altitude.", objectives: ["Recognize early aerodynamic stall warnings", "Explain how load factor increases stall speed", "Prioritize reducing angle of attack above all else during recovery"] },
          ],
        },
        {
          title: "Aviation Meteorology",
          description: "Atmospheric properties, frontal systems, and decoding weather reports (METAR/TAF).",
          lessons: [
            { id: "pp-atmosfera", title: "Atmospheric Pressure, Temperature & Density Altitude", duration: 30, summary: "Pressure, temperature, and humidity dictate air density. High temperatures and high elevation airports produce high density altitude.", objectives: ["Differentiate pressure altitude and density altitude", "Understand standard temperature lapse rates", "Anticipate density altitude penalties on takeoff roll and climb rate"] },
            { id: "pp-nuvens", title: "Cloud Classifications, Weather Fronts & Convection", duration: 38, summary: "Cloud shapes reveal atmospheric vertical stability. Cold and warm fronts organize wind shifts, pressure changes, and dangerous weather.", objectives: ["Identify cloud families (cumuliform vs stratiform)", "Differentiate cold front and warm front characteristics", "Analyze thunderstorm development stages and convective hazards"] },
            { id: "pp-metar", title: "Decoding Aviation Weather (METAR & TAF)", duration: 42, summary: "METARs provide actual observations at an airport; TAFs provide terminal forecasts. Thorough interpretation is vital for go/no-go decisions.", objectives: ["Decode wind velocity, visibility, and RVR", "Interpret ceiling layers and weather phenomena codes", "Differentiate current surface observations from forecast timeframes"] },
          ],
        },
        {
          title: "Navigation & Flight Operations",
          description: "Dead reckoning, barometric altimetry, cross-country planning, and aeronautical decision-making.",
          lessons: [
            { id: "pp-rumos", title: "True Course, Magnetic Heading & Wind Drift", duration: 36, summary: "Course represents track over the ground; heading points the aircraft longitudinal axis. Wind creates drift angles and modifies groundspeed.", objectives: ["Differentiate true course, magnetic heading, and ground track", "Apply wind correction angles (WCA)", "Calculate indicated airspeed (IAS) vs groundspeed (GS)"] },
            { id: "pp-altimetria", title: "Barometric Altimetry & Pressure Settings", duration: 34, summary: "Altimeters measure static pressure. QNH, QFE, and standard pressure (29.92 inHg / 1013.2 hPa) serve distinct operational purposes.", objectives: ["Interpret QNH, QFE, and standard altimeter settings", "Understand pressure altitude and altimeter errors in cold weather", "Prevent controlled flight into terrain (CFIT) from incorrect subscale settings"] },
            { id: "pp-decisao", title: "Cross-Country Planning & Risk Management", duration: 40, summary: "Safe flight planning evaluates the Pilot, Aircraft, enVironment, and External Pressures (PAVE). Conservative personal minimums protect every flight.", objectives: ["Apply PAVE and IMSAFE risk assessment models", "Select feasible alternate airports and calculate fuel reserves", "Recognize hazardous attitudes and operational get-there-itis"] },
          ],
        },
      ],
    },
    pc: {
      code: "pc",
      title: "Commercial Pilot Ground School",
      shortTitle: "CPL",
      description: "Advanced aerodynamics, high-altitude performance, weight and balance envelopes, and crew resource management.",
      accent: "#f4a261",
      estimatedHours: 44,
      level: "Intermediate",
      regulatoryNote: "Covers commercial pilot aeronautical knowledge requirements (FAA / EASA / ICAO standards).",
      modules: [
        {
          title: "Advanced Aerodynamics & Flight Envelopes",
          description: "Drag polars, V-n structural envelopes, and high-altitude compressibility phenomena.",
          lessons: [
            { id: "pc-polar", title: "Drag Polars & Characteristic Airspeeds", duration: 38, summary: "The drag polar plots lift coefficient against drag coefficient. Maximum L/D ratio represents the most efficient aerodynamic flight condition.", objectives: ["Interpret maximum lift-to-drag ratio (L/D max)", "Relate gross weight to best glide and endurance airspeeds", "Analyze power required versus power available curves"] },
            { id: "pc-carga", title: "Load Factors & The V-n Diagram", duration: 40, summary: "The V-n flight envelope defines structural and aerodynamic operating boundaries. Maneuvering speed (Va) prevents structural damage during extreme gusts.", objectives: ["Read and interpret a V-n maneuvering envelope diagram", "Calculate load factors induced by steep turns", "Understand how maneuvering speed decreases at lighter aircraft weights"] },
            { id: "pc-alta", title: "High-Altitude Flight & High-Speed Aerodynamics", duration: 35, summary: "At high altitudes, reduced air density alters power margins and compresses the margin between stall speed and critical Mach number (coffin corner).", objectives: ["Differentiate IAS, CAS, TAS, and Mach number", "Understand service ceiling versus absolute ceiling", "Recognize high-altitude buffet boundaries and compressibility effects"] },
          ],
        },
        {
          title: "Weight, Balance & Performance Calculations",
          description: "Center of gravity envelopes, takeoff/landing performance charts, and fuel management.",
          lessons: [
            { id: "pc-cg", title: "Center of Gravity (CG) Envelopes & Moments", duration: 42, summary: "Aircraft CG must remain within approved limits throughout flight. Aft CG locations degrade longitudinal stability and complicate stall recovery.", objectives: ["Calculate datum, arms, weights, and moments", "Plot loaded aircraft CG inside the moment envelope", "Analyze aerodynamic penalties and stall characteristics of forward vs aft CG"] },
            { id: "pc-pista", title: "Runway Performance & Takeoff/Landing Distances", duration: 40, summary: "Field length available, wind components, runway gradient, surface contamination, and temperature dictate runway performance.", objectives: ["Apply manufacturer POH takeoff distance and climb gradient charts", "Factor in safety margins for dry vs contaminated runways", "Avoid linear extrapolation beyond published chart extremes"] },
            { id: "pc-combustivel", title: "Commercial Fuel Planning & Reserves", duration: 34, summary: "Professional fuel calculations separate taxi, trip, contingency, alternate, holding, and statutory final reserve fuel.", objectives: ["Build a compliant multi-segment navigation log fuel schedule", "Convert fuel burn rates between gallons/hours, pounds, and kilograms", "Perform in-flight fuel monitoring and re-routing calculations"] },
          ],
        },
        {
          title: "Professional Operations, CRM & Risk Mitigation",
          description: "Operational aviation weather, Crew Resource Management (CRM), and Threat & Error Management (TEM).",
          lessons: [
            { id: "pc-meteo", title: "Aviation Weather Analysis & Significant Weather Charts", duration: 45, summary: "SIGWX prognosis charts, satellite imagery, radar composites, and SIGMET bulletins furnish the strategic picture for enroute weather decisions.", objectives: ["Synthesize multi-source weather data for route optimization", "Identify severe icing, turbulence, and convective squall lines", "Establish a dynamic timeline for enroute weather updates"] },
            { id: "pc-crm", title: "Crew Resource Management & Clear Communication", duration: 35, summary: "CRM leverages all available human, hardware, and situational resources to prevent errors from escalating into incidents.", objectives: ["Apply assertive, closed-loop communication techniques", "Conduct professional, structured flight crew briefings", "Manage cockpit authority gradients and workload balance"] },
            { id: "pc-tem", title: "Threat & Error Management (TEM)", duration: 38, summary: "TEM categorizes latent operational threats, crew errors, and undesired aircraft states, establishing proactive defensive barriers.", objectives: ["Identify environmental threats and flight crew error vectors", "Deploy effective procedural countermeasures", "Establish hard triggers for discontinuing unsafe approaches"] },
          ],
        },
      ],
    },
    ifr: {
      code: "ifr",
      title: "Instrument Rating Ground School",
      shortTitle: "IFR",
      description: "Master instrument scan techniques, radio navigation (VOR, ILS, RNAV/RNP), and ICAO instrument procedure charts.",
      accent: "#8ab4f8",
      estimatedHours: 38,
      level: "Specialization",
      regulatoryNote: "Covers instrument rating syllabus for real-world pilots and advanced flight simulation on networks like VATSIM and IVAO.",
      modules: [
        {
          title: "Basic Attitude Instrument Flying",
          description: "Instrument scan techniques, attitude + power = performance, and partial panel flying.",
          lessons: [
            { id: "ifr-scan", title: "Instrument Scan Techniques & Cross-Check", duration: 35, summary: "Effective instrument scan continuously interrogates control and performance instruments. Fixation, omission, and emphasis are key scanning errors.", objectives: ["Master radial, inverted-V, and rectangular scan patterns on six-pack and glass cockpits", "Apply the Attitude + Power = Performance flying technique", "Detect instrument system failures without external visual cues"] },
            { id: "ifr-giros", title: "Pitot-Static Systems & Gyroscopic Instruments", duration: 42, summary: "Blockages in pitot tubes or static ports produce characteristic false indications across altimeters, airspeeds, and vertical speed indicators.", objectives: ["Map pitot and static pressure lines and alternate static sources", "Diagnose iced pitot tube and blocked static port symptoms immediately", "Understand gyroscopic precession and rigidity in space vs modern AHRS sensors"] },
            { id: "ifr-desorientacao", title: "Spatial Disorientation & Sensory Illusions", duration: 30, summary: "Without visual horizon cues, the vestibular system creates false sensations of turning or climbing. Pilots must trust valid instrument indications above all.", objectives: ["Recognize the graveyard spiral, Coriolis illusion, and somatogravic illusions", "Avoid abrupt head movements in IMC conditions", "Maintain disciplined reliance on verified primary flight displays"] },
          ],
        },
        {
          title: "Radio Navigation & Area Navigation (PBN)",
          description: "VOR tracking, ILS precision approaches, GNSS, RNAV waypoints, and RNP specifications.",
          lessons: [
            { id: "ifr-vor", title: "VOR Navigation, Radials & Intercept Procedures", duration: 45, summary: "VOR stations broadcast 360 magnetic radials. Omni Bearing Selector (OBS), TO/FROM flags, and CDI needles provide precise position lines.", objectives: ["Interpret TO/FROM indications and CDI needle displacement", "Determine aircraft radial position relative to a VOR station", "Execute standard 30° to 45° radial interception angles cleanly"] },
            { id: "ifr-ils", title: "Instrument Landing System (ILS) & Precision Approaches", duration: 44, summary: "The ILS provides horizontal localizer guidance and vertical glide slope descent guidance directly to Decision Altitude (DA).", objectives: ["Identify ILS ground and airborne antennas and frequencies", "Understand angular beam convergence and heightened sensitivity near touchdown", "Fly a stabilized precision approach tracking localizer and glide path centered"] },
            { id: "ifr-rnav", title: "Area Navigation (RNAV), GNSS & RNP Specifications", duration: 46, summary: "RNAV permits point-to-point routing without overflying ground navigation aids. RNP adds on-board performance monitoring and alerting (OPMA).", objectives: ["Differentiate conventional navigation, RNAV, and RNP operations", "Understand RNP 1, RNP 0.3, and RAIM satellite integrity monitoring", "Verify waypoint sequencing, constraints, and fly-over vs fly-by waypoints"] },
          ],
        },
        {
          title: "Instrument Charts, Procedures & IFR Planning",
          description: "Standard Instrument Departures (SID), Arrivals (STAR), Approach Plates (IAC), and IFR alternate minimums.",
          lessons: [
            { id: "ifr-sid-star", title: "Reading SID & STAR Charts", duration: 40, summary: "Departure and arrival procedures streamline traffic flow between airports and enroute airway structures, specifying climb gradients and speed/altitude restrictions.", objectives: ["Decode mandatory, minimum, and maximum altitude/speed constraints", "Identify enroute transition waypoints and top of descent milestones", "Conduct a standard pre-departure and arrival instrument briefing"] },
            { id: "ifr-aproximacao", title: "Instrument Approach Plates & Minima", duration: 50, summary: "Approach plates define final approach tracks, fix identities (IAF, IF, FAF, MAPt), step-down altitudes, minima (DA/MDA), and missed approach profiles.", objectives: ["Identify the Final Approach Fix (FAF) and compute descent timing/rate", "Differentiate precision Decision Altitude (DA) from non-precision MDA", "Brief the missed approach procedure before starting final descent"] },
            { id: "ifr-alternado", title: "IFR Flight Planning, Fuel & Alternate Selection", duration: 38, summary: "IFR planning requires evaluating destination weather against alternate ceiling/visibility requirements and computing statutory reserve fuels.", objectives: ["Apply IFR alternate airport selection rules (e.g. 1-2-3 rule)", "Calculate mandatory fuel reserves (trip + alternate + 45 min)", "Establish Point of Safe Return (PSR) on long routes"] },
          ],
        },
      ],
    },
    mlte: {
      code: "mlte",
      title: "Multi-Engine Rating Ground School",
      shortTitle: "MEP",
      description: "Asymmetric aerodynamics, minimum control airspeed (VMC), critical engine factors, and engine failure procedures.",
      accent: "#c8a7ff",
      estimatedHours: 28,
      level: "Endorsement",
      regulatoryNote: "Covers multi-engine piston aerodynamics and one-engine-inoperative (OEI) emergency operations.",
      modules: [
        {
          title: "Multi-Engine Aircraft Systems",
          description: "Constant-speed feathering propellers, crossfeed fuel systems, and hydraulic redundancies.",
          lessons: [
            { id: "mlte-motores", title: "Engines & Full-Feathering Propellers", duration: 38, summary: "Multi-engine full-feathering propellers align blade chords with relative wind using counterweights and nitrogen springs to eliminate windmill drag.", objectives: ["Relate oil pressure, governor flyweights, blade pitch, and RPM", "Understand automatic and manual feathering mechanisms", "Review low-RPM feathering latch stops that prevent feathering during shutdown"] },
            { id: "mlte-combustivel", title: "Fuel Crossfeed Management & Electrical Systems", duration: 36, summary: "Crossfeed configurations allow operating engines to draw fuel from inoperative side tanks for lateral balance during prolonged single-engine flight.", objectives: ["Trace multi-engine fuel line schematics and selector positions", "Operate crossfeed valves strictly according to aircraft checklists", "Manage electrical bus loading when an engine-driven alternator fails"] },
            { id: "mlte-trem", title: "Hydraulic Systems, Landing Gear & Flap Operations", duration: 32, summary: "Engine loss may disable primary hydraulic pumps, requiring emergency gear extension and careful configuration management.", objectives: ["Identify which engine drives essential hydraulic pumps", "Execute emergency gravity/hand-pump landing gear extension", "Assess the dramatic drag penalty of extended landing gear and flaps on climb rates"] },
          ],
        },
        {
          title: "Asymmetric Aerodynamics & Critical Engine",
          description: "Yawing and rolling moments created by asymmetric thrust and factors determining Vmc.",
          lessons: [
            { id: "mlte-vmc", title: "Minimum Controllable Airspeed (Vmc) & Factors", duration: 48, summary: "Vmc is the minimum calibrated airspeed at which directional control can be maintained after sudden critical engine failure, with up to 5° bank into the operative engine.", objectives: ["List the regulatory certification conditions that determine published Vmc", "Clearly distinguish directional control capability from climb performance", "Identify the red radial line on the airspeed indicator"] },
            { id: "mlte-critico", title: "The Four Critical Engine Factors", duration: 38, summary: "P-factor, Accelerated Slipstream, Spiraling Slipstream, and Torque make the failure of one specific engine aerodynamically more adverse on conventional twins.", objectives: ["Explain why the left engine is critical on clockwise-rotating propeller aircraft", "Analyze counter-rotating multi-engine designs without a critical engine", "Apply 3° to 5° of bank into the good engine combined with split-ball rudder trim"] },
            { id: "mlte-arrasto", title: "Windmilling Propeller Drag & Engine Failure Drills", duration: 34, summary: "A windmilling propeller creates massive parasitic drag that destroys single-engine climb performance until feathered.", objectives: ["Commit the drill to memory: Control, Max Power, Clean Up, Identify, Verify, Feather", "Confirm inoperative engine with Dead Foot = Dead Engine principle", "Feather the inoperative engine promptly before RPM drops below feather stop threshold"] },
          ],
        },
        {
          title: "Single-Engine Performance & Emergency Management",
          description: "Single-engine climb gradient, drift-down ceiling procedures, and takeoff decision points.",
          lessons: [
            { id: "mlte-single", title: "Single-Engine Climb Gradients & Service Ceiling", duration: 44, summary: "Losing 50% of available horsepower typically destroys 80% to 90% of excess climb performance.", objectives: ["Calculate single-engine climb rate for density altitude and gross weight", "Determine single-engine absolute and service ceilings", "Plan drift-down profiles when operating over high terrain"] },
            { id: "mlte-falha", title: "Engine Failure On and After Takeoff", duration: 46, summary: "The decision to reject takeoff or continue climb depends strictly on airspeed relative to Vyse (Blue Line) and remaining runway length.", objectives: ["Establish clear rejected takeoff criteria below rotation speed (Vr)", "Maintain pitch attitude for Vyse (best single-engine rate of climb)", "Refrain from raising gear without established positive rate of climb and directional control"] },
            { id: "mlte-planejamento", title: "Multi-Engine Takeoff Briefings & Risk Management", duration: 35, summary: "A disciplined takeoff briefing establishes pre-decided action triggers for engine failures on the runway or during initial climb.", objectives: ["Conduct an assertive multi-engine departure safety briefing", "Identify departure sector obstacles and clearway paths", "Apply conservative gross weight limits for single-engine climb assurance"] },
          ],
        },
      ],
    },
  },
  es: {
    pp: {
      code: "pp",
      title: "Piloto Privado",
      shortTitle: "PPL",
      description: "La base teórica fundamental para comprender aerodinámica, meteorología aeronáutica, navegación aérea y seguridad de vuelo.",
      accent: "#5de4df",
      estimatedHours: 32,
      level: "Fundamentos",
      regulatoryNote: "Conocimientos aeronáuticos basados en estándares OACI y programas teóricos de Piloto Privado.",
      modules: [
        {
          title: "Principios de vuelo y aerodinámica",
          description: "Las cuatro fuerzas, controles primarios de vuelo y estabilidad básica de la aeronave.",
          lessons: [
            { id: "pp-forcas", title: "Las cuatro fuerzas del vuelo", duration: 28, summary: "Sustentación, peso, tracción y resistencia forman el equilibrio dinámico. Los cambios de actitud y potencia modifican este equilibrio.", objectives: ["Relacionar velocidad y sustentación", "Diferenciar resistencia inducida y parásita", "Interpretar vuelo recto nivelado, ascenso y descenso"] },
            { id: "pp-controles", title: "Ejes de la aeronave y superficies de control", duration: 32, summary: "Los alerones controlan el alabeo, el timón de profundidad controla el cabeceo y el timón de dirección controla la guiñada.", objectives: ["Identificar los tres ejes de vuelo", "Asociar mandos y movimientos", "Comprender estabilidad longitudinal y lateral"] },
            { id: "pp-estol", title: "Ángulo de ataque y pérdida aerodinámica", duration: 35, summary: "La pérdida ocurre cuando se supera el ángulo de ataque crítico, independientemente de la velocidad o actitud del avión.", objectives: ["Reconocer avisos de pérdida", "Explicar el efecto del factor de carga", "Priorizar la reducción del ángulo de ataque en la recuperación"] },
          ],
        },
        {
          title: "Meteorología aeronáutica",
          description: "Estructura atmosférica, sistemas frontales y decodificación de mensajes METAR y TAF.",
          lessons: [
            { id: "pp-atmosfera", title: "Presión, temperatura y altitud de densidad", duration: 30, summary: "Presión, temperatura y humedad determinan la densidad del aire. Altas temperaturas en aeródromos elevados aumentan la altitud de densidad.", objectives: ["Diferenciar altitud indicada y altitud de densidad", "Comprender el gradiente térmico estándar", "Anticipar pérdidas de rendimiento en despegue y ascenso"] },
            { id: "pp-nuvens", title: "Tipos de nubes, frentes y convección", duration: 38, summary: "La forma de las nubes revela la estabilidad vertical de la atmósfera. Los frentes organizan cambios de viento, presión y precipitación.", objectives: ["Identificar familias de nubes", "Diferenciar frentes fríos y cálidos", "Analizar convección y peligros asociados a tormentas"] },
            { id: "pp-metar", title: "Decodificación de reportes METAR y TAF", duration: 42, summary: "El METAR refleja la observación actual del aeródromo; el TAF presenta el pronóstico para una ventana temporal.", objectives: ["Decodificar viento, visibilidad y RVR", "Interpretar techos de nubes y fenómenos", "Distinguir observaciones reales de pronósticos"] },
          ],
        },
        {
          title: "Navegación aérea y operaciones",
          description: "Navegación visual, altimetría barométrica, planificación y toma de decisiones.",
          lessons: [
            { id: "pp-rumos", title: "Rumbo, derrota, trayectoria y deriva", duration: 36, summary: "La derrota es el camino sobre el terreno; el rumbo es hacia donde apunta el eje longitudinal del avión. El viento genera deriva.", objectives: ["Separar rumbo y derrota", "Aplicar ángulo de corrección de deriva", "Distinguir velocidad indicada (IAS) y sobre el suelo (GS)"] },
            { id: "pp-altimetria", title: "Altimetría y calajes barométricos", duration: 34, summary: "El altímetro mide la presión estática. QNH, QFE y el calaje estándar (1013.2 hPa) ofrecen referencias distintas según la fase de vuelo.", objectives: ["Interpretar QNH y QFE", "Entender altitud de presión y niveles de vuelo", "Reconocer riesgos de calajes altimétricos erróneos"] },
            { id: "pp-decisao", title: "Planificación de vuelo y gestión de riesgos", duration: 40, summary: "Una planificación segura evalúa al piloto, la aeronave, el entorno y las presiones externas mediante modelos estructurados.", objectives: ["Aplicar modelos de evaluación PAVE e IMSAFE", "Seleccionar aeródromos alternativos adecuados", "Identificar actitudes peligrosas y sesgos operacionales"] },
          ],
        },
      ],
    },
    pc: {
      code: "pc",
      title: "Piloto Comercial",
      shortTitle: "CPL",
      description: "Aerodinámica avanzada, límites de peso y balance, meteorología en ruta y gestión de recursos de tripulación (CRM).",
      accent: "#f4a261",
      estimatedHours: 44,
      level: "Intermedio",
      regulatoryNote: "Conocimientos avanzados conformes a los programas de Piloto Comercial de Avión.",
      modules: [
        {
          title: "Aerodinámica avanzada y envolventes",
          description: "Polares de resistencia, diagrama de maniobra V-n y vuelo a alta altitud.",
          lessons: [
            { id: "pc-polar", title: "Polar de resistencia y velocidades óptimas", duration: 38, summary: "La polar relaciona coeficientes de sustentación y resistencia. La relación L/D máxima representa la condición de mayor eficiencia aerodinámica.", objectives: ["Interpretar la relación L/D máxima", "Relacionar peso con velocidades de planeo y alcance", "Comparar potencia requerida frente a disponible"] },
            { id: "pc-carga", title: "Factor de carga y diagrama V-n", duration: 40, summary: "La envolvente de vuelo establece los límites estructurales y aerodinámicos de la aeronave ante ráfagas y maniobras.", objectives: ["Interpretar diagramas de envolvente V-n", "Calcular factores de carga en virajes escarpados", "Comprender la variación de la velocidad de maniobra (Va) con el peso"] },
            { id: "pc-alta", title: "Vuelo a alta altitud y compresibilidad", duration: 35, summary: "A gran altitud, la baja densidad del aire reduce los márgenes de potencia y acerca la velocidad de pérdida al número Mach crítico.", objectives: ["Diferenciar IAS, CAS, TAS y número Mach", "Entender techo de servicio y techo absoluto", "Reconocer límites de buffet y compresibilidad"] },
          ],
        },
        {
          title: "Peso, centrado y cálculo de rendimiento",
          description: "Envolventes de centro de gravedad, rendimiento en pista y gestión de combustible.",
          lessons: [
            { id: "pc-cg", title: "Centro de gravedad (CG) y momentos", duration: 42, summary: "El CG debe permanecer dentro de los límites aprobados durante todo el vuelo para garantizar estabilidad y mando adecuados.", objectives: ["Calcular brazos, pesos y momentos", "Trazar el CG en el gráfico de la envolvente", "Analizar los efectos de un CG retrasado en la estabilidad"] },
            { id: "pc-pista", title: "Rendimiento en despegue y aterrizaje", duration: 40, summary: "Longitud de pista, viento, pendiente, contaminación y temperatura deben aplicarse a las tablas de rendimiento del POH.", objectives: ["Calcular distancias de despegue y aterrizaje", "Aplicar márgenes de seguridad para pistas contaminadas", "Evitar extrapolaciones lineales no autorizadas"] },
            { id: "pc-combustivel", title: "Planificación profesional de combustible", duration: 34, summary: "El cálculo desglosa combustible de rodaje, ruta, contingencia, alternativo y reservas finales reglamentarias.", objectives: ["Elaborar un registro de combustible completo", "Convertir consumos horarios y tiempos de vuelo", "Monitorear el consumo de combustible en ruta"] },
          ],
        },
        {
          title: "Operaciones profesionales, CRM y TEM",
          description: "Análisis meteorológico avanzado, CRM y gestión de amenazas y errores.",
          lessons: [
            { id: "pc-meteo", title: "Análisis meteorológico en ruta y cartas SIGWX", duration: 45, summary: "Cartas de tiempo significativo, imágenes satelitales, radar y boletines SIGMET fundamentan las decisiones operacionales en ruta.", objectives: ["Sintetizar información meteorológica de múltiples fuentes", "Identificar engelamiento, turbulencia y líneas de turbonada", "Establecer una línea temporal de evolución meteorológica"] },
            { id: "pc-crm", title: "Gestión de recursos de tripulación (CRM)", duration: 35, summary: "El CRM optimiza el uso de todos los recursos disponibles para evitar que los errores se conviertan en incidentes.", objectives: ["Aplicar comunicación asertiva en cabina", "Conducir briefings estructurados y claros", "Gestionar el gradiente de autoridad y la carga de trabajo"] },
            { id: "pc-tem", title: "Gestión de amenazas y errores (TEM)", duration: 38, summary: "El modelo TEM clasifica amenazas externas, errores de tripulación y estados no deseados de la aeronave.", objectives: ["Identificar amenazas latentes y errores operativos", "Implementar barreras de defensa y contramedidas", "Definir disparadores claros para frustrar aproximaciones"] },
          ],
        },
      ],
    },
    ifr: {
      code: "ifr",
      title: "Vuelo por Instrumentos",
      shortTitle: "IFR",
      description: "Escaneo instrumental sistemático, radionavegación (VOR, ILS, RNAV/RNP) y procedimientos instrumentales OACI.",
      accent: "#8ab4f8",
      estimatedHours: 38,
      level: "Especialización",
      regulatoryNote: "Conocimientos teóricos para habilitación de vuelo instrumental y simulación avanzada.",
      modules: [
        {
          title: "Vuelo básico por instrumentos",
          description: "Técnicas de escaneo, actitud + potencia = rendimiento y vuelo con panel parcial.",
          lessons: [
            { id: "ifr-scan", title: "Técnicas de escaneo instrumental (Scan)", duration: 35, summary: "El escaneo sistemático cruza instrumentos de control y de rendimiento evitando fijaciones y omisiones comunes.", objectives: ["Dominar patrones de escaneo en T básica y cabinas de cristal", "Aplicar el método Actitud + Potencia = Rendimiento", "Detectar fallos de instrumentos sin referencias visuales"] },
            { id: "ifr-giros", title: "Sistemas pitot-estática e instrumentos giroscópicos", duration: 42, summary: "Las obstrucciones en tomas estáticas o tubos pitot generan indicaciones falsas características en velocímetros y altímetros.", objectives: ["Mapear líneas de presión pitot y estática", "Diagnosticar tubos pitot congelados y tomas estáticas bloqueadas", "Comprender la precesión giroscópica frente a sensores AHRS modernos"] },
            { id: "ifr-desorientacao", title: "Desorientación espacial e ilusiones sensoriales", duration: 30, summary: "En condiciones IMC, el sistema vestibular puede generar falsas sensaciones de viraje o cabeceo. La disciplina instrumental es la única protección.", objectives: ["Reconocer la espiral de la muerte e ilusiones somatográvicas", "Evitar movimientos bruscos de cabeza en vuelo por instrumentos", "Confiar estrictamente en los instrumentos de vuelo verificados"] },
          ],
        },
        {
          title: "Radionavegación y navegación de área (PBN)",
          description: "Operación de VOR, aproximaciones de precisión ILS, navegación GNSS, RNAV y RNP.",
          lessons: [
            { id: "ifr-vor", title: "Navegación VOR, radiales e interceptaciones", duration: 45, summary: "Las estaciones VOR emiten 360 radiales magnéticas. El selector OBS, las banderas TO/FROM y el CDI guían la navegación.", objectives: ["Interpretar banderas TO/FROM y desviación en el CDI", "Determinar la radial actual de la aeronave respecto al VOR", "Calcular y volar ángulos de interceptación de 30° a 45°"] },
            { id: "ifr-ils", title: "Sistema ILS: Localizador y senda de planeo", duration: 44, summary: "El ILS proporciona guía lateral (Localizer) y vertical (Glide Slope) hasta la altitud de decisión (DA).", objectives: ["Identificar componentes de tierra y a bordo del sistema ILS", "Comprender la convergencia angular y mayor sensibilidad cerca de la pista", "Mantener una aproximación estabilizada en senda y eje"] },
            { id: "ifr-rnav", title: "Navegación RNAV, GNSS y especificaciones RNP", duration: 46, summary: "RNAV permite rutas directas entre waypoints sin sobrevolar radioayudas en tierra. RNP añade monitorización y alerta de rendimiento a bordo.", objectives: ["Diferenciar navegación convencional, RNAV y RNP", "Comprender los requisitos de RNP 1, RNP 0.3 y monitorización RAIM", "Verificar el correcto secuenciado de waypoints en el GPS/FMS"] },
          ],
        },
        {
          title: "Cartas aeronáuticas y planificación IFR",
          description: "Salidas normalizadas (SID), llegadas (STAR), cartas de aproximación (IAC) y requisitos de aeródromos alternativos.",
          lessons: [
            { id: "ifr-sid-star", title: "Interpretación de cartas SID y STAR", duration: 40, summary: "Las cartas SID y STAR estructuran las transiciones entre aeródromos y aerovías, definiendo gradientes y restricciones de altitud/velocidad.", objectives: ["Decodificar restricciones de altitud y velocidad obligatorias", "Identificar puntos de transición de ruta y principio de descenso", "Estructurar un briefing estandarizado de salida y llegada"] },
            { id: "ifr-aproximacao", title: "Cartas de aproximación instrumental y mínimos", duration: 50, summary: "La carta IAC define la trayectoria final, los fijos principales (IAF, IF, FAF, MAPt), los mínimos (DA/MDA) y la aproximación frustrada.", objectives: ["Identificar el FAF y calcular el régimen de descenso final", "Diferenciar altitud de decisión (DA) de altitud mínima de descenso (MDA)", "Revisar previamente el procedimiento de aproximación frustrada"] },
            { id: "ifr-alternado", title: "Planificación de vuelo IFR y criterios de alternativo", duration: 38, summary: "La planificación IFR exige evaluar previsiones meteorológicas y calcular reservas reglamentarias de combustible para destino y alternativo.", objectives: ["Aplicar reglas de selección de aeródromo alternativo IFR", "Calcular combustible de reserva reglamentaria", "Definir puntos de decisión y de no retorno en ruta (PNR)"] },
          ],
        },
      ],
    },
    mlte: {
      code: "mlte",
      title: "Multimotor Terrestre",
      shortTitle: "MEP",
      description: "Aerodinámica asimétrica, velocidad mínima de control (VMC), motor crítico y procedimientos de fallo de motor.",
      accent: "#c8a7ff",
      estimatedHours: 28,
      level: "Habilitación",
      regulatoryNote: "Conceptos esenciales para la operación segura de bimotores con un motor inoperativo.",
      modules: [
        {
          title: "Sistemas en aeronaves multimotor",
          description: "Hélices de velocidad constante con abanderamiento, sistemas de combustible cruzado y redundancias.",
          lessons: [
            { id: "mlte-motores", title: "Motores y hélices con abanderamiento total", duration: 38, summary: "Las hélices con abanderamiento alinean sus palas con el flujo de aire mediante contrapesos y muelles para eliminar la resistencia de molinete.", objectives: ["Relacionar presión de aceite, paso de hélice y RPM", "Comprender el mecanismo de abanderamiento manual y automático", "Revisar los topes de centrado que evitan el abanderamiento a bajas RPM"] },
            { id: "mlte-combustivel", title: "Gestión de alimentación cruzada (Crossfeed)", duration: 36, summary: "El sistema de crossfeed permite alimentar motores operativos desde los depósitos del lado inoperativo para mantener el equilibrio lateral.", objectives: ["Trazar el diagrama de combustible en bimotores", "Operar válvulas de crossfeed siguiendo las listas de verificación", "Gestionar cargas eléctricas con un alternador inoperativo"] },
            { id: "mlte-trem", title: "Sistemas hidráulicos, tren de aterrizaje y flaps", duration: 32, summary: "El fallo de un motor puede inhabilitar la bomba hidráulica principal, requiriendo extensión de emergencia del tren.", objectives: ["Identificar qué motor acciona las bombas hidráulicas principales", "Ejecutar la extensión de emergencia del tren de aterrizaje", "Evaluar el impacto de tren y flaps en el régimen de ascenso"] },
          ],
        },
        {
          title: "Aerodinámica asimétrica y motor crítico",
          description: "Fuerzas de guiñada y alabeo generadas por tracción asimétrica y factores que determinan la VMC.",
          lessons: [
            { id: "mlte-vmc", title: "Velocidad mínima de control (Vmc) y factores", duration: 48, summary: "Vmc es la velocidad mínima calibrada a la que es posible mantener el control direccional tras el fallo del motor crítico, con hasta 5° de inclinación.", objectives: ["Enumerar los factores reglamentarios que determinan la Vmc publicada", "Diferenciar capacidad de control direccional de rendimiento de ascenso", "Identificar la línea radial roja en el velocímetro"] },
            { id: "mlte-critico", title: "Los cuatro factores del motor crítico", duration: 38, summary: "Factor P, empuje asimétrico, flujo helicoidal del aire y par de torsión hacen que el fallo de un motor específico sea más adverso.", objectives: ["Explicar por qué el motor izquierdo es crítico en motores convencionales", "Analizar diseños con motores contrarrotativos (sin motor crítico)", "Aplicar la inclinación de 3° a 5° hacia el motor operativo"] },
            { id: "mlte-arrasto", title: "Resistencia de molinete y procedimiento de emergencia", duration: 34, summary: "Una hélice girando en molinete genera una resistencia masiva que destruye la capacidad de ascenso monomotor.", objectives: ["Memorizar la secuencia: Control, Potencia Máxima, Configuración Limpia, Identificar, Verificar, Abanderar", "Confirmar motor inoperativo con la regla del pie muerto (Dead foot = Dead engine)", "Abanderar la hélice antes de que caiga por debajo de las RPM mínimas de abanderamiento"] },
          ],
        },
        {
          title: "Rendimiento monomotor y toma de decisiones",
          description: "Gradiente de ascenso monomotor, techo de servicio monomotor y puntos de decisión en el despegue.",
          lessons: [
            { id: "mlte-single", title: "Gradientes de ascenso monomotor y techo práctico", duration: 44, summary: "Perder el 50% de la potencia disponible suele traducirse en la pérdida del 80% al 90% del rendimiento de ascenso excedente.", objectives: ["Calcular el régimen de ascenso monomotor para las condiciones del día", "Determinar el techo de servicio monomotor", "Planificar descensos graduales (drift-down) sobre terreno montañoso"] },
            { id: "mlte-falha", title: "Fallo de motor durante y tras el despegue", duration: 46, summary: "La decisión de abortar o continuar el despegue depende de la velocidad alcanzada respecto a Vyse (Línea Azul) y la pista restante.", objectives: ["Establecer criterios de aborto de despegue por debajo de Vr", "Mantener actitud y velocidad Vyse con precisión tras el despegue", "No retraer el tren de aterrizaje sin control positivo y régimen positivo"] },
            { id: "mlte-planejamento", title: "Briefing de despegue multimotor y seguridad", duration: 35, summary: "Un briefing estructurado elimina vacilaciones en fases críticas cerca del suelo.", objectives: ["Realizar un briefing de seguridad antes de alinear en pista", "Identificar obstáculos en la trayectoria de ascenso monomotor", "Fijar márgenes conservadores de peso máximo de despegue"] },
          ],
        },
      ],
    },
  },
  fr: {
    pp: {
      code: "pp",
      title: "Pilote Privé (PPL)",
      shortTitle: "PPL",
      description: "Le socle théorique indispensable pour maîtriser l'aérodynamique, la météorologie aéronautique, la navigation et la sécurité des vols.",
      accent: "#5de4df",
      estimatedHours: 32,
      level: "Fondamentaux",
      regulatoryNote: "Connaissances aéronautiques conformes aux standards OACI et aux programmes théoriques PPL.",
      modules: [
        {
          title: "Principes du vol & aérodynamique",
          description: "Les quatre forces, gouvernes de vol et stabilité élémentaire de l'aéronef.",
          lessons: [
            { id: "pp-forcas", title: "Les quatre forces du vol", duration: 28, summary: "Portance, poids, traction et traînée forment l'équilibre dynamique du vol. Toute variation d'assiette ou de puissance modifie cet équilibre.", objectives: ["Relier vitesse et portance", "Distinguer traînée induite et parasite", "Analyser vol rectiligne, montée et descente"] },
            { id: "pp-controles", title: "Axes de l'avion, gouvernes et stabilité", duration: 32, summary: "Les ailerons contrôlent le roulis, la gouverne de profondeur le tangage et la gouverne de direction le lacet. La stabilité définit la tendance de retour à l'équilibre.", objectives: ["Identifier les trois axes de l'aéronef", "Associer commandes et mouvements", "Comprendre stabilité longitudinale et latérale"] },
            { id: "pp-estol", title: "Angle d'incidence et décrochage aérodynamique", duration: 35, summary: "Le décrochage survient dès que l'incidence critique est dépassée, quelle que soit la vitesse indiquée ou l'assiette de l'appareil.", objectives: ["Reconnaître les signes annonciateurs du décrochage", "Expliquer l'impact du facteur de charge", "Prioriser la diminution de l'incidence lors de la récupération"] },
          ],
        },
        {
          title: "Météorologie aéronautique",
          description: "Propriétés atmosphériques, systèmes frontaux et décodage des messages METAR / TAF.",
          lessons: [
            { id: "pp-atmosfera", title: "Pression, température et altitude-densité", duration: 30, summary: "Pression, température et humidité déterminent la densité de l'air. De fortes températures sur des aérodromes élevés augmentent l'altitude-densité.", objectives: ["Différencier altitude indiquée et altitude-densité", "Comprendre le gradient thermique standard", "Anticiper la dégradation des performances au décollage"] },
            { id: "pp-nuvens", title: "Classification des nuages, fronts et convection", duration: 38, summary: "La forme des nuages révèle la stabilité verticale de l'atmosphère. Les fronts organisent les sautes de vent, précipitations et variations de pression.", objectives: ["Identifier les familles de nuages", "Distinguer front froid et front chaud", "Analyser les phases de développement des orages"] },
            { id: "pp-metar", title: "Décodage des messages METAR et TAF", duration: 42, summary: "Le METAR fournit l'observation actuelle de l'aérodrome ; le TAF fournit la prévision terminale sur une période donnée.", objectives: ["Décoder vent, visibilité et RVR", "Interpréter nébulosité, plafonds et phénomènes", "Distinguer observations réelles et prévisions"] },
          ],
        },
        {
          title: "Navigation & opérations aériennes",
          description: "Navigation à l'estime, altimétrie barométrique, préparation de vol et prise de décision.",
          lessons: [
            { id: "pp-rumos", title: "Cap, route, trajectoire et dérive", duration: 36, summary: "La route est le cheminement au sol ; le cap oriente l'axe longitudinal de l'avion. Le vent génère une dérive et modifie la vitesse sol (GS).", objectives: ["Distinguer cap et route", "Appliquer la correction de dérive au vent", "Calculer vitesse indiquée (IAS) et vitesse sol (GS)"] },
            { id: "pp-altimetria", title: "Altimétrie et calages barométriques", duration: 34, summary: "L'altimètre mesure la pression statique. QNH, QFE et calage standard (1013.2 hPa) offrent des références adaptées à chaque phase de vol.", objectives: ["Interpréter calages QNH et QFE", "Comprendre altitude-pression et niveaux de vol (FL)", "Éviter les erreurs graves de calage altimétrique"] },
            { id: "pp-decisao", title: "Planification de vol et gestion des risques", duration: 40, summary: "Une préparation rigoureuse évalue le pilote, l'avion, l'environnement et les pressions opérationnelles selon des modèles éprouvés.", objectives: ["Appliquer les grilles d'évaluation PAVE et IMSAFE", "Sélectionner des aérodromes de dégagement adaptés", "Identifier les biais comportementaux et le stress"] },
          ],
        },
      ],
    },
    pc: {
      code: "pc",
      title: "Pilote Commercial (CPL)",
      shortTitle: "CPL",
      description: "Aérodynamique avancée, limites de masse et centrage, météorologie de croisière et gestion des ressources d'équipage (CRM).",
      accent: "#f4a261",
      estimatedHours: 44,
      level: "Intermédiaire",
      regulatoryNote: "Connaissances conformes aux exigences théoriques de la licence de Pilote Professionnel (CPL).",
      modules: [
        {
          title: "Aérodynamique avancée & domaine de vol",
          description: "Polaires de traînée, diagramme de manœuvre V-n et vol à haute altitude.",
          lessons: [
            { id: "pc-polar", title: "Polaire de traînée et vitesses caractéristiques", duration: 38, summary: "La polaire relie coefficient de portance et de traînée. La finesse maximale (L/D max) correspond à la meilleure efficacité aérodynamique.", objectives: ["Interpréter la finesse maximale", "Relier masse aux vitesses de plané et de distance franchissable", "Analyser les courbes de puissance nécessaire et disponible"] },
            { id: "pc-carga", title: "Facteur de charge et domaine V-n", duration: 40, summary: "Le domaine de vol V-n définit les limites structurales et aérodynamiques sous l'effet des rafales et des manœuvres.", objectives: ["Lire et exploiter un diagramme V-n", "Calculer les facteurs de charge en virage serré", "Comprendre la variation de la vitesse de manœuvre (Va) avec la masse"] },
            { id: "pc-alta", title: "Vol à haute altitude & compressibilité", duration: 35, summary: "À haute altitude, la faible densité de l'air réduit les marges de puissance et rapproche la vitesse de décrochage du Mach critique.", objectives: ["Différencier IAS, CAS, TAS et nombre de Mach", "Comprendre plafond pratique et absolu", "Identifier les limites de compressibilité et le domaine de buffet"] },
          ],
        },
        {
          title: "Masse, centrage & calculs de performances",
          description: "Enveloppes de centrage, performances de décollage/atterrissage et gestion carburant.",
          lessons: [
            { id: "pc-cg", title: "Centre de gravité (CG) et moments", duration: 42, summary: "Le centre de gravité doit rester à l'intérieur de l'enveloppe approuvée tout au long du vol pour garantir stabilité et manœuvrabilité.", objectives: ["Calculer bras de levier, masses et moments", "Reporter le centrage dans le graphique de l'enveloppe", "Analyser les effets d'un centrage arrière sur la sortie de décrochage"] },
            { id: "pc-pista", title: "Performances au décollage et à l'atterrissage", duration: 40, summary: "Longueur de piste, vent, pente, contamination et température doivent être appliqués aux abaques du manuel de vol (POH).", objectives: ["Calculer les distances de décollage et d'atterrissage", "Appliquer les marges de sécurité sur pistes contaminées", "Éviter toute extrapolation linéaire non certifiée"] },
            { id: "pc-combustivel", title: "Planification carburant professionnelle", duration: 34, summary: "Le bilan carburant sépare roulage, étape, réserve de route, dégagement et réserve finale réglementaire.", objectives: ["Établir un devis carburant réglementaire complet", "Convertir consommations horaires et temps de vol", "Contrôler la consommation réelle en cours de route"] },
          ],
        },
        {
          title: "Opérations professionnelles, CRM et TEM",
          description: "Analyse météorologique en route, CRM et gestion des menaces et erreurs.",
          lessons: [
            { id: "pc-meteo", title: "Météorologie en route et cartes TEMSI / WINTEM", duration: 45, summary: "Cartes TEMSI, images satellites, radars et bulletins SIGMET fournissent la vision globale pour optimiser les décisions en route.", objectives: ["Synthétiser des données météo multi-sources", "Identifier givrage sévère, turbulences et lignes d'orages", "Établir une chronologie dynamique de l'évolution météo"] },
            { id: "pc-crm", title: "Crew Resource Management (CRM)", duration: 35, summary: "Le CRM mobilise l'ensemble des ressources humaines et matérielles pour éviter qu'une erreur ne se transforme en accident.", objectives: ["Pratiquer une communication affirmative et en boucle fermée", "Mener des briefings structurés et synthétiques", "Gérer le gradient d'autorité et la charge de travail"] },
            { id: "pc-tem", title: "Threat & Error Management (TEM)", duration: 38, summary: "Le modèle TEM classe les menaces externes, les erreurs d'équipage et les états aéronef indésirables.", objectives: ["Identifier menaces environnementales et risques d'erreurs", "Déployer des contre-mesures opérationnelles efficaces", "Fixer des critères stricts d'interruption d'approche"] },
          ],
        },
      ],
    },
    ifr: {
      code: "ifr",
      title: "Vol aux Instruments (IFR)",
      shortTitle: "IFR",
      description: "Circuit visuel méthodique, radionavigation (VOR, ILS, RNAV/RNP) et cartes de procédures ICAO.",
      accent: "#8ab4f8",
      estimatedHours: 38,
      level: "Spécialisation",
      regulatoryNote: "Connaissances indispensables pour la qualification de vol aux instruments et la simulation avancée (VATSIM/IVAO).",
      modules: [
        {
          title: "Pilotage sans visibilité & circuit visuel",
          description: "Techniques de balayage des instruments, assiette + puissance = performance et panneau partiel.",
          lessons: [
            { id: "ifr-scan", title: "Techniques de circuit visuel (Scan)", duration: 35, summary: "Un circuit visuel méthodique croise en permanence instruments de contrôle et de performance pour éviter omissions et fixations.", objectives: ["Maîtriser les circuits visuels en T standard et glass cockpit", "Appliquer la méthode Assiette + Puissance = Performance", "Détecter les pannes partielles sans repères visuels extérieurs"] },
            { id: "ifr-giros", title: "Circuit anémobarométrique et gyroscopes", duration: 42, summary: "L'obstruction du tube pitot ou des prises statiques produit des indications trompeuses sur anémomètre et altimètre.", objectives: ["Cartographier les circuits de pression totale et statique", "Diagnostiquer le givrage du pitot et le blocage des prises statiques", "Comparer instruments gyroscopiques et centrales inertielles AHRS modernes"] },
            { id: "ifr-desorientacao", title: "Désorientation spatiale et illusions sensorielles", duration: 30, summary: "En conditions IMC, l'oreille interne peut induire de fausses sensations de virage ou de cabré. L'unique parade est la confiance absolue dans les instruments.", objectives: ["Identifier la spirale de l'illusion et les illusions somatograviques", "Éviter les mouvements brusques de tête en IMC", "Maintenir une discipline stricte sur les instruments principaux"] },
          ],
        },
        {
          title: "Radionavigation et navigation de surface (PBN)",
          description: "Utilisation du VOR, guidage de précision ILS, GNSS, RNAV et spécifications RNP.",
          lessons: [
            { id: "ifr-vor", title: "Navigation VOR, radiales et interceptions", duration: 45, summary: "Les balises VOR émettent 360 radiales magnétiques. Le sélecteur OBS, le drapeau TO/FROM et l'aiguille CDI guident la trajectoire.", objectives: ["Interpréter les indications TO/FROM et les écarts CDI", "Déterminer la radiale actuelle de l'aéronef par rapport à la balise", "Calculer et intercepter des radiales sous des angles de 30° à 45°"] },
            { id: "ifr-ils", title: "Système ILS : Localizer et plan de descente Glide", duration: 44, summary: "L'ILS fournit un guidage latéral précis (Localizer) et un plan de descente vertical (Glide Slope) jusqu'à l'altitude de décision (DA).", objectives: ["Identifier les antennes et fréquences sol et bord de l'ILS", "Comprendre la convergence angulaire et la sensibilité accrue au seuil", "Maintenir une approche stabilisée sur l'axe et le plan de descente"] },
            { id: "ifr-rnav", title: "Navigation RNAV, GNSS et spécifications RNP", duration: 46, summary: "La navigation RNAV autorise des trajectoires directes de point à point sans survol de balises au sol. La RNP ajoute la surveillance d'intégrité à bord.", objectives: ["Distinguer navigation conventionnelle, RNAV et RNP", "Comprendre les exigences RNP 1, RNP 0.3 et la surveillance RAIM", "Vérifier le séquencement correct des waypoints dans le FMS/GPS"] },
          ],
        },
        {
          title: "Cartes aéronautiques & procédures IFR",
          description: "Départs (SID), arrivées (STAR), approches (IAC) et sélection des aérodromes de dégagement.",
          lessons: [
            { id: "ifr-sid-star", title: "Lecture des cartes SID et STAR", duration: 40, summary: "Les procédures SID et STAR structurent la circulation entre aérodromes et voies aériennes en fixant contraintes d'altitude et de vitesse.", objectives: ["Décoder les contraintes obligatoires d'altitude et de vitesse", "Identifier les points de transition de route et de début de descente", "Structurer un briefing standardisé de départ et d'arrivée"] },
            { id: "ifr-aproximacao", title: "Cartes d'approche aux instruments et minimas", duration: 50, summary: "La carte IAC détaille l'axe final, les repères clés (IAF, IF, FAF, MAPt), les minimas (DA/MDA) et la trajectoire d'approche interrompue.", objectives: ["Identifier le FAF et calculer le taux de descente finale", "Différencier altitude de décision (DA) et altitude minimale de descente (MDA)", "Briefer la procédure de remise de gaz avant d'entamer la descente finale"] },
            { id: "ifr-alternado", title: "Planification IFR et choix des dégagements", duration: 38, summary: "La préparation IFR impose d'analyser les prévisions d'aérodrome et d'embarquer les réserves réglementaires pour la destination et le dégagement.", objectives: ["Appliquer les règles de sélection de l'aérodrome de dégagement IFR", "Calculer la réserve finale réglementaire de carburant", "Définir les points de décision et de non-retour en route (PNR)"] },
          ],
        },
      ],
    },
    mlte: {
      code: "mlte",
      title: "Qualification Multi-Moteurs",
      shortTitle: "MEP",
      description: "Aérodynamique asymétrique, vitesse minimale de contrôle (VMC), moteur critique et procédures de panne moteur.",
      accent: "#c8a7ff",
      estimatedHours: 28,
      level: "Qualification",
      regulatoryNote: "Principes fondamentaux pour la conduite sécurisée d'avions bimoteurs à pistons en cas de panne d'un moteur.",
      modules: [
        {
          title: "Systèmes des avions multimoteurs",
          description: "Hélices à calage variable et mise en drapeau, circuits carburant à alimentation croisée et servitudes.",
          lessons: [
            { id: "mlte-motores", title: "Moteurs & hélices à mise en drapeau totale", duration: 38, summary: "Les hélices de bimoteurs alignent leurs pales avec le vent relatif grâce à des contrepoids pour annuler la traînée de moulinet.", objectives: ["Relier pression d'huile, pas d'hélice et régime moteur (RPM)", "Comprendre les mécanismes de mise en drapeau automatique et manuelle", "Identifier les butées centrifuges empêchant la mise en drapeau à bas régime"] },
            { id: "mlte-combustivel", title: "Alimentation croisée (Crossfeed) et génération électrique", duration: 36, summary: "Le circuit de crossfeed permet d'alimenter les moteurs fonctionnels depuis les réservoirs opposés pour maintenir l'équilibre massique latéral.", objectives: ["Tracer le schéma des circuits carburant multimoteurs", "Utiliser les vannes de crossfeed selon les check-lists constructeur", "Gérer les barres électriques après la perte d'un alternateur"] },
            { id: "mlte-trem", title: "Circuits hydrauliques, train et volets", duration: 32, summary: "La panne d'un moteur peut neutraliser la pompe hydraulique principale, nécessitant une sortie secours du train d'atterrissage.", objectives: ["Identifier le moteur entraînant la pompe hydraulique essentielle", "Exécuter la procédure de sortie secours du train par gravité", "Mesurer l'impact de la traînée du train et des volets sur le taux de montée"] },
          ],
        },
        {
          title: "Aérodynamique asymétrique & moteur critique",
          description: "Moments de lacet et de roulis induits par la dissymétrie de poussée et facteurs déterminant la VMC.",
          lessons: [
            { id: "mlte-vmc", title: "Vitesse minimale de contrôle (Vmc) et facteurs", duration: 48, summary: "La Vmc est la vitesse minimale étalonnée permettant de conserver le contrôle directionnel lors d'une panne du moteur critique, avec jusqu'à 5° d'inclinaison.", objectives: ["Énumérer les conditions de certification fixant la Vmc publiée", "Distinguer contrôle directionnel et performances de montée", "Repérer le trait rouge radial sur l'anémomètre"] },
            { id: "mlte-critico", title: "Les quatre facteurs du moteur critique", duration: 38, summary: "Facteur P, souffle hélicoïdal, couple moteur et précession gyroscopique rendent la panne d'un moteur spécifique plus pénalisante.", objectives: ["Expliquer pourquoi le moteur gauche est critique sur hélices conventionnelles", "Analyser les bimoteurs à hélices contrarotatives sans moteur critique", "Appliquer l'inclinaison de 3° à 5° vers le moteur fonctionnel"] },
            { id: "mlte-arrasto", title: "Traînée de moulinet & procédure d'urgence", duration: 34, summary: "Une hélice tournant en moulinet crée une traînée colossale qui détruit les capacités de montée monomoteur.", objectives: ["Mémoriser la séquence : Contrôle, Pleine Puissance, Configuration Lisse, Identifier, Vérifier, Drapeau", "Confirmer le moteur en panne par la règle du pied mort (Dead foot = Dead engine)", "Mettre en drapeau rapidement avant le passage sous les RPM minimales"] },
          ],
        },
        {
          title: "Performances monomoteur & gestion des pannes",
          description: "Pente de montée monomoteur, plafond pratique monomoteur et points de décision au décollage.",
          lessons: [
            { id: "mlte-single", title: "Performances de montée monomoteur et plafond", duration: 44, summary: "La perte de 50 % de la puissance entraîne généralement la disparition de 80 % à 90 % de l'excédent de montée.", objectives: ["Calculer le taux de montée monomoteur selon les conditions du jour", "Déterminer le plafond pratique monomoteur", "Planifier la trajectoire de descente progressive (Drift-down) en région montagneuse"] },
            { id: "mlte-falha", title: "Panne moteur au décollage et après décollage", duration: 46, summary: "La décision d'interrompre le décollage ou de poursuivre la montée dépend strictement de la vitesse par rapport à Vyse (Ligne Bleue) et de la piste restante.", objectives: ["Fixer les critères stricts d'interruption de décollage avant rotation", "Maintenir rigoureusement l'assiette pour Vyse après décollage confirmé", "Ne pas rentrer le train sans taux de montée positif et contrôle établi"] },
            { id: "mlte-planejamento", title: "Briefing départ multimoteur et sécurité", duration: 35, summary: "Un briefing rigoureux supprime les hésitations lors des phases critiques à basse hauteur.", objectives: ["Réaliser un briefing sécurité avant l'alignement sur piste", "Identifier les obstacles dans l'axe de montée monomoteur", "Fixer des limites conservatrices de masse maximale au décollage"] },
          ],
        },
      ],
    },
  },
};

export function getCourses(locale: ValidLocale): Course[] {
  const localized = COURSES_DATA[locale] || COURSES_DATA["pt-br"];
  return Object.values(localized);
}

export function getCourseByCode(locale: ValidLocale, code: string): Course | undefined {
  const localized = COURSES_DATA[locale] || COURSES_DATA["pt-br"];
  return localized[code as CourseCode];
}

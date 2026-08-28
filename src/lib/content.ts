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
  modules: { title: string; description: string; lessons: Lesson[] }[];
};

export const courses: Record<CourseCode, Course> = {
  pp: {
    code: "pp",
    title: "Piloto Privado",
    shortTitle: "PP",
    description: "A base para compreender aeronaves, meteorologia, navegação e operação segura.",
    accent: "#5de4df",
    estimatedHours: 32,
    level: "Fundamentos",
    modules: [
      {
        title: "Fundamentos do voo",
        description: "As forças, os controles e o comportamento básico da aeronave.",
        lessons: [
          { id: "pp-forcas", title: "As quatro forças do voo", duration: 28, summary: "Sustentação, peso, tração e arrasto formam o equilíbrio dinâmico do voo. Mudanças de atitude, potência e configuração alteram esse equilíbrio.", objectives: ["Relacionar velocidade e sustentação", "Distinguir arrasto induzido e parasita", "Interpretar voo reto, subida e descida"] },
          { id: "pp-controles", title: "Eixos, comandos e estabilidade", duration: 32, summary: "Ailerons comandam rolagem, profundor comanda arfagem e leme atua na guinada. A estabilidade descreve a tendência de retornar ou afastar-se de uma condição inicial.", objectives: ["Identificar os três eixos", "Associar comandos e movimentos", "Compreender estabilidade longitudinal e lateral"] },
          { id: "pp-estol", title: "Ângulo de ataque e estol", duration: 35, summary: "O estol ocorre quando o ângulo de ataque crítico é excedido, não por uma velocidade única. Peso, fator de carga e configuração mudam a velocidade indicada na qual ele pode ocorrer.", objectives: ["Reconhecer sinais de aproximação do estol", "Explicar o efeito do fator de carga", "Reforçar prioridade de redução do ângulo de ataque"] },
        ],
      },
      {
        title: "Meteorologia básica",
        description: "Atmosfera, fenômenos e leitura de mensagens meteorológicas.",
        lessons: [
          { id: "pp-atmosfera", title: "Pressão, temperatura e densidade", duration: 30, summary: "Pressão, temperatura e umidade influenciam a densidade do ar e o desempenho. Ar quente e aeródromos elevados tendem a aumentar a altitude-densidade.", objectives: ["Diferenciar altitude indicada e densidade", "Entender o gradiente térmico", "Antecipar efeitos sobre decolagem e subida"] },
          { id: "pp-nuvens", title: "Nuvens, frentes e estabilidade", duration: 38, summary: "O formato das nuvens revela movimentos verticais. Frentes organizam mudanças de vento, temperatura, pressão e precipitação que exigem avaliação antes do voo.", objectives: ["Reconhecer famílias de nuvens", "Distinguir frente fria e quente", "Relacionar instabilidade e convecção"] },
          { id: "pp-metar", title: "Primeiros passos no METAR e TAF", duration: 42, summary: "METAR descreve uma observação do aeródromo; TAF apresenta uma previsão. A leitura deve ser combinada com cartas, avisos e fontes oficiais atualizadas.", objectives: ["Decodificar vento e visibilidade", "Ler teto e fenômenos", "Distinguir observação de previsão"] },
        ],
      },
      {
        title: "Navegação e operação",
        description: "Orientação, altimetria, planejamento e tomada de decisão.",
        lessons: [
          { id: "pp-rumos", title: "Rumo, proa, rota e deriva", duration: 36, summary: "Rota é o caminho sobre o solo; proa é para onde aponta o eixo longitudinal. O vento cria deriva e muda a velocidade no solo.", objectives: ["Separar proa e rota", "Aplicar correção de deriva", "Distinguir velocidade indicada e no solo"] },
          { id: "pp-altimetria", title: "Altimetria e ajustes", duration: 34, summary: "O altímetro estima altitude pela pressão. QNH, QFE e ajuste padrão produzem referências diferentes e precisam ser aplicados no contexto correto.", objectives: ["Interpretar QNH e QFE", "Entender altitude de pressão", "Reconhecer riscos de ajuste incorreto"] },
          { id: "pp-decisao", title: "Planejamento e decisão", duration: 40, summary: "Um plano seguro considera aeronave, ambiente, piloto e pressões externas. Margens conservadoras e pontos de decisão reduzem a continuação indevida de um voo.", objectives: ["Usar uma avaliação PAVE", "Definir alternativas", "Identificar vieses e pressões externas"] },
        ],
      },
    ],
  },
  pc: {
    code: "pc",
    title: "Piloto Comercial",
    shortTitle: "PC",
    description: "Aprofunde desempenho, planejamento, meteorologia e decisões em operações profissionais.",
    accent: "#f4a261",
    estimatedHours: 44,
    level: "Intermediário",
    modules: [
      {
        title: "Aerodinâmica aplicada",
        description: "Conceitos para interpretar limites e desempenho com precisão.",
        lessons: [
          { id: "pc-polar", title: "Polar de arrasto e velocidades", duration: 38, summary: "A polar relaciona coeficientes de sustentação e arrasto. A razão L/D máxima representa a condição de melhor eficiência aerodinâmica em uma configuração definida.", objectives: ["Interpretar L/D máximo", "Relacionar peso e velocidades", "Comparar voo planado e potência necessária"] },
          { id: "pc-carga", title: "Fator de carga e envelope", duration: 40, summary: "O envelope combina limites aerodinâmicos e estruturais. Rajadas, manobras e velocidade determinam as cargas impostas à aeronave.", objectives: ["Ler um diagrama V-n", "Relacionar inclinação e carga", "Compreender velocidade de manobra"] },
          { id: "pc-alta", title: "Voo em altitude", duration: 35, summary: "Com o aumento da altitude, densidade, potência disponível e margens de velocidade mudam. Aeronaves de alto desempenho exigem atenção a compressibilidade e buffet.", objectives: ["Diferenciar IAS, TAS e Mach", "Entender teto de serviço", "Reconhecer limites em altitude"] },
        ],
      },
      {
        title: "Peso, balanceamento e performance",
        description: "Como carga e ambiente afetam limites operacionais.",
        lessons: [
          { id: "pc-cg", title: "Centro de gravidade", duration: 42, summary: "O centro de gravidade precisa permanecer no envelope aprovado. Posições dianteiras e traseiras alteram estabilidade, comando e desempenho.", objectives: ["Calcular momento", "Plotar o CG no envelope", "Avaliar efeitos de um CG traseiro"] },
          { id: "pc-pista", title: "Desempenho de pista", duration: 40, summary: "Distância disponível, vento, inclinação, contaminação, temperatura e peso precisam ser aplicados aos dados aprovados da aeronave.", objectives: ["Identificar fatores de decolagem", "Aplicar margens operacionais", "Evitar extrapolação de tabelas"] },
          { id: "pc-combustivel", title: "Combustível e autonomia", duration: 34, summary: "Planejamento distingue combustível de táxi, etapa, contingência, alternativa e reserva conforme a operação e a regra aplicável.", objectives: ["Montar um quadro de combustível", "Converter consumo e tempo", "Reavaliar combustível em rota"] },
        ],
      },
      {
        title: "Operação profissional",
        description: "Meteorologia, CRM e gestão de ameaças.",
        lessons: [
          { id: "pc-meteo", title: "Meteorologia operacional", duration: 45, summary: "Cartas sinóticas, imagens, SIGMET e tendências complementam METAR e TAF. A decisão depende da evolução prevista, não de um único dado.", objectives: ["Integrar diferentes fontes", "Identificar convecção e gelo", "Montar uma linha do tempo meteorológica"] },
          { id: "pc-crm", title: "CRM e comunicação", duration: 35, summary: "CRM usa todos os recursos disponíveis: pessoas, procedimentos, equipamentos e informação. Comunicação clara e monitoramento reduzem erros não detectados.", objectives: ["Aplicar comunicação assertiva", "Usar briefings", "Reconhecer gradiente de autoridade"] },
          { id: "pc-tem", title: "TEM e tomada de decisão", duration: 38, summary: "Threat and Error Management organiza ameaças, erros e estados indesejados. A meta é criar barreiras antes que a situação reduza margens de segurança.", objectives: ["Distinguir ameaça e erro", "Planejar contramedidas", "Definir gatilhos de descontinuação"] },
        ],
      },
    ],
  },
  ifr: {
    code: "ifr",
    title: "Voo por Instrumentos",
    shortTitle: "IFR",
    description: "Construa disciplina de painel, navegação rádio e leitura de procedimentos instrumentais.",
    accent: "#8ab4f8",
    estimatedHours: 38,
    level: "Especialização",
    modules: [
      {
        title: "Voo por instrumentos",
        description: "Varredura, interpretação e controle preciso da aeronave.",
        lessons: [
          { id: "ifr-scan", title: "Varredura e voo básico", duration: 35, summary: "Uma varredura eficiente seleciona, interpreta e cruza instrumentos de controle e desempenho. Fixação e omissão são erros comuns.", objectives: ["Organizar a varredura", "Usar atitude-potência-desempenho", "Reconhecer falhas de instrumento"] },
          { id: "ifr-giros", title: "Sistemas pitot-estático e giroscópico", duration: 42, summary: "Bloqueios e falhas produzem indicações características. Diagnóstico depende de comparar instrumentos e compreender suas fontes.", objectives: ["Mapear fontes de pressão", "Identificar sintomas de bloqueio", "Comparar instrumentos giroscópicos"] },
          { id: "ifr-desorientacao", title: "Desorientação espacial", duration: 30, summary: "Sem referências visuais, o sistema vestibular pode sugerir movimentos inexistentes. A resposta segura é confiar nos instrumentos e manter técnica disciplinada.", objectives: ["Reconhecer ilusões comuns", "Evitar movimentos bruscos de cabeça", "Priorizar indicações confiáveis"] },
        ],
      },
      {
        title: "Navegação IFR",
        description: "VOR, DME, ILS, GNSS e conceitos de navegação de área.",
        lessons: [
          { id: "ifr-vor", title: "VOR e interceptações", duration: 45, summary: "O VOR fornece radiais a partir da estação. Seleção de curso, indicação TO/FROM e posição relativa orientam interceptação e rastreamento.", objectives: ["Interpretar TO/FROM", "Determinar radial", "Planejar uma interceptação"] },
          { id: "ifr-ils", title: "ILS: localizer e glide slope", duration: 44, summary: "O localizer fornece orientação lateral e o glide slope, quando disponível, orientação vertical. Interceptação estabilizada e monitoramento são essenciais.", objectives: ["Identificar componentes do ILS", "Entender sensibilidade crescente", "Reconhecer limites de uma aproximação"] },
          { id: "ifr-rnav", title: "RNAV, GNSS e RNP", duration: 46, summary: "RNAV permite navegar entre pontos definidos sem sobrevoar auxílios específicos. RNP acrescenta monitoramento e alerta de desempenho a bordo.", objectives: ["Distinguir RNAV e RNP", "Entender integridade", "Verificar sequência de pontos"] },
        ],
      },
      {
        title: "Procedimentos e planejamento",
        description: "Saídas, chegadas, aproximações e preparação do voo.",
        lessons: [
          { id: "ifr-sid-star", title: "SID e STAR", duration: 40, summary: "SID e STAR organizam transições entre aeródromo e estrutura de rotas. Cartas definem trajetórias, restrições, frequências e requisitos.", objectives: ["Ler restrições de altitude", "Localizar transições", "Preparar um briefing"] },
          { id: "ifr-aproximacao", title: "Cartas de aproximação", duration: 50, summary: "Uma carta reúne curso final, altitudes, mínimos, arremetida e infraestrutura. O briefing deve transformar a carta em uma sequência mental clara.", objectives: ["Identificar FAF e MAPt", "Distinguir DA e MDA", "Revisar procedimento de arremetida"] },
          { id: "ifr-alternado", title: "Planejamento e alternados", duration: 38, summary: "Planejamento IFR integra meteorologia, combustível, NOTAM, capacidade da aeronave e opções de desvio. Critérios devem seguir regras e publicações vigentes.", objectives: ["Avaliar adequação do alternado", "Planejar combustível", "Criar pontos de decisão"] },
        ],
      },
    ],
  },
  mlte: {
    code: "mlte",
    title: "Multimotor Terrestre",
    shortTitle: "MLTE",
    description: "Entenda sistemas, assimetria, performance e decisões críticas no multimotor.",
    accent: "#c8a7ff",
    estimatedHours: 28,
    level: "Habilitação",
    modules: [
      {
        title: "Sistemas multimotores",
        description: "Arquitetura e gerenciamento de sistemas com redundância.",
        lessons: [
          { id: "mlte-motores", title: "Motores e hélices", duration: 38, summary: "Sistemas de hélice de velocidade constante ajustam passo para manter RPM selecionada. Embandeiramento reduz o arrasto após falha quando previsto pelo projeto.", objectives: ["Relacionar passo, RPM e potência", "Entender embandeiramento", "Revisar limitações do sistema"] },
          { id: "mlte-combustivel", title: "Combustível e elétrico", duration: 36, summary: "Configurações variam entre aeronaves. O piloto deve saber fontes, alimentação cruzada, proteções e efeitos de falhas conforme o manual específico.", objectives: ["Desenhar o fluxo do sistema", "Localizar proteções", "Evitar transferência baseada em memória genérica"] },
          { id: "mlte-trem", title: "Trem, flapes e hidráulico", duration: 32, summary: "Indicações, travamentos, extensão alternativa e limitações precisam ser compreendidos antes do voo e praticados conforme checklist.", objectives: ["Interpretar indicações", "Revisar extensão alternativa", "Relacionar configuração e arrasto"] },
        ],
      },
      {
        title: "Aerodinâmica assimétrica",
        description: "Controle e desempenho com perda de potência.",
        lessons: [
          { id: "mlte-vmc", title: "VMC e fatores", duration: 48, summary: "VMC é demonstrada em condições específicas e muda com configuração e ambiente. Não representa garantia de subida nem uma velocidade fixa para toda situação.", objectives: ["Identificar fatores que afetam VMC", "Separar controle de performance", "Compreender marcação no velocímetro"] },
          { id: "mlte-critico", title: "Motor crítico e assimetria", duration: 38, summary: "Torque, P-factor, slipstream e ação giroscópica podem tornar a falha de um motor mais desfavorável em projetos convencionais.", objectives: ["Explicar motor crítico", "Reconhecer guinada e rolagem", "Usar inclinação adequada conforme manual"] },
          { id: "mlte-arrasto", title: "Arrasto e identificação", duration: 34, summary: "Uma hélice em molinete pode gerar grande arrasto. A sequência de controle, potência, arrasto e identificação deve seguir o procedimento aprovado.", objectives: ["Priorizar controle direcional", "Identificar sem precipitação", "Confirmar antes de cortar"] },
        ],
      },
      {
        title: "Performance e emergência",
        description: "Planejamento conservador e resposta disciplinada.",
        lessons: [
          { id: "mlte-single", title: "Performance monomotor", duration: 44, summary: "A razão de subida monomotor pode ser pequena, nula ou negativa. Peso, altitude-densidade, configuração e técnica precisam ser avaliados nos dados aprovados.", objectives: ["Ler gráficos monomotor", "Calcular gradiente", "Reconhecer ausência de margem"] },
          { id: "mlte-falha", title: "Falha após a decolagem", duration: 46, summary: "A fase de baixa altura exige ações treinadas e aderência ao procedimento da aeronave. Controle e trajetória segura vêm antes do diagnóstico detalhado.", objectives: ["Definir prioridades", "Briefar pontos de decisão", "Aplicar checklist após estabilizar"] },
          { id: "mlte-planejamento", title: "Briefing e planejamento MLTE", duration: 35, summary: "O briefing inclui rejeição, falha após decolagem, áreas disponíveis, obstáculos e critérios pessoais. A decisão deve considerar performance real, não apenas número de motores.", objectives: ["Criar briefing de decolagem", "Avaliar obstáculos", "Definir limites conservadores"] },
        ],
      },
    ],
  },
};

export type Question = {
  id: string;
  course: CourseCode;
  subject: string;
  prompt: string;
  options: [string, string, string, string];
  correct: number;
  explanation: string;
};

export const questions: Question[] = [
  { id: "pp-01", course: "pp", subject: "Teoria de voo", prompt: "O estol aerodinâmico ocorre diretamente quando:", options: ["A velocidade indicada chega a um valor único", "O ângulo de ataque crítico é excedido", "A potência é reduzida para marcha lenta", "O nariz fica abaixo do horizonte"], correct: 1, explanation: "O estol é causado pela superação do ângulo de ataque crítico. A velocidade em que isso acontece varia com peso, carga e configuração." },
  { id: "pp-02", course: "pp", subject: "Meteorologia", prompt: "Em condições iguais, uma temperatura elevada no aeródromo tende a:", options: ["Reduzir a altitude-densidade", "Melhorar a razão de subida", "Aumentar a altitude-densidade", "Eliminar o efeito da altitude"], correct: 2, explanation: "Ar mais quente é menos denso, elevando a altitude-densidade e normalmente degradando decolagem e subida." },
  { id: "pp-03", course: "pp", subject: "Navegação", prompt: "A diferença entre proa e rota ocorre principalmente porque:", options: ["O altímetro apresenta atraso", "O vento provoca deriva", "A bússola indica altitude", "O motor altera a declinação"], correct: 1, explanation: "A proa é a direção para a qual a aeronave aponta; a rota é o caminho sobre o solo. O vento pode separá-las." },
  { id: "pp-04", course: "pp", subject: "Altimetria", prompt: "Ao ajustar QNH, o altímetro no solo deve indicar aproximadamente:", options: ["A elevação do aeródromo", "Zero sempre", "O nível de voo", "A altura da cabeceira"], correct: 0, explanation: "QNH referencia o nível médio do mar, portanto o altímetro no solo indica aproximadamente a elevação do aeródromo." },
  { id: "pp-05", course: "pp", subject: "Teoria de voo", prompt: "Em uma curva nivelada, aumentar a inclinação mantendo altitude exige:", options: ["Menor sustentação total", "Maior componente vertical de sustentação", "Zerar o fator de carga", "Reduzir sempre o ângulo de ataque"], correct: 1, explanation: "A sustentação é inclinada com a aeronave. Para manter sua componente vertical igual ao peso, a sustentação total e o fator de carga aumentam." },
  { id: "pp-06", course: "pp", subject: "Meteorologia", prompt: "O METAR representa principalmente:", options: ["Uma previsão mensal", "Uma observação meteorológica de aeródromo", "Uma carta de navegação", "Um aviso de manutenção"], correct: 1, explanation: "METAR é uma mensagem de observação meteorológica de aeródromo; TAF é uma previsão para o aeródromo." },
  { id: "pc-01", course: "pc", subject: "Peso e balanceamento", prompt: "Um centro de gravidade além do limite traseiro tende a:", options: ["Aumentar a estabilidade longitudinal", "Reduzir estabilidade e dificultar recuperação", "Impedir qualquer rotação", "Não alterar o comportamento"], correct: 1, explanation: "Um CG excessivamente traseiro reduz a estabilidade longitudinal e pode tornar a recuperação de estol mais difícil." },
  { id: "pc-02", course: "pc", subject: "Performance", prompt: "Qual combinação normalmente aumenta a distância de decolagem?", options: ["Baixo peso e vento de proa", "Ar frio e pista descendente", "Alta altitude-densidade e alto peso", "Baixa temperatura e pista seca"], correct: 2, explanation: "Alta altitude-densidade reduz desempenho aerodinâmico e do motor; maior peso exige mais energia e tende a alongar a corrida." },
  { id: "pc-03", course: "pc", subject: "Navegação", prompt: "Mantidos os demais fatores, a TAS tende a ser maior que a IAS em altitude porque:", options: ["A densidade do ar é menor", "A bússola acelera", "O vento sempre aumenta", "A pressão estática é maior"], correct: 0, explanation: "Em ar menos denso, uma velocidade verdadeira maior é necessária para produzir a mesma pressão dinâmica indicada." },
  { id: "pc-04", course: "pc", subject: "CRM", prompt: "Um briefing eficaz deve ser:", options: ["Longo e memorizado sem adaptação", "Claro, específico e aberto a confirmação", "Feito apenas após uma anormalidade", "Restrito ao piloto em comando"], correct: 1, explanation: "Briefings eficazes criam um modelo mental compartilhado, abordam ameaças relevantes e permitem confirmação ou questionamento." },
  { id: "pc-05", course: "pc", subject: "Meteorologia", prompt: "Para avaliar convecção em rota, a melhor prática é:", options: ["Usar apenas um METAR de destino", "Integrar cartas, radar, SIGMET e tendência", "Ignorar dados após a partida", "Confiar apenas na aparência visual"], correct: 1, explanation: "Fenômenos convectivos evoluem. Uma decisão robusta integra fontes e acompanha tendência e atualizações durante a operação." },
  { id: "pc-06", course: "pc", subject: "Combustível", prompt: "Se o consumo é 36 L/h por 2 h 30 min, o consumo calculado é:", options: ["72 L", "80 L", "90 L", "108 L"], correct: 2, explanation: "2 h 30 min equivalem a 2,5 h. 36 × 2,5 = 90 litros, antes de adicionar reservas e outras parcelas." },
  { id: "ifr-01", course: "ifr", subject: "Instrumentos", prompt: "Em voo sem referências visuais, sensações corporais conflitantes devem ser resolvidas por:", options: ["Movimentos rápidos de cabeça", "Confiança nos instrumentos verificados", "Desligamento do painel", "Controle apenas pelo ouvido interno"], correct: 1, explanation: "O sistema vestibular pode produzir ilusões. Instrumentos cruzados e técnica disciplinada fornecem a referência confiável." },
  { id: "ifr-02", course: "ifr", subject: "Radionavegação", prompt: "Uma radial VOR é definida como:", options: ["Um curso magnético para a estação", "Uma linha magnética que se afasta da estação", "Uma distância DME", "Uma trajetória vertical"], correct: 1, explanation: "Radiais são direções magnéticas que emanam da estação VOR. Uma aeronave pode voar para a estação em curso recíproco à radial." },
  { id: "ifr-03", course: "ifr", subject: "Aproximação", prompt: "No ILS, o localizer fornece orientação:", options: ["Vertical", "Lateral", "De distância apenas", "De velocidade"], correct: 1, explanation: "O localizer fornece orientação lateral; o glide slope fornece orientação vertical quando disponível e utilizável." },
  { id: "ifr-04", course: "ifr", subject: "RNAV/RNP", prompt: "O que diferencia conceitualmente RNP de RNAV básica?", options: ["Uso obrigatório de VOR", "Monitoramento e alerta de desempenho a bordo", "Ausência de waypoints", "Proibição de GNSS"], correct: 1, explanation: "RNP é uma especificação RNAV que inclui monitoramento e alerta de desempenho a bordo." },
  { id: "ifr-05", course: "ifr", subject: "Procedimentos", prompt: "Antes de uma aproximação, o briefing deve incluir:", options: ["Somente a frequência", "Curso, altitudes, mínimos e arremetida", "Apenas o nome da pista", "Somente o vento de superfície"], correct: 1, explanation: "Um briefing útil cobre trajetória, frequências, altitudes, mínimos, temporização quando aplicável e procedimento de arremetida." },
  { id: "ifr-06", course: "ifr", subject: "Procedimentos", prompt: "Uma STAR tem como função principal:", options: ["Organizar a chegada da rota à área terminal", "Substituir o plano de voo", "Definir apenas a decolagem", "Indicar manutenção"], correct: 0, explanation: "STAR é uma chegada padrão por instrumentos que organiza a transição da estrutura de rotas para a área terminal." },
  { id: "mlte-01", course: "mlte", subject: "Aerodinâmica", prompt: "Após a falha de um motor, a prioridade imediata é:", options: ["Preencher o diário de bordo", "Manter controle e trajetória", "Recolher toda configuração sem avaliar", "Desligar o motor oposto"], correct: 1, explanation: "Controle direcional, atitude e trajetória segura vêm antes da identificação e do tratamento detalhado da falha." },
  { id: "mlte-02", course: "mlte", subject: "Performance", prompt: "Estar acima da VMC garante subida monomotor?", options: ["Sim, em qualquer peso", "Sim, abaixo de 10.000 ft", "Não; controle e performance são critérios distintos", "Somente com trem baixado"], correct: 2, explanation: "VMC trata de controle direcional nas condições de demonstração. A performance monomotor pode ser positiva, nula ou negativa." },
  { id: "mlte-03", course: "mlte", subject: "Hélices", prompt: "O embandeiramento de uma hélice após falha busca principalmente:", options: ["Aumentar o arrasto", "Reduzir o arrasto da hélice", "Aumentar RPM", "Baixar o trem"], correct: 1, explanation: "Ao alinhar as pás mais próximas do escoamento, o embandeiramento reduz o grande arrasto associado à hélice em molinete." },
  { id: "mlte-04", course: "mlte", subject: "Sistemas", prompt: "Em uma pane de sistema num MLTE, o procedimento correto deve vir prioritariamente:", options: ["Da memória de outra aeronave", "Do manual e checklist do modelo", "De uma regra genérica da internet", "Da aparência dos comandos"], correct: 1, explanation: "A arquitetura varia muito entre modelos. Manual aprovado, checklist e treinamento específico são as referências adequadas." },
  { id: "mlte-05", course: "mlte", subject: "Aerodinâmica", prompt: "VMC deve ser entendida como:", options: ["Valor imutável em qualquer condição", "Velocidade demonstrada sob condições especificadas", "Velocidade de melhor planeio", "Garantia de razão positiva"], correct: 1, explanation: "VMC é determinada/demonstrada sob condições específicas. Configuração, potência, densidade e CG podem alterar o controle disponível." },
  { id: "mlte-06", course: "mlte", subject: "Planejamento", prompt: "Um briefing de decolagem multimotor deve antecipar:", options: ["Somente a pista em uso", "Rejeição, falha, trajetória e pontos de decisão", "Apenas a frequência de solo", "Somente a rotação"], correct: 1, explanation: "O briefing cria respostas previamente decididas para rejeição e falha, incluindo trajetória, obstáculos e critérios do operador." },
];

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  intro: string;
  sections: { title: string; body: string[] }[];
};

export const articles: Article[] = [
  { slug: "como-interpretar-metar", title: "Como interpretar METAR", description: "Um método prático para decodificar vento, visibilidade, nuvens, temperatura e pressão.", category: "Meteorologia", readTime: 8, intro: "METAR é uma fotografia codificada das condições observadas em um aeródromo. A leitura fica mais segura quando segue sempre a mesma ordem.", sections: [
    { title: "Comece pelo contexto", body: ["Identifique o aeródromo, dia e horário UTC. Depois verifique se a mensagem é rotineira, especial ou corrigida. Essa moldura evita usar uma observação antiga como se fosse atual.", "O grupo de vento informa direção verdadeira, intensidade e rajadas. Vento variável e grupos adicionais merecem atenção especial para escolha de pista e componente de vento cruzado."] },
    { title: "Visibilidade, tempo e nuvens", body: ["Leia a visibilidade predominante e os fenômenos presentes. Abreviações combinam intensidade, proximidade, descrição e precipitação; não tente interpretá-las fora do contexto operacional.", "Nas camadas, FEW, SCT, BKN e OVC descrevem cobertura. Para teto, normalmente interessam as camadas BKN, OVC e visibilidade vertical, observadas as definições aplicáveis."] },
    { title: "Temperatura, QNH e tendência", body: ["Temperatura e ponto de orvalho próximos sugerem maior saturação e possibilidade de névoa ou nuvem baixa. QNH aparece no grupo de pressão e precisa ser convertido apenas quando necessário.", "Finalize lendo observações e tendência. Um METAR isolado não substitui TAF, SIGMET, radar, cartas e atualizações oficiais."] },
  ] },
  { slug: "como-interpretar-taf", title: "Como interpretar TAF", description: "Entenda validade, grupos de mudança e probabilidade em previsões de aeródromo.", category: "Meteorologia", readTime: 8, intro: "O TAF descreve a evolução esperada das condições de um aeródromo em uma janela definida. Seu valor está na linha do tempo, não em um grupo isolado.", sections: [
    { title: "Validade e condição inicial", body: ["Confirme aeródromo, emissão e período de validade. A primeira sequência de vento, visibilidade, fenômeno e nuvens vale desde o início até que um grupo de mudança altere algum elemento."] },
    { title: "Mudanças previstas", body: ["FM introduz uma nova condição a partir de um horário; BECMG indica transição em um intervalo; TEMPO representa flutuações temporárias. PROB expressa probabilidade quando utilizado pela norma local.", "Monte uma linha do tempo no papel. Isso torna visíveis janelas críticas e evita combinar condições que pertencem a períodos distintos."] },
    { title: "Uso operacional", body: ["Compare a previsão com METAR recentes e tendências. Observe margens em relação a mínimos, alternativas e combustível, sempre com as publicações e regras vigentes."] },
  ] },
  { slug: "vfr-x-ifr", title: "VFR x IFR: o que muda", description: "Compare referências, planejamento, separação e carga de trabalho.", category: "Operações", readTime: 7, intro: "VFR e IFR não descrevem apenas o tempo: são conjuntos de regras, responsabilidades e técnicas de navegação.", sections: [
    { title: "Referências e regras", body: ["No VFR, referências visuais e condições meteorológicas compatíveis sustentam a navegação e a separação prevista. No IFR, procedimentos, instrumentos e autorizações estruturam o voo, inclusive quando não há horizonte visível."] },
    { title: "Planejamento", body: ["IFR acrescenta análise detalhada de procedimentos, alternados, equipamentos e combustível. VFR também exige planejamento rigoroso, especialmente para deterioração meteorológica e perda de referências."] },
    { title: "Na simulação", body: ["Treine primeiro controle, navegação e comunicação. Automatizar sem compreender o procedimento cria uma falsa sensação de domínio."] },
  ] },
  { slug: "sid-e-star", title: "SID e STAR sem mistério", description: "Como ler transições, restrições e notas antes do briefing.", category: "Navegação IFR", readTime: 9, intro: "SID organiza a saída por instrumentos; STAR organiza a chegada. Ambas conectam o ambiente terminal à estrutura de rotas.", sections: [
    { title: "Anatomia da carta", body: ["Comece por identificação, validade, frequências e notas. Localize a pista, o procedimento comum e as transições associadas à rota."] },
    { title: "Restrições", body: ["Altitudes e velocidades podem ser mandatórias ou informativas conforme a simbologia. Leia cada restrição junto do ponto e confirme como a autorização ATC a afeta."] },
    { title: "Briefing", body: ["Verbalize trajetória inicial, primeira altitude, restrições críticas, ameaças e o que fazer se a automação não sequenciar como esperado."] },
  ] },
  { slug: "entendendo-ils", title: "ILS: do localizer aos mínimos", description: "Orientação lateral, vertical, interceptação e aproximação estabilizada.", category: "Navegação IFR", readTime: 9, intro: "O ILS combina sinais para guiar a aeronave até a região da pista. Precisão não elimina a necessidade de monitoramento.", sections: [
    { title: "Componentes", body: ["O localizer fornece orientação lateral e o glide slope, quando disponível, vertical. Marcadores ou DME podem apoiar consciência de distância conforme a instalação."] },
    { title: "Interceptação", body: ["Configure, identifique e confirme o curso. Intercepte de forma estável, evitando perseguir a indicação, cuja sensibilidade aumenta próximo ao transmissor."] },
    { title: "Mínimos e arremetida", body: ["Antes do FAF, confirme mínimos, ponto de decisão, referências exigidas e procedimento de arremetida. Se critérios não forem atendidos, execute a descontinuação prevista."] },
  ] },
  { slug: "vor-na-pratica", title: "VOR na prática", description: "Radiais, indicação TO/FROM e interceptação com raciocínio visual.", category: "Navegação", readTime: 8, intro: "VOR informa a posição angular da aeronave em relação a uma estação. A chave é separar radial, curso selecionado e direção do voo.", sections: [
    { title: "Radial não é proa", body: ["Radial emana da estação. Estar na radial 090 significa estar a leste da estação, independentemente da proa atual."] },
    { title: "TO e FROM", body: ["A bandeira depende do curso selecionado e da posição. Ela não diz se a aeronave está fisicamente se aproximando; para isso, observe trajetória e tendência."] },
    { title: "Interceptar e acompanhar", body: ["Escolha um ângulo coerente com distância e urgência, observe o movimento do CDI e reduza a interceptação antes de cruzar o curso."] },
  ] },
  { slug: "rnav-e-rnp", title: "RNAV e RNP: qual a diferença?", description: "Navegação de área, precisão, integridade e monitoramento a bordo.", category: "Navegação IFR", readTime: 8, intro: "RNAV permite trajetórias entre pontos definidos; RNP acrescenta requisitos de monitoramento e alerta de desempenho a bordo.", sections: [
    { title: "Especificação de navegação", body: ["O número associado a uma especificação representa precisão lateral esperada em grande parte do tempo, mas requisitos completos incluem equipamentos, tripulação e operação."] },
    { title: "Integridade", body: ["Não basta a posição parecer correta. O sistema precisa indicar quando não consegue manter o desempenho exigido, especialmente em operações RNP."] },
    { title: "Boas práticas", body: ["Verifique banco de dados, validade, pontos, cursos, restrições e sequência. Compare o plano carregado com a carta antes de executar."] },
  ] },
  { slug: "circuito-de-trafego", title: "Circuito de tráfego organizado", description: "Perna do vento, base, final e uma rotina que melhora consciência situacional.", category: "Operações", readTime: 6, intro: "O circuito organiza aeronaves próximas ao aeródromo e cria posições previsíveis para separação visual e preparação do pouso.", sections: [
    { title: "Geometria", body: ["Entrada, través, perna do vento, base e final devem respeitar procedimentos locais, vento e tráfego. Não force um retângulo perfeito se a segurança exigir adaptação."] },
    { title: "Energia e configuração", body: ["Use referências de altitude, distância e potência. Configure progressivamente e preserve uma aproximação estabilizada."] },
    { title: "Comunicação", body: ["Relatos curtos com posição e intenção ajudam todos a construir a mesma imagem. Escuta é tão importante quanto transmissão."] },
  ] },
  { slug: "niveis-de-voo", title: "Níveis de voo e ajuste padrão", description: "Por que a referência muda e como manter separação vertical consistente.", category: "Operações", readTime: 6, intro: "Níveis de voo usam uma superfície de pressão comum para que aeronaves em rota compartilhem a mesma referência vertical.", sections: [
    { title: "Altitude e nível", body: ["Abaixo da transição aplicável, o altímetro usa o ajuste local para indicar altitude. Acima, usa o ajuste padrão e a indicação passa a ser expressa como nível de voo."] },
    { title: "Transição", body: ["Altitude de transição e nível de transição não são sinônimos. A camada entre eles garante margem durante a mudança de referência."] },
    { title: "Disciplina", body: ["Confirme o ajuste em voz alta, cruze instrumentos e acompanhe autorizações. Um ajuste incorreto cria erro vertical sistemático."] },
  ] },
  { slug: "altitude-de-transicao", title: "Altitude e nível de transição", description: "Entenda a camada de transição e evite confundir os dois conceitos.", category: "Operações", readTime: 6, intro: "A transição entre QNH e pressão padrão precisa preservar uma separação vertical coerente mesmo quando a pressão varia.", sections: [
    { title: "Dois limites", body: ["A altitude de transição é publicada para a subida. O nível de transição é usado na descida e pode variar com a pressão."] },
    { title: "Camada de transição", body: ["O espaço entre os limites não é destinado ao voo de cruzeiro nivelado. Ele absorve diferenças entre referências de pressão."] },
    { title: "Aplicação", body: ["Use cartas e informação ATC atuais. Na simulação, configure o altímetro no ponto correto em vez de depender apenas de alertas automáticos."] },
  ] },
  { slug: "top-of-descent", title: "Top of Descent com regra de 3", description: "Uma estimativa rápida para começar a descida e ajustar a razão vertical.", category: "Planejamento", readTime: 7, intro: "A regra de 3 transforma altitude a perder em uma distância inicial de planejamento para uma trajetória próxima de três graus.", sections: [
    { title: "Distância", body: ["Divida a altitude a perder em milhares de pés e multiplique por três. Perder 9.000 pés sugere cerca de 27 NM, antes de correções."] },
    { title: "Razão vertical", body: ["Uma aproximação prática é multiplicar a velocidade no solo por cinco. A 120 kt, cerca de 600 ft/min acompanha aproximadamente três graus."] },
    { title: "Correções", body: ["Some distância para desaceleração, vento, restrições e configuração. Use dados e automação da aeronave como apoio, não como substituto de monitoramento."] },
  ] },
  { slug: "vento-cruzado", title: "Como calcular vento cruzado", description: "Componentes de proa, cauda e través com um método simples.", category: "Performance", readTime: 7, intro: "O vento informado pode ser decomposto em uma componente paralela e outra perpendicular ao eixo da pista.", sections: [
    { title: "Ângulo relativo", body: ["Encontre a menor diferença entre direção do vento e orientação da pista. Use valores reais publicados quando precisão for necessária."] },
    { title: "Componentes", body: ["Vento cruzado é velocidade vezes seno do ângulo; componente de proa é velocidade vezes cosseno. A ferramenta da FOX SIM automatiza essa estimativa."] },
    { title: "Decisão", body: ["Compare com limitações, demonstrações, condição de pista, rajadas e proficiência. Um número não substitui uma avaliação completa."] },
  ] },
  { slug: "como-funciona-altimetro", title: "Como funciona o altímetro", description: "Pressão estática, cápsulas aneróides e erros que todo piloto deve reconhecer.", category: "Instrumentos", readTime: 8, intro: "O altímetro mede pressão estática e a converte em uma indicação de altitude segundo um modelo atmosférico.", sections: [
    { title: "Mecanismo", body: ["Cápsulas aneróides se expandem quando a pressão diminui e se contraem quando aumenta. Engrenagens transformam esse movimento na indicação do mostrador."] },
    { title: "Ajuste", body: ["A janela barométrica desloca a referência da indicação. QNH, QFE e padrão respondem a necessidades operacionais distintas."] },
    { title: "Erros", body: ["Temperatura não padrão, pressão e bloqueios estáticos podem produzir erros. Compare instrumentos e aplique procedimentos específicos quando houver suspeita."] },
  ] },
  { slug: "qnh-qfe-qne", title: "QNH, QFE e QNE", description: "Três referências de pressão explicadas sem decoreba.", category: "Instrumentos", readTime: 6, intro: "Os ajustes altimétricos mudam a superfície de referência usada pelo instrumento.", sections: [
    { title: "QNH", body: ["Com QNH, a indicação no solo fica próxima da elevação do aeródromo e as altitudes são referidas ao nível médio do mar."] },
    { title: "QFE", body: ["Com QFE do aeródromo, a indicação fica próxima de zero naquele ponto de referência, representando altura aproximada sobre ele."] },
    { title: "QNE e padrão", body: ["O ajuste padrão cria uma referência comum para níveis de voo. QNE é a altitude de pressão indicada com esse ajuste em uma posição considerada."] },
  ] },
  { slug: "comecar-na-aviacao-virtual", title: "Como começar na aviação virtual", description: "Simulador, aeronave, controles e uma sequência de aprendizado sustentável.", category: "Simulação", readTime: 9, intro: "Você não precisa começar com uma cabine completa. Um computador adequado, controle básico e uma aeronave bem estudada já permitem evoluir muito.", sections: [
    { title: "Escolha um ecossistema", body: ["Compare desempenho no seu computador, aeronaves disponíveis e tipo de voo desejado. Evite comprar complementos antes de dominar a plataforma base."] },
    { title: "Comece simples", body: ["Use uma aeronave leve, pratique atitudes, circuito, navegação visual e procedimentos normais. Depois avance para rádio, instrumentos e redes online."] },
    { title: "Realismo com propósito", body: ["Checklist e planejamento aumentam aprendizado; complexidade sem compreensão só aumenta carga. Ajuste o nível de simulação ao objetivo de cada sessão."] },
  ] },
  { slug: "msfs-x-xplane-x-prepar3d", title: "MSFS x X-Plane x Prepar3D", description: "Como escolher uma plataforma pelo seu objetivo, hardware e ecossistema.", category: "Simulação", readTime: 10, intro: "Não existe um vencedor universal. A escolha depende de aeronaves, cenário, dinâmica, integração e orçamento.", sections: [
    { title: "Microsoft Flight Simulator", body: ["MSFS 2020 e 2024 priorizam uma representação visual ampla do mundo e possuem grande ecossistema de conteúdo. Verifique compatibilidade de complementos e requisitos da versão escolhida."] },
    { title: "X-Plane", body: ["X-Plane é valorizado por seu modelo aerodinâmico e ambiente de desenvolvimento, com ampla oferta de aeronaves e plugins em diferentes sistemas operacionais."] },
    { title: "Prepar3D", body: ["Prepar3D mantém relevância em ecossistemas específicos e treinamento licenciado. Antes de escolher, confirme licença, suporte atual e disponibilidade dos complementos que você realmente usará."] },
  ] },
  { slug: "planejamento-ifr", title: "Planejamento IFR em camadas", description: "Rota, meteorologia, combustível, alternados e ameaças em uma sequência clara.", category: "Planejamento", readTime: 10, intro: "Planejamento IFR não é apenas inserir uma rota no FMS. É construir opções antes que a carga de trabalho aumente.", sections: [
    { title: "Estrutura da rota", body: ["Confirme aeródromos, pista provável, SID, aerovias, STAR e aproximações possíveis. Valide níveis, restrições e capacidade de navegação."] },
    { title: "Ambiente", body: ["Integre meteorologia, NOTAM, terreno, gelo, convecção e condição dos aeródromos. Procure tendências e pontos com poucas alternativas."] },
    { title: "Combustível e decisões", body: ["Separe parcelas de combustível e estabeleça pontos de reavaliação. Um bom plano define cedo quando desviar, esperar ou encerrar a operação."] },
  ] },
  { slug: "cost-index", title: "Cost Index explicado", description: "O compromisso entre custo de tempo e custo de combustível no gerenciamento de voo.", category: "Performance", readTime: 7, intro: "Cost Index é uma razão econômica usada por sistemas de gerenciamento para escolher velocidades dentro de limites operacionais.", sections: [
    { title: "Dois custos", body: ["Valores menores tendem a privilegiar economia de combustível; maiores dão mais peso ao custo do tempo. O resultado exato depende do modelo e dos dados da operação."] },
    { title: "Não é velocidade fixa", body: ["O sistema considera altitude, peso, vento e fase do voo. O mesmo índice pode produzir velocidades diferentes em situações distintas."] },
    { title: "Na simulação", body: ["Use valores coerentes com o perfil que deseja reproduzir e monitore restrições. Não copie um número de outra empresa ou aeronave sem contexto."] },
  ] },
  { slug: "peso-e-balanceamento", title: "Peso e balanceamento na prática", description: "Momento, centro de gravidade e leitura do envelope operacional.", category: "Performance", readTime: 9, intro: "Estar abaixo do peso máximo não basta: a distribuição precisa manter o centro de gravidade dentro do envelope.", sections: [
    { title: "Peso e momento", body: ["Momento resulta do peso multiplicado pelo braço. Some pesos e momentos e divida o momento total pelo peso total quando o método da aeronave assim definir."] },
    { title: "Envelope", body: ["Plote peso e CG no gráfico aprovado. O envelope pode estreitar em certos pesos; não extrapole linhas ou arredonde para criar conformidade."] },
    { title: "Efeitos", body: ["CG dianteiro tende a exigir mais força de cauda e pode aumentar velocidade de estol; CG traseiro reduz estabilidade e margem de recuperação."] },
  ] },
  { slug: "como-estudar-prova-teorica", title: "Como estudar para a prova teórica", description: "Um plano de estudo ativo com revisão espaçada, questões e simulados.", category: "Estudos", readTime: 8, intro: "Estudar bem alterna compreensão, recuperação ativa e correção de lacunas. Releitura isolada costuma produzir familiaridade, não domínio.", sections: [
    { title: "Construa a base", body: ["Divida matérias em módulos pequenos. Após cada aula, explique o conceito com suas palavras e crie exemplos."] },
    { title: "Pratique com intenção", body: ["Responda questões sem consultar material, corrija imediatamente e registre por que errou: conceito, distração ou cálculo."] },
    { title: "Revise e simule", body: ["Use revisão espaçada nos temas fracos. Próximo da avaliação, faça simulados cronometrados e preserve sono e rotina."] },
  ] },
];

export const courseList = Object.values(courses);
export const articleCategories = [...new Set(articles.map((article) => article.category))];

export function isCourseCode(value: string): value is CourseCode {
  return value === "pp" || value === "pc" || value === "ifr" || value === "mlte";
}

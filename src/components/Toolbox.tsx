"use client";

import { useEffect, useMemo, useState } from "react";
import { Compass, Gauge, Wind, Plane, ArrowDownRight, Clock, Sparkles } from "lucide-react";
import { ValidLocale, getBcp47Lang } from "@/lib/i18n";
import { soundEngine } from "./GlobalInteractivity";

function NumberInput({
  label,
  value,
  onChange,
  unit,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit: string;
}) {
  return (
    <label className="tool-input">
      <span>{label}</span>
      <div>
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => {
            soundEngine.playClick();
            onChange(Number(event.target.value));
          }}
        />
        <b>{unit}</b>
      </div>
    </label>
  );
}

function Result({
  value,
  unit,
  note,
  resultLabel = "RESULTADO",
}: {
  value: string | number;
  unit: string;
  note?: string;
  resultLabel?: string;
}) {
  return (
    <div className="tool-result">
      <small>{resultLabel}</small>
      <strong>
        {value} <span>{unit}</span>
      </strong>
      {note && <p>{note}</p>}
    </div>
  );
}

const TOOLBOX_STRINGS: Record<ValidLocale, {
  resultLabel: string;
  t1Title: string;
  t1Desc: string;
  t1Label: string;
  t1Note: string;
  t2Title: string;
  t2Desc: string;
  t2Label: string;
  t2Note: string;
  t3Title: string;
  t3Desc: string;
  t3Label: string;
  t4Title: string;
  t4Desc: string;
  t4Label: string;
  t5Title: string;
  t5Desc: string;
  t5Dist: string;
  t5Gs: string;
  t5Note: string;
  t6Title: string;
  t6Desc: string;
  t6Flow: string;
  t6Time: string;
  t6Fuel: string;
  t6Burned: string;
  t6Endurance: string;
  t7Title: string;
  t7Desc: string;
  t7Alt: string;
  t7Note: string;
  t8Title: string;
  t8Desc: string;
  t8Gs: string;
  t8Note: string;
  t9Title: string;
  t9Desc: string;
  t9Date: string;
  t10Title: string;
  t10Desc: string;
  t10WindDir: string;
  t10Rwy: string;
  t10WindSpd: string;
  t10CrossUnit: string;
  t10Left: string;
  t10Right: string;
  t10Head: string;
  t10Tail: string;
  warningTitle: string;
  warningText: string;
}> = {
  "pt-br": {
    resultLabel: "RESULTADO",
    t1Title: "Ajuste de Altímetro (QNH x QNE)",
    t1Desc: "Calcule a diferença entre a altitude indicada e a altitude pressão usando o ajuste QNH local.",
    t1Label: "QNH informado",
    t1Note: "A 1013 hPa, altitude indicada e de pressão coincidem.",
    t2Title: "Altitude Densidade",
    t2Desc: "Estime a densidade do ar a partir da altitude pressão e da temperatura externa (OAT).",
    t2Label: "Altitude de pressão",
    t2Note: "Ar menos denso reduz sustentação e tração.",
    t3Title: "Base das Nuvens Convectivas",
    t3Desc: "Calcule a altura aproximada da base de nuvens cúmulos pela fórmula Spread / 2,5 × 1.000 ft.",
    t3Label: "Temperatura do ar",
    t4Title: "Velocidade Verdadeira (TAS)",
    t4Desc: "Estime a velocidade aerodinâmica verdadeira com a regra empírica de +2% por 1.000 ft.",
    t4Label: "Velocidade indicada (IAS)",
    t5Title: "Top of Descent (TOD)",
    t5Desc: "Planeje o ponto ideal para iniciar a descida usando a regra de 3:1.",
    t5Dist: "Distância para iniciar descida",
    t5Gs: "Razão recomendada para {speed} kt GS",
    t5Note: "Regra prática: 3 NM por 1.000 ft de perda de altitude.",
    t6Title: "Planejamento de Combustível",
    t6Desc: "Calcule o consumo em rota com base no fluxo horário do manual da aeronave.",
    t6Flow: "Fluxo horário",
    t6Time: "Tempo de voo",
    t6Fuel: "Combustível a bordo",
    t6Burned: "Consumo estimado",
    t6Endurance: "Autonomia total",
    t7Title: "Nível de Voo x Rumo Magnético",
    t7Desc: "Verifique a regra de quadrantes: níveis ímpares para rumos 000°–179° e pares para 180°–359°.",
    t7Alt: "Altitude ou Nível",
    t7Note: "Regra de separação vertical para voos em rota.",
    t8Title: "Razão de Descida no ILS (3° Glideslope)",
    t8Desc: "Calcule a velocidade vertical recomendada para manter a rampa eletrônica padrão de 3 graus.",
    t8Gs: "Velocidade no solo (GS)",
    t8Note: "Fórmula padrão: GS × 5 = razão de descida em ft/min.",
    t9Title: "Horário UTC / Zulu ao Vivo",
    t9Desc: "Relógio de precisão em tempo universal coordenado para planejamento de voo e interpretação de boletins.",
    t9Date: "Data UTC:",
    t10Title: "Componentes de Vento (Través e Proa/Cauda)",
    t10Desc: "Decomponha o vetor do vento em relação à pista para decolagens e pousos seguros.",
    t10WindDir: "Direção do vento",
    t10Rwy: "Rumo da pista",
    t10WindSpd: "Velocidade do vento",
    t10CrossUnit: "kt através",
    t10Left: "Vento da esquerda",
    t10Right: "Vento da direita",
    t10Head: "kt proa",
    t10Tail: "kt cauda",
    warningTitle: "Aviso de Segurança Aeronáutica",
    warningText: "As calculadoras desta página são ferramentas de apoio ao estudo e à simulação de voo. Para voos reais, utilize sempre tabelas oficiais de desempenho do manual aprovado da aeronave (POH/AFM).",
  },
  en: {
    resultLabel: "RESULT",
    t1Title: "Altimeter Setting (QNH vs QNE)",
    t1Desc: "Calculate difference between indicated altitude and pressure altitude based on local QNH.",
    t1Label: "Reported QNH",
    t1Note: "At standard 1013 hPa / 29.92 inHg, indicated equals pressure altitude.",
    t2Title: "Density Altitude",
    t2Desc: "Estimate air density from pressure altitude and outside air temperature (OAT).",
    t2Label: "Pressure altitude",
    t2Note: "Less dense air reduces wing lift and propeller thrust.",
    t3Title: "Convective Cloud Base",
    t3Desc: "Calculate cloud base height using the standard rule of thumb: Spread / 2.5 × 1,000 ft.",
    t3Label: "Air temperature",
    t4Title: "True Airspeed (TAS)",
    t4Desc: "Estimate true airspeed using the +2% per 1,000 ft altitude rule.",
    t4Label: "Indicated airspeed (IAS)",
    t5Title: "Top of Descent (TOD)",
    t5Desc: "Calculate the ideal descent point using the standard 3:1 vertical descent rule.",
    t5Dist: "Distance to begin descent",
    t5Gs: "Recommended rate for {speed} kt GS",
    t5Note: "Rule of thumb: 3 NM per 1,000 ft of altitude to lose.",
    t6Title: "Fuel Consumption & Endurance",
    t6Desc: "Calculate en-route fuel burn and total aircraft endurance based on hourly fuel flow.",
    t6Flow: "Fuel flow",
    t6Time: "Flight time",
    t6Fuel: "Fuel on board",
    t6Burned: "Estimated burn",
    t6Endurance: "Total endurance",
    t7Title: "Semicircular Flight Level Rule",
    t7Desc: "Check hemispheric cruise level: Odd thousands for 000°–179°, Even for 180°–359°.",
    t7Alt: "Altitude or Level",
    t7Note: "Vertical separation rules for en-route flight planning.",
    t8Title: "ILS 3° Glide Slope Descent Rate",
    t8Desc: "Determine the target vertical speed (VS) in feet per minute to stay on a 3-degree glide path.",
    t8Gs: "Ground speed (GS)",
    t8Note: "Standard rule: GS × 5 = target vertical speed in ft/min.",
    t9Title: "Live UTC / Zulu Clock",
    t9Desc: "Precision universal coordinated time clock for flight planning and METAR/TAF time checks.",
    t9Date: "UTC Date:",
    t10Title: "Crosswind & Headwind Components",
    t10Desc: "Resolve wind vector into crosswind and headwind/tailwind components for takeoff and landing.",
    t10WindDir: "Wind direction",
    t10Rwy: "Runway heading",
    t10WindSpd: "Wind speed",
    t10CrossUnit: "kt crosswind",
    t10Left: "Left crosswind",
    t10Right: "Right crosswind",
    t10Head: "kt headwind",
    t10Tail: "kt tailwind",
    warningTitle: "Aviation Safety Disclaimer",
    warningText: "These flight calculation tools are intended solely for academic study and desktop flight simulation. For real-world flight operations, always consult certified aircraft pilot operating handbooks (POH/AFM).",
  },
  es: {
    resultLabel: "RESULTADO",
    t1Title: "Ajuste Altimétrico (QNH vs QNE)",
    t1Desc: "Calcula la diferencia entre altitud indicada y altitud de presión usando el QNH local.",
    t1Label: "QNH informado",
    t1Note: "A 1013 hPa, altitud indicada y de presión coinciden.",
    t2Title: "Altitud Densidad",
    t2Desc: "Estima la densidad del aire a partir de la altitud de presión y la temperatura exterior.",
    t2Label: "Altitud de presión",
    t2Note: "El aire menos denso reduce sustentación y rendimiento.",
    t3Title: "Base de Nubes Convectivas",
    t3Desc: "Calcula la altura aproximada de la base nubosa con la fórmula Spread / 2,5 × 1.000 ft.",
    t3Label: "Temperatura del aire",
    t4Title: "Velocidad Verdadera (TAS)",
    t4Desc: "Estima la TAS aplicando la regla empírica de +2% por cada 1.000 ft de altitud.",
    t4Label: "Velocidad indicada (IAS)",
    t5Title: "Top of Descent (TOD)",
    t5Desc: "Calcula el punto ideal de descenso con la regla estándar 3:1.",
    t5Dist: "Distancia para iniciar descenso",
    t5Gs: "Régimen para {speed} kt GS",
    t5Note: "Regla práctica: 3 NM por cada 1.000 ft de descenso.",
    t6Title: "Planificación de Combustible",
    t6Desc: "Calcula el consumo en ruta y la autonomía total de vuelo.",
    t6Flow: "Consumo horario",
    t6Time: "Tiempo de vuelo",
    t6Fuel: "Combustible a bordo",
    t6Burned: "Consumo estimado",
    t6Endurance: "Autonomía total",
    t7Title: "Regla Semicircular de Niveles",
    t7Desc: "Comprueba niveles impares (000°–179°) y pares (180°–359°).",
    t7Alt: "Altitud o Nivel",
    t7Note: "Regla de separación vertical de vuelo.",
    t8Title: "Régimen de Descenso en ILS (3°)",
    t8Desc: "Determina la velocidad vertical para mantener la senda de 3 grados del ILS.",
    t8Gs: "Velocidad sobre el terreno",
    t8Note: "Fórmula estándar: GS × 5 = pies por minuto.",
    t9Title: "Reloj UTC / Zulu en Vivo",
    t9Desc: "Hora universal coordinada para el despacho y consulta de partes meteorológicos.",
    t9Date: "Fecha UTC:",
    t10Title: "Componentes de Viento Cruzado",
    t10Desc: "Descompón el viento en componentes de través y viento en cara/cola.",
    t10WindDir: "Dirección del viento",
    t10Rwy: "Rumbo de pista",
    t10WindSpd: "Velocidad del viento",
    t10CrossUnit: "kt cruzado",
    t10Left: "Viento de la izquierda",
    t10Right: "Viento de la derecha",
    t10Head: "kt de frente",
    t10Tail: "kt en cola",
    warningTitle: "Aviso de Seguridad Aeronáutica",
    warningText: "Estas calculadoras son herramientas de apoyo educativo y para simulación de vuelo. En vuelos reales consulte siempre los manuales oficiales del fabricante (POH/AFM).",
  },
  fr: {
    resultLabel: "RÉSULTAT",
    t1Title: "Calage Altimétrique (QNH vs QNE)",
    t1Desc: "Calculez l'écart entre altitude indiquée et altitude pression avec le QNH local.",
    t1Label: "QNH mesuré",
    t1Note: "À 1013 hPa, altitude indiquée et de pression sont identiques.",
    t2Title: "Altitude Densité",
    t2Desc: "Estimez la densité de l'air à partir de l'altitude pression et de la température.",
    t2Label: "Altitude pression",
    t2Note: "L'air moins dense réduit la portance et la traction.",
    t3Title: "Base des Nuages Convectifs",
    t3Desc: "Calculez la base des nuages avec la formule Spread / 2,5 × 1 000 ft.",
    t3Label: "Température de l'air",
    t4Title: "Vitesse Vraie (TAS)",
    t4Desc: "Estimez la TAS avec la règle empirique de +2% par tranche de 1 000 ft.",
    t4Label: "Vitesse indiquée (IAS)",
    t5Title: "Top of Descent (TOD)",
    t5Desc: "Calculez le point de début de descente selon la règle 3:1.",
    t5Dist: "Distance début de descente",
    t5Gs: "Taux conseillé pour {speed} kt GS",
    t5Note: "Règle usuelle : 3 NM pour 1 000 ft à perdre.",
    t6Title: "Bilan Carburant & Autonomie",
    t6Desc: "Calculez la consommation estimée en route et l'autonomie restante.",
    t6Flow: "Consommation horaire",
    t6Time: "Temps de vol",
    t6Fuel: "Carburant à bord",
    t6Burned: "Consommation estimée",
    t6Endurance: "Autonomie totale",
    t7Title: "Règle Semi-Circulaire de Niveau",
    t7Desc: "Vérifiez les niveaux impairs (000°–179°) et pairs (180°–359°).",
    t7Alt: "Altitude ou Niveau",
    t7Note: "Règle de séparation verticale en route.",
    t8Title: "Taux de Descente ILS (Pente 3°)",
    t8Desc: "Calculez la vitesse verticale en ft/min pour suivre le Glide Slope.",
    t8Gs: "Vitesse sol (GS)",
    t8Note: "Formule standard : GS × 5 = vitesse verticale en ft/min.",
    t9Title: "Horloge UTC / Zulu en Direct",
    t9Desc: "Horloge universelle synchronisée pour la préparation de vol.",
    t9Date: "Date UTC :",
    t10Title: "Composantes du Vent (Travers et Face)",
    t10Desc: "Décomposez le vent en composante traversière et vent de face/arrière.",
    t10WindDir: "Direction du vent",
    t10Rwy: "Orientation piste",
    t10WindSpd: "Vitesse du vent",
    t10CrossUnit: "kt traversier",
    t10Left: "Vent venant de gauche",
    t10Right: "Vent venant de droite",
    t10Head: "kt de face",
    t10Tail: "kt arrière",
    warningTitle: "Avertissement de Sécurité Aéronautique",
    warningText: "Ces outils sont destinés exclusivement à l'étude et à la simulation de vol. Pour le vol réel, reportez-vous toujours aux manuels approuvés de l'appareil (POH/AFM).",
  },
};

function format(value: number, decimals: number = 0) {
  if (!Number.isFinite(value)) return "--";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function Toolbox({ locale = "pt-br" }: { locale?: ValidLocale }) {
  const t = TOOLBOX_STRINGS[locale] || TOOLBOX_STRINGS["pt-br"];
  const bcp47 = getBcp47Lang(locale);

  // 1. QNH
  const [qnh, setQnh] = useState(1013);
  const qnhDelta = (1013 - qnh) * 30;

  // 2. Altitude Densidade
  const [pressureAlt, setPressureAlt] = useState(3000);
  const [oat, setOat] = useState(25);
  const isaTemp = 15 - 2 * (pressureAlt / 1000);
  const densityAlt = pressureAlt + 120 * (oat - isaTemp);

  // 3. Base das nuvens
  const [temp, setTemp] = useState(26);
  const [dewPoint, setDewPoint] = useState(18);
  const spread = temp - dewPoint;
  const cloudBase = Math.max(0, (spread / 2.5) * 1000);

  // 4. TAS
  const [ias, setIas] = useState(110);
  const [tasAlt, setTasAlt] = useState(6000);
  const tas = ias * (1 + (tasAlt / 1000) * 0.02);

  // 5. TOD
  const [cruiseAlt, setCruiseAlt] = useState(10000);
  const [targetAlt, setTargetAlt] = useState(2500);
  const [todGs, setTodGs] = useState(140);
  const altToLose = Math.max(0, cruiseAlt - targetAlt);
  const todDistance = (altToLose / 1000) * 3;
  const todVs = (todGs / 2) * 10;

  // 6. Combustível
  const [flow, setFlow] = useState(38);
  const [timeMin, setTimeMin] = useState(90);
  const [fuelOnBoard, setFuelOnBoard] = useState(120);
  const fuelBurned = flow * (timeMin / 60);
  const endurance = fuelOnBoard > 0 && flow > 0 ? fuelOnBoard / flow : 0;
  const enduranceHours = Math.floor(endurance);
  const enduranceMinutes = Math.round((endurance - enduranceHours) * 60);

  // 7. Semicircular
  const [heading, setHeading] = useState(90);
  const normalizedHdg = ((heading % 360) + 360) % 360;
  const isOdd = normalizedHdg >= 0 && normalizedHdg <= 179;

  // 8. Glide slope ILS
  const [groundSpeed, setGroundSpeed] = useState(120);

  // 9. Relógio UTC ao vivo
  const [utc, setUtc] = useState<string>("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setUtc(
        [
          d.getUTCHours().toString().padStart(2, "0"),
          d.getUTCMinutes().toString().padStart(2, "0"),
          d.getUTCSeconds().toString().padStart(2, "0"),
        ].join(":")
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // 10. Vento de través
  const [windDirection, setWindDirection] = useState(140);
  const [runway, setRunway] = useState(100);
  const [windSpeed, setWindSpeed] = useState(15);
  const angle = ((windDirection - runway + 180 + 360) % 360) - 180;
  const angleRad = (angle * Math.PI) / 180;
  const crosswind = Math.abs(windSpeed * Math.sin(angleRad));
  const headwind = windSpeed * Math.cos(angleRad);

  return (
    <div className="tool-grid">
      {/* 1. QNH */}
      <article className="tool-card panel-card">
        <header>
          <span>01</span>
          <div>
            <h2>{t.t1Title}</h2>
            <p>{t.t1Desc}</p>
          </div>
        </header>
        <NumberInput label={t.t1Label} value={qnh} onChange={setQnh} unit="hPa" />
        <Result
          value={`${qnhDelta >= 0 ? "+" : ""}${format(qnhDelta, 0)}`}
          unit="pés"
          note={t.t1Note}
          resultLabel={t.resultLabel}
        />
      </article>

      {/* 2. Altitude Densidade */}
      <article className="tool-card panel-card">
        <header>
          <span>02</span>
          <div>
            <h2>{t.t2Title}</h2>
            <p>{t.t2Desc}</p>
          </div>
        </header>
        <div className="tool-input-grid">
          <NumberInput label={t.t2Label} value={pressureAlt} onChange={setPressureAlt} unit="ft" />
          <NumberInput label="OAT" value={oat} onChange={setOat} unit="°C" />
        </div>
        <Result
          value={format(densityAlt, 0)}
          unit="pés"
          note={`ISA: ${format(isaTemp, 1)}°C (Δ ${format(oat - isaTemp, 1)}°C)`}
          resultLabel={t.resultLabel}
        />
      </article>

      {/* 3. Base das Nuvens */}
      <article className="tool-card panel-card">
        <header>
          <span>03</span>
          <div>
            <h2>{t.t3Title}</h2>
            <p>{t.t3Desc}</p>
          </div>
        </header>
        <div className="tool-input-grid">
          <NumberInput label={t.t3Label} value={temp} onChange={setTemp} unit="°C" />
          <NumberInput label="Ponto de orvalho" value={dewPoint} onChange={setDewPoint} unit="°C" />
        </div>
        <Result
          value={format(cloudBase, 0)}
          unit="pés AGL"
          note={`Spread T - Td = ${format(spread, 1)}°C`}
          resultLabel={t.resultLabel}
        />
      </article>

      {/* 4. TAS */}
      <article className="tool-card panel-card">
        <header>
          <span>04</span>
          <div>
            <h2>{t.t4Title}</h2>
            <p>{t.t4Desc}</p>
          </div>
        </header>
        <div className="tool-input-grid">
          <NumberInput label={t.t4Label} value={ias} onChange={setIas} unit="kt" />
          <NumberInput label="Altitude indicada" value={tasAlt} onChange={setTasAlt} unit="ft" />
        </div>
        <Result
          value={format(tas, 0)}
          unit="kt TAS"
          note={`Fator: +${format((tasAlt / 1000) * 2, 1)}%`}
          resultLabel={t.resultLabel}
        />
      </article>

      {/* 5. TOD (Top of Descent) com Gráfico Vertical Interativo */}
      <article className="tool-card wide panel-card">
        <header>
          <span>05</span>
          <div>
            <h2>{t.t5Title}</h2>
            <p>{t.t5Desc}</p>
          </div>
        </header>
        <div className="tool-input-grid three">
          <NumberInput label="Altitude de cruzeiro" value={cruiseAlt} onChange={setCruiseAlt} unit="ft" />
          <NumberInput label="Altitude alvo" value={targetAlt} onChange={setTargetAlt} unit="ft" />
          <NumberInput label="Ground Speed (GS)" value={todGs} onChange={setTodGs} unit="kt" />
        </div>

        {/* Visual Descent Profile Graphic */}
        <div className="tod-visual-profile">
          <div className="tod-step-point cruise">
            <Plane size={16} className="tod-plane-icon" />
            <span>CRZ {cruiseAlt} ft</span>
          </div>
          <div className="tod-descent-slope">
            <span className="slope-distance-label">Distância: <strong>{format(todDistance, 1)} NM</strong></span>
            <span className="slope-vs-label">Razão: <strong>{format(todVs, 0)} ft/min</strong></span>
          </div>
          <div className="tod-step-point target">
            <ArrowDownRight size={16} />
            <span>ALVO {targetAlt} ft</span>
          </div>
        </div>

        <div className="split-results">
          <Result
            value={format(todDistance, 1)}
            unit="NM"
            note={`Perda total de ${format(altToLose, 0)} ft`}
            resultLabel={t.t5Dist}
          />
          <Result
            value={format(todVs, 0)}
            unit="ft/min"
            note={`Perfil padrão para ${todGs} kt`}
            resultLabel={t.t5Gs.replace("{speed}", String(todGs))}
          />
        </div>
      </article>

      {/* 6. Combustível */}
      <article className="tool-card wide panel-card">
        <header>
          <span>06</span>
          <div>
            <h2>{t.t6Title}</h2>
            <p>{t.t6Desc}</p>
          </div>
        </header>
        <div className="tool-input-grid three">
          <NumberInput label={t.t6Flow} value={flow} onChange={setFlow} unit="L/h" />
          <NumberInput label={t.t6Time} value={timeMin} onChange={setTimeMin} unit="min" />
          <NumberInput label={t.t6Fuel} value={fuelOnBoard} onChange={setFuelOnBoard} unit="L" />
        </div>
        <div className="split-results">
          <Result
            value={format(fuelBurned, 1)}
            unit="L"
            note={`Reserva restante: ${format(Math.max(0, fuelOnBoard - fuelBurned), 1)} L`}
            resultLabel={t.t6Burned}
          />
          <Result
            value={`${enduranceHours}h ${enduranceMinutes.toString().padStart(2, "0")}m`}
            unit=""
            note={`Baseado em fluxo constante de ${flow} L/h`}
            resultLabel={t.t6Endurance}
          />
        </div>
      </article>

      {/* 7. Nível Semicircular */}
      <article className="tool-card panel-card">
        <header>
          <span>07</span>
          <div>
            <h2>{t.t7Title}</h2>
            <p>{t.t7Desc}</p>
          </div>
        </header>
        <NumberInput label="Rumo magnético" value={heading} onChange={setHeading} unit="°" />
        <Result
          value={isOdd ? "Nível ÍMPAR" : "Nível PAR"}
          unit={isOdd ? "(000°–179°)" : "(180°–359°)"}
          note={isOdd ? "Ex: FL055, FL075, FL095 (VFR) / FL050, FL070 (IFR)" : "Ex: FL045, FL065, FL085 (VFR) / FL060, FL080 (IFR)"}
          resultLabel={t.resultLabel}
        />
      </article>

      {/* 8. Glide Slope */}
      <article className="tool-card panel-card">
        <header>
          <span>08</span>
          <div>
            <h2>{t.t8Title}</h2>
            <p>{t.t8Desc}</p>
          </div>
        </header>
        <NumberInput label={t.t8Gs} value={groundSpeed} onChange={setGroundSpeed} unit="kt" />
        <Result
          value={format(groundSpeed * 5, 0)}
          unit="ft/min"
          note={t.t8Note}
          resultLabel={t.resultLabel}
        />
      </article>

      {/* 9. Relógio UTC Zulu */}
      <article className="tool-card panel-card utc-card">
        <header>
          <span>09</span>
          <div>
            <h2>{t.t9Title}</h2>
            <p>{t.t9Desc}</p>
          </div>
        </header>
        <div className="utc-clock">
          <strong>{utc || "--:--:--"}</strong>
          <span>UTC / ZULU</span>
        </div>
        <p className="utc-date-label">
          {t.t9Date}{" "}
          {new Intl.DateTimeFormat(bcp47, { timeZone: "UTC", dateStyle: "long" }).format(new Date())}
        </p>
      </article>

      {/* 10. Vento Cruzado com Diagrama de Pista e Vetor Interativo */}
      <article className="tool-card wide panel-card">
        <header>
          <span>10</span>
          <div>
            <h2>{t.t10Title}</h2>
            <p>{t.t10Desc}</p>
          </div>
        </header>
        <div className="tool-input-grid three">
          <NumberInput label={t.t10WindDir} value={windDirection} onChange={setWindDirection} unit="°" />
          <NumberInput label={t.t10Rwy} value={runway} onChange={setRunway} unit="°" />
          <NumberInput label={t.t10WindSpd} value={windSpeed} onChange={setWindSpeed} unit="kt" />
        </div>

        {/* Interactive Crosswind Compass Dial & Runway Vector Graphic */}
        <div className="crosswind-compass-visualizer">
          <div className="compass-rose-container">
            {/* Runway Bar */}
            <div
              className="runway-graphic-bar"
              style={{ transform: `rotate(${runway}deg)` }}
              title={`Pista ${Math.round(runway / 10).toString().padStart(2, "0")}`}
            >
              <span className="rwy-num top">{Math.round(runway / 10).toString().padStart(2, "0")}</span>
              <div className="rwy-center-stripes" />
              <span className="rwy-num bottom">{Math.round(((runway + 180) % 360) / 10).toString().padStart(2, "0")}</span>
            </div>

            {/* Wind Arrow Vector */}
            <div
              className="wind-vector-arrow"
              style={{ transform: `rotate(${windDirection}deg)` }}
              title={`Vento de ${windDirection}° com ${windSpeed} kt`}
            >
              <div className="wind-arrow-head" />
              <div className="wind-arrow-shaft" />
            </div>

            {/* Center Aircraft Symbol */}
            <div className="compass-aircraft-symbol">
              <Plane size={24} className="text-cyan" />
            </div>
          </div>

          <div className="crosswind-telemetry-summary">
            <div className="telemetry-row">
              <Wind size={15} className="text-cyan" />
              <span>Ângulo Relativo: <strong>{Math.abs(Math.round(angle))}° {angle < 0 ? "(Esquerda)" : "(Direita)"}</strong></span>
            </div>
            <div className="telemetry-row">
              <Gauge size={15} className="text-orange" />
              <span>Intensidade: <strong>{windSpeed} nós</strong></span>
            </div>
          </div>
        </div>

        <div className="split-results">
          <Result
            value={format(crosswind, 1)}
            unit={t.t10CrossUnit}
            note={angle < 0 ? t.t10Left : t.t10Right}
            resultLabel={t.resultLabel}
          />
          <Result
            value={format(Math.abs(headwind), 1)}
            unit={headwind >= 0 ? t.t10Head : t.t10Tail}
            note={headwind >= 0 ? "Vento de proa favorável" : "Atenção: Vento de cauda"}
            resultLabel={t.resultLabel}
          />
        </div>
      </article>

      {/* Aeronautical Safety Advisory Banner */}
      <div className="tools-warning panel-card">
        <b>{t.warningTitle}</b>
        <p>{t.warningText}</p>
      </div>
    </div>
  );
}

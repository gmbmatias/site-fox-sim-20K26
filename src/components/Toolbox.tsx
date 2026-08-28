"use client";

import { useEffect, useMemo, useState } from "react";
import { ValidLocale, getBcp47Lang } from "@/lib/i18n";

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
          onChange={(event) => onChange(Number(event.target.value))}
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
    t1Title: "Milhas náuticas ↔ KM",
    t1Desc: "Distância aeronáutica e terrestre.",
    t1Label: "Distância",
    t1Note: "1 NM = 1,852 km",
    t2Title: "Pés ↔ Metros",
    t2Desc: "Conversão rápida de altitude.",
    t2Label: "Altitude",
    t2Note: "1 ft = 0,3048 m",
    t3Title: "Knots ↔ km/h",
    t3Desc: "Velocidade em duas unidades.",
    t3Label: "Velocidade",
    t4Title: "Celsius ↔ Fahrenheit",
    t4Desc: "Temperatura sem decoreba.",
    t4Label: "Temperatura",
    t5Title: "Tempo · Distância · Velocidade",
    t5Desc: "Calcule o tempo estimado de uma etapa.",
    t5Dist: "Distância",
    t5Gs: "Velocidade no solo",
    t5Note: "Tempo decimal: {val} h",
    t6Title: "Consumo e autonomia",
    t6Desc: "Estimativa simples a partir do fluxo.",
    t6Flow: "Consumo",
    t6Time: "Tempo",
    t6Fuel: "Combustível utilizável",
    t6Burned: "L consumidos",
    t6Endurance: "h autonomia",
    t7Title: "Top of Descent (TOD)",
    t7Desc: "Regra 3:1 para planejamento de descida.",
    t7Alt: "Altitude a perder",
    t7Note: "Adicione distância para desacelerar e cumprir restrições.",
    t8Title: "Razão de descida (V/S)",
    t8Desc: "Aproximação para trajetória de 3°.",
    t8Gs: "Groundspeed",
    t8Note: "Regra prática: GS × 5.",
    t9Title: "Horário UTC (Zulu)",
    t9Desc: "Relógio Zulu em tempo real.",
    t9Date: "Data UTC:",
    t10Title: "Componente de vento",
    t10Desc: "Vento cruzado, proa ou cauda.",
    t10WindDir: "Direção do vento",
    t10Rwy: "Rumo da pista",
    t10WindSpd: "Intensidade",
    t10CrossUnit: "kt cruzado",
    t10Left: "Componente pela esquerda",
    t10Right: "Componente pela direita",
    t10Head: "kt de proa",
    t10Tail: "kt de cauda",
    warningTitle: "Aviso educacional",
    warningText: "Resultados são estimativas para estudo e simulação. Operações reais exigem dados do manual da aeronave, cartas, condições atuais e procedimentos aprovados.",
  },
  en: {
    resultLabel: "CALCULATED RESULT",
    t1Title: "Nautical Miles ↔ Kilometers",
    t1Desc: "Aviation and terrestrial distance conversion.",
    t1Label: "Distance",
    t1Note: "1 NM = 1.852 km",
    t2Title: "Feet ↔ Meters",
    t2Desc: "Instant altitude conversion.",
    t2Label: "Altitude",
    t2Note: "1 ft = 0.3048 m",
    t3Title: "Knots ↔ km/h",
    t3Desc: "Aviation airspeed converter.",
    t3Label: "Airspeed",
    t4Title: "Celsius ↔ Fahrenheit",
    t4Desc: "Temperature conversion.",
    t4Label: "Temperature",
    t5Title: "Time · Distance · Speed",
    t5Desc: "Estimate flight leg enroute elapsed time.",
    t5Dist: "Distance",
    t5Gs: "Groundspeed",
    t5Note: "Decimal time: {val} h",
    t6Title: "Fuel Burn & Endurance",
    t6Desc: "Calculate consumption from burn rate.",
    t6Flow: "Fuel Flow",
    t6Time: "Flight Time",
    t6Fuel: "Usable Fuel",
    t6Burned: "L burned",
    t6Endurance: "h endurance",
    t7Title: "Top of Descent (TOD)",
    t7Desc: "Standard 3:1 descent distance rule.",
    t7Alt: "Altitude to lose",
    t7Note: "Add 5-10 NM for deceleration and level constraints.",
    t8Title: "Target Descent Rate (V/S)",
    t8Desc: "Vertical speed for a stabilized 3° glide.",
    t8Gs: "Groundspeed",
    t8Note: "Rule of thumb: GS × 5 ft/min.",
    t9Title: "UTC Time (Zulu Clock)",
    t9Desc: "Live synchronized aviation Zulu time.",
    t9Date: "UTC Date:",
    t10Title: "Crosswind & Headwind",
    t10Desc: "Crosswind and longitudinal runway components.",
    t10WindDir: "Wind direction",
    t10Rwy: "Runway heading",
    t10WindSpd: "Wind speed",
    t10CrossUnit: "kt crosswind",
    t10Left: "Left crosswind component",
    t10Right: "Right crosswind component",
    t10Head: "kt headwind",
    t10Tail: "kt tailwind",
    warningTitle: "Educational Notice",
    warningText: "All calculations are for educational and flight simulation use only. Real flight operations require certified aircraft flight manuals (AFM/POH) and current aeronautical publications.",
  },
  es: {
    resultLabel: "RESULTADO",
    t1Title: "Millas Náuticas ↔ Kilómetros",
    t1Desc: "Conversor de distancia aeronáutica y terrestre.",
    t1Label: "Distancia",
    t1Note: "1 NM = 1,852 km",
    t2Title: "Pies ↔ Metros",
    t2Desc: "Conversión rápida de altitud.",
    t2Label: "Altitud",
    t2Note: "1 ft = 0,3048 m",
    t3Title: "Nudos (kt) ↔ km/h",
    t3Desc: "Conversor de velocidad aérea.",
    t3Label: "Velocidad",
    t4Title: "Celsius ↔ Fahrenheit",
    t4Desc: "Conversión de temperatura.",
    t4Label: "Temperatura",
    t5Title: "Tiempo · Distancia · Velocidad",
    t5Desc: "Calcula el tiempo estimado de una etapa.",
    t5Dist: "Distancia",
    t5Gs: "Velocidad sobre el suelo",
    t5Note: "Tiempo decimal: {val} h",
    t6Title: "Consumo y Autonomía",
    t6Desc: "Estimación según el régimen de consumo.",
    t6Flow: "Consumo horario",
    t6Time: "Tiempo",
    t6Fuel: "Combustible utilizable",
    t6Burned: "L consumidos",
    t6Endurance: "h autonomía",
    t7Title: "Top of Descent (TOD)",
    t7Desc: "Regla 3:1 para planificación de descenso.",
    t7Alt: "Altitud a perder",
    t7Note: "Añade margen para decelerar y cumplir restricciones.",
    t8Title: "Régimen de Descenso (V/S)",
    t8Desc: "Velocidad vertical para senda de 3°.",
    t8Gs: "Groundspeed",
    t8Note: "Regla práctica: GS × 5 ft/min.",
    t9Title: "Hora UTC (Reloj Zulú)",
    t9Desc: "Hora UTC en tiempo real.",
    t9Date: "Fecha UTC:",
    t10Title: "Componentes de Viento",
    t10Desc: "Viento cruzado, cara o cola.",
    t10WindDir: "Dirección del viento",
    t10Rwy: "Rumbo de pista",
    t10WindSpd: "Intensidad",
    t10CrossUnit: "kt cruzado",
    t10Left: "Componente por la izquierda",
    t10Right: "Componente por la derecha",
    t10Head: "kt de cara",
    t10Tail: "kt de cola",
    warningTitle: "Aviso Educativo",
    warningText: "Resultados orientativos para estudio y simulación. Las operaciones reales requieren manuales de vuelo aprobados (POH) y cartas oficiales.",
  },
  fr: {
    resultLabel: "RÉSULTAT",
    t1Title: "Milles Nautiques ↔ Kilomètres",
    t1Desc: "Conversion de distance aéronautique et terrestre.",
    t1Label: "Distance",
    t1Note: "1 NM = 1,852 km",
    t2Title: "Pieds ↔ Mètres",
    t2Desc: "Conversion rapide d'altitude.",
    t2Label: "Altitude",
    t2Note: "1 ft = 0,3048 m",
    t3Title: "Nœuds (kt) ↔ km/h",
    t3Desc: "Conversion de vitesse.",
    t3Label: "Vitesse",
    t4Title: "Celsius ↔ Fahrenheit",
    t4Desc: "Conversion de température.",
    t4Label: "Température",
    t5Title: "Temps · Distance · Vitesse",
    t5Desc: "Calculez le temps estimé d'une étape.",
    t5Dist: "Distance",
    t5Gs: "Vitesse sol",
    t5Note: "Temps décimal : {val} h",
    t6Title: "Consommation et Autonomie",
    t6Desc: "Estimation à partir du débit carburant.",
    t6Flow: "Débit horaire",
    t6Time: "Temps",
    t6Fuel: "Carburant utilisable",
    t6Burned: "L consommés",
    t6Endurance: "h autonomie",
    t7Title: "Top of Descent (TOD)",
    t7Desc: "Règle 3:1 pour le début de descente.",
    t7Alt: "Altitude à perdre",
    t7Note: "Ajoutez une marge pour décélérer et respecter les contraintes.",
    t8Title: "Taux de Descente (V/S)",
    t8Desc: "Vitesse verticale pour plan à 3°.",
    t8Gs: "Vitesse sol",
    t8Note: "Règle pratique : GS × 5 ft/min.",
    t9Title: "Heure UTC (Horloge Zulu)",
    t9Desc: "Heure UTC synchronisée en direct.",
    t9Date: "Date UTC :",
    t10Title: "Composantes de Vent",
    t10Desc: "Vent traversier, face ou arrière.",
    t10WindDir: "Direction du vent",
    t10Rwy: "QFU de piste",
    t10WindSpd: "Vitesse du vent",
    t10CrossUnit: "kt traversier",
    t10Left: "Composante venant de gauche",
    t10Right: "Composante venant de droite",
    t10Head: "kt de face",
    t10Tail: "kt arrière",
    warningTitle: "Avertissement Pédagogique",
    warningText: "Ces calculs sont des estimations destinées à l'étude et à la simulation. Les vols réels imposent l'usage du manuel de vol certifié (POH) et des cartes officielles.",
  },
};

export function Toolbox({ locale = "pt-br" }: { locale?: ValidLocale }) {
  const [nm, setNm] = useState(10);
  const [feet, setFeet] = useState(5000);
  const [knots, setKnots] = useState(120);
  const [celsius, setCelsius] = useState(20);
  const [distance, setDistance] = useState(180);
  const [speed, setSpeed] = useState(120);
  const [flow, setFlow] = useState(32);
  const [hours, setHours] = useState(2.5);
  const [fuel, setFuel] = useState(120);
  const [altitude, setAltitude] = useState(9000);
  const [groundSpeed, setGroundSpeed] = useState(140);
  const [windDirection, setWindDirection] = useState(240);
  const [runway, setRunway] = useState(270);
  const [windSpeed, setWindSpeed] = useState(18);
  const [utc, setUtc] = useState("");

  const t = TOOLBOX_STRINGS[locale] || TOOLBOX_STRINGS["pt-br"];
  const bcp47 = getBcp47Lang(locale);

  useEffect(() => {
    const update = () => {
      setUtc(
        new Intl.DateTimeFormat(bcp47, {
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [bcp47]);

  const flightTime = distance / Math.max(1, speed);
  const angle = ((((windDirection - runway) % 360) + 540) % 360) - 180;
  const radians = (angle * Math.PI) / 180;
  const crosswind = Math.abs(windSpeed * Math.sin(radians));
  const headwind = windSpeed * Math.cos(radians);
  const format = (value: number, digits = 1) =>
    Number.isFinite(value) ? value.toFixed(digits) : "—";

  const timeDistance = useMemo(() => {
    const whole = Math.floor(flightTime);
    return `${whole}h ${Math.round((flightTime - whole) * 60)}min`;
  }, [flightTime]);

  return (
    <div className="tool-grid">
      <article className="tool-card panel-card">
        <header>
          <span>01</span>
          <div>
            <h2>{t.t1Title}</h2>
            <p>{t.t1Desc}</p>
          </div>
        </header>
        <NumberInput label={t.t1Label} value={nm} onChange={setNm} unit="NM" />
        <Result
          value={format(nm * 1.852, 3)}
          unit="km"
          note={t.t1Note}
          resultLabel={t.resultLabel}
        />
      </article>

      <article className="tool-card panel-card">
        <header>
          <span>02</span>
          <div>
            <h2>{t.t2Title}</h2>
            <p>{t.t2Desc}</p>
          </div>
        </header>
        <NumberInput label={t.t2Label} value={feet} onChange={setFeet} unit="ft" />
        <Result
          value={format(feet * 0.3048, 1)}
          unit="m"
          note={t.t2Note}
          resultLabel={t.resultLabel}
        />
      </article>

      <article className="tool-card panel-card">
        <header>
          <span>03</span>
          <div>
            <h2>{t.t3Title}</h2>
            <p>{t.t3Desc}</p>
          </div>
        </header>
        <NumberInput label={t.t3Label} value={knots} onChange={setKnots} unit="kt" />
        <Result
          value={format(knots * 1.852, 1)}
          unit="km/h"
          resultLabel={t.resultLabel}
        />
      </article>

      <article className="tool-card panel-card">
        <header>
          <span>04</span>
          <div>
            <h2>{t.t4Title}</h2>
            <p>{t.t4Desc}</p>
          </div>
        </header>
        <NumberInput label={t.t4Label} value={celsius} onChange={setCelsius} unit="°C" />
        <Result
          value={format((celsius * 9) / 5 + 32, 1)}
          unit="°F"
          resultLabel={t.resultLabel}
        />
      </article>

      <article className="tool-card wide panel-card">
        <header>
          <span>05</span>
          <div>
            <h2>{t.t5Title}</h2>
            <p>{t.t5Desc}</p>
          </div>
        </header>
        <div className="tool-input-grid">
          <NumberInput label={t.t5Dist} value={distance} onChange={setDistance} unit="NM" />
          <NumberInput label={t.t5Gs} value={speed} onChange={setSpeed} unit="kt" />
        </div>
        <Result
          value={timeDistance}
          unit=""
          note={t.t5Note.replace("{val}", format(flightTime, 2))}
          resultLabel={t.resultLabel}
        />
      </article>

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
          <NumberInput label={t.t6Time} value={hours} onChange={setHours} unit="h" />
          <NumberInput label={t.t6Fuel} value={fuel} onChange={setFuel} unit="L" />
        </div>
        <div className="split-results">
          <Result value={format(flow * hours, 1)} unit={t.t6Burned} resultLabel={t.resultLabel} />
          <Result value={format(fuel / Math.max(0.1, flow), 2)} unit={t.t6Endurance} resultLabel={t.resultLabel} />
        </div>
      </article>

      <article className="tool-card panel-card">
        <header>
          <span>07</span>
          <div>
            <h2>{t.t7Title}</h2>
            <p>{t.t7Desc}</p>
          </div>
        </header>
        <NumberInput label={t.t7Alt} value={altitude} onChange={setAltitude} unit="ft" />
        <Result
          value={format((altitude / 1000) * 3, 1)}
          unit="NM"
          note={t.t7Note}
          resultLabel={t.resultLabel}
        />
      </article>

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
          <span>UTC / Z</span>
        </div>
        <p>
          {t.t9Date}{" "}
          {new Intl.DateTimeFormat(bcp47, { timeZone: "UTC", dateStyle: "long" }).format(new Date())}
        </p>
      </article>

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
            resultLabel={t.resultLabel}
          />
        </div>
      </article>

      <div className="tools-warning">
        <b>{t.warningTitle}</b>
        <p>{t.warningText}</p>
      </div>
    </div>
  );
}

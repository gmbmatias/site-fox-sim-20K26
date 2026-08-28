"use client";

import { useEffect, useMemo, useState } from "react";

function NumberInput({ label, value, onChange, unit }: { label: string; value: number; onChange: (value: number) => void; unit: string }) {
  return <label className="tool-input"><span>{label}</span><div><input type="number" value={Number.isFinite(value) ? value : 0} onChange={(event) => onChange(Number(event.target.value))} /><b>{unit}</b></div></label>;
}

function Result({ value, unit, note }: { value: string | number; unit: string; note?: string }) {
  return <div className="tool-result"><small>RESULTADO</small><strong>{value} <span>{unit}</span></strong>{note && <p>{note}</p>}</div>;
}

export function Toolbox() {
  const [nm, setNm] = useState(10); const [feet, setFeet] = useState(5000); const [knots, setKnots] = useState(120); const [celsius, setCelsius] = useState(20);
  const [distance, setDistance] = useState(180); const [speed, setSpeed] = useState(120);
  const [flow, setFlow] = useState(32); const [hours, setHours] = useState(2.5); const [fuel, setFuel] = useState(120);
  const [altitude, setAltitude] = useState(9000); const [groundSpeed, setGroundSpeed] = useState(140);
  const [windDirection, setWindDirection] = useState(240); const [runway, setRunway] = useState(270); const [windSpeed, setWindSpeed] = useState(18);
  const [utc, setUtc] = useState("");
  useEffect(() => { const update = () => setUtc(new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date())); update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer); }, []);
  const flightTime = distance / Math.max(1, speed);
  const angle = ((((windDirection - runway) % 360) + 540) % 360) - 180;
  const radians = angle * Math.PI / 180;
  const crosswind = Math.abs(windSpeed * Math.sin(radians));
  const headwind = windSpeed * Math.cos(radians);
  const format = (value: number, digits = 1) => Number.isFinite(value) ? value.toFixed(digits) : "—";
  const timeDistance = useMemo(() => { const whole = Math.floor(flightTime); return `${whole}h ${Math.round((flightTime - whole) * 60)}min`; }, [flightTime]);

  return (
    <div className="tool-grid">
      <article className="tool-card panel-card"><header><span>01</span><div><h2>Milhas náuticas ↔ KM</h2><p>Distância aeronáutica e terrestre.</p></div></header><NumberInput label="Distância" value={nm} onChange={setNm} unit="NM" /><Result value={format(nm * 1.852, 3)} unit="km" note="1 NM = 1,852 km" /></article>
      <article className="tool-card panel-card"><header><span>02</span><div><h2>Pés ↔ Metros</h2><p>Conversão rápida de altitude.</p></div></header><NumberInput label="Altitude" value={feet} onChange={setFeet} unit="ft" /><Result value={format(feet * .3048, 1)} unit="m" note="1 ft = 0,3048 m" /></article>
      <article className="tool-card panel-card"><header><span>03</span><div><h2>Knots ↔ km/h</h2><p>Velocidade em duas unidades.</p></div></header><NumberInput label="Velocidade" value={knots} onChange={setKnots} unit="kt" /><Result value={format(knots * 1.852, 1)} unit="km/h" /></article>
      <article className="tool-card panel-card"><header><span>04</span><div><h2>Celsius ↔ Fahrenheit</h2><p>Temperatura sem decoreba.</p></div></header><NumberInput label="Temperatura" value={celsius} onChange={setCelsius} unit="°C" /><Result value={format(celsius * 9 / 5 + 32, 1)} unit="°F" /></article>

      <article className="tool-card wide panel-card"><header><span>05</span><div><h2>Tempo · Distância · Velocidade</h2><p>Calcule o tempo estimado de uma etapa.</p></div></header><div className="tool-input-grid"><NumberInput label="Distância" value={distance} onChange={setDistance} unit="NM" /><NumberInput label="Velocidade no solo" value={speed} onChange={setSpeed} unit="kt" /></div><Result value={timeDistance} unit="" note={`Tempo decimal: ${format(flightTime, 2)} h`} /></article>
      <article className="tool-card wide panel-card"><header><span>06</span><div><h2>Consumo e autonomia</h2><p>Estimativa simples a partir do fluxo.</p></div></header><div className="tool-input-grid three"><NumberInput label="Consumo" value={flow} onChange={setFlow} unit="L/h" /><NumberInput label="Tempo" value={hours} onChange={setHours} unit="h" /><NumberInput label="Combustível utilizável" value={fuel} onChange={setFuel} unit="L" /></div><div className="split-results"><Result value={format(flow * hours, 1)} unit="L consumidos" /><Result value={format(fuel / Math.max(0.1, flow), 2)} unit="h autonomia" /></div></article>

      <article className="tool-card panel-card"><header><span>07</span><div><h2>Top of Descent</h2><p>Regra de 3 para planejamento.</p></div></header><NumberInput label="Altitude a perder" value={altitude} onChange={setAltitude} unit="ft" /><Result value={format(altitude / 1000 * 3, 1)} unit="NM" note="Adicione distância para desacelerar e cumprir restrições." /></article>
      <article className="tool-card panel-card"><header><span>08</span><div><h2>Razão de descida</h2><p>Aproximação para trajetória de 3°.</p></div></header><NumberInput label="Groundspeed" value={groundSpeed} onChange={setGroundSpeed} unit="kt" /><Result value={format(groundSpeed * 5, 0)} unit="ft/min" note="Regra prática: GS × 5." /></article>
      <article className="tool-card panel-card utc-card"><header><span>09</span><div><h2>Horário UTC</h2><p>Relógio Zulu em tempo real.</p></div></header><div className="utc-clock"><strong>{utc || "--:--:--"}</strong><span>UTC / Z</span></div><p>Data UTC: {new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", dateStyle: "long" }).format(new Date())}</p></article>
      <article className="tool-card wide panel-card"><header><span>10</span><div><h2>Componente de vento</h2><p>Vento cruzado, proa ou cauda.</p></div></header><div className="tool-input-grid three"><NumberInput label="Direção do vento" value={windDirection} onChange={setWindDirection} unit="°" /><NumberInput label="Rumo da pista" value={runway} onChange={setRunway} unit="°" /><NumberInput label="Intensidade" value={windSpeed} onChange={setWindSpeed} unit="kt" /></div><div className="split-results"><Result value={format(crosswind, 1)} unit="kt cruzado" note={angle < 0 ? "Componente pela esquerda" : "Componente pela direita"} /><Result value={format(Math.abs(headwind), 1)} unit={headwind >= 0 ? "kt de proa" : "kt de cauda"} /></div></article>
      <div className="tools-warning"><b>Aviso educacional</b><p>Resultados são estimativas para estudo e simulação. Operações reais exigem dados do manual da aeronave, cartas, condições atuais e procedimentos aprovados.</p></div>
    </div>
  );
}

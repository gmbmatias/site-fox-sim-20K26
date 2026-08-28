"use client";

import { CheckCircle2, Clock3, RotateCcw, Trophy, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { courseList, isCourseCode, questions, type CourseCode, type Question } from "@/lib/content";
import { loadProgress, recordActivity } from "@/lib/progress";

type QuizMode = "questoes" | "simulado";

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function timeLabel(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
}

export function QuizEngine({ mode }: { mode: QuizMode }) {
  const searchParams = useSearchParams();
  const queryCourse = searchParams.get("curso") ?? "pp";
  const [course, setCourse] = useState<CourseCode>(isCourseCode(queryCourse) ? queryCourse : "pp");
  const [pool, setPool] = useState<Question[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [seconds, setSeconds] = useState(mode === "simulado" ? 30 * 60 : 0);
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => setHistoryCount(loadProgress().activities.filter((item) => item.kind === mode).length), [mode]);
  useEffect(() => {
    if (!started || finished) return;
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (mode === "simulado" && current <= 1) {
          window.clearInterval(timer);
          const subjects: Record<string, { correct: number; total: number }> = {};
          pool.forEach((question) => {
            subjects[question.subject] ??= { correct: 0, total: 0 };
            subjects[question.subject].total++;
            if (answers[question.id] === question.correct) subjects[question.subject].correct++;
          });
          const correct = pool.filter((question) => answers[question.id] === question.correct).length;
          recordActivity({ kind: mode, course, correct, total: pool.length, durationSeconds: 30 * 60, subjects });
          setHistoryCount((count) => count + 1);
          setFinished(true);
          return 0;
        }
        return mode === "simulado" ? current - 1 : current + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [started, finished, mode, pool, answers, course]);

  const start = () => {
    const available = questions.filter((question) => question.course === course);
    setPool(mode === "simulado" ? shuffle(available).slice(0, 6) : available);
    setIndex(0); setSelected(null); setConfirmed(false); setAnswers({}); setFinished(false); setStarted(true); setSeconds(mode === "simulado" ? 30 * 60 : 0);
  };

  const current = pool[index];
  const result = useMemo(() => {
    const correct = pool.filter((question) => answers[question.id] === question.correct).length;
    const subjects: Record<string, { correct: number; total: number }> = {};
    pool.forEach((question) => {
      subjects[question.subject] ??= { correct: 0, total: 0 };
      subjects[question.subject].total += 1;
      if (answers[question.id] === question.correct) subjects[question.subject].correct += 1;
    });
    return { correct, subjects };
  }, [pool, answers]);

  const confirm = () => {
    if (selected === null || !current) return;
    setAnswers((value) => ({ ...value, [current.id]: selected }));
    setConfirmed(true);
  };

  const next = () => {
    if (index < pool.length - 1) { setIndex(index + 1); setSelected(null); setConfirmed(false); return; }
    const finalAnswers = current && selected !== null ? { ...answers, [current.id]: selected } : answers;
    const correct = pool.filter((question) => finalAnswers[question.id] === question.correct).length;
    const subjects: Record<string, { correct: number; total: number }> = {};
    pool.forEach((question) => {
      subjects[question.subject] ??= { correct: 0, total: 0 };
      subjects[question.subject].total++;
      if (finalAnswers[question.id] === question.correct) subjects[question.subject].correct++;
    });
    setAnswers(finalAnswers);
    recordActivity({ kind: mode, course, correct, total: pool.length, durationSeconds: mode === "simulado" ? 30 * 60 - seconds : seconds, subjects });
    setHistoryCount((count) => count + 1);
    setFinished(true);
  };

  if (!started) return (
    <div className="quiz-start panel-card">
      <div className="quiz-start-copy"><span className="section-kicker">CONFIGURAÇÃO</span><h2>{mode === "simulado" ? "Prepare sua cabine" : "Escolha sua matéria"}</h2><p>{mode === "simulado" ? "6 questões, 30 minutos e resultado por matéria. O cronômetro começa ao iniciar." : "Pratique com correção e explicação logo após cada resposta."}</p></div>
      <div className="course-selector" role="radiogroup" aria-label="Escolha a trilha">
        {courseList.map((item) => <button type="button" key={item.code} className={course === item.code ? "course-choice active" : "course-choice"} onClick={() => setCourse(item.code)}><b>{item.shortTitle}</b><span>{item.title}</span><small>{questions.filter((question) => question.course === item.code).length} questões</small></button>)}
      </div>
      <div className="quiz-start-footer"><span><Clock3 size={17} /> {mode === "simulado" ? "Tempo limite: 30 min" : "Cronômetro progressivo"}</span><span>{historyCount} {historyCount === 1 ? "atividade concluída" : "atividades concluídas"}</span><button type="button" className="button button-primary" onClick={start}>Iniciar {mode === "simulado" ? "simulado" : "prática"} <span>→</span></button></div>
    </div>
  );

  if (finished) {
    const percent = Math.round((result.correct / pool.length) * 100);
    return (
      <div className="quiz-result">
        <div className="result-summary panel-card"><div className="result-icon"><Trophy size={30} /></div><span>RESULTADO FINAL</span><h2>{percent}% de acerto</h2><p>Você acertou <b>{result.correct}</b> de <b>{pool.length}</b> questões em {timeLabel(mode === "simulado" ? 30 * 60 - seconds : seconds)}.</p><div className="result-gauge"><i style={{ width: `${percent}%` }} /></div><button type="button" className="button button-primary" onClick={start}><RotateCcw size={16} /> Refazer</button></div>
        <div className="subject-results panel-card"><span className="section-kicker">DESEMPENHO POR MATÉRIA</span>{Object.entries(result.subjects).map(([subject, score]) => { const value = Math.round((score.correct / score.total) * 100); return <div className="subject-row" key={subject}><div><b>{subject}</b><span>{score.correct}/{score.total}</span></div><div className="mini-bar"><i style={{ width: `${value}%` }} /></div><strong>{value}%</strong></div>; })}<p className="result-note">Tópicos abaixo de 70% entram automaticamente na sua fila de revisão.</p></div>
      </div>
    );
  }

  if (!current) return null;
  const progress = ((index + 1) / pool.length) * 100;
  return (
    <div className="quiz-shell panel-card">
      <div className="quiz-toolbar"><span>{course.toUpperCase()} · {current.subject}</span><div className="quiz-progress"><i style={{ width: `${progress}%` }} /></div><b><Clock3 size={16} /> {timeLabel(seconds)}</b></div>
      <div className="question-count">QUESTÃO {String(index + 1).padStart(2, "0")} <span>/ {String(pool.length).padStart(2, "0")}</span></div>
      <h2>{current.prompt}</h2>
      <div className="answer-list">
        {current.options.map((option, optionIndex) => {
          const classNames = ["answer-option", selected === optionIndex ? "selected" : "", confirmed && optionIndex === current.correct ? "correct" : "", confirmed && selected === optionIndex && optionIndex !== current.correct ? "wrong" : ""].filter(Boolean).join(" ");
          return <button type="button" className={classNames} disabled={confirmed} onClick={() => setSelected(optionIndex)} key={option}><span>{String.fromCharCode(65 + optionIndex)}</span><b>{option}</b>{confirmed && optionIndex === current.correct && <CheckCircle2 size={19} />}{confirmed && selected === optionIndex && optionIndex !== current.correct && <XCircle size={19} />}</button>;
        })}
      </div>
      {confirmed && <div className={selected === current.correct ? "answer-explanation success" : "answer-explanation"}><b>{selected === current.correct ? "Resposta correta" : "Vamos revisar"}</b><p>{current.explanation}</p><small>Questão educacional elaborada pela FOX SIM com base no conteúdo estudado.</small></div>}
      <div className="quiz-footer"><span>{confirmed ? `${index + 1} de ${pool.length} respondidas` : "Selecione uma alternativa"}</span>{!confirmed ? <button type="button" className="button button-primary" disabled={selected === null} onClick={confirm}>Confirmar resposta</button> : <button type="button" className="button button-primary" onClick={next}>{index === pool.length - 1 ? "Ver resultado" : "Próxima questão"} <span>→</span></button>}</div>
    </div>
  );
}

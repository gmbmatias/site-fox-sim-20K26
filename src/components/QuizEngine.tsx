"use client";

import { CheckCircle2, Clock3, RotateCcw, Trophy, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ValidLocale } from "@/lib/i18n";
import { getCourses, CourseCode } from "@/lib/translations/courses";
import { getQuestions, Question } from "@/lib/translations/questions";
import { loadProgress, recordActivity } from "@/lib/progress";

type QuizMode = "questoes" | "simulado";

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function timeLabel(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
}

const STRINGS: Record<ValidLocale, {
  configKicker: string;
  configTitleSim: string;
  configTitleQuest: string;
  configDescSim: string;
  configDescQuest: string;
  questionsCount: string;
  timeLimit: string;
  progressiveTimer: string;
  activitiesCompleted: string;
  startBtn: string;
  finalResult: string;
  accuracy: string;
  resultSummary: string;
  redoBtn: string;
  subjectPerformance: string;
  reviewNote: string;
  questionLabel: string;
  correctAnswer: string;
  reviewAnswer: string;
  educationalNote: string;
  selectOptionPrompt: string;
  answeredOf: string;
  confirmAnswer: string;
  nextQuestion: string;
  seeResults: string;
}> = {
  "pt-br": {
    configKicker: "CONFIGURAÇÃO",
    configTitleSim: "Prepare sua cabine",
    configTitleQuest: "Escolha sua matéria",
    configDescSim: "6 questões, 30 minutos e resultado por matéria. O cronômetro começa ao iniciar.",
    configDescQuest: "Pratique com correção e explicação logo após cada resposta.",
    questionsCount: "questões",
    timeLimit: "Tempo limite: 30 min",
    progressiveTimer: "Cronômetro progressivo",
    activitiesCompleted: "atividades concluídas",
    startBtn: "Iniciar",
    finalResult: "RESULTADO FINAL",
    accuracy: "de acerto",
    resultSummary: "Você acertou {correct} de {total} questões em {time}.",
    redoBtn: "Refazer",
    subjectPerformance: "DESEMPENHO POR MATÉRIA",
    reviewNote: "Tópicos abaixo de 70% entram automaticamente na sua fila de revisão.",
    questionLabel: "QUESTÃO",
    correctAnswer: "Resposta correta",
    reviewAnswer: "Vamos revisar",
    educationalNote: "Questão educacional elaborada pela FOX SIM com base no conteúdo estudado.",
    selectOptionPrompt: "Selecione uma alternativa",
    answeredOf: "{current} de {total} respondidas",
    confirmAnswer: "Confirmar resposta",
    nextQuestion: "Próxima questão",
    seeResults: "Ver resultado",
  },
  en: {
    configKicker: "CONFIGURATION",
    configTitleSim: "Prepare your flight deck",
    configTitleQuest: "Choose your subject",
    configDescSim: "6 questions, 30 minutes, and subject score breakdown. Timer begins upon start.",
    configDescQuest: "Practice questions with instant feedback and in-depth explanations.",
    questionsCount: "questions",
    timeLimit: "Time limit: 30 min",
    progressiveTimer: "Stopwatch mode",
    activitiesCompleted: "activities completed",
    startBtn: "Start",
    finalResult: "FINAL SCORE",
    accuracy: "score",
    resultSummary: "You answered {correct} of {total} questions correctly in {time}.",
    redoBtn: "Retake",
    subjectPerformance: "PERFORMANCE BY SUBJECT",
    reviewNote: "Subjects below 70% are automatically highlighted for reinforcement.",
    questionLabel: "QUESTION",
    correctAnswer: "Correct answer",
    reviewAnswer: "Let's review",
    educationalNote: "Educational question developed by FOX SIM based on standard syllabus.",
    selectOptionPrompt: "Select an option",
    answeredOf: "{current} of {total} answered",
    confirmAnswer: "Confirm answer",
    nextQuestion: "Next question",
    seeResults: "View results",
  },
  es: {
    configKicker: "CONFIGURACIÓN",
    configTitleSim: "Prepara tu cabina",
    configTitleQuest: "Elige tu materia",
    configDescSim: "6 preguntas, 30 minutos y análisis por materia. El temporizador inicia al comenzar.",
    configDescQuest: "Practica con retroalimentación y explicaciones inmediatas.",
    questionsCount: "preguntas",
    timeLimit: "Límite de tiempo: 30 min",
    progressiveTimer: "Cronómetro progresivo",
    activitiesCompleted: "actividades completadas",
    startBtn: "Iniciar",
    finalResult: "RESULTADO FINAL",
    accuracy: "de acierto",
    resultSummary: "Has acertado {correct} de {total} preguntas en {time}.",
    redoBtn: "Repetir",
    subjectPerformance: "RENDIMIENTO POR MATERIA",
    reviewNote: "Las materias por debajo del 70% se señalan para repaso prioritario.",
    questionLabel: "PREGUNTA",
    correctAnswer: "Respuesta correcta",
    reviewAnswer: "Vamos a revisar",
    educationalNote: "Pregunta educativa diseñada por FOX SIM según el programa oficial.",
    selectOptionPrompt: "Selecciona una opción",
    answeredOf: "{current} de {total} respondidas",
    confirmAnswer: "Confirmar respuesta",
    nextQuestion: "Siguiente pregunta",
    seeResults: "Ver resultados",
  },
  fr: {
    configKicker: "CONFIGURATION",
    configTitleSim: "Préparez votre cockpit",
    configTitleQuest: "Choisissez votre matière",
    configDescSim: "6 questions, 30 minutes et bilan par matière. Le chronomètre démarre au lancement.",
    configDescQuest: "Pratiquez avec correction instantanée et explications complètes.",
    questionsCount: "questions",
    timeLimit: "Temps limite : 30 min",
    progressiveTimer: "Chronomètre",
    activitiesCompleted: "activités terminées",
    startBtn: "Démarrer",
    finalResult: "RÉSULTAT FINAL",
    accuracy: "de réussite",
    resultSummary: "Vous avez validé {correct} sur {total} questions en {time}.",
    redoBtn: "Recommencer",
    subjectPerformance: "PERFORMANCES PAR MATIÈRE",
    reviewNote: "Les thèmes sous 70 % sont automatiquement ajoutés à votre liste de révision.",
    questionLabel: "QUESTION",
    correctAnswer: "Bonne réponse",
    reviewAnswer: "Revue de la question",
    educationalNote: "Question pédagogique élaborée par FOX SIM selon les standards aéronautiques.",
    selectOptionPrompt: "Sélectionnez une réponse",
    answeredOf: "{current} sur {total} répondues",
    confirmAnswer: "Confirmer la réponse",
    nextQuestion: "Question suivante",
    seeResults: "Voir le résultat",
  },
};

export function QuizEngine({ mode, locale = "pt-br" }: { mode: QuizMode; locale?: ValidLocale }) {
  const searchParams = useSearchParams();
  const queryCourse = searchParams.get("curso") ?? "pp";
  const validCourses = ["pp", "pc", "ifr", "mlte"];
  const initialCourse = validCourses.includes(queryCourse.toLowerCase()) ? (queryCourse.toLowerCase() as CourseCode) : "pp";

  const [course, setCourse] = useState<CourseCode>(initialCourse);
  const [pool, setPool] = useState<Question[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [seconds, setSeconds] = useState(mode === "simulado" ? 30 * 60 : 0);
  const [historyCount, setHistoryCount] = useState(0);

  const t = STRINGS[locale] || STRINGS["pt-br"];
  const courseList = getCourses(locale);
  const allQuestions = getQuestions(locale);

  useEffect(() => {
    setHistoryCount(loadProgress().activities.filter((item) => item.kind === mode).length);
  }, [mode]);

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
    const available = allQuestions.filter((question) => question.course === course);
    setPool(mode === "simulado" ? shuffle(available).slice(0, 6) : available);
    setIndex(0);
    setSelected(null);
    setConfirmed(false);
    setAnswers({});
    setFinished(false);
    setStarted(true);
    setSeconds(mode === "simulado" ? 30 * 60 : 0);
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
    if (index < pool.length - 1) {
      setIndex(index + 1);
      setSelected(null);
      setConfirmed(false);
      return;
    }
    const finalAnswers = current && selected !== null ? { ...answers, [current.id]: selected } : answers;
    const correct = pool.filter((question) => finalAnswers[question.id] === question.correct).length;
    const subjects: Record<string, { correct: number; total: number }> = {};
    pool.forEach((question) => {
      subjects[question.subject] ??= { correct: 0, total: 0 };
      subjects[question.subject].total++;
      if (finalAnswers[question.id] === question.correct) subjects[question.subject].correct++;
    });
    setAnswers(finalAnswers);
    recordActivity({
      kind: mode,
      course,
      correct,
      total: pool.length,
      durationSeconds: mode === "simulado" ? 30 * 60 - seconds : seconds,
      subjects,
    });
    setHistoryCount((count) => count + 1);
    setFinished(true);
  };

  if (!started) {
    return (
      <div className="quiz-start panel-card">
        <div className="quiz-start-copy">
          <span className="section-kicker">{t.configKicker}</span>
          <h2>{mode === "simulado" ? t.configTitleSim : t.configTitleQuest}</h2>
          <p>{mode === "simulado" ? t.configDescSim : t.configDescQuest}</p>
        </div>

        <div className="course-selector" role="radiogroup" aria-label="Escolha a trilha">
          {courseList.map((item) => (
            <button
              type="button"
              key={item.code}
              className={course === item.code ? "course-choice active" : "course-choice"}
              onClick={() => setCourse(item.code)}
            >
              <b>{item.shortTitle}</b>
              <span>{item.title}</span>
              <small>{allQuestions.filter((q) => q.course === item.code).length} {t.questionsCount}</small>
            </button>
          ))}
        </div>

        <div className="quiz-start-footer">
          <span>
            <Clock3 size={17} /> {mode === "simulado" ? t.timeLimit : t.progressiveTimer}
          </span>
          <span>{historyCount} {t.activitiesCompleted}</span>
          <button type="button" className="button button-primary" onClick={start}>
            {t.startBtn} {mode === "simulado" ? "simulado" : "prática"} <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const percent = Math.round((result.correct / (pool.length || 1)) * 100);
    const summaryText = t.resultSummary
      .replace("{correct}", String(result.correct))
      .replace("{total}", String(pool.length))
      .replace("{time}", timeLabel(mode === "simulado" ? 30 * 60 - seconds : seconds));

    return (
      <div className="quiz-result">
        <div className="result-summary panel-card">
          <div className="result-icon">
            <Trophy size={30} />
          </div>
          <span>{t.finalResult}</span>
          <h2>{percent}% {t.accuracy}</h2>
          <p>{summaryText}</p>
          <div className="result-gauge">
            <i style={{ width: `${percent}%` }} />
          </div>
          <button type="button" className="button button-primary" onClick={start}>
            <RotateCcw size={16} /> {t.redoBtn}
          </button>
        </div>

        <div className="subject-results panel-card">
          <span className="section-kicker">{t.subjectPerformance}</span>
          {Object.entries(result.subjects).map(([subject, score]) => {
            const value = Math.round((score.correct / (score.total || 1)) * 100);
            return (
              <div className="subject-row" key={subject}>
                <div>
                  <b>{subject}</b>
                  <span>{score.correct}/{score.total}</span>
                </div>
                <div className="mini-bar">
                  <i style={{ width: `${value}%` }} />
                </div>
                <strong>{value}%</strong>
              </div>
            );
          })}
          <p className="result-note">{t.reviewNote}</p>
        </div>
      </div>
    );
  }

  if (!current) return null;
  const progress = ((index + 1) / pool.length) * 100;

  return (
    <div className="quiz-shell panel-card">
      <div className="quiz-toolbar">
        <span>{course.toUpperCase()} · {current.subject}</span>
        <div className="quiz-progress">
          <i style={{ width: `${progress}%` }} />
        </div>
        <b><Clock3 size={16} /> {timeLabel(seconds)}</b>
      </div>

      <div className="question-count">
        {t.questionLabel} {String(index + 1).padStart(2, "0")} <span>/ {String(pool.length).padStart(2, "0")}</span>
      </div>

      <h2>{current.prompt}</h2>

      <div className="answer-list">
        {current.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const isCorrect = optionIndex === current.correct;
          const isWrong = isSelected && !isCorrect;

          const classNames = [
            "answer-option",
            isSelected ? "selected" : "",
            confirmed && isCorrect ? "correct" : "",
            confirmed && isWrong ? "wrong" : "",
          ].filter(Boolean).join(" ");

          return (
            <button
              type="button"
              className={classNames}
              disabled={confirmed}
              onClick={() => setSelected(optionIndex)}
              key={option}
            >
              <span>{String.fromCharCode(65 + optionIndex)}</span>
              <b>{option}</b>
              {confirmed && isCorrect && <CheckCircle2 size={19} />}
              {confirmed && isWrong && <XCircle size={19} />}
            </button>
          );
        })}
      </div>

      {confirmed && (
        <div className={selected === current.correct ? "answer-explanation success" : "answer-explanation"}>
          <b>{selected === current.correct ? t.correctAnswer : t.reviewAnswer}</b>
          <p>{current.explanation}</p>
          <small>{t.educationalNote}</small>
        </div>
      )}

      <div className="quiz-footer">
        <span>
          {confirmed
            ? t.answeredOf.replace("{current}", String(index + 1)).replace("{total}", String(pool.length))
            : t.selectOptionPrompt}
        </span>
        {!confirmed ? (
          <button
            type="button"
            className="button button-primary"
            disabled={selected === null}
            onClick={confirm}
          >
            {t.confirmAnswer}
          </button>
        ) : (
          <button type="button" className="button button-primary" onClick={next}>
            {index === pool.length - 1 ? t.seeResults : t.nextQuestion} <span>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { CheckCircle2, Clock3, RotateCcw, Trophy, XCircle, Sparkles, AlertTriangle, ArrowRight, Gauge, Filter, Layers, Zap, BookOpen, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ValidLocale } from "@/lib/i18n";
import { getCourses, CourseCode } from "@/lib/translations/courses";
import { getQuestions, Question } from "@/lib/translations/questions";
import { loadProgress, recordActivity } from "@/lib/progress";
import { soundEngine } from "./GlobalInteractivity";

type QuizMode = "questoes" | "simulado";

function shuffle<T>(items: T[]): T[] {
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
  allSubjects: string;
  questionAmountLabel: string;
  filterSubjectLabel: string;
}> = {
  "pt-br": {
    configKicker: "CONFIGURAÇÃO DE TREINAMENTO",
    configTitleSim: "Simulado de Banca Oficial",
    configTitleQuest: "Banco de Questões e Treino por Matéria",
    configDescSim: "Simule as condições reais da banca com tempo cronometrado e diagnóstico detalhado por disciplina.",
    configDescQuest: "Pratique com correção imediata, resoluções comentadas e dicas técnicas para fixar o aprendizado.",
    questionsCount: "questões",
    timeLimit: "Tempo limite cronometrado",
    progressiveTimer: "Cronômetro progressivo",
    activitiesCompleted: "atividades concluídas",
    startBtn: "Iniciar",
    finalResult: "DIAGNÓSTICO FINAL DA SESSÃO",
    accuracy: "de aproveitamento",
    resultSummary: "Você acertou {correct} de {total} questões em {time}.",
    redoBtn: "Novo Treinamento",
    subjectPerformance: "DESEMPENHO POR DISCIPLINA",
    reviewNote: "Tópicos com rendimento abaixo de 70% são salvos na sua Fila de Revisão Prioritária.",
    questionLabel: "QUESTÃO",
    correctAnswer: "Gabarito Correto!",
    reviewAnswer: "Gabarito Comentado",
    educationalNote: "Questão com embasamento técnico e regulamentar da FOX SIM.",
    selectOptionPrompt: "Selecione uma alternativa para confirmar",
    answeredOf: "{current} de {total} questões respondidas",
    confirmAnswer: "Confirmar Resposta",
    nextQuestion: "Avançar para a Próxima",
    seeResults: "Finalizar e Ver Resultado",
    allSubjects: "Todas as Matérias",
    questionAmountLabel: "Quantidade de Questões:",
    filterSubjectLabel: "Filtrar por Matéria:",
  },
  en: {
    configKicker: "TRAINING CONFIGURATION",
    configTitleSim: "Flight Exam Simulation",
    configTitleQuest: "Question Bank & Subject Practice",
    configDescSim: "Simulate official aviation exams with countdown timer and discipline performance analytics.",
    configDescQuest: "Practice questions with instant feedback and in-depth regulatory explanations.",
    questionsCount: "questions",
    timeLimit: "Timed exam mode",
    progressiveTimer: "Stopwatch mode",
    activitiesCompleted: "activities completed",
    startBtn: "Start",
    finalResult: "FINAL SESSION DIAGNOSTIC",
    accuracy: "score",
    resultSummary: "You answered {correct} of {total} questions correctly in {time}.",
    redoBtn: "New Training",
    subjectPerformance: "PERFORMANCE BY SUBJECT",
    reviewNote: "Subjects below 70% are automatically scheduled in your Priority Review Queue.",
    questionLabel: "QUESTION",
    correctAnswer: "Correct Answer!",
    reviewAnswer: "Explanation & Review",
    educationalNote: "Developed by FOX SIM based on standard ICAO/FAA syllabi.",
    selectOptionPrompt: "Select an option to confirm",
    answeredOf: "{current} of {total} answered",
    confirmAnswer: "Confirm Answer",
    nextQuestion: "Next Question",
    seeResults: "View Results",
    allSubjects: "All Subjects",
    questionAmountLabel: "Question Count:",
    filterSubjectLabel: "Filter by Subject:",
  },
  es: {
    configKicker: "CONFIGURACIÓN DE ENTRENAMIENTO",
    configTitleSim: "Simulador de Examen Oficial",
    configTitleQuest: "Banco de Preguntas por Materia",
    configDescSim: "Simula las condiciones reales de examen con cronómetro y diagnóstico por materia.",
    configDescQuest: "Practica con correcciones instantáneas y explicaciones paso a paso.",
    questionsCount: "preguntas",
    timeLimit: "Modo cronometrado",
    progressiveTimer: "Cronómetro progresivo",
    activitiesCompleted: "actividades completadas",
    startBtn: "Iniciar",
    finalResult: "DIAGNÓSTICO FINAL",
    accuracy: "de acierto",
    resultSummary: "Has acertado {correct} de {total} preguntas en {time}.",
    redoBtn: "Nuevo Entrenamiento",
    subjectPerformance: "RENDIMIENTO POR MATERIA",
    reviewNote: "Las materias por debajo del 70% se añaden a tu Cola de Repaso.",
    questionLabel: "PREGUNTA",
    correctAnswer: "¡Respuesta Correcta!",
    reviewAnswer: "Revisión y Explicación",
    educationalNote: "Pregunta elaborada por FOX SIM según normativa OACI.",
    selectOptionPrompt: "Selecciona una opción para confirmar",
    answeredOf: "{current} de {total} respondidas",
    confirmAnswer: "Confirmar Respuesta",
    nextQuestion: "Siguiente Pregunta",
    seeResults: "Ver Resultados",
    allSubjects: "Todas las Materias",
    questionAmountLabel: "Cantidad de Preguntas:",
    filterSubjectLabel: "Filtrar por Materia:",
  },
  fr: {
    configKicker: "CONFIGURATION DE L'ENTRAÎNEMENT",
    configTitleSim: "Simulation d'Examen Théorique",
    configTitleQuest: "Banque de Questions & Entraînement",
    configDescSim: "Simulez l'examen officiel avec chronomètre et bilan détaillé par discipline.",
    configDescQuest: "Entraînez-vous avec correction instantanée et explications complètes.",
    questionsCount: "questions",
    timeLimit: "Temps limité",
    progressiveTimer: "Chronomètre",
    activitiesCompleted: "activités terminées",
    startBtn: "Démarrer",
    finalResult: "BILAN DE LA SESSION",
    accuracy: "de réussite",
    resultSummary: "Vous avez validé {correct} sur {total} questions en {time}.",
    redoBtn: "Nouvelle Session",
    subjectPerformance: "PERFORMANCES PAR DISCIPLINE",
    reviewNote: "Les matières avec un score inférieur à 70 % sont ajoutées à votre liste de révision.",
    questionLabel: "QUESTION",
    correctAnswer: "Bonne Réponse !",
    reviewAnswer: "Explication et Correction",
    educationalNote: "Élaboré par FOX SIM selon les standards aéronautiques.",
    selectOptionPrompt: "Sélectionnez une réponse pour valider",
    answeredOf: "{current} sur {total} répondues",
    confirmAnswer: "Confirmer la Réponse",
    nextQuestion: "Question Suivante",
    seeResults: "Voir le Résultat",
    allSubjects: "Toutes les Matières",
    questionAmountLabel: "Nombre de Questions :",
    filterSubjectLabel: "Filtrer par Matière :",
  },
};

export function QuizEngine({ mode, locale = "pt-br" }: { mode: QuizMode; locale?: ValidLocale }) {
  const searchParams = useSearchParams();
  const queryCourse = searchParams.get("curso") ?? "pp";
  const validCourses = ["pp", "pc", "ifr", "mlte"];
  const initialCourse = validCourses.includes(queryCourse.toLowerCase()) ? (queryCourse.toLowerCase() as CourseCode) : "pp";

  const [course, setCourse] = useState<CourseCode>(initialCourse);
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [questionCount, setQuestionCount] = useState<number>(mode === "simulado" ? 10 : 15);
  
  const [pool, setPool] = useState<Question[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [seconds, setSeconds] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);

  const t = STRINGS[locale] || STRINGS["pt-br"];
  const courseList = getCourses(locale);
  const allQuestions = getQuestions(locale);

  // Available subjects for current course
  const courseSubjects = useMemo(() => {
    const questionsForCourse = allQuestions.filter((q) => q.course === course);
    const subjectsSet = new Set(questionsForCourse.map((q) => q.subject));
    return Array.from(subjectsSet);
  }, [allQuestions, course]);

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
          recordActivity({ kind: mode, course, correct, total: pool.length, durationSeconds: questionCount * 2 * 60, subjects });
          setHistoryCount((count) => count + 1);
          setFinished(true);
          soundEngine.playSuccess();
          return 0;
        }
        return mode === "simulado" ? current - 1 : current + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [started, finished, mode, pool, answers, course, questionCount]);

  const start = () => {
    soundEngine.playChirp();
    let available = allQuestions.filter((question) => question.course === course);
    
    if (selectedSubject !== "ALL") {
      available = available.filter((question) => question.subject === selectedSubject);
    }

    const shuffled = shuffle(available);
    const chosenCount = Math.min(questionCount, shuffled.length);
    const finalPool = shuffled.slice(0, chosenCount > 0 ? chosenCount : shuffled.length);

    setPool(finalPool);
    setIndex(0);
    setSelected(null);
    setConfirmed(false);
    setAnswers({});
    setFinished(false);
    setStarted(true);
    // 2 minutes per question in simulado mode
    setSeconds(mode === "simulado" ? finalPool.length * 2 * 60 : 0);
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
    const isCorrect = selected === current.correct;
    if (isCorrect) {
      soundEngine.playSuccess();
    } else {
      soundEngine.playChirp();
    }
    setAnswers((value) => ({ ...value, [current.id]: selected }));
    setConfirmed(true);
  };

  const next = () => {
    soundEngine.playClick();
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
    const totalDuration = mode === "simulado" ? pool.length * 2 * 60 - seconds : seconds;
    recordActivity({
      kind: mode,
      course,
      correct,
      total: pool.length,
      durationSeconds: Math.max(1, totalDuration),
      subjects,
    });
    setHistoryCount((count) => count + 1);
    setFinished(true);
    soundEngine.playSuccess();
  };

  if (!started) {
    const questionsAvailableCount = allQuestions.filter((q) => q.course === course).length;

    return (
      <div className="quiz-start panel-card">
        <div className="quiz-start-copy">
          <span className="section-kicker">{t.configKicker}</span>
          <h2>{mode === "simulado" ? t.configTitleSim : t.configTitleQuest}</h2>
          <p>{mode === "simulado" ? t.configDescSim : t.configDescQuest}</p>
        </div>

        {/* Course / License Selector */}
        <div className="course-selector" role="radiogroup" aria-label="Escolha a trilha">
          {courseList.map((item) => {
            const count = allQuestions.filter((q) => q.course === item.code).length;
            return (
              <button
                type="button"
                key={item.code}
                className={course === item.code ? "course-choice active" : "course-choice"}
                onClick={() => {
                  soundEngine.playClick();
                  setCourse(item.code);
                  setSelectedSubject("ALL");
                }}
              >
                <b>{item.shortTitle}</b>
                <span>{item.title}</span>
                <small>{count} {t.questionsCount} disponíveis</small>
              </button>
            );
          })}
        </div>

        {/* Question Amount Selector */}
        <div className="quiz-options-section">
          <div className="quiz-option-block">
            <span className="quiz-option-heading">
              <Layers size={15} className="text-cyan" /> {t.questionAmountLabel}
            </span>
            <div className="quiz-chips-row">
              {[5, 10, 15].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  className={`filter-pill ${questionCount === amt ? "active" : ""}`}
                  onClick={() => {
                    soundEngine.playClick();
                    setQuestionCount(amt);
                  }}
                >
                  <Zap size={13} />
                  <span>{amt} {t.questionsCount}</span>
                  {mode === "simulado" && <small>({amt * 2} min)</small>}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter Selector */}
          <div className="quiz-option-block">
            <span className="quiz-option-heading">
              <Filter size={15} className="text-cyan" /> {t.filterSubjectLabel}
            </span>
            <div className="quiz-chips-row">
              <button
                type="button"
                className={`filter-pill ${selectedSubject === "ALL" ? "active" : ""}`}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedSubject("ALL");
                }}
              >
                <BookOpen size={13} />
                <span>{t.allSubjects} ({questionsAvailableCount})</span>
              </button>
              {courseSubjects.map((sub) => {
                const subCount = allQuestions.filter((q) => q.course === course && q.subject === sub).length;
                return (
                  <button
                    type="button"
                    key={sub}
                    className={`filter-pill ${selectedSubject === sub ? "active" : ""}`}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedSubject(sub);
                    }}
                  >
                    <span>{sub} ({subCount})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="quiz-start-footer">
          <span>
            <Clock3 size={17} className="text-cyan" />{" "}
            {mode === "simulado"
              ? `${t.timeLimit} (${questionCount * 2} min)`
              : t.progressiveTimer}
          </span>
          <span className="activities-tag">{historyCount} {t.activitiesCompleted}</span>
          <button type="button" className="button button-primary" onClick={start}>
            {t.startBtn} {mode === "simulado" ? "Simulado" : "Treino"} <span>→</span>
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
      .replace("{time}", timeLabel(mode === "simulado" ? pool.length * 2 * 60 - seconds : seconds));

    const isPassed = percent >= 70;

    return (
      <div className="quiz-result">
        <div className="result-summary panel-card">
          <div className="result-icon">
            <Trophy size={34} className="trophy-pulse-icon" />
          </div>
          <span className="section-kicker">{t.finalResult}</span>
          <div className="result-score-badge-wrap">
            <h2>{percent}% {t.accuracy}</h2>
            <span className={`result-status-tag ${isPassed ? "is-passed" : "is-failed"}`}>
              {isPassed ? "✓ APROVADO — PADRÃO DE VOO ATINGIDO" : "NECESSITA REFORÇO — ABAIXO DE 70%"}
            </span>
          </div>
          <p>{summaryText}</p>
          <div className="result-gauge">
            <i style={{ width: `${percent}%` }} />
          </div>
          <button type="button" className="button button-primary" onClick={() => setStarted(false)}>
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
                  <span>{score.correct}/{score.total} acertos</span>
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
        <span className="quiz-course-tag">{course.toUpperCase()} · {current.subject}</span>
        <div className="quiz-progress">
          <i style={{ width: `${progress}%` }} />
        </div>
        <b className="quiz-timer-badge"><Clock3 size={15} /> {timeLabel(seconds)}</b>
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
              onClick={() => {
                soundEngine.playClick();
                setSelected(optionIndex);
              }}
              key={option}
            >
              <span>{String.fromCharCode(65 + optionIndex)}</span>
              <b>{option}</b>
              {confirmed && isCorrect && <CheckCircle2 size={20} className="text-green" />}
              {confirmed && isWrong && <XCircle size={20} className="text-danger" />}
            </button>
          );
        })}
      </div>

      {confirmed && (
        <div className={selected === current.correct ? "answer-explanation success" : "answer-explanation"}>
          <b>{selected === current.correct ? `✓ ${t.correctAnswer}` : `✕ ${t.reviewAnswer}`}</b>
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

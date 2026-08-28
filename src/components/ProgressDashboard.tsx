"use client";

import Link from "next/link";
import { BookOpen, CheckCircle2, Clock3, Flame, Target, TimerReset, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { courseList } from "@/lib/content";
import { emptyProgress, loadProgress, type FoxProgress } from "@/lib/progress";

export function ProgressDashboard() {
  const [progress, setProgress] = useState<FoxProgress>(emptyProgress);
  useEffect(() => {
    const update = () => setProgress(loadProgress()); update(); window.addEventListener("foxsim-progress", update); return () => window.removeEventListener("foxsim-progress", update);
  }, []);
  const accuracy = progress.questionsAnswered ? Math.round((progress.correctAnswers / progress.questionsAnswered) * 100) : 0;
  const simulations = progress.activities.filter((item) => item.kind === "simulado");
  const reviews = Object.entries(progress.reviewTopics).filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1]);

  return (
    <div className="dashboard-grid">
      <section className="dashboard-main">
        <div className="metric-grid">
          <div className="metric-card"><span><Clock3 size={19} /></span><small>TEMPO ESTUDADO</small><strong>{Math.floor(progress.studyMinutes / 60)}h {progress.studyMinutes % 60}min</strong><p>Meta diária: {progress.dailyGoal} min</p></div>
          <div className="metric-card"><span><TimerReset size={19} /></span><small>SESSÕES POMODORO</small><strong>{progress.pomodoroSessions}</strong><p>Foco registrado no dispositivo</p></div>
          <div className="metric-card"><span><CheckCircle2 size={19} /></span><small>QUESTÕES</small><strong>{progress.questionsAnswered}</strong><p>{progress.correctAnswers} respostas corretas</p></div>
          <div className="metric-card"><span><Target size={19} /></span><small>TAXA DE ACERTO</small><strong>{accuracy}%</strong><p>{simulations.length} simulados concluídos</p></div>
        </div>

        <div className="panel-card dashboard-section">
          <div className="dashboard-heading"><div><span className="section-kicker">TRILHAS DE ESTUDO</span><h2>Seu plano de voo</h2></div><Link href="/estudos">Ver todas <span>→</span></Link></div>
          <div className="dashboard-courses">
            {courseList.map((course) => { const lessons = course.modules.flatMap((module) => module.lessons); const done = lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length; const percent = Math.round((done / lessons.length) * 100); return <Link href={`/estudos/${course.code}`} className="dashboard-course" key={course.code}><span className="course-code" style={{ color: course.accent, borderColor: `${course.accent}55` }}>{course.shortTitle}</span><div><b>{course.title}</b><small>{done} de {lessons.length} aulas</small><div className="mini-bar"><i style={{ width: `${percent}%`, background: course.accent }} /></div></div><strong>{percent}%</strong></Link>; })}
          </div>
        </div>

        <div className="panel-card dashboard-section">
          <div className="dashboard-heading"><div><span className="section-kicker">HISTÓRICO</span><h2>Atividade recente</h2></div></div>
          {progress.activities.length === 0 ? <div className="dashboard-empty"><BookOpen size={28} /><b>Seu histórico começa com a primeira prática</b><p>Responda questões ou conclua um simulado para visualizar a evolução.</p><Link className="button button-primary" href="/questoes">Praticar agora</Link></div> : <div className="activity-list">{progress.activities.slice(0, 6).map((activity) => <div key={activity.id}><span className={activity.kind === "simulado" ? "activity-icon simulation" : "activity-icon"}>{activity.kind === "simulado" ? <TrendingUp size={18} /> : <CheckCircle2 size={18} />}</span><div><b>{activity.kind === "simulado" ? "Simulado" : "Prática de questões"} · {activity.course.toUpperCase()}</b><small>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(activity.date))}</small></div><strong>{Math.round((activity.correct / activity.total) * 100)}%</strong></div>)}</div>}
        </div>
      </section>

      <aside className="dashboard-aside">
        <div className="streak-card panel-card"><span><Flame size={24} fill="currentColor" /></span><div><small>SEQUÊNCIA DE ESTUDOS</small><strong>{progress.streak} {progress.streak === 1 ? "dia" : "dias"}</strong><p>Uma sessão hoje mantém sua sequência ativa.</p></div></div>
        <div className="panel-card review-card"><span className="section-kicker">FILA DE REVISÃO</span><h3>Assuntos para reforçar</h3>{reviews.length === 0 ? <p>Responda questões. Tópicos abaixo de 70% aparecerão aqui.</p> : <div>{reviews.slice(0, 5).map(([topic, count]) => <span key={topic}><b>{topic}</b><small>prioridade {Math.min(3, count)}/3</small></span>)}</div>}<Link href="/questoes">Iniciar revisão <span>→</span></Link></div>
        <div className="panel-card goals-card"><span className="section-kicker">PRÓXIMAS METAS</span><label><input type="checkbox" checked={progress.pomodoroSessions > 0} readOnly /><span>Concluir uma sessão Pomodoro</span></label><label><input type="checkbox" checked={progress.questionsAnswered >= 10} readOnly /><span>Responder 10 questões</span></label><label><input type="checkbox" checked={simulations.length > 0} readOnly /><span>Finalizar um simulado</span></label><label><input type="checkbox" checked={progress.completedLessons.length >= 3} readOnly /><span>Concluir 3 aulas</span></label></div>
      </aside>
    </div>
  );
}

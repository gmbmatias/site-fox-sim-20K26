import type { CourseCode } from "./content";

export type ActivityResult = {
  id: string;
  kind: "questoes" | "simulado";
  course: CourseCode;
  correct: number;
  total: number;
  durationSeconds: number;
  date: string;
  subjects: Record<string, { correct: number; total: number }>;
};

export type FoxProgress = {
  studyMinutes: number;
  dailyMinutes: number;
  dailyMinutesDate: string | null;
  pomodoroSessions: number;
  questionsAnswered: number;
  correctAnswers: number;
  completedLessons: string[];
  activities: ActivityResult[];
  reviewTopics: Record<string, number>;
  dailyGoal: number;
  streak: number;
  lastActiveDate: string | null;
};

export const progressKey = "foxsim-progress-v1";

export const emptyProgress: FoxProgress = {
  studyMinutes: 0,
  dailyMinutes: 0,
  dailyMinutesDate: null,
  pomodoroSessions: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  completedLessons: [],
  activities: [],
  reviewTopics: {},
  dailyGoal: 50,
  streak: 0,
  lastActiveDate: null,
};

export function loadProgress(): FoxProgress {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const saved = window.localStorage.getItem(progressKey);
    return saved ? { ...emptyProgress, ...JSON.parse(saved) } : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

function localDay(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function updateStreak(progress: FoxProgress): FoxProgress {
  const today = localDay();
  if (progress.lastActiveDate === today) return progress;
  const yesterday = localDay(new Date(Date.now() - 86_400_000));
  return {
    ...progress,
    streak: progress.lastActiveDate === yesterday ? progress.streak + 1 : 1,
    lastActiveDate: today,
  };
}

export function saveProgress(progress: FoxProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(progressKey, JSON.stringify(progress));
  window.dispatchEvent(new Event("foxsim-progress"));
}

export function toggleLessonProgress(lessonId: string) {
  const progress = updateStreak(loadProgress());
  const completedLessons = progress.completedLessons.includes(lessonId)
    ? progress.completedLessons.filter((id) => id !== lessonId)
    : [...progress.completedLessons, lessonId];
  saveProgress({ ...progress, completedLessons });
}

export function recordActivity(result: Omit<ActivityResult, "id" | "date">) {
  let progress = updateStreak(loadProgress());
  const reviewTopics = { ...progress.reviewTopics };
  Object.entries(result.subjects).forEach(([subject, score]) => {
    if (score.correct / score.total < 0.7) reviewTopics[subject] = (reviewTopics[subject] ?? 0) + 1;
    else if (reviewTopics[subject]) reviewTopics[subject] = Math.max(0, reviewTopics[subject] - 1);
  });
  const activity: ActivityResult = {
    ...result,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  progress = {
    ...progress,
    questionsAnswered: progress.questionsAnswered + result.total,
    correctAnswers: progress.correctAnswers + result.correct,
    activities: [activity, ...progress.activities].slice(0, 30),
    reviewTopics,
  };
  saveProgress(progress);
}

export function recordPomodoro(minutes: number, dailyGoal?: number) {
  let progress = updateStreak(loadProgress());
  const today = localDay();
  const currentDailyMinutes = progress.dailyMinutesDate === today ? progress.dailyMinutes : 0;
  progress = {
    ...progress,
    studyMinutes: progress.studyMinutes + minutes,
    dailyMinutes: currentDailyMinutes + minutes,
    dailyMinutesDate: today,
    pomodoroSessions: progress.pomodoroSessions + 1,
    dailyGoal: dailyGoal ?? progress.dailyGoal,
  };
  saveProgress(progress);
}

export function setDailyGoal(dailyGoal: number) {
  saveProgress({ ...loadProgress(), dailyGoal });
}

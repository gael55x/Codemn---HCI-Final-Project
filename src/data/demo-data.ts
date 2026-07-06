/**
 * Centralized demo data for the Codemm prototype.
 *
 * Everything the product shows (diagnostic questions, results, recommended
 * path, mentor replies, demo user) lives here so the flow is easy to tune and
 * stays consistent across screens. No network calls, no secrets.
 */

export interface Skill {
  id: string;
  label: string;
}

export interface DiagnosticQuestion {
  id: string;
  skillId: string;
  prompt: string;
  code?: string;
  options: string[];
  correctIndex: number;
}

export interface SkillScore {
  id: string;
  label: string;
  score: number; // 0-100
  status: 'strong' | 'developing' | 'weak';
}

export interface RecommendedModule {
  moduleId: string;
  title: string;
  reason: string;
  priority: 'High' | 'Medium' | 'Foundational';
  minutes: number;
}

export interface DiagnosticResult {
  score: number; // 0-100 overall
  correctCount: number;
  total: number;
  headline: string;
  summary: string;
  skills: SkillScore[];
  strengths: SkillScore[];
  weakAreas: SkillScore[];
  recommendedPath: RecommendedModule[];
}

/** A fake signed-in learner used across the dashboard and mentor. */
export const demoUser = {
  name: 'Gaille Amolong',
  firstName: 'Gaille',
  email: 'gaille@codemm.app',
  level: 12,
  streak: 5,
};

export const SKILLS: Skill[] = [
  { id: 'logic', label: 'Logic Formulation' },
  { id: 'arrays', label: 'Arrays & Loops' },
  { id: 'functions', label: 'Functions & Scope' },
  { id: 'debugging', label: 'Debugging' },
  { id: 'algorithms', label: 'Algorithms' },
];

/** One focused question per skill — a diagnostic you can finish in under a minute. */
export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'q1',
    skillId: 'arrays',
    prompt: 'What is the value of data[2]?',
    code: 'const data = [10, 20, 30, 40];',
    options: ['10', '20', '30', '40'],
    correctIndex: 2,
  },
  {
    id: 'q2',
    skillId: 'logic',
    prompt: 'What does this expression evaluate to?',
    code: 'const result = (5 > 3) && (2 > 4);',
    options: ['true', 'false', 'undefined', 'Error'],
    correctIndex: 1,
  },
  {
    id: 'q3',
    skillId: 'functions',
    prompt: 'What does this function log?',
    code: 'function add(a, b = 2) {\n  return a + b;\n}\nconsole.log(add(3));',
    options: ['3', '5', 'NaN', 'undefined'],
    correctIndex: 1,
  },
  {
    id: 'q4',
    skillId: 'debugging',
    prompt: 'Why does this loop skip the last element?',
    code: 'const arr = [1, 2, 3];\nfor (let i = 0; i < arr.length - 1; i++) {\n  console.log(arr[i]);\n}',
    options: [
      'The condition should be i <= arr.length',
      'The condition should be i < arr.length',
      'Arrays are not zero-indexed',
      'let should be var',
    ],
    correctIndex: 1,
  },
  {
    id: 'q5',
    skillId: 'algorithms',
    prompt: 'What is the time complexity of a single loop over n items?',
    code: 'for (let i = 0; i < n; i++) {\n  process(items[i]);\n}',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctIndex: 2,
  },
];

/** Deterministic "believable" scores so results never look random. */
const CORRECT_SCORE: Record<string, number> = {
  logic: 88,
  arrays: 92,
  functions: 84,
  debugging: 86,
  algorithms: 90,
};
const WRONG_SCORE: Record<string, number> = {
  logic: 42,
  arrays: 38,
  functions: 45,
  debugging: 34,
  algorithms: 30,
};

const MODULE_FOR_SKILL: Record<string, Omit<RecommendedModule, 'reason' | 'priority'>> = {
  logic: { moduleId: 'js-fundamentals', title: 'Logic & Control Flow', minutes: 40 },
  arrays: { moduleId: 'js-fundamentals', title: 'Arrays & Loops', minutes: 45 },
  functions: { moduleId: 'react-patterns', title: 'Functions, Scope & Hooks', minutes: 55 },
  debugging: { moduleId: 'js-fundamentals', title: 'Debugging Fundamentals', minutes: 35 },
  algorithms: { moduleId: 'backend-architecture', title: 'Algorithmic Thinking', minutes: 60 },
};

function statusFor(score: number): SkillScore['status'] {
  if (score >= 80) return 'strong';
  if (score >= 60) return 'developing';
  return 'weak';
}

/**
 * Turns raw diagnostic answers into a skill breakdown + recommended path.
 * `answers` maps question id -> selected option index.
 */
export function computeDiagnostic(answers: Record<string, number>): DiagnosticResult {
  let correctCount = 0;

  const skills: SkillScore[] = DIAGNOSTIC_QUESTIONS.map((q) => {
    const isCorrect = answers[q.id] === q.correctIndex;
    if (isCorrect) correctCount++;
    const score = isCorrect ? CORRECT_SCORE[q.skillId] : WRONG_SCORE[q.skillId];
    const label = SKILLS.find((s) => s.id === q.skillId)?.label ?? q.skillId;
    return { id: q.skillId, label, score, status: statusFor(score) };
  });

  const total = DIAGNOSTIC_QUESTIONS.length;
  const score = Math.round((correctCount / total) * 100);

  const strengths = skills.filter((s) => s.status === 'strong');
  const weakAreas = skills.filter((s) => s.status !== 'strong');

  const priorityFor = (i: number): RecommendedModule['priority'] =>
    i === 0 ? 'High' : i === 1 ? 'Medium' : 'Foundational';

  // Recommend the weakest skills first; if the learner aced it, reinforce the
  // lowest-scoring strengths so the path is never empty.
  const ordered = [...skills].sort((a, b) => a.score - b.score);
  const recommendedPath: RecommendedModule[] = ordered.slice(0, 3).map((s, i) => {
    const base = MODULE_FOR_SKILL[s.id];
    return {
      ...base,
      reason:
        s.status === 'weak'
          ? `You missed the ${s.label.toLowerCase()} question — start here.`
          : `Sharpen your ${s.label.toLowerCase()} with a focused drill.`,
      priority: priorityFor(i),
    };
  });

  let headline: string;
  let summary: string;
  if (score >= 80) {
    headline = 'Strong foundation';
    summary = `You answered ${correctCount}/${total} correctly. Your path focuses on turning good habits into mastery.`;
  } else if (score >= 40) {
    headline = 'Solid start, clear gaps';
    summary = `You answered ${correctCount}/${total} correctly. We've mapped a path that targets your weak spots first.`;
  } else {
    headline = "Let's build your base";
    summary = `You answered ${correctCount}/${total} correctly. Your path starts with the fundamentals so nothing feels shaky.`;
  }

  return { score, correctCount, total, headline, summary, skills, strengths, weakAreas, recommendedPath };
}

/** Fallback result so the dashboard/results are populated even without a run. */
export const sampleDiagnosticResult: DiagnosticResult = computeDiagnostic({
  q1: 2, // correct
  q2: 1, // correct
  q3: 0, // wrong -> functions weak
  q4: 1, // correct
  q5: 0, // wrong -> algorithms weak
});

/* ------------------------------ Learning tracks ---------------------------- */

export type TrackId = 'frontend' | 'backend' | 'fullstack';

export interface RoadmapStep {
  id: string;
  moduleId: string; // links to a lesson in LessonScreen / LibraryScreen
  title: string;
  skillId?: string; // cross-references the diagnostic
  kind: 'lesson' | 'checkpoint';
}

export interface Track {
  id: TrackId;
  label: string;
  description: string;
  steps: RoadmapStep[];
}

export const TRACKS: Record<TrackId, Track> = {
  frontend: {
    id: 'frontend',
    label: 'Frontend',
    description: 'JavaScript, React, and modern UI.',
    steps: [
      { id: 'fe1', moduleId: 'js-fundamentals', title: 'Variables & Logic', skillId: 'logic', kind: 'lesson' },
      { id: 'fe2', moduleId: 'js-fundamentals', title: 'Arrays & Loops', skillId: 'arrays', kind: 'lesson' },
      { id: 'fe3', moduleId: 'js-fundamentals', title: 'Functions & Scope', skillId: 'functions', kind: 'lesson' },
      { id: 'fe4', moduleId: 'js-fundamentals', title: 'Debugging Basics', skillId: 'debugging', kind: 'lesson' },
      { id: 'fe5', moduleId: 'js-fundamentals', title: 'Fundamentals Check', kind: 'checkpoint' },
      { id: 'fe6', moduleId: 'react-patterns', title: 'DOM & Events', kind: 'lesson' },
      { id: 'fe7', moduleId: 'react-patterns', title: 'React Hooks', skillId: 'functions', kind: 'lesson' },
      { id: 'fe8', moduleId: 'react-patterns', title: 'State Management', kind: 'lesson' },
      { id: 'fe9', moduleId: 'react-patterns', title: 'Component Patterns', kind: 'lesson' },
      { id: 'fe10', moduleId: 'react-patterns', title: 'Build a UI', kind: 'checkpoint' },
      { id: 'fe11', moduleId: 'react-patterns', title: 'Async & Data Fetching', kind: 'lesson' },
      { id: 'fe12', moduleId: 'react-patterns', title: 'Ship Your App', kind: 'checkpoint' },
    ],
  },
  backend: {
    id: 'backend',
    label: 'Backend',
    description: 'Node.js, APIs, and databases.',
    steps: [
      { id: 'be1', moduleId: 'js-fundamentals', title: 'Variables & Logic', skillId: 'logic', kind: 'lesson' },
      { id: 'be2', moduleId: 'js-fundamentals', title: 'Arrays & Loops', skillId: 'arrays', kind: 'lesson' },
      { id: 'be3', moduleId: 'js-fundamentals', title: 'Functions & Scope', skillId: 'functions', kind: 'lesson' },
      { id: 'be4', moduleId: 'backend-architecture', title: 'Algorithmic Thinking', skillId: 'algorithms', kind: 'lesson' },
      { id: 'be5', moduleId: 'backend-architecture', title: 'Fundamentals Check', kind: 'checkpoint' },
      { id: 'be6', moduleId: 'backend-architecture', title: 'Node.js Basics', kind: 'lesson' },
      { id: 'be7', moduleId: 'backend-architecture', title: 'REST API Design', kind: 'lesson' },
      { id: 'be8', moduleId: 'database-logic', title: 'SQL & Joins', kind: 'lesson' },
      { id: 'be9', moduleId: 'database-logic', title: 'Data Modeling', kind: 'lesson' },
      { id: 'be10', moduleId: 'backend-architecture', title: 'Design an API', kind: 'checkpoint' },
      { id: 'be11', moduleId: 'backend-architecture', title: 'Auth & Security', kind: 'lesson' },
      { id: 'be12', moduleId: 'backend-architecture', title: 'Ship an API', kind: 'checkpoint' },
    ],
  },
  fullstack: {
    id: 'fullstack',
    label: 'Full-Stack',
    description: 'End-to-end web development.',
    steps: [
      { id: 'fs1', moduleId: 'js-fundamentals', title: 'Variables & Logic', skillId: 'logic', kind: 'lesson' },
      { id: 'fs2', moduleId: 'js-fundamentals', title: 'Arrays & Loops', skillId: 'arrays', kind: 'lesson' },
      { id: 'fs3', moduleId: 'js-fundamentals', title: 'Functions & Scope', skillId: 'functions', kind: 'lesson' },
      { id: 'fs4', moduleId: 'js-fundamentals', title: 'Debugging Basics', skillId: 'debugging', kind: 'lesson' },
      { id: 'fs5', moduleId: 'js-fundamentals', title: 'Fundamentals Check', kind: 'checkpoint' },
      { id: 'fs6', moduleId: 'react-patterns', title: 'React Hooks', skillId: 'functions', kind: 'lesson' },
      { id: 'fs7', moduleId: 'react-patterns', title: 'State Management', kind: 'lesson' },
      { id: 'fs8', moduleId: 'backend-architecture', title: 'REST API Design', skillId: 'algorithms', kind: 'lesson' },
      { id: 'fs9', moduleId: 'database-logic', title: 'SQL & Joins', kind: 'lesson' },
      { id: 'fs10', moduleId: 'backend-architecture', title: 'Connect Front & Back', kind: 'lesson' },
      { id: 'fs11', moduleId: 'backend-architecture', title: 'Ship a Feature', kind: 'checkpoint' },
      { id: 'fs12', moduleId: 'backend-architecture', title: 'Deploy & Monitor', kind: 'lesson' },
    ],
  },
};

export const TRACK_ORDER: TrackId[] = ['frontend', 'backend', 'fullstack'];

/** How many steps are pre-completed per track (so the roadmap shows momentum). */
export const defaultTrackProgress: Record<TrackId, number> = {
  frontend: 4,
  backend: 3,
  fullstack: 5,
};

export type StepStatus = 'completed' | 'current' | 'upcoming';

export interface RoadmapNode extends RoadmapStep {
  index: number;
  status: StepStatus;
  isFocus: boolean;
}

/** Maps an onboarding path choice to a track id. */
export function trackIdForPath(path: string | null | undefined): TrackId {
  if (path === 'frontend' || path === 'backend' || path === 'fullstack') return path;
  return 'fullstack';
}

/** Builds roadmap nodes with completed/current/upcoming status + diagnostic focus flags. */
export function buildRoadmap(track: Track, completedCount: number, weakSkillIds: string[]): RoadmapNode[] {
  return track.steps.map((step, i) => ({
    ...step,
    index: i,
    status: i < completedCount ? 'completed' : i === completedCount ? 'current' : 'upcoming',
    isFocus: !!step.skillId && weakSkillIds.includes(step.skillId),
  }));
}

/* ----------------------------- AI mentor (mock) ---------------------------- */

interface MentorRule {
  keywords: string[];
  reply: string;
}

const MENTOR_RULES: MentorRule[] = [
  {
    keywords: ['sort', 'ascending', 'price'],
    reply:
      "For ascending order, your comparator should return `a.price - b.price`. When it's negative, `a` comes first — that's exactly what you want for smallest-to-largest. Try dropping that into your `.sort()` callback.",
  },
  {
    keywords: ['reduce', '.reduce'],
    reply:
      '`.reduce()` walks the array while carrying an accumulator. Signature: `arr.reduce((acc, item) => acc + item, 0)`. The last argument is your starting value — set it deliberately and the rest follows.',
  },
  {
    keywords: ['loop', 'for', 'index', 'off-by-one'],
    reply:
      "Off-by-one bugs usually live in the loop condition. `i < arr.length` visits every index; `i <= arr.length` runs one step too far. Read the boundary out loud — it catches most of these.",
  },
  {
    keywords: ['this', 'arrow', 'scope', 'bind'],
    reply:
      'Arrow functions don\'t get their own `this` — they borrow it from where they were defined. If `this` is undefined inside a method, an arrow (or an explicit `.bind`) is usually the fix.',
  },
  {
    keywords: ['recursion', 'recursive', 'base case'],
    reply:
      'Every recursion needs a base case that stops it, then a step that moves toward that base case. Write the base case first — if it can never be reached, you get a stack overflow.',
  },
  {
    keywords: ['complexity', 'big o', 'o(n', 'runtime'],
    reply:
      'Count the work relative to input size. One loop over n items is O(n); a loop inside a loop is O(n²). Focus on how the work grows, not the exact number of steps.',
  },
];

const DEFAULT_REPLIES = [
  "Good question. Break it into the smallest piece you're unsure about and test just that — narrowing the scope usually reveals the fix.",
  "Let's reason through it: what output do you expect, and what are you actually getting? The gap between those two is where the bug lives.",
  "You're on the right track. Try writing one line, running it, and checking the result before adding the next. Small steps beat big guesses.",
];

/** Deterministic-ish mentor reply based on keywords in the user's message. */
export function getMentorReply(prompt: string): string {
  const text = prompt.toLowerCase();
  for (const rule of MENTOR_RULES) {
    if (rule.keywords.some((k) => text.includes(k))) return rule.reply;
  }
  // Pick a default based on message length so it feels varied but stable.
  return DEFAULT_REPLIES[prompt.length % DEFAULT_REPLIES.length];
}

export const mentorWelcome = `Kumusta, ${demoUser.firstName}! I'm your AI mentor. Ask me about any concept or paste code you're stuck on, and I'll explain the "why" — not just the fix.`;

export type ScreenType = 'landing' | 'onboarding' | 'diagnostic' | 'results' | 'dashboard' | 'library' | 'lesson' | 'coding' | 'progress' | 'settings' | 'syllabus';

export interface UserStats {
  level: number;
  xp: number;
  streak: number;
  badges: string[];
  mistakes: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  status: 'Completed' | 'In Progress' | 'New';
  estimatedTime: string;
}

export interface UserPreferences {
  level: string | null;
  path: string | null;
  goal: string | null;
  time: string | null;
}


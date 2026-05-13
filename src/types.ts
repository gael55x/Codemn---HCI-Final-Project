export type ScreenType = 'landing' | 'onboarding' | 'dashboard' | 'library' | 'lesson' | 'coding' | 'review' | 'progress';

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

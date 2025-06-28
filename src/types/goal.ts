export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: GoalCategory;
  targetDate: Date;
  isCompleted: boolean;
  progress: number; // 0-100
  subGoals: SubGoal[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SubGoal {
  id: string;
  title: string;
  isCompleted: boolean;
  completedAt?: Date;
}

export type GoalCategory = 'Career' | 'Spiritual' | 'Health' | 'Learning' | 'Personal';

export interface GoalProgress {
  goalId: string;
  progress: number;
  lastUpdated: Date;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  completedAt: Date;
  description?: string;
}

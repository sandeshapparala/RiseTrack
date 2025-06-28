export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  timeSlot: TimeSlot;
  date: Date;
  isCompleted: boolean;
  isMissionOfDay: boolean;
  estimatedMinutes?: number;
  actualMinutes?: number;
  category?: string;
  createdAt: Date;
}

export type TimeSlot = 'morning' | 'afternoon' | 'evening';

export interface DailyPlan {
  date: Date;
  missionOfDay?: string;
  tasks: {
    morning: Task[];
    afternoon: Task[];
    evening: Task[];
  };
  completionRate: number; // 0-100
  totalEstimatedTime: number; // minutes
  totalActualTime: number; // minutes
}

export interface ProductivityScore {
  date: Date;
  score: number; // 0-100
  tasksCompleted: number;
  tasksTotal: number;
  timeWorked: number; // minutes
  factors: {
    taskCompletion: number;
    timeEfficiency: number;
    missionCompletion: boolean;
  };
}

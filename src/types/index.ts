// Re-export all types from individual files
export * from './auth';
export * from './goal';
export * from './task';

// Additional types that might be needed
export interface TimeLog {
  id: string;
  userId: string;
  taskName: string;
  category: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  isActive: boolean;
  date: Date;
}

export interface Earning {
  id: string;
  userId: string;
  amount: number;
  source: string;
  type: 'Freelance' | 'Salary' | 'Investment' | 'Other';
  date: Date;
  description?: string;
  createdAt: Date;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  wins: string[]; // 3 wins
  challenge: string; // 1 challenge
  gratitude: string;
  prayer?: string;
  mood: 'happy' | 'neutral' | 'sad';
  createdAt: Date;
}

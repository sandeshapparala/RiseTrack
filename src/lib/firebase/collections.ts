import { where, orderBy } from 'firebase/firestore';
import { FirestoreService, COLLECTIONS, getUserData } from './firestore';
import type { Goal, Task, TimeLog, Earning, JournalEntry } from '@/types';

// Goals Service
export class GoalsService {
  static async createGoal(goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return FirestoreService.create<Goal>(COLLECTIONS.GOALS, goal);
  }

  static async getUserGoals(userId: string): Promise<Goal[]> {
    return getUserData<Goal>(COLLECTIONS.GOALS, userId, [
      orderBy('createdAt', 'desc')
    ]);
  }

  static async updateGoal(id: string, updates: Partial<Goal>): Promise<void> {
    return FirestoreService.update<Goal>(COLLECTIONS.GOALS, id, updates);
  }

  static async deleteGoal(id: string): Promise<void> {
    return FirestoreService.delete(COLLECTIONS.GOALS, id);
  }

  static async getGoalsByCategory(userId: string, category: string): Promise<Goal[]> {
    return getUserData<Goal>(COLLECTIONS.GOALS, userId, [
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    ]);
  }
}

// Tasks Service
export class TasksService {
  static async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<string> {
    return FirestoreService.create<Task>(COLLECTIONS.TASKS, task);
  }

  static async getTasksByDate(userId: string, date: Date): Promise<Task[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return getUserData<Task>(COLLECTIONS.TASKS, userId, [
      where('date', '>=', startOfDay),
      where('date', '<=', endOfDay),
      orderBy('date', 'asc')
    ]);
  }

  static async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    return FirestoreService.update<Task>(COLLECTIONS.TASKS, id, updates);
  }

  static async deleteTask(id: string): Promise<void> {
    return FirestoreService.delete(COLLECTIONS.TASKS, id);
  }

  static async getMissionOfDay(userId: string, date: Date): Promise<Task | null> {
    const tasks = await this.getTasksByDate(userId, date);
    return tasks.find(task => task.isMissionOfDay) || null;
  }
}

// Time Logs Service
export class TimeLogsService {
  static async createTimeLog(timeLog: Omit<TimeLog, 'id' | 'date'>): Promise<string> {
    return FirestoreService.create<TimeLog>(COLLECTIONS.TIME_LOGS, {
      ...timeLog,
      date: new Date(),
    });
  }

  static async getActiveTimeLog(userId: string): Promise<TimeLog | null> {
    const logs = await getUserData<TimeLog>(COLLECTIONS.TIME_LOGS, userId, [
      where('isActive', '==', true),
      orderBy('startTime', 'desc')
    ]);
    return logs[0] || null;
  }

  static async stopTimeLog(id: string, endTime: Date): Promise<void> {
    const timeLog = await FirestoreService.getById<TimeLog>(COLLECTIONS.TIME_LOGS, id);
    if (timeLog) {
      const duration = Math.floor((endTime.getTime() - timeLog.startTime.getTime()) / (1000 * 60));
      await FirestoreService.update<TimeLog>(COLLECTIONS.TIME_LOGS, id, {
        endTime,
        duration,
        isActive: false,
      });
    }
  }

  static async getTimeLogsByDate(userId: string, date: Date): Promise<TimeLog[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return getUserData<TimeLog>(COLLECTIONS.TIME_LOGS, userId, [
      where('date', '>=', startOfDay),
      where('date', '<=', endOfDay),
      orderBy('startTime', 'asc')
    ]);
  }
}

// Earnings Service
export class EarningsService {
  static async createEarning(earning: Omit<Earning, 'id' | 'createdAt'>): Promise<string> {
    return FirestoreService.create<Earning>(COLLECTIONS.EARNINGS, earning);
  }

  static async getUserEarnings(userId: string): Promise<Earning[]> {
    return getUserData<Earning>(COLLECTIONS.EARNINGS, userId, [
      orderBy('date', 'desc')
    ]);
  }

  static async updateEarning(id: string, updates: Partial<Earning>): Promise<void> {
    return FirestoreService.update<Earning>(COLLECTIONS.EARNINGS, id, updates);
  }

  static async deleteEarning(id: string): Promise<void> {
    return FirestoreService.delete(COLLECTIONS.EARNINGS, id);
  }

  static async getEarningsByDateRange(
    userId: string, 
    startDate: Date, 
    endDate: Date
  ): Promise<Earning[]> {
    return getUserData<Earning>(COLLECTIONS.EARNINGS, userId, [
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'desc')
    ]);
  }
}

// Journal Service
export class JournalService {
  static async createEntry(entry: Omit<JournalEntry, 'id' | 'createdAt'>): Promise<string> {
    return FirestoreService.create<JournalEntry>(COLLECTIONS.JOURNAL_ENTRIES, entry);
  }

  static async getEntryByDate(userId: string, date: Date): Promise<JournalEntry | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const entries = await getUserData<JournalEntry>(COLLECTIONS.JOURNAL_ENTRIES, userId, [
      where('date', '>=', startOfDay),
      where('date', '<=', endOfDay)
    ]);

    return entries[0] || null;
  }

  static async updateEntry(id: string, updates: Partial<JournalEntry>): Promise<void> {
    return FirestoreService.update<JournalEntry>(COLLECTIONS.JOURNAL_ENTRIES, id, updates);
  }

  static async getRecentEntries(userId: string, limit = 10): Promise<JournalEntry[]> {
    return getUserData<JournalEntry>(COLLECTIONS.JOURNAL_ENTRIES, userId, [
      orderBy('date', 'desc'),
      ...(limit ? [orderBy('date', 'desc')] : [])
    ]);
  }
}

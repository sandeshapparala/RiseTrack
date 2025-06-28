export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  mission2025?: string;
  vision2025?: string;
  verseOfYear?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  dailyWorkTarget: number; // hours
  weeklyWorkTarget: number; // hours
  annualIncomeGoal: number; // in INR
  notifications: {
    dailyReminders: boolean;
    weeklyReviews: boolean;
    goalDeadlines: boolean;
  };
}

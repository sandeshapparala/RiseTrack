// RiseTrack OS Constants

// Application Info
export const APP_NAME = 'RiseTrack OS';
export const APP_DESCRIPTION = 'Personal Life Management System';
export const APP_VERSION = '1.0.0';

// Goal Categories
export const GOAL_CATEGORIES = [
  'Career',
  'Spiritual',
  'Health',
  'Learning',
  'Personal'
] as const;

// Time Slots
export const TIME_SLOTS = [
  'morning',
  'afternoon', 
  'evening'
] as const;

// Default Targets
export const DEFAULT_TARGETS = {
  DAILY_WORK_HOURS: 6,
  WEEKLY_WORK_HOURS: 36,
  ANNUAL_INCOME_GOAL: 1000000, // ₹10L
  DAILY_TASKS_TARGET: 5,
  WEEKLY_GOALS_TARGET: 3
} as const;

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM dd',
  LONG: 'MMMM dd, yyyy',
  ISO: 'yyyy-MM-dd',
  TIME: 'HH:mm'
} as const;

// Theme Options
export const THEMES = ['light', 'dark', 'system'] as const;

// Moods for Journal
export const MOODS = [
  { value: 'happy', label: '😊 Happy', color: 'text-green-600' },
  { value: 'neutral', label: '😐 Neutral', color: 'text-yellow-600' },
  { value: 'sad', label: '😞 Sad', color: 'text-red-600' }
] as const;

// Earnings Categories
export const EARNING_TYPES = [
  'Freelance',
  'Salary',
  'Investment',
  'Other'
] as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'risetrack-theme',
  USER_PREFERENCES: 'risetrack-preferences',
  ONBOARDING_COMPLETED: 'risetrack-onboarding'
} as const;

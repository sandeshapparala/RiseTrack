import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Goal } from '@/types/goal';

interface GoalsState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  
  // Actions
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Computed values
  getGoalById: (id: string) => Goal | undefined;
  getGoalsByCategory: (category: string) => Goal[];
  getActiveGoals: () => Goal[];
  getCompletedGoals: () => Goal[];
  
  // Hydration state
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set, get) => ({
      goals: [],
      loading: false,
      error: null,
      _hasHydrated: false,
      
      setGoals: (goals) => set({ goals, error: null }),
      
      addGoal: (goal) => 
        set((state) => ({ 
          goals: [...state.goals, goal],
          error: null 
        })),
      
      updateGoal: (id, updates) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          ),
          error: null
        })),
      
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
          error: null
        })),
      
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      
      // Computed getters
      getGoalById: (id) => 
        get().goals.find((goal) => goal.id === id),
      
      getGoalsByCategory: (category) =>
        get().goals.filter((goal) => goal.category === category),
      
      getActiveGoals: () =>
        get().goals.filter((goal) => !goal.isCompleted),
      
      getCompletedGoals: () =>
        get().goals.filter((goal) => goal.isCompleted),
      
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'risetrack-goals',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ goals: state.goals }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

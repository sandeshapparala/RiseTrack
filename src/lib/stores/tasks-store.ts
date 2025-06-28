import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Task } from '@/types/task';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Computed values
  getTaskById: (id: string) => Task | undefined;
  getTasksByTimeSlot: (timeSlot: 'morning' | 'afternoon' | 'evening') => Task[];
  getTodayTasks: () => Task[];
  getTasksByDate: (date: Date) => Task[];
  getCompletedTasks: () => Task[];
  getActiveTasks: () => Task[];
  getMissionOfDayTasks: () => Task[];
  
  // Hydration state
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],
      loading: false,
      error: null,
      _hasHydrated: false,
      
      setTasks: (tasks) => set({ tasks, error: null }),
      
      addTask: (task) => 
        set((state) => ({ 
          tasks: [...state.tasks, task],
          error: null 
        })),
      
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
          error: null
        })),
      
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          error: null
        })),
      
      toggleTaskComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id 
              ? { ...task, isCompleted: !task.isCompleted, completedAt: !task.isCompleted ? new Date() : undefined }
              : task
          ),
          error: null
        })),
      
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      
      // Computed getters
      getTaskById: (id) => 
        get().tasks.find((task) => task.id === id),
      
      getTasksByTimeSlot: (timeSlot) =>
        get().tasks.filter((task) => task.timeSlot === timeSlot),
      
      getTodayTasks: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        return get().tasks.filter((task) => {
          const taskDate = new Date(task.date);
          return taskDate >= today && taskDate < tomorrow;
        });
      },
      
      getTasksByDate: (date) => {
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);
        
        return get().tasks.filter((task) => {
          const taskDate = new Date(task.date);
          return taskDate >= targetDate && taskDate < nextDay;
        });
      },
      
      getCompletedTasks: () =>
        get().tasks.filter((task) => task.isCompleted),
      
      getActiveTasks: () =>
        get().tasks.filter((task) => !task.isCompleted),
      
      getMissionOfDayTasks: () =>
        get().tasks.filter((task) => task.isMissionOfDay),
      
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'risetrack-tasks',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

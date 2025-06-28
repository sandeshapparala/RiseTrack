import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  // Hydration state
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      isAuthenticated: false,
      _hasHydrated: false,
      
      setUser: (user) => 
        set({ 
          user, 
          isAuthenticated: !!user,
          loading: false 
        }),
      
      setLoading: (loading) => set({ loading }),
      
      logout: () => 
        set({ 
          user: null, 
          isAuthenticated: false, 
          loading: false 
        }),
      
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'risetrack-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

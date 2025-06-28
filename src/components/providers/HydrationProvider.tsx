'use client';

import { useEffect } from 'react';
import { useAuthStore, useGoalsStore, useTasksStore } from '@/lib/stores';

interface HydrationProviderProps {
  children: React.ReactNode;
}

/**
 * Provider to handle Zustand store hydration
 * This ensures all stores are properly hydrated before rendering
 */
export function HydrationProvider({ children }: HydrationProviderProps) {
  const authHydrated = useAuthStore((state) => state._hasHydrated);
  const goalsHydrated = useGoalsStore((state) => state._hasHydrated);
  const tasksHydrated = useTasksStore((state) => state._hasHydrated);

  // All stores need to be hydrated
  const allHydrated = authHydrated && goalsHydrated && tasksHydrated;

  useEffect(() => {
    // Force hydration if not already done
    if (!authHydrated) {
      useAuthStore.persist.rehydrate();
    }
    if (!goalsHydrated) {
      useGoalsStore.persist.rehydrate();
    }
    if (!tasksHydrated) {
      useTasksStore.persist.rehydrate();
    }
  }, [authHydrated, goalsHydrated, tasksHydrated]);

  if (!allHydrated) {
    return null; // or a loading component
  }

  return <>{children}</>;
}

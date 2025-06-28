import { useAuthStore } from '@/lib/stores/auth-store';
import { useHydration } from '@/lib/hooks/use-hydration';

/**
 * Main auth hook that provides the current authentication state
 * Uses the Zustand auth store as the single source of truth
 */
export const useAuth = () => {
  const { user, loading, _hasHydrated } = useAuthStore();
  const isClientHydrated = useHydration();

  // Don't report as ready until both client and store are hydrated
  const isReady = isClientHydrated && _hasHydrated;

  return {
    user,
    loading: loading || !isReady,
    isAuthenticated: !!user && isReady,
    isReady,
  };
};

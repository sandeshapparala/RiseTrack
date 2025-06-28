'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase/config';
import { useAuthStore } from '@/lib/stores';
import { LoadingPage } from '@/components/ui/loading';
import { useHydration } from '@/lib/hooks/use-hydration';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading, loading, _hasHydrated } = useAuthStore();
  const [initializing, setInitializing] = useState(true);
  const isHydrated = useHydration();

  useEffect(() => {
    // Wait for both hydration and store hydration
    if (!isHydrated || !_hasHydrated) {
      return;
    }

    setLoading(true);

    let auth;
    try {
      auth = getFirebaseAuth();
    } catch (error) {
      console.warn('Firebase Auth not available:', error);
      // If Firebase auth is not available, set no user and stop loading
      setUser(null);
      setLoading(false);
      setInitializing(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Try to get full user document from Firestore
          const { getUserDocument } = await import('@/lib/firebase/auth');
          const userData = await getUserDocument(firebaseUser.uid);

          if (userData) {
            setUser(userData);
          } else {
            // Fallback: create user object from Firebase auth data
            const fallbackUser = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || 'User',
              photoURL: firebaseUser.photoURL || undefined,
              createdAt: firebaseUser.metadata.creationTime
                ? new Date(firebaseUser.metadata.creationTime)
                : new Date(),
              preferences: {
                theme: 'system' as const,
                dailyWorkTarget: 8,
                weeklyWorkTarget: 40,
                annualIncomeGoal: 1000000,
                notifications: {
                  dailyReminders: true,
                  weeklyReviews: true,
                  goalDeadlines: true,
                },
              },
            };
            setUser(fallbackUser);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
        setUser(null);
      } finally {
        if (initializing) {
          setInitializing(false);
        }
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [setUser, setLoading, initializing, isHydrated, _hasHydrated]);

  // Show loading while waiting for hydration or auth initialization
  if (!isHydrated || !_hasHydrated || initializing || loading) {
    return <LoadingPage message="Initializing..." />;
  }

  return <>{children}</>;
}

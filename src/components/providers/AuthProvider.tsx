'use client';

import { useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '@/lib/firebase/config';
import { useAuthStore } from '@/lib/stores';
import { LoadingPage } from '@/components/ui/loading';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading, loading } = useAuthStore();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // For now, just set no user and stop loading to bypass Firebase issues
    setUser(null);
    setLoading(false);
    setInitializing(false);
  }, [setUser, setLoading]);

  if (initializing || loading) {
    return <LoadingPage message="Initializing..." />;
  }

  return <>{children}</>;
}

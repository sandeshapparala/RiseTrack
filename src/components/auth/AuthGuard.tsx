'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { LoadingPage } from '@/components/ui/loading';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * AuthGuard component that protects routes based on authentication status
 */
export function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth' 
}: AuthGuardProps) {
  const { loading, isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    if (isReady) {
      if (requireAuth && !isAuthenticated) {
        redirect(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        redirect('/dashboard');
      }
    }
  }, [isReady, isAuthenticated, requireAuth, redirectTo]);

  // Show loading while authentication state is being determined
  if (!isReady || loading) {
    return <LoadingPage message="Checking authentication..." />;
  }

  // If we require auth and user is not authenticated, show loading while redirecting
  if (requireAuth && !isAuthenticated) {
    return <LoadingPage message="Redirecting to login..." />;
  }

  // If we don't require auth and user is authenticated, show loading while redirecting
  if (!requireAuth && isAuthenticated) {
    return <LoadingPage message="Redirecting to dashboard..." />;
  }

  return <>{children}</>;
}

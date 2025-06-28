'use client';

import { useState } from 'react';
import { signInWithGoogle, signInWithEmail, createAccount, signOut } from '@/lib/firebase/auth';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useHydration } from '@/lib/hooks/use-hydration';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AuthTest() {
  const { user, setUser } = useAuthStore();
  const hasHydrated = useHydration();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  // Don't render until hydrated to prevent mismatch
  if (!hasHydrated) {
    return <div>Loading...</div>;
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const user = await signInWithGoogle();
      if (user) {
        setUser(user);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    try {
      setLoading(true);
      setError('');
      
      let user;
      if (mode === 'signin') {
        user = await signInWithEmail(email, password);
      } else {
        user = await createAccount(email, password, displayName);
      }
      
      if (user) {
        setUser(user);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : `Failed to ${mode === 'signin' ? 'sign in' : 'create account'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      setUser(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Signed in as: <strong>{user.email}</strong>
            </p>
            {user.displayName && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Name: <strong>{user.displayName}</strong>
              </p>
            )}
          </div>
          <Button 
            onClick={handleSignOut} 
            disabled={loading}
            className="w-full"
            variant="outline"
          >
            {loading ? 'Signing out...' : 'Sign Out'}
          </Button>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{mode === 'signin' ? 'Sign In' : 'Create Account'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Google Sign In */}
        <Button 
          onClick={handleGoogleSignIn} 
          disabled={loading}
          className="w-full"
          variant="outline"
        >
          {loading ? 'Signing in...' : 'Continue with Google'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        {/* Email Form */}
        <div className="space-y-3">
          {mode === 'signup' && (
            <div>
              <Label htmlFor="displayName">Full Name</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          
          <Button 
            onClick={handleEmailAuth} 
            disabled={loading || !email || !password || (mode === 'signup' && !displayName)}
            className="w-full"
          >
            {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </div>

        {/* Toggle Mode */}
        <div className="text-center">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            disabled={loading}
          >
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}

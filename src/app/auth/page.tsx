import { AuthTest } from '@/components/auth/AuthTest';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function AuthPage() {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to RiseTrack OS
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Sign in to access your personal life management system
              </p>
            </div>
            <AuthTest />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

import { AuthTest } from '@/components/auth/AuthTest';
import { StoreTest } from '@/components/test/StoreTest';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            RiseTrack OS - System Tests
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Authentication Test
              </h2>
              <AuthTest />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Store Persistence Test
              </h2>
              <StoreTest />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

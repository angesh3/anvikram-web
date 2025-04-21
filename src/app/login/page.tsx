'use client';

import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense, useState } from 'react';
import { IconLock } from '@tabler/icons-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams?.get('from') || '/admin/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        setDebugInfo('Checking session...');
        const response = await fetch('/api/auth/validate');
        console.log('Session validation response:', response.status);
        
        const data = await response.json();
        console.log('Session data:', data);
        
        if (response.ok && data.user?.role === 'admin') {
          setDebugInfo('Valid admin session, redirecting...');
          router.replace(from);
        } else {
          setDebugInfo('No valid session');
          setLoading(false);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setDebugInfo('Session check error: ' + (error instanceof Error ? error.message : String(error)));
        setLoading(false);
      }
    };

    checkSession();
  }, [router, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDebugInfo('Logging in...');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (response.ok) {
        setDebugInfo('Login successful, refreshing page...');
        
        // Force a page reload to ensure cookies are properly set
        setTimeout(() => {
          window.location.href = from;
        }, 1000);
      } else {
        setError(data.error || 'Invalid credentials');
        setDebugInfo('Login failed: ' + (data.error || 'Unknown error'));
        setLoading(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError('Failed to login. Please try again.');
      setDebugInfo('Login error: ' + errorMessage);
      console.error('Login error:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-gray-600 mb-4">Loading...</div>
        <div className="text-xs text-gray-500">{debugInfo}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg"
      >
        <div>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <IconLock size={24} className="text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Admin Access</h1>
          <p className="text-gray-600 text-center">Sign in to access the admin dashboard</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 text-red-500 p-4 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {debugInfo && (
            <div className="text-xs text-gray-500 p-2">
              {debugInfo}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-500">
          <p>Demo Credentials:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Email: admin@example.com</li>
            <li>Password: admin123</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

// Mark this route as dynamic to handle server-side cookies
export const dynamic = 'force-dynamic'; 
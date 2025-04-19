'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { checkLoginAttempts, recordLoginAttempt, setAuthCookie, validatePassword } from '@/lib/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | undefined>();
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockoutTime && lockoutTime > 0) {
      timer = setInterval(() => {
        setLockoutTime(prev => prev ? prev - 1 : undefined);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutTime]);

  const isLocked = lockoutTime !== undefined && lockoutTime > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Check login attempts
      const { allowed, waitTime } = checkLoginAttempts(username);
      if (!allowed) {
        setLockoutTime(waitTime);
        setError(`Too many failed attempts. Please try again in ${waitTime} seconds.`);
        setIsLoading(false);
        return;
      }

      // Validate password requirements
      const { isValid, errors } = validatePassword(password);
      if (!isValid) {
        setError(errors.join('\n'));
        recordLoginAttempt(username, false);
        setIsLoading(false);
        return;
      }

      // In a real application, this would be an API call with proper password hashing
      if (username === 'admin' && password === 'Admin123!') {
        await setAuthCookie(username);
        recordLoginAttempt(username, true);
        router.push('/admin/dashboard');
      } else {
        recordLoginAttempt(username, false);
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-2xl shadow-xl"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your credentials to access the dashboard
          </p>
          {isLocked && (
            <p className="mt-2 text-center text-sm text-red-400">
              Account locked. Try again in {lockoutTime} seconds
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading || isLocked}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isLocked}
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center bg-red-500/10 py-2 px-3 rounded-lg whitespace-pre-line"
            >
              {error}
            </motion.div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: isLocked ? 1 : 1.02 }}
              whileTap={{ scale: isLocked ? 1 : 0.98 }}
              type="submit"
              disabled={isLoading || isLocked}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                (isLoading || isLocked) ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </div>

          <div className="text-sm text-gray-400">
            <p>Password requirements:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>At least 8 characters long</li>
              <li>Contains at least one number</li>
              <li>Contains at least one special character</li>
              <li>Contains at least one uppercase letter</li>
              <li>Contains at least one lowercase letter</li>
            </ul>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 
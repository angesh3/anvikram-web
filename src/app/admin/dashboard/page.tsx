'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { validateSession, clearSession } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateSession();
      if (!isValid) {
        router.replace('/admin/login');
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await clearSession();
    router.replace('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Logout
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sample KPI Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-400">Total Users</h3>
            <p className="text-4xl font-bold mt-2">1,234</p>
            <p className="text-sm text-green-500 mt-2">↑ 12% from last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-400">Active Sessions</h3>
            <p className="text-4xl font-bold mt-2">856</p>
            <p className="text-sm text-red-500 mt-2">↓ 3% from last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-400">Failed Logins</h3>
            <p className="text-4xl font-bold mt-2">23</p>
            <p className="text-sm text-green-500 mt-2">↑ 5% from last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-400">System Health</h3>
            <p className="text-4xl font-bold mt-2">98%</p>
            <p className="text-sm text-green-500 mt-2">All systems operational</p>
          </motion.div>
        </div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'User Login', user: 'admin', time: '2 minutes ago', status: 'success' },
              { action: 'Failed Login Attempt', user: 'unknown', time: '5 minutes ago', status: 'error' },
              { action: 'Settings Updated', user: 'admin', time: '10 minutes ago', status: 'success' },
              { action: 'Backup Completed', user: 'system', time: '1 hour ago', status: 'success' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-400">by {activity.user}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{activity.time}</p>
                  <p className={`text-sm ${activity.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {activity.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
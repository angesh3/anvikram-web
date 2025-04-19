'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface KPICard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const kpis: KPICard[] = [
    {
      title: 'Total Views',
      value: '124.7K',
      change: '+12.5%',
      isPositive: true,
    },
    {
      title: 'Unique Visitors',
      value: '45.2K',
      change: '+8.3%',
      isPositive: true,
    },
    {
      title: 'Avg. Session Duration',
      value: '3m 45s',
      change: '-1.2%',
      isPositive: false,
    },
    {
      title: 'Bounce Rate',
      value: '32.1%',
      change: '-2.5%',
      isPositive: true,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
          >
            Logout
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-gray-400 text-sm font-medium">{kpi.title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-white">{kpi.value}</p>
                <span
                  className={`ml-2 text-sm font-medium ${
                    kpi.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {kpi.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Dashboard Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                'New portfolio item added',
                'Blog post published',
                'Contact form submission',
                'Query Realm question answered',
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-300 text-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                  {activity}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Blog Posts</span>
                <span className="text-white font-medium">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Portfolio Projects</span>
                <span className="text-white font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Query Realm Questions</span>
                <span className="text-white font-medium">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Contact Inquiries</span>
                <span className="text-white font-medium">38</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 
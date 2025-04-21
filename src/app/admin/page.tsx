'use client';

import { motion } from 'framer-motion';
import { IconEye, IconFileText, IconMessage2, IconUsers } from '@tabler/icons-react';

export default function AdminDashboard() {
  const statsData = [
    {
      title: 'Total Views',
      value: '10.2K',
      icon: <IconEye className="w-8 h-8 text-blue-500" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Blog Posts',
      value: '25',
      icon: <IconFileText className="w-8 h-8 text-emerald-500" />,
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Comments',
      value: '182',
      icon: <IconMessage2 className="w-8 h-8 text-violet-500" />,
      bgColor: 'bg-violet-50',
    },
    {
      title: 'Unique Visitors',
      value: '8.5K',
      icon: <IconUsers className="w-8 h-8 text-orange-500" />,
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
              <div className="rounded-full p-3 bg-white/80 backdrop-blur-sm">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <p className="text-gray-600">Coming soon...</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <p className="text-gray-600">Coming soon...</p>
        </motion.div>
      </div>
    </div>
  );
} 
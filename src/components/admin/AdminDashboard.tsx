'use client';

import { motion } from 'framer-motion';
import {
  IconEye,
  IconArticle,
  IconMessageCircle2,
  IconUsers,
} from '@tabler/icons-react';

interface StatsCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const statsData: StatsCard[] = [
  {
    title: 'Total Views',
    value: '12.5K',
    icon: <IconEye size={24} />,
    color: 'bg-blue-500',
    delay: 0.1,
  },
  {
    title: 'Blog Posts',
    value: '24',
    icon: <IconArticle size={24} />,
    color: 'bg-green-500',
    delay: 0.2,
  },
  {
    title: 'Comments',
    value: '156',
    icon: <IconMessageCircle2 size={24} />,
    color: 'bg-purple-500',
    delay: 0.3,
  },
  {
    title: 'Unique Visitors',
    value: '3.2K',
    icon: <IconUsers size={24} />,
    color: 'bg-orange-500',
    delay: 0.4,
  },
];

const StatsCard: React.FC<StatsCard> = ({ title, value, icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl p-6 shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`${color} p-3 rounded-lg text-white`}>{icon}</div>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Dashboard Overview
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <p className="text-gray-600">Coming soon...</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <p className="text-gray-600">Coming soon...</p>
        </motion.div>
      </div>
    </div>
  );
} 
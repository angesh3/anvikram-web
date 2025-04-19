'use client';

import { motion } from 'framer-motion';
import { IconUsers, IconArticle, IconEye, IconMessageCircle } from '@tabler/icons-react';

interface StatCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatCard[] = [
  {
    title: 'Total Views',
    value: '10.2K',
    icon: <IconEye size={24} />,
    color: 'bg-blue-500',
  },
  {
    title: 'Blog Posts',
    value: '25',
    icon: <IconArticle size={24} />,
    color: 'bg-green-500',
  },
  {
    title: 'Comments',
    value: '182',
    icon: <IconMessageCircle size={24} />,
    color: 'bg-purple-500',
  },
  {
    title: 'Unique Visitors',
    value: '3.1K',
    icon: <IconUsers size={24} />,
    color: 'bg-orange-500',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-8"
      >
        <motion.h1 
          variants={item}
          className="text-3xl font-bold text-gray-900"
        >
          Dashboard Overview
        </motion.h1>

        <motion.div 
          variants={item}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              variants={item}
              className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-2 text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-2 rounded-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
              <div 
                className={`absolute bottom-0 left-0 h-1 w-full ${stat.color} opacity-50`}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={item}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {/* Add recent activity items here */}
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-4">
              {/* Add quick action buttons here */}
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 
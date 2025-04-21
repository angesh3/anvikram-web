'use client';

import { motion } from 'framer-motion';
import { IconEye, IconArticle, IconMessageCircle2, IconUsers } from '@tabler/icons-react';

const statsCards = [
  {
    title: 'Total Views',
    value: '10.2K',
    icon: IconEye,
    color: 'bg-blue-500',
  },
  {
    title: 'Blog Posts',
    value: '25',
    icon: IconArticle,
    color: 'bg-green-500',
  },
  {
    title: 'Comments',
    value: '182',
    icon: IconMessageCircle2,
    color: 'bg-purple-500',
  },
  {
    title: 'Unique Visitors',
    value: '8.5K',
    icon: IconUsers,
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
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              variants={item}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{card.title}</p>
                  <p className="text-2xl font-semibold mt-1">{card.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </div>
    </div>
  );
} 
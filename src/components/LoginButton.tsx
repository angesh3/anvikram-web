'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link href="/admin/login">
      <motion.div
        className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-400/10 hover:from-blue-600/20 hover:to-cyan-400/20 border border-white/10"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm font-medium text-gray-300">Admin</span>
      </motion.div>
    </Link>
  );
} 
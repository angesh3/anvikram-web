'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="relative group">
      <motion.div 
        className="flex items-center space-x-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo Mark */}
        <motion.div 
          className="relative w-12 h-12 flex items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated background layers */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 rounded-xl"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.02, 0.98, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-600/30 to-cyan-400/30 rounded-xl"
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 0.98, 1.02, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <span className="relative text-2xl font-bold text-white drop-shadow-lg">A</span>
        </motion.div>
        
        {/* Logo Type */}
        <div className="flex items-baseline">
          <motion.span 
            className="text-2xl font-semibold tracking-wide text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
              Angesh
            </span>
          </motion.span>
          <motion.span 
            className="text-2xl font-light tracking-wide text-white mx-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/80">
              Vikram
            </span>
          </motion.span>
        </div>
      </motion.div>

      {/* Enhanced Hover Effect */}
      <motion.div 
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"
        whileHover={{ scaleX: 1 }}
        initial={{ scaleX: 0 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-xl transition-all duration-300 -z-10" />
    </Link>
  );
} 
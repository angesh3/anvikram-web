'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="relative group">
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Innovative Logo Mark */}
        <motion.div 
          className="relative w-14 h-14 mr-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Geometric Shapes */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-blue-600 rounded-tl-2xl rounded-br-2xl transform -rotate-6"></div>
            <div className="absolute inset-0 bg-cyan-400 rounded-tr-2xl rounded-bl-2xl transform rotate-6 mix-blend-multiply"></div>
          </div>
          
          {/* Letter A with custom design */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative text-2xl font-bold text-white transform -translate-y-[2px]"
            >
              <span className="relative z-10 drop-shadow-lg">A</span>
              <div className="absolute inset-0 bg-white/10 blur-sm rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Dynamic Text Layout */}
        <div className="flex flex-col">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-100">
              ANGESH
            </span>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent blur-lg -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative mt-1"
          >
            <span className="text-lg font-light tracking-[0.2em] text-gray-300 uppercase">
              Vikram
            </span>
            <div className="absolute h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-cyan-400 bottom-0 transition-all duration-300"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Elements */}
      <motion.div 
        className="absolute -inset-2 bg-gradient-to-r from-blue-600/5 to-cyan-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        whileHover={{ scale: 1.02 }}
      />
    </Link>
  );
} 
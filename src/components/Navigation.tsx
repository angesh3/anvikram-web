'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import Logo from './Logo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  // Don't show admin login button on login or admin pages
  const showAdminLogin = !pathname?.startsWith('/admin') && pathname !== '/login';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm ${
                isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm ${
                isActive('/about') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className={`text-sm ${
                isActive('/portfolio') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className={`text-sm ${
                isActive('/blog') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/query-realm"
              className={`text-sm ${
                isActive('/query-realm') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Query Realm
            </Link>
            <Link
              href="/contact"
              className={`text-sm ${
                isActive('/contact') ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </Link>

            {showAdminLogin && (
              <motion.button
                onClick={() => router.push('/login')}
                className="flex items-center px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Admin Login
              </motion.button>
            )}

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md"
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            About
          </Link>
          <Link
            href="/portfolio"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/portfolio') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            Portfolio
          </Link>
          <Link
            href="/blog"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/blog') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            Blog
          </Link>
          <Link
            href="/query-realm"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/query-realm') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            Query Realm
          </Link>
          <Link
            href="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/contact') ? 'text-white bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            Contact
          </Link>
          <div className="px-3 py-2">
            {showAdminLogin && (
              <motion.button
                onClick={() => router.push('/login')}
                className="flex items-center px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Admin Login
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </nav>
  );
} 
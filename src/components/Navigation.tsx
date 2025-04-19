'use client';

import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl">
            <span className="text-white">Anges</span>
            <span className="text-[#00A0E3]">AV</span>
            <span className="text-white">ikram</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/about" className="text-white hover:text-gray-300">about</Link>
            <Link href="/learn" className="text-white hover:text-gray-300">learn</Link>
            <Link href="/portfolio" className="text-white hover:text-gray-300">portfolio</Link>
            <Link href="/blog" className="text-white hover:text-gray-300">blog</Link>
            <Link href="/contact" className="text-white hover:text-gray-300">contact</Link>
            <div className="flex items-center space-x-4 ml-8">
              <a href="https://twitter.com/angeshvikram" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/angeshvikram" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/anvikram" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/angeshvikram" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 
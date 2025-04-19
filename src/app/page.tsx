'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Home() {
  // Initialize cursor position to 50 for perfect split
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        setCursorPosition({ x, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate opacity and clip values based on cursor position
  const leftOpacity = Math.max(0, Math.min(1, (50 - cursorPosition.x) / 25 + 1));
  const rightOpacity = Math.max(0, Math.min(1, (cursorPosition.x - 50) / 25 + 1));
  const clipPosition = `${cursorPosition.x}%`;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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

      {/* Hero Section */}
      <div className="min-h-screen" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="w-full relative flex justify-between items-center">
            {/* Left Side Text */}
            <div className={`absolute left-0 w-1/3 transition-opacity duration-300 z-[60]`} 
                 style={{ opacity: leftOpacity }}>
              <h1 className="text-[3.8rem] font-bold text-[#333333] leading-[1.1] tracking-tight">
                {'<Hands-On>'} Leader
              </h1>
              <p className="text-lg text-gray-600 mt-6 max-w-sm">
                Engineering leader driving innovation through hands-on development and team empowerment.
              </p>
            </div>

            {/* Center Image Container */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[600px] z-[50]">
              <div className="relative w-full h-full">
                {/* Artistic Photo (B&W) */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/home/photo-artistic.png"
                    alt="Angesh Vikram Artistic"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
                
                {/* Regular Photo with Clip Path */}
                <div 
                  className="absolute inset-0 w-full h-full transition-[clip-path] duration-100"
                  style={{
                    clipPath: `inset(0 0 0 ${cursorPosition.x}%)`,
                  }}
                >
                  <Image
                    src="/images/home/photo-regular.jpeg"
                    alt="Angesh Vikram"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>

                {/* Vertical Line Indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-[left] duration-100"
                  style={{ 
                    left: clipPosition,
                    transform: 'translateX(-50%)',
                  }}
                />
              </div>
            </div>

            {/* Right Side Text */}
            <div className={`absolute right-0 w-1/3 text-right transition-opacity duration-300 z-[60]`}
                 style={{ opacity: rightOpacity }}>
              <h1 className="text-[3.8rem] font-bold text-[#333333] leading-[1.1] tracking-tight">
                {'<Architect>'}
              </h1>
              <p className="text-lg text-gray-600 mt-6 max-w-sm ml-auto">
                Cloud & Security Architect leading enterprise solutions with a focus on scalable, secure architectures and AI integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Work Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-medium text-gray-900 mb-16 tracking-wider">
            SOME OF MY LATEST WORK
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/portfolio" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/home/photo-regular.jpeg"
                    alt="Project 1"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Cloud Security Framework</h3>
                  <p className="text-gray-600">Enterprise-scale security architecture</p>
                </div>
              </div>
            </Link>
            <Link href="/portfolio" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/home/photo-regular.jpeg"
                    alt="Project 2"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Security</h3>
                  <p className="text-gray-600">ML models for threat detection</p>
                </div>
              </div>
            </Link>
            <Link href="/portfolio" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/home/photo-regular.jpeg"
                    alt="Project 3"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Cloud Architecture</h3>
                  <p className="text-gray-600">Scalable infrastructure solutions</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">© 2024 Angesh Vikram</p>
            <div className="flex space-x-6">
              <Link href="/about" className="text-gray-500 hover:text-gray-900">about</Link>
              <Link href="/learn" className="text-gray-500 hover:text-gray-900">learn</Link>
              <Link href="/portfolio" className="text-gray-500 hover:text-gray-900">portfolio</Link>
              <Link href="/blog" className="text-gray-500 hover:text-gray-900">blog</Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900">contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 
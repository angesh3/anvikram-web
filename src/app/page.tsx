'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Home() {
  const [clipPosition, setClipPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        // Only update position when mouse is over the image
        if (e.clientX >= rect.left && e.clientX <= rect.right) {
          setClipPosition(x);
        } else {
          setClipPosition(50); // Reset to middle when mouse leaves
        }
      }
    };

    const handleMouseLeave = () => {
      setClipPosition(50); // Reset to middle when mouse leaves
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const leftOpacity = Math.max(0, Math.min(1, (50 - clipPosition) / 25 + 1));
  const rightOpacity = Math.max(0, Math.min(1, (clipPosition - 50) / 25 + 1));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="min-h-[calc(100vh-5rem)]" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-5rem)] flex items-center">
          <div className="w-full relative flex justify-between items-center">
            {/* Left Side Text */}
            <div className={`absolute left-0 w-1/3 transition-opacity duration-300 z-[60]`} 
                 style={{ opacity: leftOpacity }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                {'<Hands-On>'} Leader
              </h1>
              <p className="text-lg text-gray-600 mt-6 max-w-sm">
                Engineering leader driving innovation through hands-on development and team empowerment.
              </p>
            </div>

            {/* Center Image Container */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[600px] z-[50]">
              <div className="relative w-full h-full">
                {/* Regular Photo (Base) */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/home/photo-regular.jpeg"
                    alt="Angesh Vikram"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
                
                {/* Artistic Photo (B&W) with Clip Path */}
                <div 
                  className="absolute inset-0 w-full h-full transition-[clip-path] duration-100"
                  style={{
                    clipPath: `inset(0 ${100 - clipPosition}% 0 0)`,
                  }}
                >
                  <Image
                    src="/images/home/photo-artistic.png"
                    alt="Angesh Vikram Artistic"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>

                {/* Vertical Line Indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-[left] duration-100"
                  style={{ 
                    left: `${clipPosition}%`,
                    transform: 'translateX(-50%)',
                  }}
                />
              </div>
            </div>

            {/* Right Side Text */}
            <div className={`absolute right-0 w-1/3 text-right transition-opacity duration-300 z-[60]`}
                 style={{ opacity: rightOpacity }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                {'<Architect>'}
              </h1>
              <p className="text-lg text-gray-600 mt-6 max-w-sm ml-auto">
                Cloud & Security Architect leading enterprise solutions with a focus on scalable, secure architectures and AI integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Work Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Explore some of my recent projects in cloud architecture, security, and AI integration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/portfolio" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-56 flex items-center justify-center p-4 bg-gray-50">
                  <Image
                    src="/images/portfolio/scf-logo.svg"
                    alt="Security Compliance Framework"
                    width={220}
                    height={220}
                    style={{ objectFit: 'contain' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Security Compliance Framework</h3>
                  <p className="text-gray-600">Comprehensive security framework with automated auditing for regulatory compliance across cloud environments.</p>
                </div>
              </div>
            </Link>
            <Link href="/portfolio" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-56 flex items-center justify-center p-4 bg-gray-50">
                  <Image
                    src="/images/portfolio/ai-logo.svg"
                    alt="AI Development Platform"
                    width={220}
                    height={220}
                    style={{ objectFit: 'contain' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Development Platform</h3>
                  <p className="text-gray-600">End-to-end platform for developing and deploying machine learning models.</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View All Projects
              <FaExternalLinkAlt className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 
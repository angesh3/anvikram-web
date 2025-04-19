'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'Cloud Security Framework',
    description: 'Enterprise-scale security architecture implementation',
    image: '/images/home/photo-regular.jpeg',
    category: 'security',
    technologies: ['AWS', 'Kubernetes', 'Security'],
  },
  {
    title: 'AI-Powered Security',
    description: 'ML models for threat detection and prevention',
    image: '/images/home/photo-regular.jpeg',
    category: 'ai',
    technologies: ['Python', 'TensorFlow', 'Security'],
  },
  {
    title: 'Cloud Architecture',
    description: 'Scalable infrastructure solutions for enterprises',
    image: '/images/home/photo-regular.jpeg',
    category: 'cloud',
    technologies: ['AWS', 'Azure', 'DevOps'],
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'security', label: 'Security' },
  { id: 'ai', label: 'AI' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-[3.8rem] font-bold text-[#333333] leading-[1.1] tracking-tight mb-6">
              Portfolio
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore my latest projects in cloud architecture, security, and AI integration.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center space-x-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'bg-[#00A0E3] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 
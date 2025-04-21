'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaDownload, FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';

const projects = [
  {
    title: 'Personal Website',
    description: 'Modern, responsive personal website built with Next.js 14, TailwindCSS, and TypeScript. Features a clean design, dark mode support, and optimized performance.',
    image: '/images/portfolio/website.jpg',
    category: 'frontend',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'React'],
    github: 'https://github.com/angesh3/anvikram-web',
    demo: 'https://anvikram.com',
    status: 'Active'
  },
  {
    title: 'Cloud Infrastructure Automation',
    description: 'Infrastructure as Code (IaC) solution for AWS cloud resources. Automated deployment of scalable, secure cloud infrastructure using Terraform and AWS CDK.',
    image: '/images/portfolio/cloud.jpg',
    category: 'cloud',
    technologies: ['AWS', 'Terraform', 'Python', 'Docker'],
    github: 'https://github.com/angesh3/cloud-automation',
    demo: 'https://cloud.anvikram.com',
    status: 'Active'
  },
  {
    title: 'Security Compliance Framework',
    description: 'Comprehensive security framework with automated auditing for regulatory compliance across cloud environments.',
    image: '/images/portfolio/scf-logo.svg',
    category: 'security',
    technologies: ['Python', 'AWS', 'Docker', 'Kubernetes'],
    github: 'https://github.com/angesh3/angesh-scf',
    demo: 'https://security.anvikram.com',
    status: 'Active'
  },
  {
    title: 'AI Development Platform',
    description: 'Platform for developing and deploying machine learning models with automated training pipelines and model versioning.',
    image: '/images/portfolio/ai.jpg',
    category: 'ai',
    technologies: ['Python', 'TensorFlow', 'Docker', 'Kubernetes'],
    github: 'https://github.com/angesh3/ai-platform',
    demo: 'https://ai.anvikram.com',
    status: 'Beta'
  }
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'security', label: 'Security' },
  { id: 'ai', label: 'AI' }
];

const highlights = [
  {
    icon: FaBriefcase,
    title: 'Experience',
    items: [
      'Engineering Manager at Leading Tech Companies',
      'Cloud Architecture & Security Expert',
      'AI/ML Integration Specialist'
    ]
  },
  {
    icon: FaGraduationCap,
    title: 'Education',
    items: [
      'Master\'s in Computer Science',
      'Cloud & Security Certifications',
      'Continuous Learning & Development'
    ]
  },
  {
    icon: FaAward,
    title: 'Achievements',
    items: [
      'Led Multiple Enterprise Projects',
      'Security Framework Implementation',
      'Cloud Architecture Optimization'
    ]
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <section className="py-20 bg-white border-b border-gray-100"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Resume Section */}
      <section className="py-20 bg-white border-b border-gray-100"  style={{ paddingBottom: '10px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Professional Portfolio
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Engineering leader with expertise in cloud architecture, security engineering, and AI integration.
              </p>
            </div>
            <Link 
              href="/files/Angesh-Vikram.pdf"
              className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              target="_blank"
            >
              <FaDownload className="mr-2" />
              Download Resume
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <highlight.icon className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{highlight.title}</h3>
                </div>
                <ul className="space-y-2">
                  {highlight.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A collection of my projects showcasing expertise in frontend development, 
              cloud architecture, security engineering, and AI solutions.
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-56 bg-gray-50 flex items-center justify-center">
                  {project.image.endsWith('.svg') ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={220}
                      height={220}
                      style={{ objectFit: 'contain' }}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded ${
                      project.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex space-x-4">
                      <Link 
                        href={project.github}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        target="_blank"
                      >
                        <FaGithub size={20} />
                      </Link>
                      {/* Demo links commented out for now
                      <Link 
                        href={project.demo}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        target="_blank"
                      >
                        <FaExternalLinkAlt size={18} />
                      </Link>
                      */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </div>
    </section>
  );
} 
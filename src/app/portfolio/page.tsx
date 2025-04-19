'use client';

import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCloud, FaShieldAlt, FaTools } from 'react-icons/fa';

const projects = [
  {
    title: "Cloud Migration Framework",
    description: "Enterprise-scale cloud migration framework with security-first approach",
    tech: ["AWS", "Azure", "Terraform", "Python"],
    category: "Cloud Architecture",
    icon: FaCloud,
    github: "https://github.com/anvikram/cloud-migration-framework",
    demo: "https://cloud-migration-demo.example.com"
  },
  {
    title: "AI Security Scanner",
    description: "ML-powered security vulnerability scanner for cloud infrastructure",
    tech: ["Python", "TensorFlow", "Docker", "Kubernetes"],
    category: "Security",
    icon: FaShieldAlt,
    github: "https://github.com/anvikram/ai-security-scanner",
    demo: "https://security-scanner-demo.example.com"
  },
  {
    title: "DevSecOps Pipeline",
    description: "Automated security testing and deployment pipeline for enterprise applications",
    tech: ["Jenkins", "GitLab", "Docker", "Ansible"],
    category: "DevOps",
    icon: FaTools,
    github: "https://github.com/anvikram/devsecops-pipeline",
    demo: "https://pipeline-demo.example.com"
  }
];

const categories = Array.from(new Set(projects.map(project => project.category)));

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = selectedCategory
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Portfolio
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          A collection of my key projects and contributions in cloud, security, and AI
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === null
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white transform transition duration-300 hover:scale-105"
          >
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <project.icon className="w-4 h-4 mr-2" />
                  {project.category}
                </span>
                <div className="flex space-x-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {project.title}
              </h3>
              <p className="mt-3 text-base text-gray-500">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
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
  );
} 
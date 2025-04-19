'use client';

import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCloud, FaShieldAlt, FaTools, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

const projects = [
  {
    title: "Cloud Security Framework",
    description: "Implemented zero-trust security architecture for multi-cloud environments",
    tech: ["AWS", "Azure", "Zero Trust", "Security"],
    category: "Security",
    icon: FaShieldAlt,
    github: "https://github.com/anvikram",
    demo: "#"
  },
  {
    title: "AI-Powered Security",
    description: "Developed ML models for threat detection and automated response",
    tech: ["Python", "TensorFlow", "Security AI"],
    category: "AI",
    icon: FaTools,
    github: "https://github.com/anvikram",
    demo: "#"
  },
  {
    title: "Cloud Architecture",
    description: "Designed and implemented scalable cloud infrastructure solutions",
    tech: ["AWS", "Azure", "Architecture"],
    category: "Cloud",
    icon: FaCloud,
    github: "https://github.com/anvikram",
    demo: "#"
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
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
        <div className="relative w-48 h-48 overflow-hidden rounded-full shadow-xl">
          <Image
            src="/images/angesh-profile.jpeg"
            alt="Angesh Vikram"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="text-center md:text-left md:max-w-xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Angesh Vikram
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Cloud & Security Architect | DevSecOps Engineer | AI Enthusiast
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Seasoned technology leader with 20+ years of experience building industry-leading Cloud and Enterprise software platforms & applications. Proven expertise in managing cloud software engineering teams, enhancing security posture, and integrating AI & ML models. Skilled in all phases of the software development lifecycle, translating business requirements into technical solutions, and ensuring quality, usability, security, and scalability.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://github.com/anvikram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 transform transition hover:scale-110"
            >
              <FaGithub className="w-8 h-8" />
            </a>
            <a
              href="https://linkedin.com/in/angeshvikram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 transform transition hover:scale-110"
            >
              <FaLinkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8 text-center">
          Experience
        </h2>
        <div className="space-y-8">
          {/* Cisco */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Senior Engineering Leader</h3>
                <p className="text-gray-600">Cisco, Security Policy and Access</p>
              </div>
              <span className="text-gray-500">Jan 2022 - Present</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Led cloud software engineering teams in building NAC and policy management SaaS systems, improving security posture and increasing system scalability by 25%</li>
              <li>Delivered cross-organizational SaaS solution for network segmentation, reducing manual intervention by 30%</li>
              <li>Integrated LLMs to automate security policy generation, reducing policy generation time by 30%</li>
            </ul>
          </div>

          {/* RapidAI */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Technology Leader</h3>
                <p className="text-gray-600">RapidAI, SAAS Application Platform</p>
              </div>
              <span className="text-gray-500">Jun 2019 - Jan 2022</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Managed development of clinical decision support SaaS platform, improving diagnostic accuracy and workflow efficiency</li>
              <li>Led AI & ML integration for medical data interpretation, increasing platform adoption by 12%</li>
              <li>Delivered life-saving clinical applications via mobile, desktop, and PACS platforms</li>
            </ul>
          </div>

          {/* GE Digital */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Sr. Manager Software Engineering</h3>
                <p className="text-gray-600">GE Digital, Emerging Verticals</p>
              </div>
              <span className="text-gray-500">May 2017 - Jun 2019</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Onboarded 4 new clients onto Predix, resulting in 1000+ new users and $1M+ annual revenue</li>
              <li>Led system architecture, web application, and data science teams for Predix-powered automotive applications</li>
              <li>Implemented scalable hub-spoke topology on Azure, reducing deployment time from days to 30 minutes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Projects
        </h2>
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
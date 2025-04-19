'use client';

import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-[3.8rem] font-bold text-[#333333] leading-[1.1] tracking-tight mb-6">
              About Me
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Engineering leader and cloud architect with a passion for innovation and team empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px]">
              <Image
                src="/images/home/photo-regular.jpeg"
                alt="Angesh Vikram"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">My Journey</h2>
              <p className="text-gray-600">
                With over a decade of experience in software engineering and cloud architecture,
                I've led teams in building scalable, secure, and innovative solutions.
                My approach combines technical expertise with strong leadership skills,
                fostering an environment where creativity and excellence thrive.
              </p>
              <h2 className="text-2xl font-semibold text-gray-900 pt-6">Expertise</h2>
              <ul className="grid grid-cols-2 gap-4">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#00A0E3] rounded-full"></span>
                  <span className="text-gray-600">Cloud Architecture</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#00A0E3] rounded-full"></span>
                  <span className="text-gray-600">Security Engineering</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#00A0E3] rounded-full"></span>
                  <span className="text-gray-600">AI/ML Integration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#00A0E3] rounded-full"></span>
                  <span className="text-gray-600">Team Leadership</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Constantly pushing boundaries and exploring new technologies to solve complex problems.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Leadership</h3>
              <p className="text-gray-600">
                Empowering teams to achieve their full potential through mentorship and guidance.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="text-gray-600">
                Maintaining high standards in code quality, architecture, and team collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
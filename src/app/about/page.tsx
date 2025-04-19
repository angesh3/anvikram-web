'use client';

import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Me
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Engineering leader and cloud architect with a passion for innovation and team empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/home/photo-regular.jpeg"
                alt="Angesh Vikram"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Journey</h2>
                <p className="text-gray-600">
                  With over a decade of experience in software engineering and cloud architecture,
                  I've led teams in building scalable, secure, and innovative solutions.
                  My approach combines technical expertise with strong leadership skills,
                  fostering an environment where creativity and excellence thrive.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Areas of Expertise</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-medium text-gray-900 mb-2">Cloud Architecture</h3>
                    <p className="text-sm text-gray-600">AWS, Azure, GCP, Infrastructure as Code</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-medium text-gray-900 mb-2">Security Engineering</h3>
                    <p className="text-sm text-gray-600">Zero Trust, FedRAMP, Cloud Security</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-medium text-gray-900 mb-2">AI/ML Integration</h3>
                    <p className="text-sm text-gray-600">TensorFlow, PyTorch, MLOps</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-medium text-gray-900 mb-2">Team Leadership</h3>
                    <p className="text-sm text-gray-600">Engineering Management, Mentorship</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Core Values</h2>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Principles that guide my approach to leadership and technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Constantly pushing boundaries and exploring new technologies to solve complex problems.
                Embracing emerging technologies and methodologies.
              </p>
            </div>
            <div className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Leadership</h3>
              <p className="text-gray-600">
                Empowering teams to achieve their full potential through mentorship and guidance.
                Creating an environment that fosters growth and collaboration.
              </p>
            </div>
            <div className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                Maintaining high standards in code quality, architecture, and team collaboration.
                Delivering solutions that exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
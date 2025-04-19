import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Angesh Vikram',
  description: 'Learn about my journey, values, and expertise in cloud and security.',
};

export default function About() {
  const skills = [
    'AWS', 'Kubernetes', 'OpenAI', 'Cloud Security',
    'DevOps', 'System Design', 'Team Leadership',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      
      {/* Journey Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">My Journey</h2>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-4">
            [Your journey description here]
          </p>
        </div>
      </section>

      {/* Values & Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Values & Mission</h2>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-4">
            [Your values and mission statement here]
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Resume Download */}
      <section>
        <a
          href="/path-to-your-resume.pdf"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Resume
        </a>
      </section>
    </div>
  );
} 
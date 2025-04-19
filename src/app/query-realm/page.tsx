'use client';

import { FaSearch, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';

const questions = [
  {
    title: 'Best practices for AWS security?',
    content: 'Looking for current best practices for securing AWS infrastructure, particularly around IAM policies, VPC configuration, and encryption standards.',
    tags: ['AWS', 'Security', 'Cloud'],
    upvotes: 12,
    answers: 3,
    views: 156,
    timestamp: '2 hours ago'
  },
  {
    title: 'Managing Kubernetes at scale',
    content: 'How do you handle Kubernetes clusters in large enterprises? Specifically interested in multi-cluster management, GitOps practices, and security policies.',
    tags: ['Kubernetes', 'DevOps', 'Cloud Native'],
    upvotes: 8,
    answers: 5,
    views: 98,
    timestamp: '4 hours ago'
  },
  {
    title: 'AI Integration in Cloud Architecture',
    content: 'What are the best approaches for integrating AI/ML services into existing cloud infrastructure while maintaining scalability and cost efficiency?',
    tags: ['AI', 'Cloud', 'Architecture'],
    upvotes: 15,
    answers: 7,
    views: 203,
    timestamp: '1 hour ago'
  }
];

export default function QueryRealm() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Query Realm
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the community discussion on cloud architecture, security, and tech leadership.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Search and Ask Question */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="flex-1 relative">
                <input
                  type="search"
                  placeholder="Search questions..."
                  className="w-full px-6 py-3 pr-12 bg-white border border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-base font-medium">
                <FaPlus className="mr-2" />
                Ask a Question
              </button>
            </div>

            {/* Questions Feed */}
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                >
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <FaArrowUp size={20} />
                      </button>
                      <span className="text-lg font-semibold my-1 text-gray-900">{question.upvotes}</span>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <FaArrowDown size={20} />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                        {question.title}
                      </h2>
                      <p className="text-gray-600 mb-4">{question.content}</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex flex-wrap gap-2">
                          {question.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 ml-auto">
                          <span>{question.answers} answers</span>
                          <span>{question.views} views</span>
                          <span>{question.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
'use client';

const questions = [
  {
    title: 'Best practices for AWS security?',
    content: 'Looking for current best practices for securing AWS infrastructure.',
    tags: ['AWS', 'Security'],
    upvotes: 12,
  },
  {
    title: 'Managing Kubernetes at scale',
    content: 'How do you handle Kubernetes clusters in large enterprises?',
    tags: ['Kubernetes', 'DevOps'],
    upvotes: 8,
  },
];

export default function SocialHub() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-[3.8rem] font-bold text-[#333333] leading-[1.1] tracking-tight mb-6">
              Social Hub
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the community discussion on cloud architecture, security, and tech leadership.
            </p>
          </div>

          {/* Ask Question Button */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <button className="bg-[#00A0E3] text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium">
              Ask a Question
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <input
              type="search"
              placeholder="Search questions..."
              className="w-full px-6 py-3 border rounded-lg text-lg"
            />
          </div>

          {/* Questions Feed */}
          <div className="max-w-4xl mx-auto grid gap-6">
            {questions.map((question, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center">
                    <button className="text-gray-500 hover:text-[#00A0E3] transition-colors">▲</button>
                    <span className="text-xl font-semibold my-2">{question.upvotes}</span>
                    <button className="text-gray-500 hover:text-[#00A0E3] transition-colors">▼</button>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900">{question.title}</h2>
                    <p className="text-gray-600 mb-4 text-lg">{question.content}</p>
                    <div className="flex gap-2">
                      {question.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-4 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
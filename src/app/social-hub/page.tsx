import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Hub - Angesh Vikram',
  description: 'Community Q&A platform for tech discussions',
};

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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Social Hub</h1>

      {/* Ask Question Button */}
      <div className="mb-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Ask a Question
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="search"
          placeholder="Search questions..."
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Questions Feed */}
      <div className="grid gap-6">
        {questions.map((question, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <button className="text-gray-500 hover:text-blue-600">▲</button>
                <span className="text-lg font-semibold">{question.upvotes}</span>
                <button className="text-gray-500 hover:text-blue-600">▼</button>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
                <p className="text-gray-600 mb-4">{question.content}</p>
                <div className="flex gap-2">
                  {question.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
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
  );
} 
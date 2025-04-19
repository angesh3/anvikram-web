'use client';

const posts = [
  {
    title: 'Building Secure Cloud Infrastructure',
    summary: 'Essential practices for maintaining security in cloud environments',
    category: 'Cloud Security',
    date: '2024-04-19',
  },
  {
    title: 'Leadership in Tech Teams',
    summary: 'Effective strategies for leading technical teams',
    category: 'Leadership',
    date: '2024-04-18',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-[3.8rem] font-bold text-[#333333] leading-[1.1] tracking-tight mb-6">
              Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thoughts and insights on cloud architecture, security, and leadership.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <input
              type="search"
              placeholder="Search posts..."
              className="w-full px-6 py-3 border rounded-lg text-lg"
            />
          </div>

          {/* Posts Grid */}
          <div className="max-w-4xl mx-auto grid gap-8">
            {posts.map((post, index) => (
              <article key={index} className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
                  <span className="px-4 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 text-lg">{post.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{post.date}</span>
                  <button className="text-[#00A0E3] hover:text-blue-700 font-medium">
                    Read more →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 
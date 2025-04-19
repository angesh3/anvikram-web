'use client';

const posts = [
  {
    title: 'Building Secure Cloud Infrastructure',
    summary: 'Learn about essential practices and patterns for maintaining robust security in modern cloud environments, focusing on Zero Trust Architecture and compliance frameworks.',
    category: 'Cloud Security',
    date: 'April 19, 2024',
    readTime: '5 min read'
  },
  {
    title: 'Leadership in Tech Teams',
    summary: 'Effective strategies for leading technical teams, fostering innovation, and maintaining high performance in a fast-paced technology environment.',
    category: 'Leadership',
    date: 'April 18, 2024',
    readTime: '4 min read'
  },
  {
    title: 'AI Integration in Cloud Architecture',
    summary: 'Exploring practical approaches to integrating AI capabilities into cloud-native applications while maintaining scalability and security.',
    category: 'AI & Cloud',
    date: 'April 17, 2024',
    readTime: '6 min read'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Insights and experiences on cloud architecture, security engineering, and technical leadership.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="search"
                placeholder="Search posts..."
                className="w-full px-6 py-3 pr-12 bg-white border border-gray-200 rounded-xl text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="max-w-4xl mx-auto grid gap-8">
            {posts.map((post, index) => (
              <article 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-wrap gap-4 items-start mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900 flex-grow">
                    {post.title}
                  </h2>
                  <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {post.summary}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <span className="text-gray-500">{post.date}</span>
                  <span className="text-gray-500">{post.readTime}</span>
                  <button className="ml-auto text-blue-600 hover:text-blue-700 font-medium inline-flex items-center group">
                    Read more
                    <svg 
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                      />
                    </svg>
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
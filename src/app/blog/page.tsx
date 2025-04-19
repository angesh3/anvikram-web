import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Angesh Vikram',
  description: 'Thoughts and insights on cloud, security, and leadership',
};

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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="search"
          placeholder="Search posts..."
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8">
        {posts.map((post, index) => (
          <article key={index} className="border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {post.category}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{post.summary}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">{post.date}</span>
              <button className="text-blue-600 hover:text-blue-800">Read more →</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 
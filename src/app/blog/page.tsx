'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';

export default function Blog() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data.filter((post: BlogPost) => post.isPublished));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            {filteredPosts.map((post) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                  <span className="text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="text-gray-500">{post.readTime}</span>
                  <button
                    onClick={() => router.push(`/blog/${post.slug}`)}
                    className="ml-auto text-blue-600 hover:text-blue-700 font-medium inline-flex items-center group"
                  >
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
              </motion.article>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or check back later for new posts.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 
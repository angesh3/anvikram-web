'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!params?.slug) {
          throw new Error('Invalid URL');
        }

        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        
        // Find the post that matches the current slug
        const currentPost = posts.find((p: BlogPost) => 
          p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.slug
        );

        if (!currentPost) {
          throw new Error('Post not found');
        }

        setPost(currentPost);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params?.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-red-500 text-xl">Error: {error || 'Post not found'}</div>
        <button
          onClick={() => router.push('/blog')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen pt-16">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString()}
            </time>
            {post.category && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {post.category}
              </span>
            )}
          </div>
          
          {post.summary && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p className="text-gray-700">{post.summary}</p>
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {post.content}
          </div>

          <div className="mt-12 pt-8 border-t">
            <button
              onClick={() => router.push('/blog')}
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              Back to Blog
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
} 
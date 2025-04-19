-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster status filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);

-- Create index for sorting by creation date
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Add some initial posts
INSERT INTO blog_posts (title, excerpt, content, status, created_at, updated_at)
VALUES 
  (
    'Getting Started with Next.js',
    'Learn the basics of Next.js and build your first application.',
    'Next.js is a powerful React framework that makes it easy to build fast, SEO-friendly web applications. This guide will walk you through the basics of setting up a Next.js project and creating your first pages.',
    'published',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Understanding TypeScript',
    'A comprehensive guide to TypeScript and its features.',
    'TypeScript adds static typing to JavaScript, making it easier to write and maintain large applications. Learn about interfaces, types, generics, and more in this comprehensive guide.',
    'draft',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ); 
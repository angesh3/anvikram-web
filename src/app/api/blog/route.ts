import { NextResponse } from 'next/server';
import { generateSlug } from '@/utils/slug';
import { BlogPost, BlogPostInput } from '@/types/blog';
import { validateSession } from '@/lib/auth.server';
import { cookies } from 'next/headers';

// In-memory storage for blog posts (replace with database in production)
let blogPosts = [
  {
    id: '1',
    title: 'Getting Started with Cloud Architecture',
    excerpt: 'Learn the fundamentals of cloud architecture and best practices.',
    content: 'Full content here...',
    publishDate: '2024-03-15',
    status: 'published'
  },
  {
    id: '2',
    title: 'Security Best Practices in Modern Applications',
    excerpt: 'Essential security practices for modern web applications.',
    content: 'Full content here...',
    publishDate: '2024-03-14',
    status: 'published'
  }
];

export async function GET() {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isValid = await validateSession(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    return NextResponse.json({ posts: blogPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isValid = await validateSession(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const data = await request.json();
    const newPost = {
      id: Date.now().toString(),
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      publishDate: new Date().toISOString().split('T')[0],
      status: 'draft'
    };

    blogPosts.push(newPost);
    return NextResponse.json({ post: newPost });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
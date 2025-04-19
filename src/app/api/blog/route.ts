import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession } from '@/lib/auth.server';

// Mock data for demonstration
let blogPosts = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    excerpt: 'Learn the basics of Next.js and build your first application.',
    content: 'Next.js is a powerful React framework...',
    status: 'published',
    publishDate: '2024-03-15'
  },
  {
    id: '2',
    title: 'Understanding TypeScript',
    excerpt: 'A comprehensive guide to TypeScript and its features.',
    content: 'TypeScript adds static typing to JavaScript...',
    status: 'draft',
    publishDate: '2024-03-14'
  },
];

export async function GET() {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await validateSession(token);
    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    return NextResponse.json({ posts: blogPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
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

    const session = await validateSession(token);
    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const { title, excerpt, content, status } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const newPost = {
      id: String(blogPosts.length + 1),
      title,
      excerpt: excerpt || title,
      content,
      status: status || 'draft',
      publishDate: new Date().toISOString().split('T')[0]
    };

    blogPosts.push(newPost);

    return NextResponse.json({ post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
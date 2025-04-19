import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth.server';
import { cookies } from 'next/headers';

// Reference to the blog posts array (in a real app, this would be a database)
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isValid = await validateSession(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const post = blogPosts.find(p => p.id === params.id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const postIndex = blogPosts.findIndex(p => p.id === params.id);
    
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Update the post
    blogPosts[postIndex] = {
      ...blogPosts[postIndex],
      ...data,
      id: params.id // Ensure ID doesn't change
    };

    return NextResponse.json({ post: blogPosts[postIndex] });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isValid = await validateSession(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const postIndex = blogPosts.findIndex(p => p.id === params.id);
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Remove the post
    blogPosts = blogPosts.filter(p => p.id !== params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
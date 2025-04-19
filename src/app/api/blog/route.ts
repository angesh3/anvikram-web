import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession } from '@/lib/auth.server';
import { supabase } from '@/lib/supabase';
import { createGuestToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Check if this is an admin request
    const token = cookies().get('session')?.value;
    const guestToken = cookies().get('guest-token')?.value;
    
    // If no tokens exist, create a guest token
    if (!token && !guestToken) {
      await createGuestToken();
    }

    // Check if user is admin
    const isAdmin = token ? await validateSession(token) : false;

    // Query posts based on user role
    const query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    // If not admin, only show published posts
    if (!isAdmin) {
      query.eq('status', 'published');
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await validateSession(token);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert({
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
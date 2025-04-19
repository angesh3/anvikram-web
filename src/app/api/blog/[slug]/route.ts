import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession } from '@/lib/auth.server';
import { supabase } from '@/lib/supabase';
import { BlogPostUpdate } from '@/types/blog';

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await validateSession(token);
    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .ilike('title', params.slug.split('-').join(' '))
      .single();

    if (error || !post) {
      console.error('Error fetching post:', error);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await validateSession(token);
    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const body: BlogPostUpdate = await request.json();
    const { data: post, error: findError } = await supabase
      .from('blog_posts')
      .select('*')
      .ilike('title', params.slug.split('-').join(' '))
      .single();

    if (findError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const { data: updatedPost, error: updateError } = await supabase
      .from('blog_posts')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('id', post.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating post:', updateError);
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await validateSession(token);
    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const { data: post, error: findError } = await supabase
      .from('blog_posts')
      .select('*')
      .ilike('title', params.slug.split('-').join(' '))
      .single();

    if (findError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', post.id);

    if (deleteError) {
      console.error('Error deleting post:', deleteError);
      return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
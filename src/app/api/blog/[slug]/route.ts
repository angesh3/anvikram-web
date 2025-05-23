import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession } from '@/lib/auth.server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { BlogPostUpdate } from '@/types/blog';

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const token = cookies().get('session_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await validateSession(token);
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { data: post, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', params.slug)
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
    const token = cookies().get('session_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await validateSession(token);
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body: BlogPostUpdate = await request.json();
    const { data: post, error: findError } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', params.slug)
      .single();

    if (findError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const { data: updatedPost, error: updateError } = await supabaseAdmin
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
    const token = cookies().get('session_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await validateSession(token);
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { data: post, error: findError } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', params.slug)
      .single();

    if (findError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const { error: deleteError } = await supabaseAdmin
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
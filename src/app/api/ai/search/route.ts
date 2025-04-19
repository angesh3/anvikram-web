import { NextResponse } from 'next/server';
import { smartSearch } from '@/lib/ai';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // Fetch content from different tables
    const { data: posts } = await supabase.from('blog_posts').select('*');
    const { data: questions } = await supabase.from('questions').select('*');
    const content = [...(posts || []), ...(questions || [])];

    const results = await smartSearch(query, content);
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to perform search' }, { status: 500 });
  }
} 
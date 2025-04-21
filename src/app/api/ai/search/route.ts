import { NextRequest, NextResponse } from 'next/server';
import { smartSearch } from '@/lib/ai';
import { supabase } from '@/lib/supabase';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ENABLE_AI_FEATURES = process.env.NEXT_PUBLIC_ENABLE_AI_FEATURES !== 'false';

export async function GET(request: NextRequest) {
  if (!ENABLE_AI_FEATURES) {
    return NextResponse.json(
      { error: 'AI features are disabled in this environment' },
      { status: 404 }
    );
  }

  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured' },
      { status: 500 }
    );
  }

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
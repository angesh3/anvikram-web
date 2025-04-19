import { NextResponse } from 'next/server';
import { testConnections } from '@/lib/test-env';

export async function GET() {
  try {
    // Log environment variables (without sensitive values)
    console.log('Environment check:', {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    });

    await testConnections();
    return NextResponse.json({ message: 'Connections tested successfully' });
  } catch (error: any) {
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return NextResponse.json({ 
      message: 'Error testing connections', 
      error: {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }
    }, { status: 500 });
  }
} 
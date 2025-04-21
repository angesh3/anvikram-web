import { NextResponse } from 'next/server';
import { generateBlogSummary } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    const summary = await generateBlogSummary(content);
    return NextResponse.json({ summary });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
} 
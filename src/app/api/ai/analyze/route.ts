import { NextResponse } from 'next/server';
import { analyzeUserBehavior } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const { questions } = await request.json();
    const analysis = await analyzeUserBehavior(questions);
    return NextResponse.json({ analysis });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze user behavior' }, { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import { clearServerSession } from '@/lib/auth.server';

// Mark this route as dynamic to handle cookies
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // Clear all session cookies using the server-side function
    clearServerSession();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
} 
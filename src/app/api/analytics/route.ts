import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData, generateMockData } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  try {
    // Generate mock data if the ?mock=true query parameter is provided
    const searchParams = request.nextUrl.searchParams;
    const mockParam = searchParams.get('mock');
    const count = searchParams.get('count');
    
    if (mockParam === 'true') {
      const mockCount = count ? parseInt(count) : 50;
      generateMockData(mockCount);
      return NextResponse.json({ success: true, message: `Generated ${mockCount} mock visits` });
    }
    
    // Get analytics data
    const data = await getAnalyticsData();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
} 
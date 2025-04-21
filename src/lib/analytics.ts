import { v4 as uuidv4 } from 'uuid';
import { Visitor, VisitorStats } from '@/types/analytics';

// In-memory storage for development
// In production, these would be stored in a database like Supabase
let visitors: Visitor[] = [];

/**
 * Determines device type from user agent string
 */
export function getDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' {
  if (/android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent)) {
    return 'mobile';
  } else if (/ipad|tablet|playbook|silk|android(?!.*mobile)/i.test(userAgent)) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

/**
 * Gets browser information from user agent
 */
export function getBrowser(userAgent: string): string {
  if (/chrome/i.test(userAgent)) return 'Chrome';
  if (/firefox/i.test(userAgent)) return 'Firefox';
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return 'Safari';
  if (/edge/i.test(userAgent)) return 'Edge';
  if (/opera/i.test(userAgent)) return 'Opera';
  if (/msie|trident/i.test(userAgent)) return 'Internet Explorer';
  return 'Unknown';
}

/**
 * Tracks a visitor with their IP, user agent, and current page
 */
export async function trackVisitor(
  ip: string,
  userAgent: string,
  path: string,
  referrer?: string | null
): Promise<void> {
  try {
    const device = getDeviceType(userAgent);
    const browser = getBrowser(userAgent);
    
    // Here we would typically make an API call to get location data from IP
    // For demo, we're using mock data
    const country = await getMockCountryFromIP(ip);
    
    const visitor: Visitor = {
      id: uuidv4(),
      ip_address: ip,
      user_agent: userAgent,
      device_type: device,
      browser,
      country,
      city: '',
      region: '',
      timestamp: new Date().toISOString(),
      url_path: path,
      referrer: referrer || 'direct'
    };
    
    // In a real implementation, we would save to Supabase or another database
    // For demo purposes, we'll just add to our in-memory array
    visitors.push(visitor);
    
    console.log('Tracked visitor:', visitor);
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
}

/**
 * Mock function to simulate getting country data from IP
 * In production, you would use a real geolocation API
 */
async function getMockCountryFromIP(ip: string): Promise<string> {
  // Mock implementation - would be replaced with actual API call
  const countries = [
    'United States', 'India', 'Brazil', 'United Kingdom', 
    'Canada', 'Germany', 'France', 'Japan', 'Australia', 
    'Mexico', 'Spain', 'Italy'
  ];
  
  // Generate a consistent country based on the IP address to make it look realistic
  const ipSum = ip.split('.').map(Number).reduce((a, b) => a + b, 0);
  return countries[ipSum % countries.length];
}

/**
 * Gets analytics data for the admin dashboard
 */
export async function getAnalyticsData(): Promise<VisitorStats> {
  // In a real implementation, this would query your database
  
  // Count total visits (each visitor entry is one visit)
  const totalVisits = visitors.length;
  
  // Count unique visitors by IP
  const uniqueIPs = new Set(visitors.map(v => v.ip_address));
  const uniqueVisitors = uniqueIPs.size;
  
  // Page views by path
  const pageViews = visitors.reduce((acc, visitor) => {
    if (!acc[visitor.url_path]) {
      acc[visitor.url_path] = 0;
    }
    acc[visitor.url_path]++;
    return acc;
  }, {} as Record<string, number>);
  
  // Device breakdown
  const deviceCounts = visitors.reduce((acc, visitor) => {
    if (!acc[visitor.device_type]) {
      acc[visitor.device_type] = 0;
    }
    acc[visitor.device_type]++;
    return acc;
  }, {
    mobile: 0,
    desktop: 0,
    tablet: 0,
    unknown: 0
  });
  
  // Top pages
  const topPages = Object.entries(pageViews)
    .map(([path, views]) => ({path, views}))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
  
  // Get country data
  const countryCount = visitors.reduce((acc, visitor) => {
    if (visitor.country) {
      if (!acc[visitor.country]) {
        acc[visitor.country] = 0;
      }
      acc[visitor.country]++;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const locations = Object.entries(countryCount)
    .map(([country, count]) => ({country, count}))
    .sort((a, b) => b.count - a.count);
  
  // Get most recent visitors
  const recentVisitors = [...visitors]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);
  
  return {
    total_visits: totalVisits,
    unique_visitors: uniqueVisitors,
    page_views: totalVisits, // In this simplified version, each visit is one page view
    device_breakdown: deviceCounts,
    top_pages: topPages,
    recent_visitors: recentVisitors,
    locations
  };
}

/**
 * Add some mock data for testing
 */
export function generateMockData(count: number = 50): void {
  const paths = ['/', '/about', '/portfolio', '/blog', '/contact', '/query-realm'];
  const ips = [
    '192.168.1.1', '8.8.8.8', '1.1.1.1', '76.76.21.21',
    '157.240.22.35', '31.13.65.36', '172.217.14.206', '151.101.65.121'
  ];
  const userAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36'
  ];
  
  const referrers = [
    'https://google.com', 
    'https://twitter.com', 
    'https://linkedin.com', 
    'https://facebook.com', 
    null
  ];
  
  for (let i = 0; i < count; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - randomDaysAgo);
    
    trackVisitor(
      ips[Math.floor(Math.random() * ips.length)],
      userAgents[Math.floor(Math.random() * userAgents.length)],
      paths[Math.floor(Math.random() * paths.length)],
      referrers[Math.floor(Math.random() * referrers.length)]
    );
  }
} 
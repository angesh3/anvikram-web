import { v4 as uuidv4 } from 'uuid';
import { Visitor, VisitorStats } from '@/types/analytics';

// In-memory storage for development
// In production, these would be stored in a database like Supabase
let visitors: Visitor[] = [];

// Track API calls to avoid rate limiting
let apiCallsCount = 0;
const API_CALL_LIMIT = 50; // Limit API calls per session to avoid hitting daily limits

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
    
    // Get real country data from IP address
    const geoData = await getCountryFromIP(ip);
    
    const visitor: Visitor = {
      id: uuidv4(),
      ip_address: ip,
      user_agent: userAgent,
      device_type: device,
      browser,
      country: geoData.country || 'Unknown',
      city: geoData.city || '',
      region: geoData.region || '',
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
 * Get country data from IP using a real geolocation API
 */
async function getCountryFromIP(ip: string): Promise<{
  country?: string;
  city?: string;
  region?: string;
}> {
  try {
    // Skip API call for localhost or private IPs
    if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return { country: 'Local Network', city: 'Local', region: 'Local' };
    }
    
    // Check if we've exceeded API call limit
    if (apiCallsCount >= API_CALL_LIMIT) {
      console.log('API call limit reached, using fallback data');
      return useFallbackCountry(ip);
    }
    
    // Increment API call counter
    apiCallsCount++;
    
    // Use ip-api.com (https version requires Pro, so fallback to http but catch errors)
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(
        `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error('IP Geolocation API error:', response.statusText);
        return useFallbackCountry(ip);
      }
      
      const data = await response.json();
      
      // Check if API returned an error
      if (data.status === 'fail') {
        console.error('IP Geolocation API error:', data.message);
        return useFallbackCountry(ip);
      }
      
      return {
        country: data.country,
        city: data.city,
        region: data.regionName
      };
    } catch (fetchError) {
      // If there's a network error with http, try an alternative API
      console.error('Error with ip-api.com, trying alternative API:', fetchError);
      return getCountryFromAlternativeAPI(ip);
    }
  } catch (error) {
    console.error('Error getting country from IP:', error);
    return useFallbackCountry(ip);
  }
}

/**
 * Alternative API as backup
 */
async function getCountryFromAlternativeAPI(ip: string): Promise<{
  country?: string;
  city?: string;
  region?: string;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(`https://ipwho.is/${ip}`, { 
      signal: controller.signal 
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return useFallbackCountry(ip);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      return useFallbackCountry(ip);
    }
    
    return {
      country: data.country,
      city: data.city,
      region: data.region
    };
  } catch (error) {
    console.error('Error with alternative IP API:', error);
    return useFallbackCountry(ip);
  }
}

/**
 * Fallback to mock data if API fails
 */
function useFallbackCountry(ip: string): { country: string; city: string; region: string } {
  // Mock implementation as fallback
  const countries = [
    'United States', 'India', 'Brazil', 'United Kingdom', 
    'Canada', 'Germany', 'France', 'Japan', 'Australia', 
    'Mexico', 'Spain', 'Italy'
  ];
  
  // Generate a consistent country based on the IP address
  const ipSum = ip.split('.').map(Number).reduce((a, b) => a + b, 0);
  const country = countries[ipSum % countries.length];
  
  return { 
    country,
    city: 'Unknown City',
    region: 'Unknown Region'
  };
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
  
  // Get country and region data
  const locationCount: Record<string, { count: number; regions: Record<string, number> }> = {};
  
  visitors.forEach(visitor => {
    if (visitor.country) {
      if (!locationCount[visitor.country]) {
        locationCount[visitor.country] = { count: 0, regions: {} };
      }
      locationCount[visitor.country].count++;
      
      // Track regions within each country
      const region = visitor.region || 'Unknown';
      if (!locationCount[visitor.country].regions[region]) {
        locationCount[visitor.country].regions[region] = 0;
      }
      locationCount[visitor.country].regions[region]++;
    }
  });
  
  // Convert to array format with regions included
  const locations = Object.entries(locationCount)
    .flatMap(([country, data]) => {
      // Get the most common region for this country
      const topRegion = Object.entries(data.regions)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      return {
        country,
        region: topRegion,
        count: data.count
      };
    })
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
  // Clear existing data first
  visitors = [];
  
  const paths = ['/', '/about', '/portfolio', '/blog', '/contact', '/query-realm'];
  // Real public DNS server IPs and other public IPs (not private/local IPs)
  const ips = [
    '8.8.8.8', '1.1.1.1', '9.9.9.9', '208.67.222.222',
    '76.76.21.21', '64.6.64.6', '84.200.69.80', '77.88.8.8'
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
  
  // Reset API call counter
  apiCallsCount = 0;
  
  // Generate mock data using Promise.all to handle multiple async calls
  const promises = [];
  
  for (let i = 0; i < count; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - randomDaysAgo);
    
    const promise = trackVisitor(
      ips[Math.floor(Math.random() * ips.length)],
      userAgents[Math.floor(Math.random() * userAgents.length)],
      paths[Math.floor(Math.random() * paths.length)],
      referrers[Math.floor(Math.random() * referrers.length)]
    );
    
    promises.push(promise);
  }
  
  // Wait for all tracking calls to complete
  Promise.all(promises).catch(err => {
    console.error('Error generating mock data:', err);
  });
} 
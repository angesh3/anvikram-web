export interface Visitor {
  id: string;
  ip_address: string;
  user_agent: string;
  device_type: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  browser: string;
  country?: string;
  city?: string;
  region?: string;
  timestamp: string;
  url_path: string;
  referrer?: string;
}

export interface VisitorStats {
  total_visits: number;
  unique_visitors: number;
  page_views: number;
  device_breakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
    unknown: number;
  };
  top_pages: {
    path: string;
    views: number;
  }[];
  recent_visitors: Visitor[];
  locations: {
    country: string;
    region: string;
    count: number;
  }[];
}

export interface TopLocation {
  country: string;
  region: string;
  count: number;
  percentage: number;
}

export interface DeviceBreakdown {
  type: string;
  count: number;
  percentage: number;
}

export interface PageViewTrend {
  date: string;
  views: number;
} 
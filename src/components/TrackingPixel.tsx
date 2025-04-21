'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TrackingPixel() {
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Only track if not already loaded (to prevent duplicate tracking on the same page)
    if (!loaded) {
      const img = new Image();
      img.src = `/api/track?path=${encodeURIComponent(pathname || '/')}`;
      img.onload = () => setLoaded(true);
      img.onerror = (e) => console.error('Error loading tracking pixel:', e);
    }
  }, [pathname, loaded]);
  
  return null; // This component doesn't render anything
} 
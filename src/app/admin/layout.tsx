'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { clearClientSession } from '@/lib/auth.client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/validate');
        if (!response.ok) {
          throw new Error('Not authenticated');
        }
        const data = await response.json();
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        if (pathname !== '/admin/login') {
          router.replace('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      console.log('Initiating logout...');
      const response = await fetch('/api/auth/logout', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Include credentials (cookies) in the request
      });
      
      console.log('Logout response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Logout failed with status: ${response.status}`);
      }
      
      // Clear client-side cookies
      clearClientSession();
      console.log('Client-side session cleared');
      
      // Force a page reload to ensure all state is cleared
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // If we're on the login page, just render the login form
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gray-100">{children}</div>;
  }

  // For other admin pages, show the layout with sidebar
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar onLogout={handleLogout} />
      <main className="flex-1 ml-64 p-6" style={{ paddingTop: '80px' }}>{children}</main>
    </div>
  );
} 
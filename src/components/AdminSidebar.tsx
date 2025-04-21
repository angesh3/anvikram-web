'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconDashboard, IconArticle, IconUsers, IconSettings, IconLogout } from '@tabler/icons-react';

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: IconDashboard },
    { href: '/admin/posts', label: 'Blog Posts', icon: IconArticle },
    { href: '/admin/users', label: 'Users', icon: IconUsers },
    { href: '/admin/settings', label: 'Settings', icon: IconSettings },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 w-64 p-6">
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <IconLogout size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
} 
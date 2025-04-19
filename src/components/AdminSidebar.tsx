'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconDashboard, IconArticle, IconLogout } from '@tabler/icons-react';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const links: SidebarLink[] = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: <IconDashboard size={20} />,
  },
  {
    href: '/admin/blog',
    label: 'Blog Management',
    icon: <IconArticle size={20} />,
  },
];

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <div className="flex flex-col h-full">
        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors relative ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active"
                      className="absolute inset-0 bg-blue-600 rounded-lg"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center">
                    {link.icon}
                    <span className="ml-3">{link.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto">
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 px-4 py-2 w-full text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <IconLogout size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
} 
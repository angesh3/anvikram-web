import { IconDashboard, IconArticle, IconUsers, IconSettings, IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: IconDashboard },
  { href: '/admin/posts', label: 'Posts', icon: IconArticle },
  { href: '/admin/users', label: 'Users', icon: IconUsers },
  { href: '/admin/settings', label: 'Settings', icon: IconSettings },
];

const sidebarVariants = {
  hidden: { x: -300 },
  visible: { 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1
    }
  }
};

const linkVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-6"
    >
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              
              return (
                <motion.li key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className={`flex items-center p-3 rounded-lg transition-colors duration-200 hover:bg-gray-800 ${
                      isActive ? 'bg-blue-600' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <button
          className="flex items-center p-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors duration-200 mt-auto"
          onClick={() => {/* Add logout logic */}}
        >
          <IconLogout className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
} 
'use client';

import Link from 'next/link';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconBrandInstagram } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Query Realm', href: '/query-realm' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { name: 'Twitter', href: '#', icon: IconBrandTwitter },
  { name: 'LinkedIn', href: '#', icon: IconBrandLinkedin },
  { name: 'GitHub', href: '#', icon: IconBrandGithub },
  { name: 'Instagram', href: '#', icon: IconBrandInstagram },
];

export default function Header() {
  const pathname = usePathname?.() || '/';
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-[100] shadow-md">
      <nav className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/images/logo.svg" alt="Angesh Vikram Logo" className="w-full h-full" />
            </div>
            <div>
              <div className="text-lg font-semibold">ANGESH</div>
              <div className="text-sm text-gray-400">VIKRAM</div>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${pathname === item.href
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Admin Login Button */}
            <Link
              href="/admin/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 
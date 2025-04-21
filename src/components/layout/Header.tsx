'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconBrandInstagram, IconMenu2, IconX } from '@tabler/icons-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-[100] shadow-md">
      <nav className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <img src="/images/logo.svg" alt="Angesh Vikram Logo" className="w-full h-full" />
            </div>
            <div>
              <div className="text-base md:text-lg font-semibold">ANGESH</div>
              <div className="text-xs md:text-sm text-gray-400">VIKRAM</div>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
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

          {/* Right section - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Social Links */}
            <div className="hidden lg:flex items-center space-x-3">
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <IconX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <IconMenu2 className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === item.href
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Social links for mobile */}
          <div className="flex space-x-4 px-3 py-3">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          {/* Admin Login Button for mobile */}
          <Link
            href="/admin/login"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
} 
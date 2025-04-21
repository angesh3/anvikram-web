'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-6 md:py-8 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 sm:mb-0">© 2024 Angesh Vikram</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/about" className="text-gray-500 hover:text-gray-900">about</Link>
            <Link href="/learn" className="text-gray-500 hover:text-gray-900">learn</Link>
            <Link href="/portfolio" className="text-gray-500 hover:text-gray-900">portfolio</Link>
            <Link href="/blog" className="text-gray-500 hover:text-gray-900">blog</Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-900">contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 
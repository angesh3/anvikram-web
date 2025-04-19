import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Angesh Vikram',
  description: 'Engineering Manager • Cloud & Security Expert • AI Explorer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <a href="/" className="text-xl font-bold text-gray-800">
                    Angesh Vikram
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/" className="text-gray-500 hover:text-gray-900 px-3 py-2">Home</a>
                  <a href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2">About</a>
                  <a href="/portfolio" className="text-gray-500 hover:text-gray-900 px-3 py-2">Portfolio</a>
                  <a href="/blog" className="text-gray-500 hover:text-gray-900 px-3 py-2">Blog</a>
                  <a href="/social-hub" className="text-gray-500 hover:text-gray-900 px-3 py-2">Social Hub</a>
                  <a href="/contact" className="text-gray-500 hover:text-gray-900 px-3 py-2">Contact</a>
                </div>
              </div>
            </div>
          </nav>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <nav className="flex flex-wrap justify-center space-x-6">
                <a href="/" className="text-gray-500 hover:text-gray-900">Home</a>
                <a href="/blog" className="text-gray-500 hover:text-gray-900">Blog</a>
                <a href="/social-hub" className="text-gray-500 hover:text-gray-900">Hub</a>
                <a href="/contact" className="text-gray-500 hover:text-gray-900">Contact</a>
              </nav>
              <div className="mt-8 flex justify-center space-x-6">
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  Twitter
                </a>
              </div>
              <p className="mt-8 text-center text-gray-400">
                © {new Date().getFullYear()} Angesh Vikram. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 
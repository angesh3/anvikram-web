import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
              <a href="/" className="mr-6 flex items-center space-x-2">
                <span className="text-xl font-bold text-primary">Angesh Vikram</span>
              </a>
              <div className="flex flex-1 items-center justify-end space-x-4">
                <nav className="flex items-center space-x-6">
                  <a href="/" className="text-sm font-medium transition-colors hover:text-primary">Home</a>
                  <a href="/about" className="text-sm font-medium transition-colors hover:text-primary">About</a>
                  <a href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">Portfolio</a>
                  <a href="/blog" className="text-sm font-medium transition-colors hover:text-primary">Blog</a>
                  <a href="/social-hub" className="text-sm font-medium transition-colors hover:text-primary">Social Hub</a>
                  <a href="/contact" className="text-sm font-medium transition-colors hover:text-primary">Contact</a>
                </nav>
              </div>
            </div>
          </nav>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-muted">
            <div className="container py-8 md:py-12">
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                <div className="space-y-3">
                  <h4 className="text-base font-medium">Navigation</h4>
                  <nav className="flex flex-col space-y-2">
                    <a href="/" className="text-sm text-muted-foreground hover:text-primary">Home</a>
                    <a href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</a>
                    <a href="/social-hub" className="text-sm text-muted-foreground hover:text-primary">Hub</a>
                    <a href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</a>
                  </nav>
                </div>
                <div className="space-y-3">
                  <h4 className="text-base font-medium">Social</h4>
                  <nav className="flex flex-col space-y-2">
                    <a href="https://linkedin.com/in/angeshvikram" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-muted-foreground hover:text-primary">LinkedIn</a>
                    <a href="https://github.com/angesh3" target="_blank" rel="noopener noreferrer"
                       className="text-sm text-muted-foreground hover:text-primary">GitHub</a>
                    <a href="https://twitter.com/angeshvikram" target="_blank" rel="noopener noreferrer"
                       className="text-sm text-muted-foreground hover:text-primary">Twitter</a>
                  </nav>
                </div>
                <div className="space-y-3">
                  <h4 className="text-base font-medium">Location</h4>
                  <p className="text-sm text-muted-foreground">San Francisco Bay Area, California</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-base font-medium">Contact</h4>
                  <p className="text-sm text-muted-foreground">Open to consulting opportunities and technical advisory roles</p>
                </div>
              </div>
              <div className="mt-8 border-t pt-8">
                <p className="text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Angesh Vikram. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 
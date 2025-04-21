import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Angesh Vikram - Engineering Leader & Cloud Architect',
  description: 'Engineering leader with expertise in cloud architecture, security engineering, and AI integration.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 mt-16 md:mt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 
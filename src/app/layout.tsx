import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileNav } from '@/components/layout/mobile-nav'
import { BackToTop } from '@/components/ui/back-to-top'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://wirstore.com'),
  title: {
    default: 'Wir Store - Premium Online Shopping',
    template: '%s | Wir Store',
  },
  description: 'Discover premium products at Wir Store. Shop curated electronics, clothing, accessories, home & living, and more with free shipping on orders over $100. Quality meets design.',
  keywords: ['online shopping', 'premium products', 'electronics', 'clothing', 'accessories', 'wir store', 'e-commerce'],
  authors: [{ name: 'Wir Store' }],
  creator: 'Wir Store',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wirstore.com',
    siteName: 'Wir Store',
    title: 'Wir Store - Premium Online Shopping',
    description: 'Discover premium products curated for the modern lifestyle. Quality meets design in every item we offer.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Wir Store - Premium Online Shopping',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wir Store - Premium Online Shopping',
    description: 'Discover premium products curated for the modern lifestyle. Quality meets design in every item we offer.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-20 lg:pb-0">{children}</main>
            <Footer />
            <MobileNav />
            <BackToTop />
          </div>
        </Providers>
      </body>
    </html>
  )
}

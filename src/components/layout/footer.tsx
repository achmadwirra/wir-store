import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gray-950 pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 font-bold text-gray-950">
                W
              </div>
              <span className="text-lg font-bold tracking-tight">
                Wir<span className="text-amber-400">Store</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Premium products curated for the modern lifestyle. Quality meets design in every item we offer.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} className="text-amber-500" />
                support@wirstore.com
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={14} className="text-amber-500" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={14} className="text-amber-500" />
                New York, NY 10001
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/products?category=electronics', label: 'Electronics' },
                { href: '/products?category=clothing', label: 'Clothing' },
                { href: '/products?category=accessories', label: 'Accessories' },
                { href: '/products?featured=true', label: 'Featured' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Customer Service
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '#', label: 'Contact Us' },
                { href: '#', label: 'Shipping Policy' },
                { href: '#', label: 'Returns & Exchanges' },
                { href: '#', label: 'FAQ' },
                { href: '#', label: 'Size Guide' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe to get special offers, free giveaways, and new arrivals.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-500/50"
              />
              <button
                type="submit"
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-gray-950 transition-colors hover:bg-amber-400"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            © 2026 WirStore. All rights reserved. Built with ❤️ by Wir.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-gray-500 transition-colors hover:text-gray-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

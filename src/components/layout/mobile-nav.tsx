'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, ShoppingBag, User, Grid3X3 } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/products', icon: Grid3X3, label: 'Shop' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/cart', icon: ShoppingBag, label: 'Cart' },
  { href: '/account', icon: User, label: 'Account' },
]

export function MobileNav() {
  const pathname = usePathname()
  const itemCount = useCartStore((s) => s.getItemCount())

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-gray-950/95 backdrop-blur-lg lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1"
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={isActive ? 'text-amber-400' : 'text-gray-500'}
                />
                {item.label === 'Cart' && itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-gray-950"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[10px] ${
                  isActive ? 'font-medium text-amber-400' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-0.5 h-0.5 w-8 rounded-full bg-amber-400"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

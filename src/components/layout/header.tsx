'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useCartStore } from '@/store/cart'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  LogOut,
  Settings,
  Package,
  Shield,
  ChevronDown,
} from 'lucide-react'

export function Header() {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const itemCount = useCartStore((s) => s.getItemCount())

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
      setIsSearchOpen(false)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-lg shadow-black/20'
          : 'bg-gray-950/95 backdrop-blur-sm'
      }`}
    >
      {/* Top bar */}
      <div className="border-b border-white/5 bg-amber-500/10">
        <div className="mx-auto max-w-7xl px-4 py-1.5">
          <p className="text-center text-xs text-amber-400/80">
            ✨ Free shipping on orders over $100 — Use code <span className="font-semibold">WIRSTORE</span> for 10% off
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 font-bold text-gray-950">
              W
            </div>
            <span className="text-lg font-bold tracking-tight">
              Wir<span className="text-amber-400">Store</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'Products' },
              { href: '/products?category=electronics', label: 'Electronics' },
              { href: '/products?category=clothing', label: 'Clothing' },
              { href: '/products?category=accessories', label: 'Accessories' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              href="/account?tab=wishlist"
              className="hidden rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white sm:block"
            >
              <Heart size={20} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-gray-950"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </motion.span>
              )}
            </Link>

            {/* User menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-xs font-medium text-amber-400">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                  <ChevronDown size={14} className="hidden sm:block" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-xl"
                    >
                      <div className="border-b border-white/5 px-4 py-3">
                        <p className="text-sm font-medium">{session.user?.name}</p>
                        <p className="text-xs text-gray-400">{session.user?.email}</p>
                      </div>
                      <div className="p-1">
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5"
                        >
                          <User size={16} /> My Account
                        </Link>
                        <Link
                          href="/account?tab=orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5"
                        >
                          <Package size={16} /> Orders
                        </Link>
                        <Link
                          href="/account?tab=settings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5"
                        >
                          <Settings size={16} /> Settings
                        </Link>
                        {session.user?.role === 'ADMIN' && (
                          <Link
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-amber-400 hover:bg-white/5"
                          >
                            <Shield size={16} /> Admin Dashboard
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-white/5 p-1">
                        <button
                          onClick={() => signOut()}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-white/5"
                        >
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-gray-950 transition-colors hover:bg-amber-400"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5"
          >
            <div className="mx-auto max-w-2xl px-4 py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 lg:hidden"
          >
            <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'All Products' },
                { href: '/products?category=electronics', label: 'Electronics' },
                { href: '/products?category=clothing', label: 'Clothing' },
                { href: '/products?category=accessories', label: 'Accessories' },
                { href: '/products?category=home-living', label: 'Home & Living' },
                { href: '/products?category=sports', label: 'Sports' },
                { href: '/products?category=books', label: 'Books' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

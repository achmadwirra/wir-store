'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export function NewsletterSection() {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-gray-900 to-gray-950 p-8 sm:p-12 lg:p-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-amber-500/10 p-3">
            <Mail size={24} className="text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">Stay in the Loop</h2>
          <p className="mt-3 text-gray-400">
            Subscribe to our newsletter for exclusive deals, new arrivals, and insider-only discounts.
          </p>

          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
            />
            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

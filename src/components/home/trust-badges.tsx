'use client'

import { motion } from 'framer-motion'
import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react'

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '256-bit SSL encryption',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer service',
  },
]

export function TrustBadges() {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex items-center gap-4 rounded-2xl border border-white/5 bg-gray-900/30 p-4 sm:p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
              <badge.icon size={22} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{badge.title}</h3>
              <p className="mt-0.5 text-xs text-gray-400">{badge.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

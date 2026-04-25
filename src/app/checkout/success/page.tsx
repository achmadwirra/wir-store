'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10"
      >
        <CheckCircle size={48} className="text-green-400" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="mt-3 text-gray-400">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="mt-8 rounded-2xl border border-white/5 bg-gray-900/30 p-6">
          <div className="flex items-center justify-center gap-3 text-amber-400">
            <Package size={20} />
            <span className="font-medium">Order #WIR-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            You&apos;ll receive a confirmation email with tracking details shortly.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/account?tab=orders"
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-gray-950 hover:bg-amber-400"
          >
            View Orders <ArrowRight size={16} />
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm text-gray-300 hover:bg-white/5"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

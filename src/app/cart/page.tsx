'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getShipping, getTax, getTotal } =
    useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-900/50"
          >
            <ShoppingBag size={40} className="text-gray-600" />
          </motion.div>
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-gray-400">Looks like you haven&apos;t added anything yet.</p>
          <Link
            href="/products"
            className="mt-6 flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-gray-950 hover:bg-amber-400"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-red-400"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="mb-4 flex gap-4 rounded-2xl border border-white/5 bg-gray-900/30 p-4 sm:p-6"
              >
                {/* Image */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-800/50 sm:h-32 sm:w-32">
                  {!imageErrors[item.id] && item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                      onError={() => setImageErrors((prev) => ({ ...prev, [item.id]: true }))}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-600">
                      <ShoppingBag size={24} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-400">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center rounded-lg border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1.5 text-gray-400 hover:text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1.5 text-gray-400 hover:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-white/5 bg-gray-900/30 p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span>
                  {getShipping() === 0 ? (
                    <span className="text-green-400">Free</span>
                  ) : (
                    formatPrice(getShipping())
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax (8%)</span>
                <span>{formatPrice(getTax())}</span>
              </div>

              {/* Promo code */}
              <div className="pt-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <button className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-400">{formatPrice(getTotal())}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>

            <Link
              href="/products"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5"
            >
              Continue Shopping
            </Link>

            {getSubtotal() < 100 && (
              <p className="mt-4 text-center text-xs text-gray-500">
                Add {formatPrice(100 - getSubtotal())} more for free shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

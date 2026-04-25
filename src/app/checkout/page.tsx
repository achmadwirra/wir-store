'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CreditCard, Lock, AlertTriangle, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, getShipping, getTax, getTotal, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    clearCart()
    toast.success('Order placed successfully!')
    router.push('/checkout/success')
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">No items in cart</h1>
        <p className="mt-2 text-gray-400">Add some products before checking out.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-gray-950"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <h1 className="mb-8 text-2xl font-bold sm:text-3xl">Checkout</h1>

      {/* Demo mode badge */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
        <AlertTriangle size={18} className="text-amber-400" />
        <span className="text-sm text-amber-400">
          <strong>Demo Mode</strong> — No real payment will be processed. Use any test data.
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Shipping & Payment */}
          <div className="space-y-8 lg:col-span-2">
            {/* Shipping */}
            <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
              <h2 className="mb-6 text-lg font-semibold">Shipping Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm text-gray-400">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm text-gray-400">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm text-gray-400">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                    placeholder="NY"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                    placeholder="10001"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="SG">Singapore</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
              <div className="mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-amber-400" />
                <h2 className="text-lg font-semibold">Payment Details</h2>
                <div className="ml-auto flex items-center gap-1 text-xs text-gray-500">
                  <Lock size={12} /> Secured by SSL
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm text-gray-400">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-white/5 bg-gray-900/30 p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

              <div className="max-h-60 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-800/50 text-xs text-gray-500">
                      {item.quantity}x
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.size && `${item.size} · `}{item.color}
                      </p>
                    </div>
                    <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-white/5 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span>{getShipping() === 0 ? <span className="text-green-400">Free</span> : formatPrice(getShipping())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span>{formatPrice(getTax())}</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-2 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-400">{formatPrice(getTotal())}</span>
                </div>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                disabled={isProcessing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-950 border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Place Order — {formatPrice(getTotal())}
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

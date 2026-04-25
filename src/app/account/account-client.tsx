'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Package,
  User,
  MapPin,
  Heart,
  Settings,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { ProductCard } from '@/components/ui/product-card'

interface Order {
  id: string
  status: string
  total: number
  createdAt: string
  items: {
    id: string
    quantity: number
    price: number
    size: string | null
    color: string | null
    product: { name: string; images: string[]; slug: string }
  }[]
}

interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

interface WishlistItem {
  id: string
  product: {
    id: string
    name: string
    slug: string
    price: number
    comparePrice: number | null
    images: string[]
    rating: number
    reviewCount: number
    stock: number
    colors: string[]
    category: { id: string; name: string; slug: string }
  }
}

interface Props {
  user: { id: string; name?: string | null; email?: string | null; role: string }
  orders: Order[]
  addresses: Address[]
  wishlist: WishlistItem[]
}

const tabs = [
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  PENDING: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  PROCESSING: { icon: AlertCircle, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  SHIPPED: { icon: Truck, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  DELIVERED: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
  CANCELLED: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
}

export function AccountClient({ user, orders, addresses, wishlist }: Props) {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'orders')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-2xl font-bold text-amber-400">
            {user.name?.[0] || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name || 'User'}</h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar lg:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'border border-white/10 text-gray-400'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'orders' && <OrdersTab orders={orders} />}
          {activeTab === 'wishlist' && <WishlistTab wishlist={wishlist} />}
          {activeTab === 'addresses' && <AddressesTab addresses={addresses} />}
          {activeTab === 'settings' && <SettingsTab user={user} />}
        </div>
      </div>
    </div>
  )
}

function OrdersTab({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="py-12 text-center">
        <Package size={48} className="mx-auto mb-4 text-gray-600" />
        <h3 className="text-lg font-semibold">No orders yet</h3>
        <p className="mt-1 text-gray-400">Start shopping to see your orders here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Order History</h2>
      {orders.map((order) => {
        const config = statusConfig[order.status] || statusConfig.PENDING
        const StatusIcon = config.icon

        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 bg-gray-900/30 p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400">Order #{order.id.slice(-8).toUpperCase()}</p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.color}`}>
                <StatusIcon size={14} />
                {order.status}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">{item.product.name}</span>
                    <span className="text-gray-500">×{item.quantity}</span>
                    {item.size && <span className="text-xs text-gray-500">({item.size})</span>}
                  </div>
                  <span className="text-gray-300">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t border-white/5 pt-4">
              <span className="text-sm text-gray-400">Total</span>
              <span className="font-semibold text-amber-400">{formatPrice(order.total)}</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function WishlistTab({ wishlist }: { wishlist: WishlistItem[] }) {
  if (wishlist.length === 0) {
    return (
      <div className="py-12 text-center">
        <Heart size={48} className="mx-auto mb-4 text-gray-600" />
        <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
        <p className="mt-1 text-gray-400">Save items you love for later.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Wishlist</h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {wishlist.map((item, index) => (
          <ProductCard key={item.id} product={item.product} index={index} />
        ))}
      </div>
    </div>
  )
}

function AddressesTab({ addresses }: { addresses: Address[] }) {
  if (addresses.length === 0) {
    return (
      <div className="py-12 text-center">
        <MapPin size={48} className="mx-auto mb-4 text-gray-600" />
        <h3 className="text-lg font-semibold">No saved addresses</h3>
        <p className="mt-1 text-gray-400">Add an address for faster checkout.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Saved Addresses</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`rounded-2xl border p-6 ${
              address.isDefault
                ? 'border-amber-500/30 bg-amber-500/5'
                : 'border-white/5 bg-gray-900/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{address.name}</h3>
              {address.isDefault && (
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400">
                  Default
                </span>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-400">
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsTab({ user }: { user: { name?: string | null; email?: string | null } }) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Profile Settings</h2>
      <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Name</label>
            <input
              type="text"
              defaultValue={user.name || ''}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Email</label>
            <input
              type="email"
              defaultValue={user.email || ''}
              disabled
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-500 outline-none"
            />
          </div>
          <button className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-gray-950 hover:bg-amber-400">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

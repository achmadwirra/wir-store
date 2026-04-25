'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  AlertCircle,
  BarChart3,
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  stock: number
  rating: number
  featured: boolean
  images: string[]
  category: { name: string }
}

interface Order {
  id: string
  status: string
  total: number
  createdAt: string
  user: { name: string | null; email: string }
  items: { quantity: number; price: number; product: { name: string } }[]
}

interface UserItem {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: string
  _count: { orders: number }
}

interface Stats {
  totalRevenue: number
  productCount: number
  orderCount: number
  userCount: number
}

interface Props {
  products: Product[]
  orders: Order[]
  users: UserItem[]
  stats: Stats
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  PENDING: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  PROCESSING: { icon: AlertCircle, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  SHIPPED: { icon: Truck, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  DELIVERED: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
  CANCELLED: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
}

const adminTabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: Users },
]

export function AdminClient({ products, orders, users, stats }: Props) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
          <BarChart3 size={20} className="text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-400">Manage your store</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2 overflow-x-auto no-scrollbar">
        {adminTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-amber-500/10 text-amber-400'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && <OverviewTab stats={stats} orders={orders} />}
      {activeTab === 'products' && <ProductsTab products={products} />}
      {activeTab === 'orders' && <OrdersTab orders={orders} />}
      {activeTab === 'customers' && <CustomersTab users={users} />}
    </div>
  )
}

function OverviewTab({ stats, orders }: { stats: Stats; orders: Order[] }) {
  const statCards = [
    { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Total Orders', value: stats.orderCount.toString(), icon: ShoppingCart, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Total Products', value: stats.productCount.toString(), icon: Package, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Total Customers', value: stats.userCount.toString(), icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-white/5 bg-gray-900/30 p-6"
          >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-amber-400" />
          <h3 className="font-semibold">Revenue Overview</h3>
        </div>
        <div className="flex h-48 items-end justify-between gap-2 px-4">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => {
            const height = 20 + Math.random() * 80
            return (
              <div key={month} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="w-full rounded-t-md bg-gradient-to-t from-amber-500/50 to-amber-400/80"
                />
                <span className="text-[10px] text-gray-500">{month}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
        <h3 className="mb-4 font-semibold">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-gray-400">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => {
                const config = statusConfig[order.status] || statusConfig.PENDING
                return (
                  <tr key={order.id} className="border-b border-white/5">
                    <td className="py-3 text-gray-300">#{order.id.slice(-8).toUpperCase()}</td>
                    <td className="py-3 text-gray-300">{order.user.name || order.user.email}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${config.bg} ${config.color}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium">{formatPrice(order.total)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ProductsTab({ products }: { products: Product[] }) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products ({products.length})</h2>
        <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-gray-950 hover:bg-amber-400">
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-gray-900/30">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left text-gray-400">
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Rating</th>
              <th className="p-4 font-medium">Featured</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-4">
                  <span className="font-medium text-gray-200">{product.name}</span>
                </td>
                <td className="p-4 text-gray-400">{product.category.name}</td>
                <td className="p-4 text-gray-300">{formatPrice(product.price)}</td>
                <td className="p-4">
                  <span className={product.stock < 10 ? 'text-red-400' : 'text-gray-300'}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4 text-gray-300">{product.rating.toFixed(1)}</td>
                <td className="p-4">
                  {product.featured ? (
                    <span className="text-amber-400">★</span>
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OrdersTab({ orders }: { orders: Order[] }) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Orders ({orders.length})</h2>

      <div className="space-y-4">
        {orders.map((order) => {
          const config = statusConfig[order.status] || statusConfig.PENDING
          const StatusIcon = config.icon

          return (
            <div key={order.id} className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium">#{order.id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-gray-400">
                    {order.user.name || order.user.email} · {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.color}`}>
                    <StatusIcon size={14} />
                    {order.status}
                  </div>
                  <span className="font-semibold text-amber-400">{formatPrice(order.total)}</span>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-400">
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.product.name} ×{item.quantity}
                    {i < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CustomersTab({ users }: { users: UserItem[] }) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Customers ({users.length})</h2>

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-gray-900/30">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left text-gray-400">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Orders</th>
              <th className="p-4 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-gray-200">{user.name || 'No name'}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    user.role === 'ADMIN'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-gray-300">{user._count.orders}</td>
                <td className="p-4 text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

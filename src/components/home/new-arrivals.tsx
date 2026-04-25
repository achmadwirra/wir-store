'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/ui/product-card'

interface Product {
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

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">New Arrivals</h2>
          <p className="mt-2 text-gray-400">The latest additions to our store</p>
        </div>
        <Link
          href="/products?sort=newest"
          className="hidden items-center gap-1 text-sm text-amber-400 transition-colors hover:text-amber-300 sm:flex"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}

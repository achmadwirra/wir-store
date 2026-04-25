'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
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

interface Props {
  initialQuery: string
  initialResults: Product[]
}

export function SearchClient({ initialQuery, initialResults }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Search</h1>

      <form onSubmit={handleSearch} className="mb-10">
        <div className="relative mx-auto max-w-2xl">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            autoFocus
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
          />
        </div>
      </form>

      {initialQuery && (
        <p className="mb-6 text-gray-400">
          {initialResults.length} result{initialResults.length !== 1 ? 's' : ''} for &ldquo;{initialQuery}&rdquo;
        </p>
      )}

      {initialResults.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {initialResults.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : initialQuery ? (
        <div className="py-20 text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h3 className="text-xl font-semibold">No results found</h3>
          <p className="mt-2 text-gray-400">Try different keywords or browse our categories.</p>
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="mb-4 text-6xl">🛍️</div>
          <h3 className="text-xl font-semibold">Start searching</h3>
          <p className="mt-2 text-gray-400">Type a keyword to find products.</p>
        </div>
      )}
    </div>
  )
}

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ui/product-card'
import { motion } from 'framer-motion'
import {
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
} from 'lucide-react'
import { useState } from 'react'

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

interface Category {
  id: string
  name: string
  slug: string
  _count: { products: number }
}

interface Filters {
  category: string
  search: string
  sort: string
  minPrice: string
  maxPrice: string
  rating: string
  featured: string
}

interface Props {
  products: Product[]
  categories: Category[]
  totalCount: number
  totalPages: number
  currentPage: number
  filters: Filters
}

export function ProductsClient({
  products,
  categories,
  totalCount,
  totalPages,
  currentPage,
  filters,
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/products')
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/products?${params.toString()}`)
  }

  const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || filters.rating || filters.featured

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {filters.category
            ? categories.find((c) => c.slug === filters.category)?.name || 'Products'
            : filters.featured
            ? 'Featured Products'
            : 'All Products'}
        </h1>
        <p className="mt-2 text-gray-400">
          {totalCount} product{totalCount !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <FilterSidebar
            categories={categories}
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
            hasActiveFilters={!!hasActiveFilters}
          />
        </aside>

        {/* Mobile filter button */}
        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            <SlidersHorizontal size={16} />
            Filters
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-gray-950">
                !
              </span>
            )}
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>

            <select
              value={filters.sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="rounded-xl border border-white/10 bg-gray-900 px-4 py-2 text-sm text-gray-300 outline-none focus:border-amber-500/50"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Products grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="text-xl font-semibold">No products found</h3>
              <p className="mt-2 text-gray-400">Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-amber-500 px-6 py-2 text-sm font-medium text-gray-950 hover:bg-amber-400"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="rounded-lg border border-white/10 p-2 text-gray-400 transition-colors hover:bg-white/5 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? 'bg-amber-500 text-gray-950'
                      : 'border border-white/10 text-gray-400 hover:bg-white/5'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="rounded-lg border border-white/10 p-2 text-gray-400 transition-colors hover:bg-white/5 disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter overlay */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setShowFilters(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="h-full w-80 overflow-y-auto bg-gray-950 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <FilterSidebar
              categories={categories}
              filters={filters}
              updateFilter={(key, value) => {
                updateFilter(key, value)
                setShowFilters(false)
              }}
              clearFilters={() => {
                clearFilters()
                setShowFilters(false)
              }}
              hasActiveFilters={!!hasActiveFilters}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

function FilterSidebar({
  categories,
  filters,
  updateFilter,
  clearFilters,
  hasActiveFilters,
}: {
  categories: Category[]
  filters: Filters
  updateFilter: (key: string, value: string) => void
  clearFilters: () => void
  hasActiveFilters: boolean
}) {
  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300"
        >
          <X size={14} /> Clear all filters
        </button>
      )}

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-300">
          Categories
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter('category', '')}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              !filters.category
                ? 'bg-amber-500/10 text-amber-400'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilter('category', cat.slug)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                filters.category === cat.slug
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {cat.name}
              <span className="text-xs text-gray-600">{cat._count.products}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-300">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50"
          />
          <span className="text-gray-500">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-300">
          Minimum Rating
        </h3>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                updateFilter('rating', filters.rating === rating.toString() ? '' : rating.toString())
              }
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                filters.rating === rating.toString()
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
                    }
                  />
                ))}
              </div>
              <span>& up</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

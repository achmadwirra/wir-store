'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface Category {
  id: string
  name: string
  slug: string
  image: string | null
  description: string | null
  _count: { products: number }
}

export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Shop by Category</h2>
          <p className="mt-2 text-gray-400">Browse our curated collections</p>
        </div>
        <Link
          href="/products"
          className="hidden items-center gap-1 text-sm text-amber-400 transition-colors hover:text-amber-300 sm:flex"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </section>
  )
}

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link href={`/products?category=${category.slug}`}>
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gray-900/50 transition-all duration-300 hover:border-amber-500/20">
          <div className="relative aspect-[4/3] overflow-hidden">
            {!imageError && category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, 33vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-500/10 to-amber-600/5">
                <span className="text-4xl font-bold text-amber-500/30">{category.name[0]}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            <p className="mt-0.5 text-sm text-gray-400">
              {category._count.products} products
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Star, Eye } from 'lucide-react'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import toast from 'react-hot-toast'
import { useState } from 'react'

interface ProductCardProps {
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
    category?: { name: string }
  }
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      stock: product.stock,
      color: product.colors[0],
    })
    toast.success(`${product.name} added to cart!`)
  }

  const discount = product.comparePrice
    ? calculateDiscount(product.price, product.comparePrice)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/products/${product.slug}`}>
        <div
          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gray-900/50 transition-all duration-300 hover:border-amber-500/20 hover:shadow-lg hover:shadow-amber-500/5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-800/50">
            {!imageError ? (
              <Image
                src={product.images[0] || 'https://picsum.photos/seed/placeholder/800/800'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-600">
                <ShoppingBag size={48} />
              </div>
            )}

            {/* Discount badge */}
            {discount > 0 && (
              <div className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                -{discount}%
              </div>
            )}

            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute right-3 top-3 flex flex-col gap-2"
            >
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                className="rounded-full bg-gray-900/80 p-2 text-gray-300 backdrop-blur-sm transition-colors hover:bg-amber-500 hover:text-gray-950"
              >
                <Heart size={16} />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                className="rounded-full bg-gray-900/80 p-2 text-gray-300 backdrop-blur-sm transition-colors hover:bg-amber-500 hover:text-gray-950"
              >
                <Eye size={16} />
              </button>
            </motion.div>

            {/* Add to cart button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              className="absolute bottom-3 left-3 right-3"
            >
              <button
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-4">
            {product.category && (
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-amber-500/70">
                {product.category.name}
              </p>
            )}
            <h3 className="mb-2 line-clamp-1 text-sm font-medium text-gray-200 transition-colors group-hover:text-white">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="mb-2 flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-600'
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

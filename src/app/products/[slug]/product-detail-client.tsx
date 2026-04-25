'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Check,
} from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { StarRating } from '@/components/ui/star-rating'
import { ProductCard } from '@/components/ui/product-card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import toast from 'react-hot-toast'

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  user: { id: string; name: string | null; image: string | null }
}

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number | null
  images: string[]
  categoryId: string
  tags: string[]
  stock: number
  rating: number
  reviewCount: number
  featured: boolean
  sizes: string[]
  colors: string[]
  specifications: Record<string, string> | null
  category: { id: string; name: string; slug: string }
  reviews: Review[]
}

interface RelatedProduct {
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
  product: Product
  relatedProducts: RelatedProduct[]
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description')
  const [imageError, setImageError] = useState<Record<number, boolean>>({})

  const discount = product.comparePrice
    ? calculateDiscount(product.price, product.comparePrice)
    : 0

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      stock: product.stock,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      quantity,
    })
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: 'Products', href: '/products' },
          { label: product.category.name, href: `/products?category=${product.category.slug}` },
          { label: product.name },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-gray-900/50"
          >
            {!imageError[selectedImage] ? (
              <Image
                src={product.images[selectedImage] || 'https://picsum.photos/seed/placeholder/800/800'}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                onError={() => setImageError((prev) => ({ ...prev, [selectedImage]: true }))}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-800/80 to-gray-900/80">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10">
                    <ShoppingBag size={32} className="text-amber-500/50" />
                  </div>
                  <span className="text-xs text-gray-600">Image unavailable</span>
                </div>
              </div>
            )}
            {discount > 0 && (
              <div className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white">
                -{discount}%
              </div>
            )}
          </motion.div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                    selectedImage === i
                      ? 'border-amber-500'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                    onError={() => setImageError((prev) => ({ ...prev, [i]: true }))}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-2 text-sm font-medium uppercase tracking-wider text-amber-500">
            {product.category.name}
          </div>

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="mt-3 flex items-center gap-4">
            <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
                <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-sm font-medium text-red-400">
                  Save {formatPrice(product.comparePrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="mt-4 leading-relaxed text-gray-400">{product.description}</p>

          {/* Size selector */}
          {product.sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-medium text-gray-300">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color selector */}
          {product.colors.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-medium text-gray-300">
                Color: <span className="text-white">{selectedColor}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                      selectedColor === color
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    {selectedColor === color && <Check size={14} />}
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-xl border border-white/10">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-3 text-gray-400 hover:text-white"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-3 text-gray-400 hover:text-white"
              >
                <Plus size={16} />
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400 disabled:opacity-50"
            >
              <ShoppingBag size={18} />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </motion.button>

            <button className="rounded-xl border border-white/10 p-3.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-red-400">
              <Heart size={18} />
            </button>
          </div>

          {/* Stock info */}
          <div className="mt-4 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-400">✓ In stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-400">✗ Out of stock</span>
            )}
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl border border-white/5 bg-gray-900/30 p-4">
            {[
              { icon: Truck, text: 'Free Shipping' },
              { icon: Shield, text: 'Secure Payment' },
              { icon: RotateCcw, text: '30-Day Returns' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 text-center">
                <Icon size={18} className="text-amber-400" />
                <span className="text-xs text-gray-400">{text}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-white/5">
          {(['description', 'specifications', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab ? 'text-amber-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
              {tab === 'reviews' && ` (${product.reviews.length})`}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="py-8"
          >
            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div className="overflow-hidden rounded-xl border border-white/5">
                {Object.entries(product.specifications).map(([key, value], i) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between px-6 py-3 ${
                      i % 2 === 0 ? 'bg-white/[0.02]' : ''
                    }`}
                  >
                    <span className="text-sm font-medium capitalize text-gray-400">{key}</span>
                    <span className="text-sm text-gray-200">{value as string}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-xl border border-white/5 bg-gray-900/30 p-6"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-sm font-medium text-amber-400">
                          {review.user.name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{review.user.name || 'Anonymous'}</p>
                          <div className="flex items-center gap-2">
                            <StarRating rating={review.rating} size={12} />
                            <span className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-gray-300">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">Related Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

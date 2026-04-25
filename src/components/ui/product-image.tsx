'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'

interface ProductImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  fallbackSize?: number
}

export function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  sizes,
  priority,
  fallbackSize = 48,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800/80 to-gray-900/80">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
            <ShoppingBag size={fallbackSize > 32 ? 28 : 20} className="text-amber-500/50" />
          </div>
          <span className="text-[10px] text-gray-600">No image</span>
        </div>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        onError={() => setHasError(true)}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setHasError(true)}
    />
  )
}

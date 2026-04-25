'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: number
  showValue?: boolean
  reviewCount?: number
}

export function StarRating({ rating, size = 16, showValue = false, reviewCount }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : i < rating
                ? 'fill-amber-400/50 text-amber-400'
                : 'text-gray-600'
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-300">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
      )}
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-gray-900/50">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 rounded skeleton" />
        <div className="h-4 w-3/4 rounded skeleton" />
        <div className="h-3 w-24 rounded skeleton" />
        <div className="h-5 w-20 rounded skeleton" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[600px] skeleton rounded-2xl" />
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-24 rounded skeleton" />
        <div className="h-3 w-32 rounded skeleton" />
      </div>
    </div>
  )
}

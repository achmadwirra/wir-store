export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-4 w-16 rounded skeleton" />
            {i < 3 && <div className="h-4 w-3 rounded skeleton" />}
          </div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image gallery skeleton */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl skeleton" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 w-20 rounded-xl skeleton" />
            ))}
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="space-y-6">
          <div className="h-4 w-24 rounded skeleton" />
          <div className="h-8 w-3/4 rounded skeleton" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-28 rounded skeleton" />
            <div className="h-4 w-20 rounded skeleton" />
          </div>
          <div className="flex items-baseline gap-3">
            <div className="h-8 w-24 rounded skeleton" />
            <div className="h-5 w-16 rounded skeleton" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full rounded skeleton" />
            <div className="h-4 w-5/6 rounded skeleton" />
            <div className="h-4 w-4/6 rounded skeleton" />
          </div>
          {/* Size selector skeleton */}
          <div>
            <div className="mb-3 h-4 w-12 rounded skeleton" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 w-16 rounded-lg skeleton" />
              ))}
            </div>
          </div>
          {/* Color selector skeleton */}
          <div>
            <div className="mb-3 h-4 w-16 rounded skeleton" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-10 w-20 rounded-lg skeleton" />
              ))}
            </div>
          </div>
          {/* Add to cart skeleton */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-32 rounded-xl skeleton" />
            <div className="h-12 flex-1 rounded-xl skeleton" />
            <div className="h-12 w-12 rounded-xl skeleton" />
          </div>
          {/* Trust badges skeleton */}
          <div className="grid grid-cols-3 gap-4 rounded-xl border border-white/5 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="h-5 w-5 rounded skeleton" />
                <div className="h-3 w-16 rounded skeleton" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { ProductGridSkeleton } from '@/components/ui/skeletons'

export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 rounded skeleton" />
        <div className="mt-2 h-4 w-32 rounded skeleton" />
      </div>

      <div className="flex gap-8">
        {/* Sidebar skeleton - desktop */}
        <aside className="hidden w-64 shrink-0 space-y-6 lg:block">
          <div className="space-y-2">
            <div className="h-4 w-24 rounded skeleton" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-full rounded-lg skeleton" />
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 rounded skeleton" />
            <div className="flex gap-2">
              <div className="h-10 flex-1 rounded-lg skeleton" />
              <div className="h-10 flex-1 rounded-lg skeleton" />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Sort bar skeleton */}
          <div className="mb-6 flex items-center justify-between">
            <div className="h-10 w-24 rounded-xl skeleton lg:hidden" />
            <div className="h-10 w-36 rounded-xl skeleton" />
          </div>

          <ProductGridSkeleton count={12} />
        </div>
      </div>
    </div>
  )
}

import { ProductGridSkeleton } from '@/components/ui/skeletons'

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 h-8 w-32 rounded skeleton" />

      {/* Search bar skeleton */}
      <div className="mb-10">
        <div className="mx-auto max-w-2xl">
          <div className="h-14 w-full rounded-2xl skeleton" />
        </div>
      </div>

      <div className="mb-6 h-4 w-48 rounded skeleton" />

      <ProductGridSkeleton count={8} />
    </div>
  )
}

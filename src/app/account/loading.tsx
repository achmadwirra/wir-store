export default function AccountLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl skeleton" />
          <div className="space-y-2">
            <div className="h-6 w-40 rounded skeleton" />
            <div className="h-4 w-56 rounded skeleton" />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar skeleton - desktop */}
        <aside className="hidden w-56 shrink-0 space-y-2 lg:block">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-11 w-full rounded-xl skeleton" />
          ))}
        </aside>

        {/* Mobile tabs skeleton */}
        <div className="mb-6 flex gap-2 lg:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-24 shrink-0 rounded-xl skeleton" />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-6 w-40 rounded skeleton" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded skeleton" />
                  <div className="h-3 w-48 rounded skeleton" />
                </div>
                <div className="h-6 w-20 rounded-full skeleton" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded skeleton" />
                <div className="h-4 w-3/4 rounded skeleton" />
              </div>
              <div className="mt-4 flex justify-between border-t border-white/5 pt-4">
                <div className="h-4 w-12 rounded skeleton" />
                <div className="h-4 w-20 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl skeleton" />
        <div className="space-y-1">
          <div className="h-6 w-44 rounded skeleton" />
          <div className="h-4 w-28 rounded skeleton" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-28 shrink-0 rounded-xl skeleton" />
        ))}
      </div>

      {/* Stats grid skeleton */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
            <div className="mb-3 h-10 w-10 rounded-xl skeleton" />
            <div className="h-7 w-24 rounded skeleton" />
            <div className="mt-1 h-4 w-28 rounded skeleton" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="mb-8 rounded-2xl border border-white/5 bg-gray-900/30 p-6">
        <div className="mb-4 h-5 w-40 rounded skeleton" />
        <div className="flex h-48 items-end justify-between gap-2 px-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md skeleton"
                style={{ height: `${20 + Math.random() * 60}%` }}
              />
              <div className="h-3 w-6 rounded skeleton" />
            </div>
          ))}
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-2xl border border-white/5 bg-gray-900/30 p-6">
        <div className="mb-4 h-5 w-32 rounded skeleton" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="h-4 w-24 rounded skeleton" />
              <div className="h-4 w-32 rounded skeleton" />
              <div className="h-5 w-20 rounded-full skeleton" />
              <div className="h-4 w-16 rounded skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

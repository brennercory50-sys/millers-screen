'use client'

export default function JobSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.06]"
        >
          <div className="aspect-[4/3] bg-white/[0.06] animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-5 bg-white/[0.06] animate-pulse rounded-md w-3/4" />
            <div className="h-4 bg-white/[0.06] animate-pulse rounded-md w-full" />
            <div className="flex items-center justify-between pt-1">
              <div className="h-3 bg-white/[0.06] animate-pulse rounded-md w-20" />
              <div className="h-6 bg-white/[0.06] animate-pulse rounded-full w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

import { Suspense, ReactNode } from "react"
import { Skeleton } from "./skeleton"

interface LazySuspenseProps {
  children: ReactNode
  fallback?: ReactNode
}

export function LazySuspense({ children, fallback }: LazySuspenseProps) {
  const defaultFallback = (
    <div className="space-y-4 p-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="col-span-4 h-64" />
        <Skeleton className="col-span-3 h-64" />
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}
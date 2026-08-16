interface SkeletonProps {
  count?: number
  height?: string
  width?: string
  circle?: boolean
  className?: string
}

export function Skeleton({
  count = 1,
  height = '20px',
  width = '100%',
  circle = false,
  className = '',
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-neutral animate-pulse rounded ${className}`}
          style={{
            height: circle ? width : height,
            width,
            borderRadius: circle ? '50%' : '0.5rem',
          }}
        />
      ))}
    </>
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <Skeleton height="200px" />
      <div className="p-4 space-y-2">
        <Skeleton height="20px" />
        <Skeleton height="16px" width="80%" />
        <Skeleton height="16px" width="70%" />
        <Skeleton height="24px" width="60%" />
      </div>
    </div>
  )
}

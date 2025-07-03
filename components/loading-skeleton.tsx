import type React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-gray-200", className)} {...props} />
}

export function CardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

export function TestimonialSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="border rounded-lg p-8 space-y-6">
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-6" />
          ))}
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5 mx-auto" />
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <div className="text-center space-y-2">
          <Skeleton className="h-5 w-32 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-4 w-36 mx-auto" />
        </div>
      </div>
    </div>
  )
}

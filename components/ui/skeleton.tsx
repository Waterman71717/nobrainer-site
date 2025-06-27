// components/ui/skeleton.tsx
"use client"

import { cn } from "@/lib/utils"
import * as React from "react"

// Define an interface that extends all standard HTML attributes for a div element
// This implicitly includes the 'style' prop of type React.CSSProperties
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props} // Spread all remaining props here
    />
  )
}

export { Skeleton }
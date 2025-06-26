"use client"

import { useState } from "react"
import Image from "next/image" // <-- ADD THIS LINE
import { Skeleton } from "@/components/ui/skeleton"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
  // Consider adding these if you want more control, but `fill` often works well with responsive images
  // width?: number;
  // height?: number;
}

export function OptimizedImage({ src, alt, className = "", priority = false, sizes = "100vw" }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    // The parent div needs `relative` positioning for `Image fill` to work
    <div className={`relative ${className}`}>
      {isLoading && !hasError && <Skeleton className="absolute inset-0 w-full h-full" />}
      {/* Added !hasError to skeleton to prevent it showing with error message */}

      {hasError ? (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Image unavailable</span>
        </div>
      ) : (
        <Image // <-- CHANGE THIS FROM <img> TO <Image>
          src={src || "/placeholder.svg"}
          alt={alt}
          // The classname needs to apply correctly to the Image component.
          // For layout="fill", object-cover/object-center typically go here.
          // We'll also remove the opacity here and let the parent `div` or `Skeleton` handle loading visibility.
          className={`object-cover object-center`} // Add specific object-fit/position here
          priority={priority}
          sizes={sizes}
          fill // <-- ADD THIS PROP. This makes the image fill its parent container.
          onLoad={(event) => { // Next.js Image onLoad receives an event, not a direct function
            // event.currentTarget.naturalWidth === 0 will check if image loaded correctly
            if (event.currentTarget.naturalWidth === 0) {
                setHasError(true);
            }
            setIsLoading(false);
          }}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
    </div>
  )
}
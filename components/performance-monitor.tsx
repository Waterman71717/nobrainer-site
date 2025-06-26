"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      // Monitor LCP (Largest Contentful Paint)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime)
          }
        }
      })

      try {
        observer.observe({ type: "largest-contentful-paint", buffered: true })
      } catch (e) {
        // Fallback for browsers that don't support the observer
        console.log("Performance observer not supported")
      }

      // Monitor CLS (Cumulative Layout Shift)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // REMOVED: if (!entry.hadRecentInput) {
          clsValue += entry.value
          // REMOVED: }
        }
        console.log("CLS:", clsValue)
      })

      try {
        clsObserver.observe({ type: "layout-shift", buffered: true })
      } catch (e) {
        console.log("Layout shift observer not supported")
      }

      return () => {
        observer.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [])

  return null
}
/// <reference lib="dom" />
"use client"

import { useEffect } from "react"

// Explicitly declare the LayoutShift interface if it's not being picked up globally.
// This provides a fallback definition for TypeScript.
declare interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean; // Re-adding for completeness, though we're not using it in your logic
  sources?: Array<LayoutShiftAttribution>;
}

// You might also need LayoutShiftAttribution, depending on strictness
declare interface LayoutShiftAttribution {
  node?: Node;
  currentRect: DOMRectReadOnly;
  previousRect: DOMRectReadOnly;
}


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
          // Explicitly check for 'layout-shift' and then assert the type
          if (entry.entryType === "layout-shift") {
            clsValue += (entry as LayoutShift).value;
          }
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
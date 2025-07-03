"use client"

import { useEffect } from "react"
import { trackEvent } from "@/components/analytics"

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "navigation") {
          const navEntry = entry as PerformanceNavigationTiming

          // Track page load metrics
          trackEvent("performance_metrics", {
            metric_type: "page_load",
            dns_time: navEntry.domainLookupEnd - navEntry.domainLookupStart,
            connect_time: navEntry.connectEnd - navEntry.connectStart,
            response_time: navEntry.responseEnd - navEntry.requestStart,
            dom_load_time: navEntry.domContentLoadedEventEnd - navEntry.navigationStart,
            full_load_time: navEntry.loadEventEnd - navEntry.navigationStart,
          })
        }

        if (entry.entryType === "largest-contentful-paint") {
          trackEvent("performance_metrics", {
            metric_type: "lcp",
            value: entry.startTime,
            rating: entry.startTime < 2500 ? "good" : entry.startTime < 4000 ? "needs_improvement" : "poor",
          })
        }

        if (entry.entryType === "first-input") {
          const fidEntry = entry as PerformanceEventTiming
          trackEvent("performance_metrics", {
            metric_type: "fid",
            value: fidEntry.processingStart - fidEntry.startTime,
            rating:
              fidEntry.processingStart - fidEntry.startTime < 100
                ? "good"
                : fidEntry.processingStart - fidEntry.startTime < 300
                  ? "needs_improvement"
                  : "poor",
          })
        }

        if (entry.entryType === "layout-shift") {
          const clsEntry = entry as PerformanceEntry & { value: number }
          if (!clsEntry.hadRecentInput) {
            trackEvent("performance_metrics", {
              metric_type: "cls",
              value: clsEntry.value,
              rating: clsEntry.value < 0.1 ? "good" : clsEntry.value < 0.25 ? "needs_improvement" : "poor",
            })
          }
        }
      }
    })

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ["navigation", "largest-contentful-paint", "first-input", "layout-shift"] })
    } catch (error) {
      console.warn("Performance Observer not supported:", error)
    }

    // Monitor JavaScript errors
    const errorHandler = (event: ErrorEvent) => {
      trackEvent("javascript_error", {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack?.substring(0, 500),
      })
    }

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      trackEvent("unhandled_promise_rejection", {
        reason: event.reason?.toString?.()?.substring(0, 500) || "Unknown reason",
      })
    }

    window.addEventListener("error", errorHandler)
    window.addEventListener("unhandledrejection", unhandledRejectionHandler)

    // Monitor resource loading errors
    const resourceErrorHandler = (event: Event) => {
      const target = event.target as HTMLElement
      if (target && target.tagName) {
        trackEvent("resource_error", {
          element_type: target.tagName.toLowerCase(),
          source: (target as any).src || (target as any).href || "unknown",
        })
      }
    }

    document.addEventListener("error", resourceErrorHandler, true)

    return () => {
      observer.disconnect()
      window.removeEventListener("error", errorHandler)
      window.removeEventListener("unhandledrejection", unhandledRejectionHandler)
      document.removeEventListener("error", resourceErrorHandler, true)
    }
  }, [])

  return null
}

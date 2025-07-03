"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
    dataLayer: any[]
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Google Analytics 4
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"

    // Load Google Analytics
    const script1 = document.createElement("script")
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    const script2 = document.createElement("script")
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
      });
    `
    document.head.appendChild(script2)

    // Hotjar (replace with your site ID)
    const hotjarScript = document.createElement("script")
    hotjarScript.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3000000,hjsv:6}; // Replace with your Hotjar ID
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `
    document.head.appendChild(hotjarScript)

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1)
      document.head.removeChild(script2)
      document.head.removeChild(hotjarScript)
    }
  }, [])

  useEffect(() => {
    // Track page views
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX", {
        page_path: pathname + searchParams.toString(),
      })
    }
  }, [pathname, searchParams])

  return null
}

// Custom event tracking functions
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", eventName, parameters)
  }
}

export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "conversion", {
      send_to: conversionId,
      value: value,
      currency: "USD",
    })
  }
}

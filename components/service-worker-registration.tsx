"use client"

import { useEffect } from "react"

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then((registration) => {
            console.log("SW registered: ", registration)

            // Check for updates
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                    // New content is available, refresh the page
                    window.location.reload()
                  }
                })
              }
            })
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError)
          })
      })
    }
  }, [])

  return null
}

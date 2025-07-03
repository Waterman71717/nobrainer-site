"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // Don't show again for this session
    sessionStorage.setItem("pwa-install-dismissed", "true")
  }

  // Don't show if already dismissed this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem("pwa-install-dismissed")
    if (dismissed) {
      setShowInstallPrompt(false)
    }
  }, [])

  if (!showInstallPrompt || !deferredPrompt) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-sm">Install App</h3>
            </div>
            <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">Install our app for faster access and offline functionality.</p>
          <div className="flex space-x-2">
            <Button size="sm" onClick={handleInstall} className="flex-1">
              Install
            </Button>
            <Button size="sm" variant="outline" onClick={handleDismiss}>
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { trackEvent } from "@/components/analytics"

interface PricingButtonProps {
  planName: string
  planPrice: number
  className?: string
  children: React.ReactNode
}

export function PricingButton({ planName, planPrice, className, children }: PricingButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setIsLoading(true)

    // Track the pricing button click
    trackEvent("pricing_button_click", {
      plan_name: planName,
      plan_price: planPrice,
      button_location: "pricing_card",
    })

    // Simulate brief loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Redirect to SMB solutions form
    router.push("/smb-solutions#lead-form")
  }

  return (
    <Button onClick={handleClick} disabled={isLoading} className={`w-full font-semibold py-3 ${className}`} size="lg">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  )
}

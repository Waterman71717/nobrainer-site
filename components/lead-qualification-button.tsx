"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { trackEvent } from "@/components/analytics"
import type { ButtonProps } from "@/components/ui/button"

interface LeadQualificationButtonProps extends ButtonProps {
  eventName: string
  redirectTo?: string
  children: React.ReactNode
}

export function LeadQualificationButton({
  eventName,
  redirectTo = "/smb-solutions#lead-form",
  children,
  className,
  ...props
}: LeadQualificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setIsLoading(true)

    // Track the button click
    trackEvent(eventName, {
      button_text: typeof children === "string" ? children : "button_click",
      redirect_to: redirectTo,
    })

    // Simulate brief loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Redirect to lead qualification form
    router.push(redirectTo)
  }

  return (
    <Button onClick={handleClick} disabled={isLoading} className={className} {...props}>
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

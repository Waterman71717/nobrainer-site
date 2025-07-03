"use client"

import { useEffect, useState } from "react"
import { trackEvent } from "@/components/analytics"

interface ABTestConfig {
  testName: string
  variants: string[]
  trafficSplit?: number[]
}

interface ABTestResult {
  variant: string
  isControl: boolean
}

export function useABTest(config: ABTestConfig): ABTestResult {
  const [variant, setVariant] = useState<string>("")
  const [isControl, setIsControl] = useState<boolean>(true)

  useEffect(() => {
    const { testName, variants, trafficSplit = [] } = config

    // Check if user already has a variant assigned
    const storageKey = `ab_test_${testName}`
    const existingVariant = localStorage.getItem(storageKey)

    if (existingVariant && variants.includes(existingVariant)) {
      setVariant(existingVariant)
      setIsControl(existingVariant === variants[0])
      return
    }

    // Assign new variant
    let selectedVariant: string

    if (trafficSplit.length === variants.length) {
      // Use custom traffic split
      const random = Math.random()
      let cumulative = 0

      for (let i = 0; i < variants.length; i++) {
        cumulative += trafficSplit[i]
        if (random <= cumulative) {
          selectedVariant = variants[i]
          break
        }
      }
      selectedVariant = selectedVariant! || variants[0]
    } else {
      // Equal split
      const randomIndex = Math.floor(Math.random() * variants.length)
      selectedVariant = variants[randomIndex]
    }

    // Store variant and track assignment
    localStorage.setItem(storageKey, selectedVariant)
    setVariant(selectedVariant)
    setIsControl(selectedVariant === variants[0])

    // Track variant assignment
    trackEvent("ab_test_assignment", {
      test_name: testName,
      variant: selectedVariant,
      is_control: selectedVariant === variants[0],
    })
  }, [config])

  return { variant, isControl }
}

// A/B Test Components
export function ABTestHeroButton() {
  const { variant } = useABTest({
    testName: "hero_cta_button",
    variants: ["calculate_savings", "get_started", "free_consultation"],
    trafficSplit: [0.4, 0.3, 0.3],
  })

  const buttonConfig = {
    calculate_savings: {
      text: "Calculate Your Savings",
      className: "bg-green-600 hover:bg-green-700",
    },
    get_started: {
      text: "Get Started Today",
      className: "bg-blue-600 hover:bg-blue-700",
    },
    free_consultation: {
      text: "Free Consultation",
      className: "bg-purple-600 hover:bg-purple-700",
    },
  }

  const config = buttonConfig[variant as keyof typeof buttonConfig] || buttonConfig.calculate_savings

  const handleClick = () => {
    trackEvent("ab_test_conversion", {
      test_name: "hero_cta_button",
      variant,
      conversion_type: "cta_click",
    })
  }

  return (
    <button
      onClick={handleClick}
      className={`px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 btn-hover-lift ${config.className}`}
    >
      {config.text}
    </button>
  )
}

export function ABTestPricingDisplay() {
  const { variant } = useABTest({
    testName: "pricing_display",
    variants: ["monthly", "annual_discount", "savings_focused"],
    trafficSplit: [0.33, 0.33, 0.34],
  })

  const trackPricingView = () => {
    trackEvent("ab_test_view", {
      test_name: "pricing_display",
      variant,
      element: "pricing_section",
    })
  }

  useEffect(() => {
    trackPricingView()
  }, [variant])

  if (variant === "annual_discount") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="text-center">
          <div className="text-sm text-green-700 font-medium">Limited Time Offer</div>
          <div className="text-lg font-bold text-green-800">Save 20% with Annual Billing</div>
          <div className="text-sm text-green-600">$597/month → $477/month when paid annually</div>
        </div>
      </div>
    )
  }

  if (variant === "savings_focused") {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="text-center">
          <div className="text-sm text-blue-700 font-medium">ROI Calculator</div>
          <div className="text-lg font-bold text-blue-800">See Your Potential Savings</div>
          <div className="text-sm text-blue-600">Most SMBs save $14,436+ annually per VA replaced</div>
        </div>
      </div>
    )
  }

  // Default monthly display
  return null
}

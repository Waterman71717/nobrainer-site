import { PricingHero } from "@/components/pricing-hero"
import { PricingTiers } from "@/components/pricing-tiers"
import { PricingFAQ } from "@/components/pricing-faq"

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingTiers />
      <PricingFAQ />
    </>
  )
}

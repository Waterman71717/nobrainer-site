import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
  )
}

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { About } from "@/components/about"
import { FAQ } from "@/components/faq"
import { ScrollToTop } from "@/components/scroll-to-top"
import { StructuredData } from "./structured-data"
import { SkipNav } from "@/components/skip-nav"
import { Analytics } from "@/components/analytics"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "Nobrainer Group- AI-Powered Call Center Solutions",
  description:
    "Transform your customer service with cutting-edge AI automation, generative AI, and data-driven insights. 500+ clients served, 98% satisfaction rate.",
  keywords: "AI call center, customer service automation, generative AI, call center solutions",
  openGraph: {
    title: "Nobrainer Group- AI-Powered Call Center Solutions",
    description: "Transform your customer service with cutting-edge AI automation",
    url: "https://nobrainergroup.com",
    siteName: "Nobrainer Group",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <SkipNav />
        <StructuredData />
        <Analytics />
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Services />
          <Process />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  )
}

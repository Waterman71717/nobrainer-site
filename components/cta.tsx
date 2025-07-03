import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Customer Service?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of businesses that have already revolutionized their customer experience with our AI-powered
          solutions. Get started today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Get Free Consultation
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
            >
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

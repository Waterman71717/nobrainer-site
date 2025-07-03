import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Replace Your Virtual Assistants?</h2>
        <p className="text-xl mb-8 text-blue-100">
          Join 500+ SMBs saving $14,436+ annually per VA replaced. Calculate your savings and see how our AI solution
          can transform your customer service operations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/smb-solutions">
              Calculate Your Savings <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
          >
            <Link href="/pricing">View SMB Pricing</Link>
          </Button>
        </div>

        <div className="mt-8 text-blue-200">
          <p>No setup fees • 4-6 week deployment • 98% SMB satisfaction rate</p>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export function SMBHero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-white">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
                SMB Solutions
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Replace Your Virtual Assistants with <span className="text-blue-400">AI That Works 24/7</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Stop paying $1,800-$3,600 monthly for virtual assistants. Our AI handles customer service, appointment
              scheduling, and support calls at a fraction of the cost—starting at just $447/month.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("roi-calculator")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }}
              >
                <a href="#roi-calculator">
                  Get Your Free ROI Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Link href="/pricing">View Pricing Plans</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Column - Success Story */}
          <div className="lg:pl-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Real SMB Success Story</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-gray-200 mb-4 italic">
                  "We replaced two $1,800/month virtual assistants with Nobrainer's AI solution. Now we're saving $3,300
                  monthly while getting better customer service coverage. The AI handles 85% of our inquiries
                  automatically."
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    P
                  </div>
                  <div>
                    <div className="text-white font-medium">Priya Sharma</div>
                    <div className="text-gray-400 text-sm">Healthcare Practice, India</div>
                  </div>
                </div>

                {/* Results Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">$3,300</div>
                    <div className="text-sm text-gray-400">Monthly Savings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">85%</div>
                    <div className="text-sm text-gray-400">Automated Responses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

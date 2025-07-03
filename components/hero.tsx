"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { AnimatedCounter } from "@/components/animated-counter"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-3 lg:py-4">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              AI-Powered <span className="text-blue-400">Call Center Solutions</span>
            </h1>

            <p className="text-base lg:text-lg text-gray-300 max-w-2xl">
              Replace expensive virtual assistants with intelligent AI automation. Reduce customer service costs by up
              to 67% while maintaining service quality and improving response times.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="default" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="default"
                className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/process">View Our Process</Link>
              </Button>
            </div>
          </div>

          {/* Right Stats - 5 columns */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <div className="flex items-center justify-center h-10 w-10 bg-blue-500/20 rounded-full mx-auto mb-2">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <div className="text-xl xl:text-2xl font-bold text-blue-400">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <div className="text-xs text-gray-300">Clients Served</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <div className="flex items-center justify-center h-10 w-10 bg-green-500/20 rounded-full mx-auto mb-2">
                  <Zap className="h-5 w-5 text-green-400" />
                </div>
                <div className="space-y-2">
                  <div className="text-xl xl:text-2xl font-bold text-green-400">
                    <AnimatedCounter end={98} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-300">Satisfaction Rate</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <div className="flex items-center justify-center h-10 w-10 bg-purple-500/20 rounded-full mx-auto mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <div className="text-xl xl:text-2xl font-bold text-purple-400">
                    <AnimatedCounter end={40} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-300">Cost Reduction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

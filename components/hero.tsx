"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Users, TrendingUp } from "lucide-react"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export function Hero() {
  const [stats, setStats] = useState({
    clients: 0,
    satisfaction: 0,
    costReduction: 0,
  })

  const { scrollToSection } = useSmoothScroll()

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setStats({
          clients: Math.floor(500 * progress),
          satisfaction: Math.floor(98 * progress),
          costReduction: Math.floor(40 * progress),
        })

        if (currentStep >= steps) {
          clearInterval(interval)
          setStats({ clients: 500, satisfaction: 98, costReduction: 40 })
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }

    const timer = setTimeout(animateStats, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-black/20" aria-hidden="true"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              AI-Powered <span className="text-blue-400">Call Center</span> Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform your customer service with cutting-edge AI automation, generative AI, and data-driven insights
              that deliver measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-300"
                onClick={() => scrollToSection("contact")}
                aria-label="Get free consultation - scroll to contact form"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                className="bg-blue-800 hover:bg-blue-900 text-white focus:ring-4 focus:ring-blue-300"
                onClick={() => scrollToSection("process")}
                aria-label="View our process - scroll to methodology section"
              >
                View Our Process
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" role="region" aria-label="Company statistics">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" aria-hidden="true" />
              <div className="text-3xl font-bold text-blue-400" aria-live="polite">
                {stats.clients}+
              </div>
              <div className="text-sm text-gray-300">Clients Served</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Zap className="h-8 w-8 text-green-400 mx-auto mb-3" aria-hidden="true" />
              <div className="text-3xl font-bold text-green-400" aria-live="polite">
                {stats.satisfaction}%
              </div>
              <div className="text-sm text-gray-300">Satisfaction Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-3" aria-hidden="true" />
              <div className="text-3xl font-bold text-purple-400" aria-live="polite">
                {stats.costReduction}%
              </div>
              <div className="text-sm text-gray-300">Cost Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Play, Pause } from "lucide-react"
import { TestimonialSkeleton } from "@/components/loading-skeleton"
import { trackEvent } from "@/components/analytics"

const testimonials = [
  {
    id: 1,
    quote:
      "Our response time decreased by 60% and customer satisfaction increased dramatically. This has been the best investment we've made in operational efficiency.",
    author: "Michael Rodriguez",
    title: "Customer Success Director",
    company: "InnovaTech Solutions",
    rating: 5,
    industry: "Technology",
    savings: "$18,000",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    quote:
      "We replaced two virtual assistants costing us $3,600 monthly with Nobrainer's AI solution at $1,194 per month. We're saving $28,872 annually while providing superior 24/7 customer service.",
    author: "Jennifer Walsh",
    title: "Chief Executive Officer",
    company: "Pacific Coast Outdoor Gear",
    rating: 5,
    industry: "E-commerce",
    savings: "$28,872",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    quote:
      "The AI system handles 80% of our customer inquiries automatically with remarkable accuracy. Our team can now focus on complex issues and strategic business growth instead of repetitive support tasks.",
    author: "David Martinez",
    title: "Operations Manager",
    company: "TechFlow Solutions",
    rating: 5,
    industry: "Professional Services",
    savings: "$15,600",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    quote:
      "Implementation was seamless and completed in under two weeks. The return on investment was immediate - we experienced cost savings from day one while significantly improving our customer experience metrics.",
    author: "Dr. Amanda Foster",
    title: "Practice Administrator",
    company: "Wellness Plus Medical Group",
    rating: 5,
    industry: "Healthcare",
    savings: "$22,400",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    quote:
      "Our call volume increased 300% during peak season, but Nobrainer's AI solution handled the surge flawlessly. Zero missed calls, zero frustrated customers, and no additional hiring required.",
    author: "Robert Kim",
    title: "Founder & CEO",
    company: "Urban Home Services",
    rating: 5,
    industry: "Home Services",
    savings: "$31,200",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function EnhancedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    const newIndex = (currentIndex + 1) % testimonials.length
    setCurrentIndex(newIndex)
    trackEvent("testimonial_navigation", { direction: "next", testimonial_id: testimonials[newIndex].id })
  }

  const prevTestimonial = () => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    setCurrentIndex(newIndex)
    trackEvent("testimonial_navigation", { direction: "previous", testimonial_id: testimonials[newIndex].id })
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    trackEvent("testimonial_navigation", { direction: "direct", testimonial_id: testimonials[index].id })
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
    trackEvent("testimonial_autoplay", { action: isAutoPlaying ? "pause" : "play" })
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 loading-shimmer"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto loading-shimmer"></div>
          </div>
          <TestimonialSkeleton />
        </div>
      </section>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measurable results from businesses across various industries
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-0 z-10 bg-white shadow-lg hover:bg-gray-50 btn-hover-lift touch-target"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Card className="max-w-4xl mx-auto shadow-xl border-0 card-hover animate-scale-in">
              <CardContent className="p-8 md:p-12">
                <div className="flex justify-center mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-700 italic text-center mb-8 leading-relaxed font-medium">
                  "{currentTestimonial.quote}"
                </blockquote>

                <div className="text-center mb-6">
                  <div className="font-bold text-lg text-gray-900 mb-1">{currentTestimonial.author}</div>
                  <div className="text-gray-600 mb-1 font-medium">{currentTestimonial.title}</div>
                  <div className="text-blue-600 font-semibold mb-2">{currentTestimonial.company}</div>
                  <div className="text-sm text-gray-500 font-medium">{currentTestimonial.industry}</div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-green-700 mb-1 font-medium">Annual Cost Savings</div>
                  <div className="text-2xl font-bold text-green-800">{currentTestimonial.savings}</div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-0 z-10 bg-white shadow-lg hover:bg-gray-50 btn-hover-lift touch-target"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            {/* Pagination dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 touch-target ${
                    index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAutoPlay}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="text-sm font-medium">{isAutoPlaying ? "Pause" : "Play"}</span>
            </Button>
          </div>

          {/* Progress bar for auto-play */}
          {isAutoPlaying && (
            <div className="mt-4 max-w-xs mx-auto">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-100 ease-linear"
                  style={{
                    animation: "progress 5s linear infinite",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}

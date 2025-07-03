"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Michael Rodriguez",
    title: "Operations Director",
    company: "InnovaTech Solutions",
    content:
      "The AI implementation reduced our customer service costs by 65% while improving response times from hours to minutes. Our customer satisfaction scores have never been higher.",
    rating: 5,
  },
  {
    name: "Jennifer Walsh",
    title: "Customer Experience Manager",
    company: "Pacific Coast Outdoor Gear",
    content:
      "Nobrainer Group's AI solution handles 85% of our customer inquiries automatically. The ROI was evident within the first month, saving us over $12,000 annually.",
    rating: 5,
  },
  {
    name: "David Martinez",
    title: "CEO",
    company: "TechFlow Solutions",
    content:
      "The deployment was seamless and the results immediate. We've eliminated the need for two full-time VAs while providing better 24/7 customer service.",
    rating: 5,
  },
  {
    name: "Dr. Amanda Foster",
    title: "Practice Administrator",
    company: "Wellness Plus Medical Group",
    content:
      "Patient inquiries are now handled instantly, appointment scheduling is automated, and our staff can focus on providing quality care instead of answering repetitive questions.",
    rating: 5,
  },
  {
    name: "Robert Kim",
    title: "Founder",
    company: "Urban Home Services",
    content:
      "The AI chatbot handles service requests, scheduling, and follow-ups perfectly. It's like having a dedicated customer service team that never sleeps.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
          <p className="text-xl text-gray-600">
            Measurable results from businesses that transformed their customer service with AI
          </p>
        </div>

        <div className="relative">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="flex mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-xl text-gray-700 leading-relaxed mb-8">
              "{currentTestimonial.content}"
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900 text-lg">{currentTestimonial.name}</div>
                <div className="text-gray-600">{currentTestimonial.title}</div>
                <div className="text-blue-600 font-medium">{currentTestimonial.company}</div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <Button variant="outline" size="sm" onClick={goToPrevious} className="p-2 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={togglePlayPause} className="p-2 bg-transparent">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button variant="outline" size="sm" onClick={goToNext} className="p-2 bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          {isPlaying && (
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-blue-600 h-1 rounded-full transition-all duration-100 ease-linear"
                style={{
                  animation: "progress 5s linear infinite",
                }}
              />
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

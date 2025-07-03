"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, Star } from "lucide-react"

const testimonials = [
  {
    name: "Kofi Asante",
    company: "Africa - Ghana",
    role: "Small business owner, consulting services",
    content:
      "Nobrainer Group transformed our customer service completely. We've seen a 67% reduction in response times and our customer satisfaction scores have never been higher.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Priya Sharma",
    company: "Asia - India",
    role: "Healthcare practice, professional services",
    content:
      "The AI chatbot handles 80% of our customer inquiries automatically. Our team can now focus on complex issues while customers get instant help 24/7.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Lars Eriksson",
    company: "Europe - Sweden",
    role: "Manufacturing, technical services",
    content:
      "Implementation was seamless and the results were immediate. We've reduced our customer service costs by 45% while improving quality significantly.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Isabella Mendoza",
    company: "South America - Colombia",
    role: "Retail, family business",
    content:
      "The predictive analytics have been game-changing. We can now anticipate customer needs and resolve issues before they become problems.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Mitchell O'Brien",
    company: "Oceania - Australia",
    role: "Real estate, local services",
    content:
      "The ROI calculator was spot on. We're saving exactly what they predicted and our customer service quality has never been better.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Zara Okafor",
    company: "Canada - Ontario",
    role: "Import/export business, consulting firm",
    content:
      "Our international clients love the 24/7 support. The AI handles inquiries in multiple time zones while we sleep, and conversion rates have increased by 35%.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Joaquín Herrera",
    company: "USA - Texas",
    role: "Construction company, automotive services",
    content:
      "The voice AI system handles our service appointments perfectly. Customers can schedule repairs and get quotes instantly, even after hours.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Kai Nakamura",
    company: "USA - California",
    role: "Design agency, tech consulting",
    content:
      "Client onboarding is now completely automated. The AI qualifies leads, schedules consultations, and even sends project proposals. It's incredible.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Bethany Kovač",
    company: "USA - New York",
    role: "Marketing firm, professional services",
    content:
      "We've scaled our client support without hiring additional staff. The AI handles initial consultations and follow-ups, letting us focus on strategy.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">
            Real results from real businesses that transformed their customer service with AI
          </p>
        </div>

        <div className="relative">
          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{testimonials[currentIndex].name}</div>
                    <div className="text-gray-600 text-sm">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="sm" onClick={goToPrevious} className="p-2 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={goToNext} className="p-2 bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={togglePlayPause} className="p-2 bg-transparent">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

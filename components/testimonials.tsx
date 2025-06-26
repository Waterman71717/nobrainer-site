"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Carmela C.",
    title: "VP Operations",
    company: "Techconnect Solutions",
    quote: "45% improvement in customer satisfaction within 3 months. The AI integration exceeded our expectations.",
    metric: "45% Improvement",
  },
  {
    name: "Melwyn L.",
    title: "Operations Director",
    company: "Upwork Global",
    quote: "Saved us over $2M annually. The ROI was evident within the first quarter of implementation.",
    metric: "$2M+ Saved",
  },
  {
    name: "Habeeb B.",
    title: "Customer Service Manager",
    company: "Royal Bank",
    quote: "Call resolution time decreased by 35%, agent productivity increased significantly. Outstanding results.",
    metric: "35% Faster Resolution",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Real results from real businesses across various industries</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-white shadow-xl">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center">
                <Quote className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{testimonials[currentIndex].name}</div>
                    <div className="text-gray-600">{testimonials[currentIndex].title}</div>
                    <div className="text-blue-600 font-medium">{testimonials[currentIndex].company}</div>
                  </div>
                </div>
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                  {testimonials[currentIndex].metric}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button variant="outline" size="sm" onClick={goToPrevious} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={goToNext} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

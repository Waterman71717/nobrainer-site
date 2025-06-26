"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Lightbulb, Rocket, BarChart, ArrowRight, CheckCircle } from "lucide-react"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

const steps = [
  {
    icon: Search,
    title: "Discovery & Analysis",
    description:
      "Comprehensive analysis, stakeholder interviews, and performance benchmarking to understand your current state.",
    details: ["Current state analysis", "Stakeholder interviews", "Performance benchmarking", "Gap identification"],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Lightbulb,
    title: "Strategy & Design",
    description: "Custom AI architecture design and process redesign tailored to your specific business needs.",
    details: ["AI architecture design", "Process redesign", "Technology selection", "Implementation roadmap"],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Rocket,
    title: "Implementation",
    description: "Seamless deployment with comprehensive training and rigorous quality assurance testing.",
    details: ["System deployment", "Agent training", "Quality assurance", "Performance testing"],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: BarChart,
    title: "Optimization & Support",
    description: "Continuous monitoring, regular performance reviews, and 24/7 technical support.",
    details: ["Performance monitoring", "Regular reviews", "24/7 support", "Continuous optimization"],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
]

export function Process() {
  const { scrollToSection } = useSmoothScroll()

  return (
    <section id="process" className="py-24 bg-white" aria-label="Our proven methodology">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Proven 4-Step Methodology</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A systematic approach that ensures successful AI transformation and measurable improvements in your customer
            service operations.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Progress Line */}
            <div
              className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 rounded-full"
              aria-hidden="true"
            ></div>

            <div className="grid grid-cols-4 gap-8" role="list">
              {steps.map((step, index) => (
                <div key={index} className="relative" role="listitem">
                  {/* Step Number Circle */}
                  <div
                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10`}
                    aria-label={`Step ${index + 1}`}
                  >
                    {index + 1}
                  </div>

                  <Card
                    className={`mt-8 hover:shadow-xl transition-all duration-300 border-t-4 border-t-${step.iconColor.split("-")[1]}-500`}
                  >
                    <CardHeader className={`${step.bgColor} text-center pb-6`}>
                      <div
                        className={`mx-auto mb-4 w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center border-2 border-${step.iconColor.split("-")[1]}-200`}
                      >
                        <step.icon className={`h-8 w-8 ${step.iconColor}`} aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                      <div className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center text-sm text-gray-700">
                            <CheckCircle
                              className={`w-4 h-4 ${step.iconColor} mr-3 flex-shrink-0`}
                              aria-hidden="true"
                            />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8" role="list">
          {steps.map((step, index) => (
            <div key={index} className="relative" role="listitem">
              <div className="flex items-start space-x-4">
                {/* Step Number and Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg mb-3`}
                    aria-label={`Step ${index + 1}`}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center border-2 border-${step.iconColor.split("-")[1]}-200`}
                  >
                    <step.icon className={`h-8 w-8 ${step.iconColor}`} aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                      <div className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center text-sm text-gray-700">
                            <CheckCircle
                              className={`w-4 h-4 ${step.iconColor} mr-3 flex-shrink-0`}
                              aria-hidden="true"
                            />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Connecting Line for Mobile */}
              {index < steps.length - 1 && (
                <div className="flex justify-start ml-6 mt-4 mb-4">
                  <ArrowRight className="w-6 h-6 text-gray-400" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your AI Transformation?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our proven methodology has helped 500+ clients achieve measurable results. Let's discuss how we can
              transform your customer service operations.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors focus:ring-4 focus:ring-blue-300"
                aria-label="Schedule free consultation - scroll to contact form"
              >
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

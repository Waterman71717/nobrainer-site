import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Search, Lightbulb, Rocket, BarChart3 } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Discovery & Analysis",
    icon: Search,
    description:
      "Comprehensive analysis, stakeholder interviews, and performance benchmarking to understand your current state.",
    color: "blue",
    items: ["Current state analysis", "Stakeholder interviews", "Performance benchmarking", "Gap identification"],
  },
  {
    number: 2,
    title: "Strategy & Design",
    icon: Lightbulb,
    description: "Custom AI architecture design and process redesign tailored to your specific business needs.",
    color: "purple",
    items: ["AI architecture design", "Process redesign", "Technology selection", "Implementation roadmap"],
  },
  {
    number: 3,
    title: "Implementation",
    icon: Rocket,
    description: "Seamless deployment with comprehensive training and rigorous quality assurance testing.",
    color: "green",
    items: ["System deployment", "Agent training", "Quality assurance", "Performance testing"],
  },
  {
    number: 4,
    title: "Optimization & Support",
    icon: BarChart3,
    description: "Continuous monitoring, regular performance reviews, and 24/7 technical support.",
    color: "orange",
    items: ["Performance monitoring", "Regular reviews", "24/7 support", "Continuous optimization"],
  },
]

const colorClasses = {
  blue: {
    bg: "bg-blue-600",
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    check: "text-blue-500",
  },
  purple: {
    bg: "bg-purple-600",
    lightBg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-600",
    check: "text-purple-500",
  },
  green: {
    bg: "bg-green-600",
    lightBg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    check: "text-green-500",
  },
  orange: {
    bg: "bg-orange-600",
    lightBg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-600",
    check: "text-orange-500",
  },
}

export function MethodologySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Proven 4-Step Methodology</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            A systematic approach that ensures successful AI transformation and measurable improvements in your customer
            service operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const colors = colorClasses[step.color as keyof typeof colorClasses]
            const Icon = step.icon

            return (
              <div key={step.number} className="relative">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gray-300 z-0" />
                )}

                <Card
                  className={`relative z-10 ${colors.lightBg} ${colors.border} border-2 hover:shadow-lg transition-shadow`}
                >
                  <CardContent className="p-6">
                    {/* Step number circle */}
                    <div
                      className={`w-12 h-12 ${colors.bg} text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto`}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 ${colors.lightBg} rounded-lg flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className={`h-8 w-8 ${colors.text}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-4">{step.title}</h3>

                    {/* Description */}
                    <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">{step.description}</p>

                    {/* Checklist items */}
                    <ul className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${colors.check} flex-shrink-0`} />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

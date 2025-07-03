import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MessageSquare, Settings, Rocket, BarChart3, Users, Clock, Shield } from "lucide-react"

const processSteps = [
  {
    number: 1,
    title: "Free Consultation & Discovery",
    duration: "1-2 Days",
    icon: MessageSquare,
    description: "We analyze your current customer service operations and identify AI automation opportunities.",
    activities: [
      "Current state analysis of your customer service operations",
      "Stakeholder interviews with key team members",
      "Performance benchmarking and gap identification",
      "Custom ROI calculation based on your specific situation",
      "Detailed proposal with recommended AI solution",
    ],
    deliverables: ["Custom ROI Analysis", "AI Strategy Proposal", "Implementation Timeline"],
    color: "blue",
  },
  {
    number: 2,
    title: "Custom AI Development & Training",
    duration: "2-3 Weeks",
    icon: Settings,
    description: "Our AI Lab develops and trains custom agents specifically for your business processes.",
    activities: [
      "AI architecture design tailored to your business",
      "Custom AI model training on your specific data",
      "Integration planning with your existing systems",
      "Quality assurance testing and optimization",
      "Security and compliance configuration",
    ],
    deliverables: ["Custom AI Models", "Integration Plan", "Security Configuration"],
    color: "purple",
  },
  {
    number: 3,
    title: "Rapid Deployment & Testing",
    duration: "1-2 Weeks",
    icon: Rocket,
    description: "Quick implementation with comprehensive testing and optimization to ensure seamless operations.",
    activities: [
      "System deployment and configuration",
      "Comprehensive testing across all channels",
      "Team training and onboarding sessions",
      "Performance optimization and fine-tuning",
      "Go-live preparation and support",
    ],
    deliverables: ["Live AI System", "Team Training", "Performance Reports"],
    color: "green",
  },
  {
    number: 4,
    title: "Optimization & Ongoing Support",
    duration: "Ongoing",
    icon: BarChart3,
    description: "Continuous monitoring, regular performance reviews, and 24/7 technical support.",
    activities: [
      "24/7 system monitoring and support",
      "Regular performance reviews and optimization",
      "Continuous AI model improvements",
      "Monthly reporting and analytics",
      "Proactive issue resolution and updates",
    ],
    deliverables: ["Monthly Reports", "Performance Optimization", "24/7 Support"],
    color: "orange",
  },
]

const colorClasses = {
  blue: {
    bg: "bg-blue-600",
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    badge: "bg-blue-100 text-blue-800",
  },
  purple: {
    bg: "bg-purple-600",
    lightBg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-600",
    badge: "bg-purple-100 text-purple-800",
  },
  green: {
    bg: "bg-green-600",
    lightBg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    badge: "bg-green-100 text-green-800",
  },
  orange: {
    bg: "bg-orange-600",
    lightBg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-600",
    badge: "bg-orange-100 text-orange-800",
  },
}

export function ProcessSteps() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Proven 4-Step Process</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            A systematic approach designed specifically for SMBs that ensures successful AI transformation with
            measurable results in 4-6 weeks.
          </p>
        </div>

        {/* Timeline Overview */}
        <div className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Total Timeline: 4-6 Weeks</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-gray-900 mb-1">Step {step.number}</div>
                  <div className="text-sm text-gray-600 mb-2">{step.title}</div>
                  <Badge variant="secondary" className="text-xs">
                    {step.duration}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Steps */}
        <div className="space-y-12">
          {processSteps.map((step, index) => {
            const colors = colorClasses[step.color as keyof typeof colorClasses]
            const Icon = step.icon

            return (
              <div key={step.number} className="relative">
                {/* Connecting line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute left-8 top-20 w-0.5 h-32 bg-gray-300 z-0" />
                )}

                <Card className={`relative z-10 ${colors.lightBg} ${colors.border} border-2`}>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Step Header */}
                      <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                          <div
                            className={`w-16 h-16 ${colors.bg} text-white rounded-full flex items-center justify-center font-bold text-xl mr-4`}
                          >
                            {step.number}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <Badge className={colors.badge}>{step.duration}</Badge>
                          </div>
                        </div>

                        <div className={`w-12 h-12 ${colors.lightBg} rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${colors.text}`} />
                        </div>

                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>

                      {/* Activities */}
                      <div className="lg:col-span-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Activities</h4>
                        <ul className="space-y-3">
                          {step.activities.map((activity, activityIndex) => (
                            <li key={activityIndex} className="flex items-start space-x-3">
                              <CheckCircle className={`h-5 w-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                              <span className="text-gray-700 text-sm leading-relaxed">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div className="lg:col-span-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Deliverables</h4>
                        <div className="space-y-3">
                          {step.deliverables.map((deliverable, deliverableIndex) => (
                            <div
                              key={deliverableIndex}
                              className={`${colors.lightBg} border ${colors.border} rounded-lg p-3`}
                            >
                              <div className="flex items-center space-x-2">
                                <CheckCircle className={`h-4 w-4 ${colors.text}`} />
                                <span className="text-gray-800 font-medium text-sm">{deliverable}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Success Metrics */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Process Success Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">4-6 Weeks</div>
              <div className="text-sm text-gray-600">Average Implementation</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-sm text-gray-600">SMB Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">SMBs Successfully Deployed</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

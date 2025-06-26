"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Users, Zap, Shield } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"

const achievements = [
  {
    icon: Users,
    title: "247 Active Agents",
    description: "Highly trained professionals delivering exceptional service",
  },
  {
    icon: Zap,
    title: "94% SLA Compliance",
    description: "Consistently meeting and exceeding service level agreements",
  },
  {
    icon: Award,
    title: "92% Queue Performance",
    description: "Optimized call handling and minimal wait times",
  },
  {
    icon: Shield,
    title: "ISO 9001:2015 Certified",
    description: "International quality management standards compliance",
  },
]

export function About() {
  return (
    <section id="about" className="py-24 bg-white" aria-label="About Nobrainer Group">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Leading the AI Transformation in Customer Service
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At Nobrainer Group, we're driving an unprecedented AI transformation in customer service. Our AI Lab and R&D
            teams are at the forefront of innovation, developing cutting-edge solutions that position us as leaders in
            AI strategy for customer operations.
          </p>
        </div>

        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden">
            <OptimizedImage
              src="/images/call-center-floor.jpg"
              alt="Professional call center environment with agents working at modern workstations"
              className="w-full h-64 lg:h-96 object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-blue-900/20" aria-hidden="true"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" role="list">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300" role="listitem">
              <CardHeader>
                <achievement.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Why Choose Nobrainer Group?</h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">AI & Process Improvement Experts</h4>
                <p className="text-gray-600 mb-6">
                  Our dedicated AI Lab and R&D teams continuously innovate to deliver cutting-edge solutions that
                  transform customer service operations.
                </p>

                <h4 className="font-semibold text-gray-900 mb-3">Fortune 500 Track Record</h4>
                <p className="text-gray-600">
                  Trusted by enterprise clients worldwide, we've successfully implemented AI solutions that deliver
                  measurable results and ROI.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">24/7 Technical Support</h4>
                <p className="text-gray-600 mb-6">
                  Round-the-clock support ensures your AI-powered systems operate seamlessly, with immediate assistance
                  when you need it most.
                </p>

                <h4 className="font-semibold text-gray-900 mb-3">Scalable, Flexible Solutions</h4>
                <p className="text-gray-600">
                  Our AI solutions grow with your business, adapting to changing needs and scaling to handle increased
                  demand effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

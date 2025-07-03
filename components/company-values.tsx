import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Zap, Users, TrendingUp, CheckCircle } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "SMB-First Approach",
    description:
      "Every solution we build is designed specifically for small and medium businesses, not adapted from enterprise solutions.",
  },
  {
    icon: Shield,
    title: "Transparency & Trust",
    description:
      "No hidden fees, no long-term contracts, and clear communication about what our AI can and cannot do for your business.",
  },
  {
    icon: Zap,
    title: "Rapid Implementation",
    description:
      "We understand SMBs need results quickly. Our 4-6 week deployment timeline gets you saving money fast.",
  },
  {
    icon: Users,
    title: "Human-Centered AI",
    description:
      "Our AI enhances human capabilities rather than replacing them entirely, creating better experiences for everyone.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Results",
    description:
      "Every implementation includes clear ROI tracking and performance metrics so you can see the value we deliver.",
  },
  {
    icon: CheckCircle,
    title: "Continuous Improvement",
    description:
      "We continuously optimize and improve our AI solutions based on real-world performance and customer feedback.",
  },
]

const stats = [
  { label: "SMBs Served", value: "500+" },
  { label: "Average ROI", value: "320%" },
  { label: "Customer Satisfaction", value: "98%" },
  { label: "Years of Experience", value: "10+" },
]

export function CompanyValues() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values & Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to democratizing AI-powered customer service for small businesses, making enterprise-level
            technology accessible and affordable.
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              To empower small and medium businesses with AI-powered customer service solutions that deliver
              enterprise-level results at SMB-friendly prices. We believe every business, regardless of size, deserves
              exceptional customer service capabilities that drive growth and customer satisfaction.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

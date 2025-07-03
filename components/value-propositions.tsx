import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Clock, DollarSign, Users, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "AI-Powered Excellence",
    description: "Advanced AI handles customer inquiries with human-like understanding and response quality.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Never miss a customer inquiry. Our AI works around the clock, including weekends and holidays.",
  },
  {
    icon: DollarSign,
    title: "Massive Cost Savings",
    description: "Save $14,436+ annually per virtual assistant replaced. ROI typically achieved within 60 days.",
  },
  {
    icon: Users,
    title: "Instant Scalability",
    description: "Handle 1 or 1,000 customers simultaneously without hiring additional staff or increasing costs.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Setup",
    description: "Get up and running in under 24 hours. No complex integrations or lengthy onboarding process.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security and compliance standards protect your business and customer data.",
  },
]

export function ValuePropositions() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why SMBs Choose Nobrainer Group</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your customer service operations with AI that delivers results from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

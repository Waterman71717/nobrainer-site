import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Clock, TrendingUp, DollarSign, BarChart3 } from "lucide-react"

const benefits = [
  {
    icon: Building2,
    title: "Built for SMB Scale",
    description: "Designed specifically for businesses with 10-500 employees. No enterprise complexity, just results.",
    badge: "SMB Focused",
  },
  {
    icon: DollarSign,
    title: "Predictable Costs",
    description: "No surprise bills or hidden fees. Scale your customer service without scaling your costs.",
    badge: "Cost Control",
  },
  {
    icon: Clock,
    title: "Quick Implementation",
    description: "Get up and running in 24 hours, not months. Minimal IT resources required.",
    badge: "Fast Setup",
  },
  {
    icon: Users,
    title: "Human-AI Hybrid",
    description: "AI handles routine inquiries, escalates complex issues to your team. Best of both worlds.",
    badge: "Smart Routing",
  },
  {
    icon: TrendingUp,
    title: "Grow Without Limits",
    description: "Handle seasonal spikes and business growth without hiring additional staff.",
    badge: "Scalable",
  },
  {
    icon: BarChart3,
    title: "SMB Analytics",
    description: "Simple, actionable insights designed for busy SMB owners, not data scientists.",
    badge: "Easy Insights",
  },
]

const stats = [
  { label: "Average SMB Savings", value: "$14,436+", subtext: "per year, per VA replaced" },
  { label: "Implementation Time", value: "4-6 Weeks", subtext: "SMB deployment" },
  { label: "Customer Satisfaction", value: "98%", subtext: "SMB satisfaction rate" },
  { label: "ROI Timeline", value: "60 days", subtext: "average payback period" },
]

export function SMBBenefits() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Proven Results for SMBs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Why SMBs Love Our AI Solution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {benefit.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Case Study Highlight */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real SMB Success Story</h3>
              <div className="max-w-4xl mx-auto">
                <blockquote className="text-lg text-gray-700 italic mb-6">
                  "We replaced 2 virtual assistants costing us $3,600/month with Nobrainer's AI solution at $597/month.
                  We're saving $28,872 annually while providing better 24/7 customer service. ROI was achieved in just
                  45 days."
                </blockquote>
                <div className="text-gray-900 font-semibold">Sarah Chen, Owner</div>
                <div className="text-gray-600">Pacific Coast Outdoor Gear (127 employees)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

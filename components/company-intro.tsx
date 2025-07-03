import { CheckCircle, Users, BarChart3, Shield } from "lucide-react"

const achievements = [
  "500+ SMBs Served",
  "99.9% uptime guarantee with 24/7 monitoring",
  "Average 3.2x ROI within first 6 months",
  "ISO 27001 certified security standards",
]

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "SMBs Served",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: CheckCircle,
    value: "98%",
    label: "SMB Satisfaction",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: BarChart3,
    value: "$14,436+",
    label: "Annual Savings per VA",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Shield,
    value: "4-6 Weeks",
    label: "SMB Deployment",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

export function CompanyIntro() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Trusted by 500+ Small & Medium Businesses
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            At Nobrainer Group, we specialize in helping SMBs replace expensive virtual assistants with AI-powered
            customer service. Our solutions are designed specifically for businesses with 10-500 employees who want
            enterprise-level customer service without enterprise costs.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why SMBs Choose Nobrainer Group</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

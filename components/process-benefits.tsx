import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, DollarSign, Users, Zap, Shield, BarChart3, Headphones } from "lucide-react"
import { LeadQualificationButton } from "@/components/lead-qualification-button"

const benefits = [
  {
    icon: Clock,
    title: "Rapid Implementation",
    description: "Get up and running in 4-6 weeks, not months",
    details: [
      "Streamlined process designed for SMBs",
      "Minimal disruption to daily operations",
      "Quick time-to-value with immediate results",
      "No lengthy enterprise-style implementations",
    ],
    badge: "Speed",
    color: "blue",
  },
  {
    icon: DollarSign,
    title: "Immediate Cost Savings",
    description: "Start saving money from day one of deployment",
    details: [
      "Replace expensive virtual assistants",
      "Reduce operational overhead costs",
      "Eliminate hiring and training expenses",
      "Predictable monthly costs with no surprises",
    ],
    badge: "ROI",
    color: "green",
  },
  {
    icon: Users,
    title: "SMB-Focused Approach",
    description: "Solutions designed specifically for small businesses",
    details: [
      "No complex enterprise features you don't need",
      "Pricing that fits SMB budgets",
      "Support team that understands SMB challenges",
      "Scalable solutions that grow with your business",
    ],
    badge: "SMB-First",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Proven Methodology",
    description: "Battle-tested process with 500+ successful deployments",
    details: [
      "Refined through hundreds of SMB implementations",
      "Clear milestones and deliverables at each step",
      "Risk mitigation strategies built into the process",
      "Continuous improvement based on real-world results",
    ],
    badge: "Proven",
    color: "orange",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Bank-level security without enterprise complexity",
    details: [
      "ISO 27001 certified security standards",
      "Data encryption and privacy protection",
      "Compliance with industry regulations",
      "Regular security audits and updates",
    ],
    badge: "Secure",
    color: "red",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock support throughout the entire process",
    details: [
      "Dedicated support during implementation",
      "24/7 technical support post-deployment",
      "Regular check-ins and optimization sessions",
      "Proactive monitoring and issue resolution",
    ],
    badge: "Support",
    color: "indigo",
  },
]

const processStats = [
  {
    metric: "4-6 Weeks",
    description: "Average Implementation Time",
    icon: Clock,
  },
  {
    metric: "$14,436+",
    description: "Annual Savings per VA Replaced",
    icon: DollarSign,
  },
  {
    metric: "98%",
    description: "SMB Satisfaction Rate",
    icon: Users,
  },
  {
    metric: "99.9%",
    description: "Uptime Guarantee",
    icon: Shield,
  },
]

const colorClasses = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  orange: "bg-orange-100 text-orange-800",
  red: "bg-red-100 text-red-800",
  indigo: "bg-indigo-100 text-indigo-800",
}

export function ProcessBenefits() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Our Process Works for SMBs</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our implementation process is specifically designed for small and medium businesses, delivering enterprise
            results without enterprise complexity or costs.
          </p>
        </div>

        {/* Process Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {processStats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.metric}</div>
                <div className="text-gray-600 font-medium">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge className={colorClasses[benefit.color as keyof typeof colorClasses]}>{benefit.badge}</Badge>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{benefit.title}</CardTitle>
                <p className="text-gray-600">{benefit.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {benefit.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Story */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Real SMB Success Story</h3>
              <div className="max-w-4xl mx-auto">
                <blockquote className="text-lg md:text-xl text-blue-100 italic mb-6 leading-relaxed">
                  "The Nobrainer Group process was exactly what we needed as a small business. They understood our
                  constraints, worked within our timeline, and delivered results that exceeded our expectations. We went
                  from spending $3,600/month on VAs to $597/month on AI, and our customer service actually improved!"
                </blockquote>
                <div className="text-white font-semibold text-lg">Zara Okafor, Owner</div>
                <div className="text-blue-200">Pacific Coast Outdoor Gear (127 employees)</div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-300">$28,872</div>
                    <div className="text-blue-200 text-sm">Annual Savings</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-300">5 Weeks</div>
                    <div className="text-blue-200 text-sm">Implementation Time</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-300">24/7</div>
                    <div className="text-blue-200 text-sm">Customer Service</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your AI Transformation?</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 500+ SMBs who have successfully transformed their customer service with our proven process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Card className="bg-blue-600 text-white border-0 p-6 max-w-sm">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Free ROI Analysis</h4>
                <p className="text-blue-100 text-sm mb-4">Get a custom calculation of your potential savings</p>
                <LeadQualificationButton
                  eventName="process_calculate_savings_click"
                  redirectTo="/smb-solutions#roi-calculator"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  size="sm"
                >
                  Calculate Savings
                </LeadQualificationButton>
              </div>
            </Card>
            <Card className="bg-green-600 text-white border-0 p-6 max-w-sm">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Free Consultation</h4>
                <p className="text-green-100 text-sm mb-4">Speak with our SMB specialists about your needs</p>
                <LeadQualificationButton
                  eventName="process_book_consultation_click"
                  redirectTo="/contact"
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
                  size="sm"
                >
                  Book Consultation
                </LeadQualificationButton>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

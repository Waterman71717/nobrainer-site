import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Phone, BarChart3, Headphones, Zap, Shield } from "lucide-react"

const services = [
  {
    icon: Bot,
    title: "AI Agent Development",
    description:
      "Custom AI agents trained on your specific business processes, FAQs, and customer interaction patterns for optimal performance.",
  },
  {
    icon: Phone,
    title: "Call Center Automation",
    description:
      "End-to-end automation of inbound and outbound call processes with intelligent routing and response capabilities.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Real-time dashboards and insights to monitor agent performance, customer satisfaction, and operational efficiency.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Round-the-clock AI-powered customer service that never sleeps, ensuring your customers always receive immediate assistance.",
  },
  {
    icon: Zap,
    title: "Rapid Implementation",
    description:
      "Quick deployment with minimal disruption to your existing operations, typically live within 24-48 hours.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "ISO 9001:2015 certified processes with bank-level security to protect your customer data and business information.",
  },
]

export function ServiceOfferings() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive AI Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From initial consultation to full deployment, we provide end-to-end AI call center solutions tailored to
            your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

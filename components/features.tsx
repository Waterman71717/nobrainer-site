import { Bot, MessageSquare, BarChart3, Clock, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "Advanced AI Chatbots",
    description:
      "Intelligent conversational AI that handles complex customer inquiries with human-like responses and continuous learning capabilities.",
  },
  {
    icon: MessageSquare,
    title: "Omnichannel Support",
    description:
      "Seamlessly integrate across phone, chat, email, and social media platforms for consistent customer experience everywhere.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description:
      "Data-driven insights that predict customer behavior, optimize response times, and identify improvement opportunities.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Round-the-clock customer support that never sleeps, ensuring your customers get help whenever they need it.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level security protocols with end-to-end encryption, compliance certifications, and data protection guarantees.",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description:
      "Get up and running in days, not months. Our streamlined setup process gets your AI solution live quickly.",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our AI Solutions?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive AI platform delivers measurable results that transform your customer service operations
            and drive business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

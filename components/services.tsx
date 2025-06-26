import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Route, BarChart3, Headphones, MessageSquare, Zap } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"

const services = [
  {
    icon: Bot,
    title: "Generative AI Chatbots",
    description: "95% accuracy in handling diverse inquiries, freeing agents for complex interactions",
    stat: "95% Accuracy",
  },
  {
    icon: Route,
    title: "Intelligent Call Routing",
    description: "AI-powered routing system that reduces resolution time by 40%",
    stat: "40% Faster",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Advanced analytics delivering 30% cost reduction through data-driven insights",
    stat: "30% Cost Reduction",
  },
  {
    icon: Headphones,
    title: "AI-Powered Quality Assurance",
    description: "Real-time analysis and coaching that boosts agent performance",
    stat: "60% Productivity Boost",
  },
  {
    icon: MessageSquare,
    title: "Conversational IVR/IVA",
    description: "Natural language interactions that significantly reduce wait times",
    stat: "Reduced Wait Times",
  },
  {
    icon: Zap,
    title: "AI Chat Response Suggestions",
    description: "Real-time AI assistance empowering agents with smart response suggestions",
    stat: "Enhanced Performance",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50" aria-label="AI-powered services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">AI-Powered Solutions That Transform</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of AI capabilities is designed to optimize your customer service operations and
            drive measurable results across every touchpoint.
          </p>
        </div>

        <div className="mb-16">
          <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden">
            <OptimizedImage
              src="/images/ai-contact-center-agent.png"
              alt="Professional customer service representative with headset providing AI-powered support"
              className="w-full h-64 lg:h-80 object-cover object-center"
              priority={true}
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" aria-hidden="true"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold mb-2">AI-Powered Customer Experience</h3>
              <p className="text-blue-100">Next-generation technology meets human expertise</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300" role="listitem">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <service.icon className="h-10 w-10 text-blue-600" aria-hidden="true" />
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {service.stat}
                  </span>
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, GitBranch, BarChart3, Headphones, MessageSquare, Zap } from "lucide-react"

const solutions = [
  {
    icon: Bot,
    title: "Generative AI Chatbots",
    description: "95% accuracy in handling diverse inquiries, freeing agents for complex interactions",
    metric: "95% Accuracy",
    metricColor: "blue",
  },
  {
    icon: GitBranch,
    title: "Intelligent Call Routing",
    description: "AI-powered routing system that reduces resolution time by 40%",
    metric: "40% Faster",
    metricColor: "blue",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Advanced analytics delivering 30% cost reduction through data-driven insights",
    metric: "30% Cost Reduction",
    metricColor: "blue",
  },
  {
    icon: Headphones,
    title: "AI-Powered Quality Assurance",
    description: "Real-time analysis and coaching that boosts agent performance",
    metric: "60% Productivity Boost",
    metricColor: "blue",
  },
  {
    icon: MessageSquare,
    title: "Conversational IVR/IVA",
    description: "Natural language interactions that significantly reduce wait times",
    metric: "Reduced Wait Times",
    metricColor: "blue",
  },
  {
    icon: Zap,
    title: "AI Chat Response Suggestions",
    description: "Real-time AI assistance empowering agents with smart response suggestions",
    metric: "Enhanced Performance",
    metricColor: "blue",
  },
]

export function AISolutionsGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI-Powered Solutions That Transform</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our comprehensive suite of AI capabilities is designed to optimize your customer service operations and
            drive measurable results across every touchpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon

            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-semibold">
                      {solution.metric}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

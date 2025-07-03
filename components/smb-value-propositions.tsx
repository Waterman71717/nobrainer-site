import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Clock, MessageSquare, Phone, Mail, Smartphone } from "lucide-react"

const valueProps = [
  {
    icon: DollarSign,
    title: "Replace Virtual Assistants",
    description: "Transform your customer service economics",
    highlight: "$1,800/month → $597/month",
    savings: "Save $1,203 monthly per VA replaced",
  },
  {
    icon: Clock,
    title: "4-6 Week SMB Deployment",
    description: "Fast implementation designed for small business needs",
    highlight: "Quick Setup",
    savings: "Minimal disruption to operations",
  },
  {
    icon: MessageSquare,
    title: "Complete Omni-Channel Solution",
    description: "All customer touchpoints covered in one platform",
    highlight: "AI Chatbots, Voice AI & IVR, Live Chat, SMS Automation",
    savings: "Unified customer experience",
  },
]

export function SMBValuePropositions() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built Specifically for Small & Medium Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop overpaying for virtual assistants. Our AI solution delivers superior customer service at a fraction of
            the cost.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {valueProps.map((prop, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <prop.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{prop.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{prop.description}</p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-lg font-bold text-green-800 mb-1">{prop.highlight}</div>
                  <div className="text-sm text-green-600">{prop.savings}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Omni-Channel Breakdown */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Complete Omni-Channel Coverage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">AI Chatbots</h4>
              <p className="text-sm text-gray-600">Website & social media automation</p>
            </div>
            <div className="text-center p-4">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Voice AI & IVR</h4>
              <p className="text-sm text-gray-600">Intelligent call routing & responses</p>
            </div>
            <div className="text-center p-4">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
              <p className="text-sm text-gray-600">Real-time website support</p>
            </div>
            <div className="text-center p-4">
              <Smartphone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">SMS Automation</h4>
              <p className="text-sm text-gray-600">Automated text messaging</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

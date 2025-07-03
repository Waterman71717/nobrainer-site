import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "AI Starter",
    price: 297,
    description: "Perfect for small businesses getting started",
    features: ["Up to 500 conversations/month", "Basic AI chatbot", "Email support", "Standard integrations"],
    popular: false,
  },
  {
    name: "AI Professional",
    price: 597,
    description: "Most popular choice for growing SMBs",
    features: [
      "Up to 2,000 conversations/month",
      "Advanced AI with Voice & IVR",
      "Priority support",
      "All integrations included",
      "SMS automation",
      "Live chat",
    ],
    popular: true,
  },
  {
    name: "AI Enterprise",
    price: 1197,
    description: "For established businesses with high volume",
    features: [
      "Unlimited conversations",
      "Premium AI with custom models",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
    ],
    popular: false,
  },
]

export function PricingPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">SMB-Friendly Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent pricing designed for small business budgets. No hidden fees, no long-term contracts.
          </p>
          <div className="mt-6 inline-block bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
            Save $14,436+ annually per Virtual Assistant replaced
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-2 border-blue-500 shadow-xl" : "border shadow-lg"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link href="/pricing">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/pricing">
              View Complete Pricing <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, Phone, Mail } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    name: "AI Starter",
    price: "$447",
    originalPrice: null,
    period: "Months 1-6, then $297/month",
    setupFee: "+ $497 setup fee",
    description: "Perfect for small businesses getting started with AI automation",
    features: [
      "Basic AI Chatbots",
      "Voice AI & IVR (5 agents)",
      "Live Chat Support",
      "SMS Automation",
      "Basic Analytics",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "AI Professional",
    price: "$847",
    originalPrice: null,
    period: "Months 1-6, then $597/month",
    setupFee: "+ $997 setup fee",
    description: "Most popular choice for growing businesses",
    features: [
      "Advanced AI Chatbots",
      "Voice AI & IVR (20 agents)",
      "AI-Powered Live Chat",
      "Advanced SMS Automation",
      "Predictive Analytics",
      "CRM Integration",
    ],
    popular: true,
    cta: "Get Started",
  },
  {
    name: "AI Enterprise",
    price: "$1,597",
    originalPrice: null,
    period: "Months 1-6, then $1,197/month",
    setupFee: "+ $1,497 setup fee",
    description: "Complete solution for large organizations",
    features: [
      "Enterprise AI Chatbots",
      "Advanced Voice AI & IVR",
      "Complete Live Chat Suite",
      "Full SMS Automation",
      "Advanced Analytics",
      "Unlimited Integrations",
      "24/7 Premium Support",
    ],
    popular: false,
    cta: "Get Started",
  },
]

export function PricingTiers() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your AI Solution</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. All plans include setup, training, and ongoing support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative ${
                tier.popular ? "border-2 border-blue-500 shadow-xl pt-8" : "border border-gray-200 pt-6"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Star className="h-4 w-4 fill-current" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</CardTitle>
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900 mb-1">{tier.price}</div>
                  <div className="text-sm text-gray-600 mb-1">{tier.period}</div>
                  <div className="text-sm text-gray-500">{tier.setupFee}</div>
                </div>
                <p className="text-gray-600 text-sm">{tier.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/contact">{tier.cta}</Link>
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" size="sm" className="text-xs bg-transparent">
                      <Link
                        href={`mailto:info@nobrainergroup.com?subject=${encodeURIComponent(`${tier.name} Plan Inquiry`)}&body=${encodeURIComponent(`Hi, I'm interested in learning more about the ${tier.name} plan. Please provide more details about pricing and features.`)}`}
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Send Email
                      </Link>
                    </Button>

                    <Button asChild variant="outline" size="sm" className="text-xs bg-transparent">
                      <Link href="tel:+18666295754">
                        <Phone className="h-3 w-3 mr-1" />
                        Call Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Solution Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-dashed border-gray-300 bg-white">
            <CardContent className="text-center py-12">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Need a Custom Solution?</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Every business is unique. Let our AI experts design a custom solution tailored to your specific
                  requirements, industry, and scale.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800">
                  <Link href="/contact">Contact Our AI Experts</Link>
                </Button>

                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="mailto:info@nobrainergroup.com?subject=Custom%20AI%20Solution%20Request&body=Hi%2C%20I%27m%20interested%20in%20a%20custom%20AI%20solution%20for%20my%20business.%20Please%20contact%20me%20to%20discuss%20my%20specific%20requirements.">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="sm">
                    <Link href="tel:+18666295754">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>✓ Free consultation • ✓ Custom pricing • ✓ Dedicated support</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

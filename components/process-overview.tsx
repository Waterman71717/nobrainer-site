import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Settings, Rocket } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    icon: MessageSquare,
    title: "Free Consultation",
    description: "We analyze your current call center operations and identify AI automation opportunities.",
  },
  {
    icon: Settings,
    title: "Custom Development",
    description: "Our AI Lab develops and trains custom agents specifically for your business processes.",
  },
  {
    icon: Rocket,
    title: "Rapid Deployment",
    description: "Quick implementation with full testing and optimization to ensure seamless operations.",
  },
]

export function ProcessOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Proven Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A streamlined approach that gets you from consultation to full AI implementation in record time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/process">
              View Detailed Process <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

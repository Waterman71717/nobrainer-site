import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Target } from "lucide-react"

const teamMembers = [
  {
    name: "Leadership Team",
    role: "Experienced AI & Business Leaders",
    description: "Our leadership brings decades of experience in AI, customer service, and small business operations.",
    icon: Users,
  },
  {
    name: "AI Specialists",
    role: "Machine Learning Engineers",
    description:
      "Expert AI engineers who design and optimize our customer service solutions for maximum effectiveness.",
    icon: Award,
  },
  {
    name: "SMB Consultants",
    role: "Small Business Experts",
    description: "Dedicated consultants who understand the unique challenges and opportunities facing SMBs.",
    icon: Target,
  },
]

export function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expert Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A dedicated team of AI specialists, business consultants, and customer service experts focused on helping
            SMBs succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <member.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{member.name}</CardTitle>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why We're Different</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Unlike generic AI companies, we specialize exclusively in small and medium businesses. We understand your
              challenges, budget constraints, and growth goals. Our team has helped 500+ SMBs transform their customer
              service operations with measurable results.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { SMBHero } from "@/components/smb-hero"
import { SMBValuePropositions } from "@/components/smb-value-propositions"
import { CompanyIntro } from "@/components/company-intro"
import { ContactWidget } from "@/components/contact-widget"
import { ROICalculator } from "@/components/roi-calculator"

export default function SMBSolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SMBHero />

      {/* ROI Calculator Section - moved to top */}
      <section id="roi-calculator" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ROICalculator />
        </div>
      </section>

      <SMBValuePropositions />
      <CompanyIntro />

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect with Our Enterprise Solutions Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Speak directly with our specialists to discuss your specific requirements and receive personalized
              recommendations for your business.
            </p>
          </div>
          <ContactWidget />
        </div>
      </section>
    </div>
  )
}

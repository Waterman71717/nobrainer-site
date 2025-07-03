import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Nobrainer Group",
  description: "Terms of Service for Nobrainer Group AI-powered call center solutions",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <p className="text-gray-600 mb-8">Last updated: 7/1/2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using our services, you accept and agree to be bound by the terms and provision of this
              agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-700 leading-relaxed">
              Nobrainer Group provides AI-powered call center solutions and customer service optimization services to
              businesses worldwide.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall Nobrainer Group be liable for any indirect, incidental, special, consequential, or
              punitive damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms of Service, contact us at{" "}
              <a href="mailto:info@nobrainergroup.com" className="text-blue-600 hover:text-blue-800 underline">
                info@nobrainergroup.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

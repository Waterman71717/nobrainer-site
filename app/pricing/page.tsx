import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/contact"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SkipNav } from "@/components/skip-nav"
import { Analytics } from "@/components/analytics"
import { ErrorBoundary } from "@/components/error-boundary"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Powered IVR Solutions Pricing",
  description: "Professional pricing for Nobrainer Group's AI-powered IVR solutions. Transparent pricing tiers from $999 setup. Transform your business communication today.",
  keywords: [
    "IVR pricing",
    "AI call center pricing", 
    "intelligent voice response cost",
    "business phone system pricing",
    "automated customer service pricing"
  ],
  openGraph: {
    title: "AI-Powered IVR Solutions Pricing | Nobrainer Group",
    description: "Professional pricing for AI-powered IVR solutions. Transparent tiers starting from $999 setup.",
    url: "https://nobrainergroup.com/pricing",
    type: "website",
  },
  alternates: {
    canonical: "https://nobrainergroup.com/pricing",
  },
}

export default function PricingPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <SkipNav />
        <Analytics />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {/* Hero Section with Image */}
          <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    AI-Powered IVR Solutions
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Transform your business communication with scalable, efficient, and professional call handling solutions designed for every business size.
                  </p>
                </div>
                <div className="relative">
                  <img 
                    src="https://cdn1.genspark.ai/user-upload-image/22_generated/4a172220-9d73-4ee2-bf5d-16ca9e95fc55"
                    alt="Nobrainer Group AI-powered customer service representative with advanced IVR technology interface"
                    className="rounded-2xl shadow-2xl w-full h-auto"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* AI Technology Features with Image */}
          <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Powered by Advanced AI Technology
                </h2>
                <p className="text-lg text-gray-600">
                  Our IVR systems leverage cutting-edge AI capabilities to ensure comprehensive language support and advanced functionality
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <img 
                    src="https://cdn1.genspark.ai/user-upload-image/22_generated/434d0a8c-1032-4e9b-9add-cf713ce1dd21"
                    alt="Nobrainer Group modern AI-driven call center with advanced analytics and routing systems"
                    className="rounded-2xl shadow-xl w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <div className="grid md:grid-cols-1 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">🤖 Generative AI Chatbots</h3>
                    <p className="text-gray-600 mb-2">95% accuracy in handling inquiries</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">⚡ Intelligent Call Routing</h3>
                    <p className="text-gray-600 mb-2">40% faster resolution time</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">📊 Predictive Analytics</h3>
                    <p className="text-gray-600 mb-2">35% reduction in operational costs</p>
                  </div>
                </div>
              </div>

              <div className="text-center bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Language Support</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">130+</div>
                    <div className="text-gray-600">Languages for voice bots</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">82+</div>
                    <div className="text-gray-600">ASR languages</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">90+</div>
                    <div className="text-gray-600">TTS languages</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Business Communication Section with Third Image */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Professional Business Communication
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Streamline your business operations with AI-powered communication solutions that enhance customer experience and boost efficiency.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>24/7 automated customer support</li>
                    <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>Intelligent call routing and prioritization</li>
                    <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>Multi-language support for global reach</li>
                    <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>Real-time analytics and reporting</li>
                  </ul>
                </div>
                <div>
                  <img 
                    src="https://cdn1.genspark.ai/user-upload-image/22_generated/e89c717d-3031-43e1-bbd4-fa16246768e7"
                    alt="Professional business communication setup featuring Nobrainer Group AI voice interface technology"
                    className="rounded-2xl shadow-xl w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Pricing Tiers */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Choose Your Perfect Plan
                </h2>
                <p className="text-lg text-gray-600">
                  All plans include comprehensive setup, training, and ongoing support
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {/* Essential Helper */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Essential Helper</h3>
                    <p className="text-gray-600 mb-4">Perfect for Solo Entrepreneurs</p>
                    <div className="text-3xl font-bold text-blue-600 mb-2">$999</div>
                    <div className="text-sm text-gray-500 mb-2">One-time setup</div>
                    <div className="text-2xl font-bold text-gray-900">$150/mo</div>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Up to 5 IVR menu options</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Basic call routing</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Customized voicemail</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Email support</li>
                  </ul>
                </div>

                {/* Efficient Operator */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-500 p-8 hover:shadow-xl transition-shadow relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Efficient Operator</h3>
                    <p className="text-gray-600 mb-4">Built for Growing Teams</p>
                    <div className="text-3xl font-bold text-blue-600 mb-2">$1,565</div>
                    <div className="text-sm text-gray-500 mb-2">One-time setup</div>
                    <div className="text-2xl font-bold text-gray-900">$299/mo</div>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Up to 10 IVR menu options</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Advanced call routing</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Up to 5 SMS templates</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Appointment reminders</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Priority email & phone support</li>
                  </ul>
                </div>

                {/* Total Customer Care */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Total Customer Care</h3>
                    <p className="text-gray-600 mb-4">Complete Business Solution</p>
                    <div className="text-3xl font-bold text-blue-600 mb-2">$2,448</div>
                    <div className="text-sm text-gray-500 mb-2">One-time setup</div>
                    <div className="text-2xl font-bold text-gray-900">$499/mo</div>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Unlimited menu options</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>CRM integration</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Custom voice branding</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Dedicated account manager</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Advanced analytics</li>
                  </ul>
                </div>

                {/* Enterprise */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow text-white">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                    <p className="text-gray-300 mb-4">High-Volume Operations</p>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">Custom</div>
                    <div className="text-sm text-gray-300 mb-2">Pricing</div>
                    <div className="text-2xl font-bold">Quote Required</div>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center"><span className="text-yellow-400 mr-2">✓</span>Fully customizable</li>
                    <li className="flex items-center"><span className="text-yellow-400 mr-2">✓</span>Multiple locations</li>
                    <li className="flex items-center"><span className="text-yellow-400 mr-2">✓</span>Advanced integrations</li>
                    <li className="flex items-center"><span className="text-yellow-400 mr-2">✓</span>SLA guarantees</li>
                    <li className="flex items-center"><span className="text-yellow-400 mr-2">✓</span>Enterprise support</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section with HubSpot Form */}
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  )
}

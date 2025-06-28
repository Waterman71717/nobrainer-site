"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/contact"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ErrorBoundary } from "@/components/error-boundary"
import type { Metadata } from "next"

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [clickedButton, setClickedButton] = useState<string | null>(null)

  const handlePlanClick = (plan: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    console.log(`Plan clicked: ${plan}`)
    setSelectedPlan(plan)
    setClickedButton(plan)
    
    // Add small delay then scroll to contact
    setTimeout(() => {
      const contactElement = document.getElementById("contact")
      if (contactElement) {
        contactElement.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        })
      }
    }, 100)

    // Reset clicked state after shorter delay
    setTimeout(() => {
      setClickedButton(null)
    }, 600)
  }

  const getButtonStyle = (plan: string, baseClasses: string) => {
    const isClicked = clickedButton === plan
    const isSelected = selectedPlan === plan
    
    if (isClicked) {
      return `${baseClasses} opacity-90 scale-95 transition-all duration-300`
    }
    if (isSelected) {
      return `${baseClasses} ring-2 ring-offset-2 ring-blue-500`
    }
    return baseClasses
  }

  const getButtonContent = (plan: string, defaultText: string) => {
    const isClicked = clickedButton === plan
    
    if (isClicked) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Selected</span>
        </div>
      )
    }
    
    return defaultText
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-left">
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                    AI-Powered Call Center <span className="text-blue-600">Solutions</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                    Transform your customer service with cutting-edge AI automation. Choose the perfect plan to revolutionize your customer experience and boost efficiency.
                  </p>
                  <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      500+ Clients Served
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      98% Satisfaction Rate
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      40% Cost Reduction
                    </div>
                  </div>
                </div>
                
                {/* Right Image */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src="https://page1.genspark.site/v1/base64_upload/166c0f4408c20a3d73b3c5dd2f5c084f"
                      alt="AI-powered call center agent with futuristic digital interface overlays"
                      className="w-full h-auto object-cover"
                      loading="eager"
                    />
                    {/* Overlay for better text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                  
                  {/* Floating stats cards */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border">
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div className="text-sm text-gray-600">AI Support</div>
                  </div>
                  
                  <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Choose Your <span className="text-blue-600">Perfect Plan</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From startups to enterprise organizations, we have the right AI solution to transform your customer service operations.
                </p>
              </div>

              {/* Pricing Grid */}
              <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
                {/* Essential Helper */}
                <div className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border ${
                  selectedPlan === "Essential Helper" ? "ring-2 ring-blue-400 -translate-y-2" : "border-gray-200"
                }`}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Essential Helper</h3>
                    <p className="text-gray-600 mb-4">Perfect for Solo Entrepreneurs</p>
                    <div className="text-3xl font-bold text-blue-600 mb-2">$999</div>
                    <div className="text-sm text-gray-500 mb-2">One-time setup</div>
                    <div className="text-2xl font-bold mb-4">$150/mo</div>
                  </div>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Up to 5 IVR menu options
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Basic call routing
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Customized voicemail
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Email support
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("Essential Helper", e)}
                    disabled={clickedButton === "Essential Helper"}
                    className={getButtonStyle("Essential Helper", "w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg")}
                  >
                    {getButtonContent("Essential Helper", "Get Started")}
                  </button>
                </div>

                {/* Efficient Operator */}
                <div className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border ${
                  selectedPlan === "Efficient Operator" ? "ring-2 ring-blue-400 -translate-y-2" : "border-gray-200"
                }`}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Efficient Operator</h3>
                    <p className="text-gray-600 mb-4">Built for Growing Teams</p>
                    <div className="text-3xl font-bold text-blue-600 mb-2">$1,565</div>
                    <div className="text-sm text-gray-500 mb-2">One-time setup</div>
                    <div className="text-2xl font-bold mb-4">$299/mo</div>
                  </div>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Up to 10 IVR menu options
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Advanced call routing
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Up to 5 SMS templates
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Appointment reminders
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Priority email & phone support
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("Efficient Operator", e)}
                    disabled={clickedButton === "Efficient Operator"}
                    className={getButtonStyle("Efficient Operator", "w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg")}
                  >
                    {getButtonContent("Efficient Operator", "Get Started")}
                  </button>
                </div>

                {/* Total Customer Care - MOST POPULAR */}
                <div className={`bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-green-400 relative ${
                  selectedPlan === "Total Customer Care" ? "ring-2 ring-green-500 -translate-y-2" : ""
                }`}>
                  {/* Most Popular Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                  
                  <div className="text-center mb-6 mt-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Total Customer Care</h3>
                    <p className="text-gray-600 mb-4">Complete Business Solution</p>
                    <div className="text-3xl font-bold text-green-600 mb-2">$2,448</div>
                    <div className="text-sm text-gray-500 mb-2">One-time setup</div>
                    <div className="text-2xl font-bold mb-4">$499/mo</div>
                  </div>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Unlimited menu options
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>CRM integration
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Custom voice branding
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Dedicated account manager
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Advanced analytics
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("Total Customer Care", e)}
                    disabled={clickedButton === "Total Customer Care"}
                    className={getButtonStyle("Total Customer Care", "w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg transform hover:scale-105")}
                  >
                    {getButtonContent("Total Customer Care", "Get Started")}
                  </button>
                </div>

                {/* Enterprise */}
                <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-white ${
                  selectedPlan === "Enterprise" ? "ring-2 ring-yellow-400 -translate-y-2" : ""
                }`}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                    <p className="text-gray-300 mb-4">High-Volume Operations</p> 
                    <div className="text-3xl font-bold text-yellow-400 mb-2">Custom</div>
                    <div className="text-sm text-gray-300 mb-2">Pricing</div>
                    <div className="text-2xl font-bold mb-4">Quote Required</div>
                  </div>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>Fully customizable
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>Multiple locations
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>Advanced integrations
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>SLA guarantees
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>Enterprise support
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("Enterprise", e)}
                    disabled={clickedButton === "Enterprise"}
                    className={getButtonStyle("Enterprise", "w-full bg-yellow-500 text-gray-900 py-4 px-6 rounded-xl font-semibold hover:bg-yellow-400 transition-colors shadow-lg")}
                  >
                    {getButtonContent("Enterprise", "Contact Sales")}
                  </button>
                </div>
              </div>

              {/* Selected Plan Display */}
              {selectedPlan && (
                <div className="text-center mt-16">
                  <div className="inline-block p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-center space-x-3"> 
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">✓</span>
                      </div>
                      <div>
                        <p className="text-green-800 font-bold text-xl">
                          Selected Plan: <strong>{selectedPlan}</strong>
                        </p>
                        <p className="text-green-700 text-sm mt-1">
                          Scroll down to complete your consultation request
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Free Consultation CTA */}
              <div className="text-center mt-20 bg-gradient-to-r from-blue-50 to-purple-50 p-12 rounded-3xl border border-blue-100">
                <div className="max-w-3xl mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Not Sure Which Plan Is Right for You?</h3>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Our AI specialists will assess your unique business needs and recommend the perfect solution tailored specifically for your organization.
                  </p>
                  <button
                    onClick={(e) => handlePlanClick("Free Consultation", e)}
                    disabled={clickedButton === "Free Consultation"}
                    className={getButtonStyle("Free Consultation", "bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1")}
                  >
                    {getButtonContent("Free Consultation", "Schedule Free Consultation")}
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    Free 30-minute consultation • No commitment required • Expert guidance included
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  )
}

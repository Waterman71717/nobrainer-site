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
          {/* Pricing-Focused Hero Section */}
          <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content - Pricing Focused */}
                <div className="text-left">
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                    Simple, <span className="text-blue-600">Transparent</span> Pricing
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                    Choose the plan that fits your business size and goals. Graduated pricing protects your investment with lower ongoing costs after initial setup period.
                  </p>
                  <div className="flex flex-wrap gap-6 text-lg">
                    <div className="flex items-center text-green-600">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      No hidden fees
                    </div>
                    <div className="flex items-center text-green-600">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Lower costs after setup
                    </div>
                    <div className="flex items-center text-green-600">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Protected investment
                    </div>
                  </div>
                </div>
                
                {/* Right Image */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src="https://page1.genspark.site/v1/base64_upload/166c0f4408c20a3d73b3c5dd2f5c084f"
                      alt="Professional consultation for AI call center pricing plans"
                      className="w-full h-auto object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                  
                  {/* Floating cards */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border">
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                  
                  <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border">
                    <div className="text-2xl font-bold text-green-600">Free</div>
                    <div className="text-sm text-gray-600">Consultation</div>
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
                  Choose Your <span className="text-blue-600">AI Solution</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Graduated pricing model: Higher initial months cover setup costs, then lower ongoing rates for long-term value.
                </p>
              </div>

              {/* Pricing Grid */}
              <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
                {/* AI Starter */}
                <div className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border ${
                  selectedPlan === "AI Starter" ? "ring-2 ring-blue-400 -translate-y-2" : "border-gray-200"
                }`}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">AI Starter</h3>
                    <p className="text-gray-600 mb-4">Basic AI Automation</p>
                    
                    {/* Graduated Pricing Display */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="text-lg font-bold text-blue-600 mb-1">$447/month</div>
                      <div className="text-xs text-gray-500 mb-2">Months 1-6</div>
                      <div className="text-2xl font-bold text-green-600 mb-1">$297/month</div>
                      <div className="text-xs text-gray-500">Month 7+</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">+ $497 setup fee</div>
                  </div>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Basic Generative AI Chatbot
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Simple Call Routing (5 agents max)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Basic Conversational IVR
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Basic Analytics Dashboard
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Email & Chat Support
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("AI Starter", e)}
                    disabled={clickedButton === "AI Starter"}
                    className={getButtonStyle("AI Starter", "w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg")}
                  >
                    {getButtonContent("AI Starter", "Get Started")}
                  </button>
                </div>

                {/* AI Professional */}
                <div className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border ${
                  selectedPlan === "AI Professional" ? "ring-2 ring-blue-400 -translate-y-2" : "border-gray-200"
                }`}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">AI Professional</h3>
                    <p className="text-gray-600 mb-4">Advanced AI Intelligence</p>
                    
                    {/* Graduated Pricing Display */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="text-lg font-bold text-blue-600 mb-1">$847/month</div>
                      <div className="text-xs text-gray-500 mb-2">Months 1-6</div>
                      <div className="text-2xl font-bold text-green-600 mb-1">$597/month</div>
                      <div className="text-xs text-gray-500">Month 7+</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">+ $997 setup fee</div>
                  </div>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Advanced Generative AI Chatbot
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Intelligent Call Routing (20 agents)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>AI Chat Response Suggestions
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Advanced Conversational IVR/IVA
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Basic Predictive Analytics
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>CRM Integration
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Priority Email & Phone Support
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("AI Professional", e)}
                    disabled={clickedButton === "AI Professional"}
                    className={getButtonStyle("AI Professional", "w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg")}
                  >
                    {getButtonContent("AI Professional", "Get Started")}
                  </button>
                </div>

                {/* AI Enterprise - MOST POPULAR */}
                <div className={`bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-green-400 relative ${
                  selectedPlan === "AI Enterprise" ? "ring-2 ring-green-500 -translate-y-2" : ""
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">AI Enterprise</h3>
                    <p className="text-gray-600 mb-4">Complete AI Solution</p>
                    
                    {/* Graduated Pricing Display */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="text-lg font-bold text-blue-600 mb-1">$1,597/month</div>
                      <div className="text-xs text-gray-500 mb-2">Months 1-6</div>
                      <div className="text-2xl font-bold text-green-600 mb-1">$1,197/month</div>
                      <div className="text-xs text-gray-500">Month 7+</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">+ $1,497 setup fee</div>
                  </div>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Enterprise Generative AI Chatbot
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Advanced Intelligent Call Routing
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Full Predictive Analytics Suite
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Advanced Conversational IVR/IVA
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>AI Chat Response Suggestions
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Unlimited Agents & Integrations
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>Dedicated Account Manager
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>24/7 Premium Support
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("AI Enterprise", e)}
                    disabled={clickedButton === "AI Enterprise"}
                    className={getButtonStyle("AI Enterprise", "w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg transform hover:scale-105")}
                  >
                    {getButtonContent("AI Enterprise", "Get Started")}
                  </button>
                </div>

                {/* Custom AI Solutions */}
                <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-white ${
                  selectedPlan === "Custom AI Solutions" ? "ring-2 ring-yellow-400 -translate-y-2" : ""
                }`}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Custom AI Solutions</h3>
                    <p className="text-gray-300 mb-4">Tailored AI Architecture</p> 
                    <div className="text-3xl font-bold text-yellow-400 mb-2">Custom</div>
                    <div className="text-sm text-gray-300 mb-2">Pricing</div>
                    <div className="text-2xl font-bold mb-4">Quote Required</div>
                  </div>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>Fully Custom AI Development
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>Multi-Location Deployment
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>Advanced AI Model Training
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>Enterprise API Integration
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>SLA & Compliance Guarantees
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>White-label Solutions
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>Dedicated AI Engineering Team
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("Custom AI Solutions", e)}
                    disabled={clickedButton === "Custom AI Solutions"}
                    className={getButtonStyle("Custom AI Solutions", "w-full bg-yellow-500 text-gray-900 py-4 px-6 rounded-xl font-semibold hover:bg-yellow-400 transition-colors shadow-lg")}
                  >
                    {getButtonContent("Custom AI Solutions", "Contact Sales")}
                  </button>
                </div>
              </div>

              {/* Contract Terms Notice */}
              <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Contract Terms & Setup Protection</h3>
                <p className="text-blue-800 text-sm leading-relaxed max-w-4xl mx-auto">
                  All plans require a 12-month minimum commitment. Setup fees are non-refundable and designed to cover AI system customization, training, and integration. 
                  Early termination within the first 12 months requires payment of remaining setup cost amortization to protect our investment in your AI infrastructure.
                  Graduated pricing ensures you get maximum value as your AI system matures and delivers increasing ROI.
                </p>
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

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/contact"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ErrorBoundary } from "@/components/error-boundary"
import { Bot, PhoneCall, MessageSquare, Smartphone } from "lucide-react"

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [clickedButton, setClickedButton] = useState<string | null>(null)

  const handlePlanClick = (plan: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    setSelectedPlan(plan)
    setClickedButton(plan)
    
    setTimeout(() => {
      const contactElement = document.getElementById("contact")
      if (contactElement) {
        contactElement.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        })
      }
    }, 100)

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
              <div className="text-center mb-16">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  DESIGNED FOR SMALL & MEDIUM BUSINESSES
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Simple, <span className="text-blue-600">Transparent</span> Pricing
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Choose the plan that fits your small business. All plans include our complete omni-channel AI solution: Voice, Chat, SMS, and IVR.
                </p>
              </div>

              {/* Omni-Channel Features */}
              <div className="grid md:grid-cols-4 gap-8 mb-16">
                <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                  <Bot className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900">AI Chatbots</h3>
                  <p className="text-sm text-gray-600">Intelligent conversations</p>
                </div>
                <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                  <PhoneCall className="h-8 w-8 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900">Voice AI & IVR</h3>
                  <p className="text-sm text-gray-600">Smart call routing</p>
                </div>
                <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                  <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900">Live Chat</h3>
                  <p className="text-sm text-gray-600">Real-time support</p>
                </div>
                <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                  <Smartphone className="h-8 w-8 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900">SMS Automation</h3>
                  <p className="text-sm text-gray-600">Text messaging</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* AI Starter */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">AI Starter</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">$447</div>
                    <div className="text-gray-500 mb-2">Months 1-6, then $297/month</div>
                    <div className="text-sm text-gray-600">+ $497 setup fee</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Basic AI Chatbots
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Voice AI & IVR (5 agents)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Live Chat Support
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>SMS Automation
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Basic Analytics
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("AI Starter", e)}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>

                {/* AI Professional - Most Popular */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-400 relative hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold">MOST POPULAR</span>
                  </div>
                  <div className="text-center mb-8 mt-4">
                    <h3 className="text-2xl font-bold mb-4">AI Professional</h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">$847</div>
                    <div className="text-gray-500 mb-2">Months 1-6, then $597/month</div>
                    <div className="text-sm text-gray-600">+ $997 setup fee</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Advanced AI Chatbots
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Voice AI & IVR (20 agents)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>AI-Powered Live Chat
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Advanced SMS Automation
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Predictive Analytics
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>CRM Integration
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("AI Professional", e)}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>

                {/* AI Enterprise */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">AI Enterprise</h3>
                    <div className="text-4xl font-bold text-purple-600 mb-2">$1,597</div>
                    <div className="text-gray-500 mb-2">Months 1-6, then $1,197/month</div>
                    <div className="text-sm text-gray-600">+ $1,497 setup fee</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Enterprise AI Chatbots
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Advanced Voice AI & IVR
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Complete Live Chat Suite
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Full SMS Automation
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Advanced Analytics
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>Unlimited Integrations
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>24/7 Premium Support
                    </li>
                  </ul>
                  <button
                    onClick={(e) => handlePlanClick("AI Enterprise", e)}
                    className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>

              {/* Selected Plan Display */}
              {selectedPlan && (
                <div className="text-center mt-16">
                  <div className="inline-block p-6 bg-green-100 border-2 border-green-300 rounded-2xl">
                    <p className="text-green-800 font-bold text-xl">
                      Selected Plan: {selectedPlan}
                    </p>
                    <p className="text-green-700 mt-2">Scroll down to contact our team</p>
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

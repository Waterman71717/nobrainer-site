"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ErrorBoundary } from "@/components/error-boundary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock, CheckCircle, Award, MapPin, Users, DollarSign, Zap, Shield, MessageSquare, PhoneCall, Bot, Smartphone } from "lucide-react"

export default function SMBSolutionsPage() {
  const omniChannelFeatures = [
    {
      icon: <Bot className="h-8 w-8 text-blue-600" />,
      title: "AI Chatbots",
      description: "Intelligent conversational AI that handles customer inquiries 24/7"
    },
    {
      icon: <PhoneCall className="h-8 w-8 text-green-600" />,
      title: "Voice AI & IVR", 
      description: "Smart call routing and voice assistants for seamless phone support"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: "Live Chat",
      description: "Real-time chat support with AI-powered response suggestions"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-orange-600" />,
      title: "SMS Automation",
      description: "Automated text messaging for appointments, updates, and support"
    }
  ]

  const smbBenefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "40% Cost Reduction",
      description: "Save money while improving service quality"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Built for SMBs",
      description: "Designed specifically for small and medium businesses"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Quick Setup",
      description: "Get started in just 4-6 weeks, see results immediately"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "90-Day ROI Guarantee",
      description: "We guarantee measurable results within 90 days"
    }
  ]

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  DESIGNED FOR SMALL & MEDIUM BUSINESSES
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  AI-Powered <span className="text-blue-600">Omni-Channel</span><br/>
                  Customer Service for SMBs
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Transform your customer experience with our complete AI solution: Voice, Chat, SMS, and IVR. 
                  Built specifically for small businesses with affordable pricing and quick implementation.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a 
                    href="tel:+18666295754"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Call Now: +1 866-629-5754
                  </a>
                  <a 
                    href="mailto:business@nobrainergroup.com"
                    className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
                  >
                    Email: business@nobrainergroup.com
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-8 mb-16">
                <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">SMBs Served</div>
                </div>
                <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
                  <div className="text-gray-600">Cost Reduction</div>
                </div>
                <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
                  <div className="text-gray-600">SMB Satisfaction</div>
                </div>
                <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-orange-600 mb-2">4-6</div>
                  <div className="text-gray-600">Weeks to Deploy</div>
                </div>
              </div>
            </div>
          </section>

          {/* Omni-Channel Features */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Complete <span className="text-blue-600">Omni-Channel</span> Solution
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Connect with your customers across all channels with our integrated AI platform
                </p>
              </div>

              <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
                {omniChannelFeatures.map((feature, index) => (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* SMB Benefits */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Why Small Businesses <span className="text-green-600">Choose Us</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We understand the unique challenges and opportunities of small and medium businesses
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {smbBenefits.map((benefit, index) => (
                  <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section - No HubSpot Form */}
          <section id="contact-form" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Ready to Transform Your <span className="text-blue-600">Customer Service?</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Contact our SMB specialists today for your free AI assessment and discover how our omni-channel solution can help your small business.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl text-center">Call Our SMB Specialists</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 text-center">
                    <Phone className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Speak Directly With Our Team</h3>
                    <a 
                      href="tel:+18666295754"
                      className="text-3xl font-bold text-blue-600 hover:text-blue-700 block mb-4"
                    >
                      +1 866-629-5754
                    </a>
                    <p className="text-gray-600 mb-6">Mon-Fri: 8 AM - 8 PM CST<br/>Sat-Sun: 9 AM - 5 PM CST</p>
                    <a 
                      href="tel:+18666295754"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors w-full block"
                    >
                      Call Now
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl text-center">Email Our Experts</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 text-center">
                    <Mail className="h-16 w-16 text-green-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Detailed Information</h3>
                    <a 
                      href="mailto:business@nobrainergroup.com"
                      className="text-xl font-bold text-green-600 hover:text-green-700 block mb-2"
                    >
                      business@nobrainergroup.com
                    </a>
                    <a 
                      href="mailto:sales@nobrainergroup.com"
                      className="text-xl font-bold text-green-600 hover:text-green-700 block mb-6"
                    >
                      sales@nobrainergroup.com
                    </a>
                    <p className="text-gray-600 mb-6">Response within 24 hours<br/>Detailed proposals available</p>
                    <a 
                      href="mailto:business@nobrainergroup.com?subject=SMB AI Assessment Request"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors w-full block"
                    >
                      Send Email
                    </a>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Free AI Assessment Includes:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">30-minute consultation with AI specialists</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Custom assessment of your current systems</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Detailed ROI projection for your business</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">No commitment required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  )
}

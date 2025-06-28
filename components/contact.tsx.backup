"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, CheckCircle, Star, Users, Award } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

const trustIndicators = [
  {
    icon: Users,
    stat: "500+",
    label: "Clients Served",
  },
  {
    icon: Star,
    stat: "98%",
    label: "Satisfaction Rate",
  },
  {
    icon: Award,
    stat: "ISO 9001:2015",
    label: "Certified Quality",
  },
]

const benefits = [
  "AI & Process Improvement Experts",
  "24/7 Technical Support",
  "Fortune 500 Track Record",
  "Scalable, Flexible Solutions",
  "Proven ROI & Cost Reduction",
  "Dedicated Account Management",
]

export function Contact() {
  const [isFormLoaded, setIsFormLoaded] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://js-na2.hsforms.net/forms/embed/243105880.js"
    script.defer = true

    script.onload = () => {
      setIsFormLoaded(true)
    }

    script.onerror = () => {
      setFormError("Unable to load contact form. Please call us directly.")
    }

    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your <span className="text-blue-600">Customer Service?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Join 500+ companies that have revolutionized their customer operations with our AI-powered solutions. Get
            started with a free consultation and discover your transformation potential.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-md">
                <indicator.icon className="h-6 w-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-bold text-gray-900">{indicator.stat}</div>
                  <div className="text-sm text-gray-600">{indicator.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Contact Info & Benefits */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="text-xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <div className="text-gray-600">+1 866-629-5754</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <div className="text-gray-600">business@nobrainergroup.com</div>
                      <div className="text-gray-600">sales@nobrainergroup.com</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Location</div>
                      <div className="text-gray-600">Austin, Texas, USA</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Business Hours</div>
                      <div className="text-gray-600">Mon-Fri: 8 AM - 8 PM CST</div>
                      <div className="text-gray-600">Sat-Sun: 9 AM - 5 PM CST</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Why Choose Nobrainer Group?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                <div className="text-center">
                  <CardTitle className="text-2xl lg:text-3xl font-bold mb-2">Schedule Your Free Consultation</CardTitle>
                  <p className="text-blue-100 text-lg">
                    Discover how AI can transform your customer service operations
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {!isFormLoaded && !formError && (
                  <div className="flex items-center justify-center py-16">
                    <LoadingSpinner size="lg" />
                    <span className="ml-3 text-gray-600 text-lg">Loading contact form...</span>
                  </div>
                )}

                {formError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Form Unavailable</h3>
                    <p className="text-red-700 mb-6">{formError}</p>
                    <div className="bg-white rounded-lg p-6 border border-red-200">
                      <p className="text-gray-700 mb-2">Call us directly for immediate assistance:</p>
                      <p className="text-2xl font-bold text-blue-600">+1 866-629-5754</p>
                    </div>
                  </div>
                )}

                <div className={`${!isFormLoaded ? "hidden" : ""}`}>
                  <div
                    className="hs-form-frame"
                    data-region="na2"
                    data-form-id="27b614f0-a10b-41b6-819b-641c1cd63056"
                    data-portal-id="243105880"
                  ></div>
                </div>

                {/* Form Benefits */}
                {isFormLoaded && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">Quick Response</h4>
                        <p className="text-sm text-gray-600">We'll contact you within 24 hours</p>
                      </div>
                      <div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">Free Assessment</h4>
                        <p className="text-sm text-gray-600">No cost, no obligation consultation</p>
                      </div>
                      <div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Award className="h-6 w-6 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">Expert Guidance</h4>
                        <p className="text-sm text-gray-600">AI specialists with proven results</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to Join 500+ Successful Companies?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Don't let outdated customer service hold your business back. Our AI solutions deliver measurable results
              within 90 days, with some clients seeing improvements in just 4-6 weeks.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Transformation Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

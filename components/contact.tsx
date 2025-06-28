"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock, CheckCircle, Award } from "lucide-react"

declare global {
  interface Window {
    hbspt: any;
  }
}

export function Contact() {
  const benefits = [
    "Proven 40% cost reduction in customer service",
    "98% client satisfaction rate",
    "90-day ROI guarantee", 
    "24/7 AI-powered support",
    "Seamless integration with existing systems",
    "Custom AI training for your business"
  ]

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js-na2.hsforms.net/forms/embed/243105880.js'
    script.defer = true
    
    script.onload = () => {
      console.log('HubSpot script loaded')
    }
    
    document.head.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[src="https://js-na2.hsforms.net/forms/embed/243105880.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get Your Free AI Assessment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how AI can transform your customer service in just 30 minutes. 
            No commitment required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Schedule Your Consultation</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div 
                  className="hs-form-frame" 
                  data-region="na2" 
                  data-form-id="27b614f0-a10b-41b6-819b-641c1cd63056" 
                  data-portal-id="243105880"
                ></div>

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
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <div className="text-gray-600">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibent text-gray-900">Email</div>
                      <div className="text-gray-600">hello@nobrainergroup.com</div>
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

            <div>
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
          </div>
        </div>

        <div className="text-center mt-16">
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

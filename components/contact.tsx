"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock, CheckCircle, Award, MapPin } from "lucide-react"

export function Contact() {
  const benefits = [
    "Proven 40% cost reduction for small businesses",
    "98% SMB client satisfaction rate", 
    "90-day ROI guarantee",
    "24/7 AI-powered support",
    "Seamless integration with existing systems",
    "Custom AI training for your business"
  ]

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get Your Free AI Assessment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your small business customer service? Contact us for a free 30-minute consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <div>
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Contact Our SMB Specialists</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Call Us Now</div>
                      <div className="text-blue-600 text-xl font-bold">+1 866-629-5754</div>
                      <div className="text-gray-600 text-sm">Speak directly with an AI specialist</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Email Us</div>
                      <div className="text-green-600 font-semibold">business@nobrainergroup.com</div>
                      <div className="text-green-600 font-semibold">sales@nobrainergroup.com</div>
                      <div className="text-gray-600 text-sm">Get a response within 24 hours</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Visit Us</div>
                      <div className="text-gray-600">Austin, Texas, USA</div>
                      <div className="text-gray-600 text-sm">Central Time Zone</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Business Hours</div>
                      <div className="text-gray-600">Mon-Fri: 8 AM - 8 PM CST</div>
                      <div className="text-gray-600">Sat-Sun: 9 AM - 5 PM CST</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <a 
                      href="/smb-solutions"
                      className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Get Free SMB Assessment →
                    </a>
                    <p className="text-sm text-gray-600 mt-2">Complete our quick form for faster service</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
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

            <Card className="shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Quick Response Promise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">24 Hours</h4>
                    <p className="text-sm text-gray-600">Response time</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Free</h4>
                    <p className="text-sm text-gray-600">Consultation</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Expert</h4>
                    <p className="text-sm text-gray-600">Guidance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to Join 500+ Successful Small Businesses?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Don't let outdated customer service hold your business back. Our AI solutions deliver measurable results
              within 90 days, with most small and medium businesses seeing improvements in just 4-6 weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+18666295754"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Call Now: +1 866-629-5754
              </a>
              <a 
                href="/smb-solutions"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Free Assessment
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Mail, Phone, MapPin, Clock, Copy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ContactWidget() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Phone Contact */}
      <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <p className="text-sm text-gray-600">Direct line</p>
            </div>
          </div>
          <a href="tel:+18666295754" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
            +1 (866) 629-5754
          </a>
          <p className="text-sm text-gray-600 mt-2">Mon-Fri 8AM-8PM CST</p>
        </CardContent>
      </Card>

      {/* Email Contact */}
      <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="text-sm text-gray-600">General inquiries</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <a href="mailto:info@nobrainergroup.com" className="text-sm text-blue-600 hover:text-blue-700">
                info@nobrainergroup.com
              </a>
              <button
                onClick={() => copyToClipboard("info@nobrainergroup.com")}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <a href="mailto:sales@nobrainergroup.com" className="text-sm text-blue-600 hover:text-blue-700">
                sales@nobrainergroup.com
              </a>
              <button
                onClick={() => copyToClipboard("sales@nobrainergroup.com")}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-900">Location</h3>
              <p className="text-sm text-gray-600">Headquarters</p>
            </div>
          </div>
          <div className="text-gray-700">
            <div className="font-medium">Austin, Texas</div>
            <div className="text-sm text-gray-600">United States</div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-900">Hours</h3>
              <p className="text-sm text-gray-600">Support available</p>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Mon-Fri</span>
              <span className="text-gray-900">8AM-8PM CST</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sat-Sun</span>
              <span className="text-gray-900">9AM-5PM CST</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

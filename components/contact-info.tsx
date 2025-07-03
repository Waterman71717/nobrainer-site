"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 866-629-5754", "Speak directly with an AI specialist"],
    action: "tel:+18666295754",
    actionLabel: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@nobrainergroup.com", "sales@nobrainergroup.com"],
    action: "mailto:info@nobrainergroup.com",
    actionLabel: "Send Email",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    details: ["Austin, Texas, USA", "Central Time Zone"],
    action: null,
    actionLabel: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon-Fri: 8 AM - 8 PM CST", "Sat-Sun: 9 AM - 5 PM CST"],
    action: null,
    actionLabel: null,
  },
]

export function ContactInfo() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {contactDetails.map((contact, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <contact.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3">{contact.title}</h3>

                  {/* Special handling for email */}
                  {contact.title === "Email" ? (
                    <div className="space-y-3">
                      {contact.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700 font-medium">{detail}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(detail)}
                              className="h-8 w-8 p-0"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" asChild className="h-8 w-8 p-0">
                              <a href={`mailto:${detail}`}>
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <Button className="w-full" asChild>
                          <a href="mailto:info@nobrainergroup.com?subject=SMB AI Solution Inquiry">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {contact.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                      {contact.action && (
                        <div className="mt-3">
                          <Button size="sm" asChild>
                            <a href={contact.action}>{contact.actionLabel}</a>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Nobrainer Group?</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 500+ SMBs Served</li>
            <li>• 98% SMB Satisfaction Rate</li>
            <li>• 4-6 Week SMB Deployment</li>
            <li>• $14,436+ Annual Savings per VA</li>
            <li>• Free Consultation & Custom Strategy</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

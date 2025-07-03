"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Copy, Check } from "lucide-react"

export function Footer() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedEmail(type)
      setTimeout(() => setCopiedEmail(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold">Nobrainer Group</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              AI-powered customer service solutions designed specifically for small and medium businesses.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/smb-solutions" className="text-gray-300 hover:text-white transition-colors text-sm">
                  SMB Solutions
                </Link>
              </li>
              <li>
                <span className="text-gray-300 text-sm">AI Chatbots</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Voice AI & IVR</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Live Chat Support</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Analytics & Insights</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>

            {/* Phone */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600/20 rounded flex items-center justify-center">
                  <Phone className="h-3 w-3 text-blue-400" />
                </div>
                <h4 className="text-sm font-medium text-white">Call Us Now</h4>
              </div>
              <a
                href="tel:+18666295754"
                className="block text-lg font-bold text-blue-400 hover:text-blue-300 transition-colors ml-8"
              >
                +1 866-629-5754
              </a>
              <p className="text-gray-300 text-xs ml-8">Speak directly with an AI specialist</p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600/20 rounded flex items-center justify-center">
                  <Mail className="h-3 w-3 text-blue-400" />
                </div>
                <h4 className="text-sm font-medium text-white">Email Us</h4>
              </div>
              <div className="space-y-1 ml-8">
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:info@nobrainergroup.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    info@nobrainergroup.com
                  </a>
                  <button
                    onClick={() => copyToClipboard("info@nobrainergroup.com", "info")}
                    className="p-1 hover:bg-gray-800 rounded transition-colors"
                    title="Copy email"
                  >
                    {copiedEmail === "info" ? (
                      <Check className="h-3 w-3 text-green-400" />
                    ) : (
                      <Copy className="h-3 w-3 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:sales@nobrainergroup.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    sales@nobrainergroup.com
                  </a>
                  <button
                    onClick={() => copyToClipboard("sales@nobrainergroup.com", "sales")}
                    className="p-1 hover:bg-gray-800 rounded transition-colors"
                    title="Copy email"
                  >
                    {copiedEmail === "sales" ? (
                      <Check className="h-3 w-3 text-green-400" />
                    ) : (
                      <Copy className="h-3 w-3 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-gray-300 text-xs ml-8">Get a response within 24 hours</p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600/20 rounded flex items-center justify-center">
                  <MapPin className="h-3 w-3 text-blue-400" />
                </div>
                <h4 className="text-sm font-medium text-white">Visit Us</h4>
              </div>
              <div className="ml-8">
                <p className="text-gray-300 text-sm">Austin, Texas, USA</p>
                <p className="text-gray-300 text-xs">Central Time Zone</p>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600/20 rounded flex items-center justify-center">
                  <Clock className="h-3 w-3 text-blue-400" />
                </div>
                <h4 className="text-sm font-medium text-white">Business Hours</h4>
              </div>
              <div className="ml-8">
                <p className="text-gray-300 text-sm">Mon-Fri: 8 AM - 8 PM CST</p>
                <p className="text-gray-300 text-sm">Sat-Sun: 9 AM - 5 PM CST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-sm">© 2024 Nobrainer Group. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Made with ❤️ in Austin, Texas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

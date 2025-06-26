"use client"

import { Phone } from "lucide-react"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export function Footer() {
  const { scrollToSection } = useSmoothScroll()

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Phone className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Nobrainer Group</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Leading the AI transformation in customer service with cutting-edge solutions that drive measurable
              results and exceptional customer experiences.
            </p>
            <p className="text-sm text-gray-400">Building the future of CXAI - one conversation at a time.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>AI Integration & Automation</li>
              <li>Generative AI Chatbots</li>
              <li>Quality Assurance</li>
              <li>Analytics & Reporting</li>
              <li>Conversational IVR/IVA</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-blue-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("process")} className="hover:text-blue-400 transition-colors">
                  Our Process
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="hover:text-blue-400 transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <a href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Nobrainer Group. All rights reserved. | ISO 9001:2015 Certified</p>
        </div>
      </div>
    </footer>
  )
}

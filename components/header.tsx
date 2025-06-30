"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollToSection } = useSmoothScroll()
  const pathname = usePathname()
  const router = useRouter()

  const handleNavClick = (sectionId: string) => {
    if (pathname === "/") {
      scrollToSection(sectionId)
    } else {
      router.push(`/#${sectionId}`)
    }
    setIsMenuOpen(false)
  }

  const handleGetStarted = () => {
    if (pathname === "/") {
      scrollToSection("contact")
    } else {
      router.push("/#contact")
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Phone className="h-8 w-8 text-blue-600" />
            <button 
              onClick={() => router.push("/")}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              aria-label="Go to homepage"
            >
              Nobrainer Group
            </button>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => handleNavClick("services")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => router.push("/pricing")}
              className={`transition-colors ${
                pathname === "/pricing" 
                  ? "text-blue-600 font-medium" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick("process")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
          </nav>

          <div className="hidden md:block">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>

          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavClick("services")}
                className="text-gray-700 hover:text-blue-600 text-left"
              >
                Services
              </button>
              <button 
                onClick={() => handleNavClick("about")} 
                className="text-gray-700 hover:text-blue-600 text-left"
              >
                About
              </button>
              <button
                onClick={() => router.push("/pricing")}
                className={`text-left transition-colors ${
                  pathname === "/pricing" 
                    ? "text-blue-600 font-medium" 
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavClick("process")} 
                className="text-gray-700 hover:text-blue-600 text-left"
              >
                Process
              </button>
              <button 
                onClick={() => handleNavClick("contact")} 
                className="text-gray-700 hover:text-blue-600 text-left"
              >
                Contact
              </button>
              <Button
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-4"
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

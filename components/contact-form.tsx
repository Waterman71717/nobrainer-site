"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = encodeURIComponent("AI Solution Inquiry from Contact Form")
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Phone: ${formData.phone}

Message:
${formData.message}

---
This inquiry was submitted through the Contact Our AI Experts form on nobrainergroup.com
    `)

    const mailtoLink = `mailto:info@nobrainergroup.com?subject=${subject}&body=${body}`
    window.location.href = mailtoLink
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Contact Our AI Experts</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Company Name
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
              Tell us about your call center needs
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="mt-1"
              placeholder="Describe your current call center operations, challenges, and goals..."
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Get Free Consultation
          </Button>

          <p className="text-sm text-gray-500 text-center">
            We'll respond within 24 hours with a customized AI strategy for your business.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

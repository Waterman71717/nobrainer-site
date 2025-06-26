"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How quickly can we see results from AI implementation?",
    answer:
      "Most clients see measurable improvements within 3 months, with some experiencing benefits as early as 4-6 weeks. Our phased implementation approach ensures you start seeing value quickly while building toward long-term transformation.",
  },
  {
    question: "What's the typical ROI for AI call center solutions?",
    answer:
      "Our clients typically see 30-40% cost reduction and 2-3x ROI within the first year. Specific results vary based on current operations, but we've helped clients save over $2M annually through our AI implementations.",
  },
  {
    question: "How does AI integration work with existing systems?",
    answer:
      "Our AI solutions are designed to integrate seamlessly with your existing CRM, telephony, and business systems. We conduct thorough compatibility assessments and provide custom integration solutions to ensure smooth operation.",
  },
  {
    question: "What level of support do you provide during and after implementation?",
    answer:
      "We provide comprehensive support including 24/7 technical assistance, regular performance reviews, continuous optimization, and dedicated account management. Our support doesn't end at implementation—we're your long-term AI transformation partner.",
  },
  {
    question: "How do you ensure data security and compliance?",
    answer:
      "We maintain ISO 9001:2015 certification and follow strict data security protocols. All AI solutions are designed with privacy by design principles, and we ensure compliance with industry regulations including GDPR, CCPA, and sector-specific requirements.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Get answers to common questions about our AI solutions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <CardTitle className="flex justify-between items-center text-left">
                  <span className="text-lg">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </CardTitle>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="pt-0 animate-in slide-in-from-top-2 duration-200">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

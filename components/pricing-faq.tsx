import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Why are the first 6 months more expensive?",
    answer:
      "The higher pricing for months 1-6 covers intensive onboarding, custom AI training, system integration, and dedicated support to ensure your success. After month 6, you get the ongoing rate which represents incredible value compared to virtual assistants.",
  },
  {
    question: "What's included in the setup fee?",
    answer:
      "Setup fees cover AI model training on your specific business data, system integrations, custom configuration, team training, and comprehensive testing. This one-time investment ensures your AI solution is perfectly tailored to your business needs.",
  },
  {
    question: "How quickly can I see ROI?",
    answer:
      "Most SMBs see positive ROI within 60 days. With savings of $1,203+ per month compared to virtual assistants (Professional plan), the math is straightforward and compelling.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at your next billing cycle. Our team will help ensure a smooth transition.",
  },
  {
    question: "What happens after the 6-month introductory period?",
    answer:
      "After 6 months, your billing automatically transitions to the lower ongoing monthly rate. You'll continue to receive the same great service and features, just at a reduced cost.",
  },
  {
    question: "Is there a long-term contract required?",
    answer:
      "No long-term contracts required. All plans are month-to-month after the initial 6-month period. We're confident you'll love the results and choose to stay with us.",
  },
  {
    question: "What kind of support do I get?",
    answer:
      "All plans include 24/7 technical support. Professional and Enterprise plans get priority support with faster response times. Enterprise customers also get a dedicated account manager.",
  },
  {
    question: "How does the AI learn my business?",
    answer:
      "During setup, our AI is trained on your specific business data, FAQs, processes, and customer interactions. The Professional and Enterprise plans include ongoing learning and optimization to continuously improve performance.",
  },
]

export function PricingFAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Get answers to common questions about our AI customer service platform.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

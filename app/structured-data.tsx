export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nobrainer Group",
    url: "https://nobrainergroup.com",
    logo: "https://nobrainergroup.com/images/logo-nobrainer-group.png",
    description:
      "AI-powered call center solutions transforming customer service through automation, generative AI, and data-driven insights.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Austin",
      addressRegion: "TX",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-866-629-5754",
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: ["https://linkedin.com/company/nobrainer-group"],
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-Powered Call Center Solutions",
    provider: {
      "@type": "Organization",
      name: "Nobrainer Group",
    },
    description: "Comprehensive AI automation and customer service optimization solutions",
    serviceType: "Call Center Solutions",
    areaServed: "Worldwide",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }} />
    </>
  )
}

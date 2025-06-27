import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://nobrainergroup.com"),
  title: {
    default: "Nobrainer Group- AI-Powered Call Center Solutions",
    template: "%s | Nobrainer Group",
  },
  description:
    "Transform your customer service with cutting-edge AI automation, generative AI, and data-driven insights. 500+ clients served, 98% satisfaction rate, 40% cost reduction guaranteed.",
  keywords: [
    "AI call center",
    "customer service automation",
    "generative AI",
    "call center solutions",
    "AI chatbots",
    "intelligent call routing",
    "customer experience optimization",
  ],
  authors: [{ name: "Nobrainer Group" }],
  creator: "Nobrainer Group",
  publisher: "Nobrainer Group",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nobrainergroup.com",
    siteName: "Nobrainer Group",
    title: "Nobrainer Group- AI-Powered Call Center Solutions",
    description:
      "Transform your customer service with cutting-edge AI automation. 500+ clients served, 98% satisfaction rate.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nobrainer Group - AI-Powered Call Center Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nobrainer Group- AI-Powered Call Center Solutions",
    description:
      "Transform your customer service with cutting-edge AI automation. 500+ clients served, 98% satisfaction rate.",
    images: ["/images/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://nobrainergroup.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
    generator: 'v0.dev'
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Google Tag Manager (script part for head) */}
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KRDHFLTD');</script>
        {/* End Google Tag Manager */}

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript part for body) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KRDHFLTD"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}

        {children}

        {/* The HubSpot tracking code has been removed from here */}
      </body>
    </html>
  )
}
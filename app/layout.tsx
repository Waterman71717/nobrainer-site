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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}

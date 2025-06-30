import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL("https://nobrainergroup.com"),
  title: {
    default: "Nobrainer Group - AI Solutions for Small & Medium Businesses",
    template: "%s | Nobrainer Group",
  },
  description:
    "Transform your small or medium business customer service with cutting-edge AI automation, omni-channel solutions (AI, Voice, IVR, Chat, SMS), and data-driven insights. 500+ SMBs served, 98% satisfaction rate, 40% cost reduction guaranteed.",
  keywords: [
    "AI for small business",
    "SMB customer service automation", 
    "small business AI solutions",
    "omni-channel customer support",
    "AI chatbots for SMB",
    "voice AI for business",
    "SMS automation",
    "IVR solutions",
    "affordable AI call center",
    "AI chat for small business",
    "automated customer service SMB",
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
    title: "Nobrainer Group - AI Solutions for Small & Medium Businesses",
    description:
      "Transform your SMB customer service with cutting-edge AI automation. 500+ small businesses served, 98% satisfaction rate.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nobrainer Group - AI Solutions for Small & Medium Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nobrainer Group - AI Solutions for Small & Medium Businesses", 
    description:
      "Transform your SMB customer service with cutting-edge AI automation. 500+ small businesses served, 98% satisfaction rate.",
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
        {/* PWA & Mobile Optimization */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KRDHFLTD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        {children}
        
        {/* Load GTM with delay */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KRDHFLTD');
          `}
        </Script>
      </body>
    </html>
  )
}
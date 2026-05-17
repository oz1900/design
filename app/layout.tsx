import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = "https://www.greenbergsafety.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Greenberg Safety | EHS Consulting & OSHA Compliance for Construction",
    template: "%s | Greenberg Safety",
  },
  description:
    "Greenberg Safety provides EHS consulting, OSHA compliance, site safety inspections, safety staffing, and training for construction and industrial teams across the US.",
  keywords: [
    "EHS consulting",
    "OSHA compliance",
    "construction safety",
    "site safety inspections",
    "safety staffing",
    "safety training",
    "industrial safety",
    "environmental health and safety",
    "safety consultant",
    "OSHA 30",
  ],
  authors: [{ name: "Greenberg Safety" }],
  creator: "Greenberg Safety",
  publisher: "Greenberg Safety",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Greenberg Safety",
    title: "Greenberg Safety | EHS Consulting & OSHA Compliance for Construction",
    description:
      "EHS consulting, OSHA compliance, site safety inspections, safety staffing, and training for construction and industrial teams across the US.",
    images: [
      {
        url: "/greenberg-logo.png",
        width: 1200,
        height: 630,
        alt: "Greenberg Safety",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenberg Safety | EHS Consulting & OSHA Compliance",
    description:
      "EHS consulting, OSHA compliance, and safety staffing for construction and industrial teams across the US.",
    images: ["/greenberg-logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Greenberg Safety",
  url: siteUrl,
  description:
    "EHS consulting, OSHA compliance, site safety inspections, safety staffing, and training for construction and industrial teams.",
  areaServed: "US",
  serviceType: [
    "EHS Consulting",
    "OSHA Compliance",
    "Safety Inspections",
    "Safety Staffing",
    "Safety Training",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Safety Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EHS Consulting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "OSHA Compliance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Site Safety Inspections" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Safety Staffing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Safety Training" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="msvalidate.01" content="AAD55155DC2E46AB85B8FD90EF5988CB" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/CalSans-SemiBold.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/_next/image?url=%2Fhero.jpg&w=1200&q=75" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

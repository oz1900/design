import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

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
        <style dangerouslySetInnerHTML={{ __html: `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
button{cursor:pointer;border:none;background:transparent;font:inherit}
ul,ol{list-style:none}
input,textarea,select{font:inherit}
@font-face{font-family:"Cal Sans";font-style:normal;font-weight:600;font-display:swap;src:url("/fonts/CalSans-SemiBold.woff2") format("woff2")}
:root{--brand-blue:#0F4BF3;--brand-blue-deep:#0A36B8;--brand-blue-soft:#e8f0fd;--brand-blue-tint:#f5f8ff;--ink:#0a1024;--ink-soft:#1d2440;--text:#2a3142;--muted:#6b7280;--hairline:#e5e7eb;--canvas:#ffffff;--canvas-soft:#f7f8fb;--font-display:"Cal Sans","Inter",system-ui,-apple-system,sans-serif;--font-sans:"Inter",system-ui,-apple-system,sans-serif;--font-mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
html{scroll-behavior:smooth}
body{margin:0;background:var(--canvas);color:var(--text);font-family:var(--font-sans);font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%}
h1,h2,h3,h4{font-family:var(--font-display);color:var(--ink);margin:0;font-weight:600}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
@media(max-width:720px){.container{padding:0 20px}}
.eyebrow{font-family:var(--font-sans);font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--brand-blue);display:inline-flex;align-items:center;gap:12px}
.eyebrow::before{content:'';width:28px;height:2px;background:var(--brand-blue);display:inline-block;flex-shrink:0}
.section-h{font-size:clamp(34px,4vw,52px);line-height:1.05;letter-spacing:-1.5px;text-wrap:balance}
.lede{color:var(--text);font-size:17px;line-height:1.55;max-width:56ch}
.btn{display:inline-flex;align-items:center;gap:10px;padding:14px 22px;border-radius:4px;font-family:var(--font-sans);font-weight:600;font-size:15px;line-height:1;border:none;cursor:pointer;text-decoration:none;transition:background-color .18s ease,color .18s ease,box-shadow .18s ease}
.btn-primary{background:var(--brand-blue);color:#fff}
.btn-primary:hover{background:var(--brand-blue-deep)}
.btn-secondary{background:transparent;color:var(--ink);border:1.5px solid var(--ink)}
.btn-secondary:hover{background:var(--ink);color:#fff}
.btn-sm{padding:11px 18px;font-size:14px}
[id]{scroll-margin-top:78px}
        ` }} />
        <link rel="preload" as="image" href="/hero.jpg" fetchPriority="high" />
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

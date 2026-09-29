import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://milagriscathedral.in"),
  title: "Milagris Cathedral | Cathedral of Our Lady of Miracles | Sawantwadi",
  description:
    "Official website of Milagris Cathedral, Sawantwadi, Maharashtra. Seat of the Roman Catholic Diocese of Sindhudurg, dedicated to Our Lady of Miracles. Historic landmark consecrated May 2026.",
  keywords: [
    "Milagris Cathedral",
    "Sawantwadi Church",
    "Our Lady of Miracles",
    "Diocese of Sindhudurg",
    "Catholic Cathedral Maharashtra",
    "Milagris Church Sawantwadi",
    "Milagris Saibin",
  ],
  authors: [{ name: "Milagris Cathedral Parish" }],
  openGraph: {
    title: "Milagris Cathedral | Cathedral of Our Lady of Miracles",
    description:
      "The Mother Church of the Diocese of Sindhudurg, located in Sawantwadi, Maharashtra. Reconstructed and solemnly consecrated in May 2026.",
    url: "https://milagriscathedral.in",
    siteName: "Milagris Cathedral",
    images: [
      {
        url: "/images/hero/cathedral-facade.jpg",
        width: 1200,
        height: 675,
        alt: "Milagris Cathedral illuminated stone facade in Sawantwadi",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Milagris Cathedral | Sawantwadi",
    description:
      "Cathedral of Our Lady of Miracles, Diocese of Sindhudurg, Sawantwadi, Maharashtra.",
    images: ["/images/hero/cathedral-facade.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // PlaceOfWorship Schema.org JSON-LD
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "CatholicChurch",
    name: siteConfig.name,
    alternateName: siteConfig.dedicationTitle,
    description: siteConfig.subheading,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location.street,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      postalCode: siteConfig.location.pincode,
      addressCountry: "IN",
    },
    telephone: siteConfig.location.phone,
    hasMap: siteConfig.location.googleMapsUrl,
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} antialiased selection:bg-gold selection:text-obsidian scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-obsidian text-ivory overflow-x-hidden">
        {/* NAVIGATION */}
        <Navbar />

        {/* MAIN CONTENT */}
        <div className="flex-1 w-full">{children}</div>

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}

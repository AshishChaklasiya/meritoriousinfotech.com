import { Metadata } from "next"

/**
 * Reusable metadata generator for Next.js App Router.
 * Centralizes SEO logic and ensures consistency across pages.
 */

export const siteConfig = {
  name: "Meritorious Infotech",
  description:
    "Meritorious Infotech is a software development company in Surat building websites, mobile apps and custom software. Get a price range in 48 hours.",
  url: "https://meritoriousinfotech.com",
  ogImage: "https://meritoriousinfotech.com/og-image.png",
  locale: "en_US",
  keywords: [
    "software development company in Surat",
    "IT company in Surat",
    "custom software development",
    "website development company in Surat",
    "mobile app development company in Surat",
    "UI UX design company in Surat",
  ],
}

interface MetadataProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: "website" | "article" // Task 5
  noIndex?: boolean
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  canonicalUrl = siteConfig.url,
  ogImage = siteConfig.ogImage,
  ogType = "website",
  noIndex = false,
}: MetadataProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name

  return {
    title: fullTitle,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: ogType,
      locale: siteConfig.locale,
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    // Robots tag for controlling indexing (useful for staging)
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

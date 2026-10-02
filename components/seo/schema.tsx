import { CONTACT } from "@/lib/content/company"
import { siteConfig } from "@/lib/metadata"

/**
 * Task 3: STRUCTURED DATA (JSON-LD)
 * Helps search engines understand the content and provides rich results.
 */

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    email: CONTACT.emails.business,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phones[0],
      email: CONTACT.emails.business,
      contactType: "sales",
      availableLanguage: ["en", "hi", "gu"],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // More specific than LocalBusiness for IT
    name: siteConfig.name,
    image: `${siteConfig.url}/og-image.png`,
    url: siteConfig.url,
    telephone: CONTACT.phones[0],
    email: CONTACT.emails.business,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.1702,
      longitude: 72.8311,
    },
    // TODO: add openingHoursSpecification once office hours are confirmed
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    description: description,
    url: `${siteConfig.url}${url}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({
  faq,
}: {
  faq: { question: string; answer: string }[]
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Task 4: BREADCRUMBLIST SCHEMA
 * Helps search engines understand the site hierarchy.
 */
export function BreadcrumbSchema({
  steps,
}: {
  steps: { name: string; url: string }[]
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: steps.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: `${siteConfig.url}${step.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Task 4: REVIEW / AGGREGATE RATING SCHEMA
 * Shows star ratings in Search Results.
 */
export function ReviewSchema({
  itemName,
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
}: {
  itemName: string
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product", // Most common for ratings, even for services
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: bestRating,
      worstRating: worstRating,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

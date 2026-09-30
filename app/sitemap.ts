import { MetadataRoute } from "next"
import { JOBS } from "@/lib/content/jobs"
import { PORTFOLIO } from "@/lib/content/portfolio"
import { SERVICE_DETAILS } from "@/lib/content/service-details"
import { siteConfig } from "@/lib/metadata"

/**
 * Task 2: SITEMAP
 * Generates sitemap.xml for search engines.
 * This is the modern App Router way to handle sitemaps.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  // In a real app, you would fetch these from a CMS or DB
  const routes = [
    "",
    "/services",
    ...SERVICE_DETAILS.map((service) => `/services/${service.slug}`),
    "/about-us",
    "/careers",
    ...JOBS.map((job) => `/careers/${job.slug}`),
    "/portfolio",
    ...PORTFOLIO.map((project) => `/portfolio/${project.slug}`),
    "/technologies",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  return routes
}

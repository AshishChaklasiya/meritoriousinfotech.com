import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

/**
 * Task 2: ROBOTS.TXT
 * Controls how search engines crawl and index your site.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // Common paths to exclude
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

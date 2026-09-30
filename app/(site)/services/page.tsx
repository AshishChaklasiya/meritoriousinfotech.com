import { PageHero } from "@/components/layout/page-hero"
import { MorePortfolioSection } from "@/components/portfolio/more-portfolio-section"
import { BreadcrumbSchema } from "@/components/seo/schema"
import { ServicesOverviewSection } from "@/components/services/services-overview-section"
import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Our Services",
  description:
    "UI/UX design, web engineering and mobile app development — reliable, high-quality software built to grow and adapt with your business.",
  canonicalUrl: "/services",
})

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
]

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        steps={BREADCRUMBS.map((crumb) => ({
          name: crumb.label,
          url: crumb.href,
        }))}
      />

      <PageHero
        breadcrumbs={BREADCRUMBS}
        title={
          <>
            Our Professional <span className="text-brand">Services</span>
          </>
        }
        description="Combines smart ideas, modern technology, and clean development practices to build reliable, high-quality software that is ready to grow and adapt for the future."
      />

      <ServicesOverviewSection />

      <MorePortfolioSection />
    </>
  )
}

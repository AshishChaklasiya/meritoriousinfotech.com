import { PageHero } from "@/components/layout/page-hero"
import { PortfolioBrowser } from "@/components/portfolio/portfolio-browser"
import { BreadcrumbSchema } from "@/components/seo/schema"
import { constructMetadata } from "@/lib/metadata"

const DESCRIPTION =
  "Meritorious Infotech has created cutting-edge websites, e-commerce platforms, and mobile applications in several areas. Our portfolio shows our development skills and capabilities."

export const metadata = constructMetadata({
  title: "Portfolio",
  description: DESCRIPTION,
  canonicalUrl: "/portfolio",
})

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
]

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbSchema
        steps={BREADCRUMBS.map((c) => ({ name: c.label, url: c.href }))}
      />

      <PageHero
        breadcrumbs={BREADCRUMBS}
        title={
          <>
            Our <span className="text-brand">Portfolio</span>
          </>
        }
        description={DESCRIPTION}
        descriptionClassName="max-w-[686px]"
      />

      <section
        aria-label="Projects"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[144px]"
      >
        <div className="container-content">
          <PortfolioBrowser />
        </div>
      </section>
    </>
  )
}

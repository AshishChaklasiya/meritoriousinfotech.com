import { PageHero } from "@/components/layout/page-hero"
import { PortfolioBrowser } from "@/components/portfolio/portfolio-browser"
import { BreadcrumbSchema } from "@/components/seo/schema"
import { constructMetadata } from "@/lib/metadata"

const DESCRIPTION =
  "A selection of websites, mobile apps and business software we've designed and built for clients in India and abroad. Each project covers the challenge, what we built, and what changed afterwards."

export const metadata = constructMetadata({
  title: "Web & Mobile App Portfolio",
  description:
    "Websites, mobile apps and business software we've designed and built for clients in India and abroad, with the results each project delivered.",
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
            Our <span className="text-brand">Work</span>
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

import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { PageHero } from "@/components/layout/page-hero"
import { MorePortfolioSection } from "@/components/portfolio/more-portfolio-section"
import { EngagementModelsSection } from "@/components/sections/engagement-models-section"
import { BreadcrumbSchema } from "@/components/seo/schema"
import { ServicesOverviewSection } from "@/components/services/services-overview-section"
import { CtaLink } from "@/components/ui/cta-link"
import { DataTable } from "@/components/ui/data-table"
import { SectionHeader } from "@/components/ui/section-header"
import { COMMITMENTS } from "@/lib/content/company"
import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Custom Software Development Services",
  description:
    "Custom software development services from one Surat team: UI/UX and graphic design, web development and mobile apps. Fixed quotes, weekly demos.",
  canonicalUrl: "/services",
})

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
]

const PROBLEMS = [
  [
    "Customers can't order, book or pay online",
    "A business website or e-commerce store",
  ],
  [
    "Staff run the business on spreadsheets and WhatsApp",
    "A custom web app or internal portal",
  ],
  [
    "You have an idea and need to test it with real users",
    "A clickable prototype, then an MVP",
  ],
  [
    "Your app or website is slow, buggy or abandoned",
    "A code review, then a takeover or rebuild",
  ],
  [
    "Your brand looks dated or different on every channel",
    "A brand refresh and UI redesign",
  ],
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
        titleClassName="max-w-[1000px]"
        title={
          <>
            Software Development <span className="text-brand">Services</span>,
            From First Sketch to Launch
          </>
        }
        description="Meritorious Infotech designs and builds websites, mobile apps and custom software for businesses in Surat, across India and overseas. Hire us for a single service or hand over the whole project. Either way, you work with the same small team from start to finish."
        descriptionClassName="max-w-[880px]"
        action={
          <CtaLink
            href="/contact"
            icon={<ArrowUpRightSolidIcon />}
            hoverIcon={<ArrowRightIcon />}
          >
            Get an estimate in {COMMITMENTS.estimateHours} hours
          </CtaLink>
        }
      />

      <ServicesOverviewSection />

      <section
        aria-labelledby="problems-title"
        className="border-b border-divider bg-canvas py-16 md:py-24 xl:py-[110px]"
      >
        <div className="container-content flex flex-col gap-10 md:gap-16">
          <SectionHeader
            id="problems-title"
            eyebrow="Where to start"
            title="Not sure what you need? Start with the problem"
            description="Tell us the problem, not the solution. We'll recommend the simplest thing that fixes it."
            divider
            titleClassName="max-w-[620px]"
            descriptionClassName="max-w-[380px]"
          />
          <div data-anim="fade-up">
            <DataTable
              caption="Common problems and the service we'd usually suggest"
              columns={["If this sounds familiar", "We'd usually suggest"]}
              rows={PROBLEMS}
            />
          </div>
        </div>
      </section>

      <EngagementModelsSection />

      <MorePortfolioSection />
    </>
  )
}

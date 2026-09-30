import {
  CultureSection,
  MissionVisionSection,
  TeamSection,
} from "@/components/about/about-sections"
import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { PageHero } from "@/components/layout/page-hero"
import { BreadcrumbSchema } from "@/components/seo/schema"
import { CtaLink } from "@/components/ui/cta-link"
import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "About Us",
  description:
    "We take your vision, shape it into something powerful, and create results that leave a lasting mark on our clients and their industry.",
  canonicalUrl: "/about-us",
})

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
]

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        steps={BREADCRUMBS.map((c) => ({ name: c.label, url: c.href }))}
      />

      <PageHero
        breadcrumbs={BREADCRUMBS}
        titleClassName="max-w-[986px]"
        title={
          <>
            {/* Block from sm up forces the break; not a <br>, which the
                title's line-split reveal would treat as a hard break on mobile */}
            <span className="sm:block">Creating Value That Lasts</span> At{" "}
            <span className="text-brand">Meritorious</span> Infotech
          </>
        }
        description="We take your vision, shape it into something powerful, and create results that leave a lasting mark on our clients and their industry."
        descriptionClassName="max-w-[792px]"
        action={
          <CtaLink
            href="/contact"
            icon={<ArrowUpRightSolidIcon />}
            hoverIcon={<ArrowRightIcon />}
          >
            Let’s Discuss opportunity
          </CtaLink>
        }
      />

      <MissionVisionSection />
      <TeamSection />
      <CultureSection />
    </>
  )
}

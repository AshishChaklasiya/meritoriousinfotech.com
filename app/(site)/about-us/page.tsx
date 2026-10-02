import {
  CultureSection,
  MissionVisionSection,
  TeamSection,
  ValuesSection,
} from "@/components/about/about-sections"
import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { PageHero } from "@/components/layout/page-hero"
import { BreadcrumbSchema } from "@/components/seo/schema"
import { CtaLink } from "@/components/ui/cta-link"
import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "About Our Surat Software Team",
  description:
    "Meritorious Infotech is an IT company in Surat, Gujarat, building websites, apps and software since 2014. A small senior team you work with directly.",
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
        description="Meritorious Infotech is a design and software development company in Nanpura, Surat. Since 2014, our team has built websites, mobile apps and business software for clients in India and abroad. We stay deliberately small, so every client works directly with the people doing the work."
        descriptionClassName="max-w-[792px]"
        action={
          <CtaLink
            href="/contact"
            icon={<ArrowUpRightSolidIcon />}
            hoverIcon={<ArrowRightIcon />}
          >
            Let’s discuss your project
          </CtaLink>
        }
      />

      <MissionVisionSection />
      <ValuesSection />
      <TeamSection />
      <CultureSection />
    </>
  )
}

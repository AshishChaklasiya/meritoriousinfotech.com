import {
  RiDashboardLine,
  RiMoneyRupeeCircleLine,
  RiPlugLine,
  RiSeedlingLine,
  RiShirtLine,
  RiShoppingBagLine,
  RiSmartphoneLine,
  RiStackLine,
  RiTranslate2,
  RiTruckLine,
} from "@remixicon/react"

import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { PageHero } from "@/components/layout/page-hero"
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/schema"
import { CtaLink } from "@/components/ui/cta-link"
import { IconCard } from "@/components/ui/icon-card"
import { SectionHeader } from "@/components/ui/section-header"
import { constructMetadata } from "@/lib/metadata"

const DESCRIPTION =
  "Custom software for Surat textile and manufacturing businesses: order booking, stock, job-work and dispatch tracking. Book a free process review."

export const metadata = constructMetadata({
  title: "Software for Textile Businesses in Surat",
  description: DESCRIPTION,
  canonicalUrl: "/industries/textile-manufacturing",
})

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  {
    label: "Textile & Manufacturing",
    href: "/industries/textile-manufacturing",
  },
]

const BUILDS = [
  {
    icon: RiSmartphoneLine,
    title: "Order booking app",
    description:
      "For agents and dealers, with live stock and price lists in their pocket.",
  },
  {
    icon: RiStackLine,
    title: "Stock and godown management",
    description: "Track every piece by design, colour, lot and location.",
  },
  {
    icon: RiShirtLine,
    title: "Job-work tracking",
    description:
      "Follow goods through dyeing, printing, embroidery and finishing units.",
  },
  {
    icon: RiShoppingBagLine,
    title: "B2B catalogue and wholesale store",
    description:
      "Dealer logins, wholesale price lists and minimum order quantities.",
  },
  {
    icon: RiTruckLine,
    title: "Dispatch and delivery tracking",
    description:
      "From challan to delivery, with status your customers can see.",
  },
  {
    icon: RiDashboardLine,
    title: "Owner dashboard",
    description: "Today's orders, dues and stock on one screen.",
  },
]

const REASONS = [
  {
    icon: RiMoneyRupeeCircleLine,
    title: "Pay only for what you use",
    description: "No modules you'll never open, and no per-user licence fees.",
  },
  {
    icon: RiTranslate2,
    title: "In your team's language",
    description:
      "Screens in Gujarati, Hindi or English, whichever your staff read.",
  },
  {
    icon: RiPlugLine,
    title: "Connects to your accounts",
    description:
      "Sync with your existing accounting software, so there's no double entry.",
  },
  {
    icon: RiSeedlingLine,
    title: "Grows with you",
    description: "Start with one workflow and add more when it pays off.",
  },
]

export default function TextileManufacturingPage() {
  return (
    <>
      <BreadcrumbSchema
        steps={BREADCRUMBS.map((c) => ({ name: c.label, url: c.href }))}
      />
      <ServiceSchema
        name="Software for textile and manufacturing businesses"
        description={DESCRIPTION}
        url="/industries/textile-manufacturing"
      />

      <PageHero
        breadcrumbs={BREADCRUMBS}
        titleClassName="max-w-[1000px]"
        title={
          <>
            Software for Surat&apos;s{" "}
            <span className="text-brand">Textile</span> and Manufacturing
            Businesses
          </>
        }
        description="Surat's textile traders, weavers and manufacturers juggle fast-moving orders, agents, credit terms and stock spread across several godowns. Off-the-shelf ERP software rarely fits the way these businesses actually work. We build apps and systems around your process, not the other way round."
        descriptionClassName="max-w-[900px]"
        action={
          <CtaLink
            href="/contact"
            icon={<ArrowUpRightSolidIcon />}
            hoverIcon={<ArrowRightIcon />}
          >
            Book a free process review
          </CtaLink>
        }
      />

      <section
        aria-labelledby="builds-title"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
      >
        <div className="container-content flex flex-col gap-10 md:gap-16">
          <SectionHeader
            id="builds-title"
            eyebrow="What we build"
            title="Tools Built Around How You Trade"
            description="Pick the one workflow that costs you the most time today. We'll start there."
            divider
            titleClassName="max-w-[560px]"
            descriptionClassName="max-w-[380px]"
          />
          <ul
            data-anim="stagger"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {BUILDS.map(({ icon: Icon, title, description }) => (
              <IconCard
                key={title}
                as="li"
                title={title}
                media={<Icon aria-hidden="true" className="size-6" />}
                interactive
              >
                <p>{description}</p>
              </IconCard>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="why-custom-title"
        className="border-b border-divider bg-canvas py-16 md:py-24 xl:py-[110px]"
      >
        <div className="container-content flex flex-col gap-10 md:gap-16">
          <SectionHeader
            id="why-custom-title"
            eyebrow="Why custom"
            title="Why Custom Instead of a Ready-Made ERP"
            description="We'll visit your office or godown in Surat, map one workflow with your team and show you what can be automated. Free, with no obligation."
            divider
            titleClassName="max-w-[620px]"
            descriptionClassName="max-w-[400px]"
          />
          <ul
            data-anim="stagger"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {REASONS.map(({ icon: Icon, title, description }) => (
              <IconCard
                key={title}
                as="li"
                title={title}
                media={<Icon aria-hidden="true" className="size-6" />}
              >
                <p>{description}</p>
              </IconCard>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

import {
  RiGlobalLine,
  RiRocketLine,
  RiStore2Line,
  RiToolsLine,
} from "@remixicon/react"

import { IconCard } from "@/components/ui/icon-card"
import { SectionHeader } from "@/components/ui/section-header"

const AUDIENCES = [
  {
    icon: RiRocketLine,
    title: "Founders launching a product",
    description:
      "Turn an idea into a tested MVP. We help you cut the scope to what matters for launch, then build it in weeks.",
  },
  {
    icon: RiStore2Line,
    title: "Growing businesses in Gujarat",
    description:
      "Replace spreadsheets, WhatsApp orders and paper registers with a website, app or system your staff will actually use.",
  },
  {
    icon: RiGlobalLine,
    title: "Agencies and product teams abroad",
    description:
      "Add experienced designers and developers to your team, white-label or under your brand, with working hours that overlap yours.",
  },
  {
    icon: RiToolsLine,
    title: "Teams with an unfinished product",
    description:
      "We review what exists, fix what's broken and carry on development. We only start from scratch when that's genuinely cheaper.",
  },
]

export function AudienceSection() {
  return (
    <section
      aria-labelledby="audience-title"
      className="border-b border-divider bg-surface py-16 md:py-24 xl:py-36"
    >
      <div className="container-content flex flex-col gap-10 md:gap-16">
        <SectionHeader
          id="audience-title"
          index="02"
          eyebrow="Who we work with"
          title="Built for Teams That Need a Dependable Build Partner"
          description="A small senior team suits buyers who want direct access, one point of contact and a fixed quote, wherever they're based."
          divider
          titleClassName="max-w-[560px]"
          descriptionClassName="max-w-[437px]"
        />

        <ul
          data-anim="stagger"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {AUDIENCES.map(({ icon: Icon, title, description }) => (
            <IconCard
              key={title}
              as="li"
              media={<Icon className="size-6" />}
              title={title}
              interactive
            >
              <p>{description}</p>
            </IconCard>
          ))}
        </ul>
      </div>
    </section>
  )
}

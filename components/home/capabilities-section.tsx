import type { ComponentType, SVGProps } from "react"

import { IconCard } from "@/components/ui/icon-card"
import { SectionHeader } from "@/components/ui/section-header"
import {
  LightbulbIcon,
  MonitorPlayIcon,
  PenToolIcon,
  UsersGroupIcon,
} from "@/components/icons"

type Capability = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
}

const CAPABILITIES: Capability[] = [
  {
    icon: PenToolIcon,
    title: "Design with Purpose",
    description: "Craft intuitive interfaces for captivating user experiences.",
  },
  {
    icon: UsersGroupIcon,
    title: "Efficient CMS",
    description: "Empower Your Organization with Efficient CMS Solutions",
  },
  {
    icon: MonitorPlayIcon,
    title: "Digital Crafting",
    description: "Elevate your online presence with tailored web solutions.",
  },
  {
    icon: LightbulbIcon,
    title: "Innovate & Execute",
    description: "Transform your ideas into powerful mobile applications.",
  },
]

export function CapabilitiesSection() {
  return (
    <section
      aria-labelledby="capabilities-title"
      className="border-b border-divider bg-surface py-16 md:py-24 xl:py-36"
    >
      <div className="container-content flex flex-col gap-10 md:gap-16">
        <SectionHeader
          id="capabilities-title"
          eyebrow="Our Capabilities"
          title="We Turn Ideas Into Digital Experiences"
          description="From intuitive interfaces to powerful web and mobile solutions, we build digital products designed around your goals and your users."
          divider
          titleClassName="max-w-[477px]"
          descriptionClassName="max-w-[437px]"
        />

        <ul
          data-anim="stagger"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {CAPABILITIES.map(({ icon, title, description }) => (
            <IconCard key={title} as="li" icon={icon} title={title} interactive>
              <p>{description}</p>
            </IconCard>
          ))}
        </ul>
      </div>
    </section>
  )
}

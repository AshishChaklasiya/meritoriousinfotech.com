import type { ComponentType, SVGProps } from "react"

import { DeviceMobileIcon, MonitorIcon, PenToolIcon } from "@/components/icons"
import { LearnMoreLink } from "@/components/ui/learn-more-link"

type ServiceOverview = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
  tags: string[]
  href: string
}

/** 24px monitor drawn from the shared 18px glyph (1.5px stroke at 24px) */
function MonitorLargeIcon(props: SVGProps<SVGSVGElement>) {
  return <MonitorIcon strokeWidth={1.125} {...props} />
}

const SERVICES: ServiceOverview[] = [
  {
    icon: PenToolIcon,
    title: "Graphic & UI/UX System Design",
    description:
      "Bringing your product vision into crystal clarity. We construct cohesive design systems, atomic UI components, and accessible digital touchpoint that command authority in saturated industries.",
    tags: ["Figma", "Photoshop", "Illustrator", "XD"],
    href: "/services/graphic-ui-ux-design",
  },
  {
    icon: MonitorLargeIcon,
    title: "Web Engineering & Platforms",
    description:
      "Build and own automated QA pipelines for our web and mobile products. Manual + automation, with a craft mindset.",
    tags: ["NODE", "React Native", "DJANGO", "POSTGRES"],
    href: "/services/web-engineering-platforms",
  },
  {
    icon: DeviceMobileIcon,
    title: "Mobile App Development",
    description:
      "Native and hybrid applications engineered with surgical precision. Smooth 60 FPS transitions, battery-optimized background synchronizations, and seamless platform-specific APIs.",
    tags: ["Android", "IOS", "Flutter", "ReactNative"],
    href: "/services/mobile-app-development",
  },
]

export function ServicesOverviewSection() {
  return (
    <section
      aria-label="Service areas"
      className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
    >
      <ul
        data-anim="stagger"
        className="container-content grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {SERVICES.map(({ icon: Icon, title, description, tags, href }) => (
          <li
            key={title}
            data-pointer
            data-tilt="4"
            className="group/service spotlight flex flex-col gap-6 border border-divider bg-surface p-6 transition-colors duration-200 hover:bg-ink sm:p-8"
          >
            <span className="flex size-12 items-center justify-center border border-ink-strong text-ink transition-[color,background-color,border-color,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/service:-rotate-6 group-hover/service:border-brand group-hover/service:bg-brand group-hover/service:text-surface">
              <Icon className="size-6" />
            </span>
            {/* Grows so tags + link align across cards (Figma: equal-height copy) */}
            <div className="flex flex-1 flex-col gap-1.5">
              <h2 className="text-h4 font-medium tracking-[0.045em] text-ink transition-colors group-hover/service:text-surface">
                {title}
              </h2>
              <p className="text-body text-grey-1">{description}</p>
            </div>
            <ul aria-label="Tools" className="flex flex-wrap gap-x-4 gap-y-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-divider px-2.5 py-1 text-xs leading-[15px] font-medium text-grey-1 transition-colors group-hover/service:border-divider-inverse"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <LearnMoreLink
              href={href}
              label="Explore More"
              aria-label={`Explore ${title}`}
              className="after:absolute after:inset-0 after:content-['']"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

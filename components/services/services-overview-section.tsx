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
    title: "UI/UX & Graphic Design",
    description:
      "Brand identities, website and app interfaces, and clickable prototypes that show how your product will work before development starts.",
    tags: ["Figma", "Photoshop", "Illustrator"],
    href: "/services/graphic-ui-ux-design",
  },
  {
    icon: MonitorLargeIcon,
    title: "Web Development",
    description:
      "Business websites, online stores, customer portals and web applications that are fast, easy to update and built to be found on Google.",
    tags: ["React", "Node.js", "Laravel", "WordPress"],
    href: "/services/web-engineering-platforms",
  },
  {
    icon: DeviceMobileIcon,
    title: "Mobile App Development",
    description:
      "Android, iOS and cross-platform apps, from a first MVP to a product used every day, with store launch and ongoing support included.",
    tags: ["Android", "iOS", "Flutter", "React Native"],
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
            data-cursor="Explore"
            className="group/service spotlight flex flex-col gap-6 border border-divider bg-surface p-6 transition-colors duration-300 hover:bg-ink sm:p-8"
          >
            <span className="flex size-12 items-center justify-center border border-ink-strong text-ink transition-[color,background-color,border-color,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/service:-rotate-6 group-hover/service:border-brand group-hover/service:bg-brand group-hover/service:text-snow">
              <Icon className="size-6" />
            </span>
            {/* Grows so tags + link align across cards (Figma: equal-height copy) */}
            <div className="flex flex-1 flex-col gap-1.5">
              <h2 className="text-h4 font-medium tracking-[0.045em] text-ink transition-colors group-hover/service:text-surface">
                {title}
              </h2>
              <p className="text-body text-grey-1">{description}</p>
            </div>
            <ul
              aria-label="Tools"
              className="flex flex-wrap gap-x-4 gap-y-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/service:translate-x-1"
            >
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-divider px-2.5 py-1 text-xs leading-[15px] font-medium text-grey-1 transition-colors group-hover/service:border-surface/20"
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

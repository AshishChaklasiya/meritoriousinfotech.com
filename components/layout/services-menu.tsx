import Link from "next/link"
import type { ComponentType, SVGProps } from "react"

import { MonitorIcon, PenToolIcon, SmartphoneIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

type ServiceMenuGroup = {
  title: string
  tagline: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  links: { label: string; href: string }[]
}

/** Pen tool drawn at 18px with the menu's 1.3px stroke (1.73 in its 24px grid) */
function DesignIcon(props: SVGProps<SVGSVGElement>) {
  return <PenToolIcon strokeWidth={1.73} {...props} />
}

// Figma: "Our services drop down" frame (6:717), panel 6:1389
export const SERVICE_MENU: ServiceMenuGroup[] = [
  {
    title: "UI/UX & Graphic Design",
    tagline: "Brands, interfaces, prototypes",
    href: "/services/graphic-ui-ux-design",
    icon: DesignIcon,
    links: [
      {
        label: "User Experience",
        href: "/services/graphic-ui-ux-design#elevating-user-experiences",
      },
      {
        label: "User Interface",
        href: "/services/graphic-ui-ux-design#craft-exceptional-user-interfaces",
      },
      {
        label: "User Research",
        href: "/services/graphic-ui-ux-design#user-research-services",
      },
      {
        label: "App UI Design",
        href: "/services/graphic-ui-ux-design#mobile-and-web-apps-ui-design",
      },
      {
        label: "Web Design & Branding",
        href: "/services/graphic-ui-ux-design#custom-web-design-services",
      },
      {
        label: "UI Prototyping",
        href: "/services/graphic-ui-ux-design#ui-prototyping-services",
      },
    ],
  },
  {
    title: "Web Development",
    tagline: "Websites, stores & web apps",
    href: "/services/web-engineering-platforms",
    icon: MonitorIcon,
    links: [
      {
        label: "Frontend Development",
        href: "/services/web-engineering-platforms#dynamic-frontend-development",
      },
      {
        label: "Backend Development",
        href: "/services/web-engineering-platforms#powerful-backend-development",
      },
      {
        label: "Landing Pages",
        href: "/services/web-engineering-platforms#landing-page-solutions",
      },
      {
        label: "CMS & Business Websites",
        href: "/services/web-engineering-platforms#efficient-cms-solutions",
      },
      {
        label: "E-commerce",
        href: "/services/web-engineering-platforms#tailored-ecommerce-solutions",
      },
      {
        label: "Web Apps & Portals",
        href: "/services/web-engineering-platforms#accelerating-your-development",
      },
    ],
  },
  {
    title: "Mobile App Development",
    tagline: "iOS, Android & beyond",
    href: "/services/mobile-app-development",
    icon: SmartphoneIcon,
    links: [
      {
        label: "Android",
        href: "/services/mobile-app-development#android-app-development",
      },
      {
        label: "iOS",
        href: "/services/mobile-app-development#ios-app-development",
      },
      {
        label: "Flutter",
        href: "/services/mobile-app-development#flutter-development",
      },
      {
        label: "React Native",
        href: "/services/mobile-app-development#react-native-development",
      },
    ],
  },
]

function GroupHeading({
  group,
  onNavigate,
}: {
  group: ServiceMenuGroup
  onNavigate?: () => void
}) {
  const Icon = group.icon
  return (
    <Link
      href={group.href}
      onClick={onNavigate}
      className="group/heading -mx-2 flex items-start gap-3 rounded-[14px] p-2 transition-colors hover:bg-canvas"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
        <Icon className="size-[18px]" />
      </span>
      <span className="flex flex-col">
        <span className="text-body-sm leading-[18px] font-medium text-ink transition-colors group-hover/heading:text-brand">
          {group.title}
        </span>
        <span className="pt-0.5 text-eyebrow leading-[15px] tracking-normal text-grey-1">
          {group.tagline}
        </span>
      </span>
    </Link>
  )
}

function GroupLinks({
  group,
  onNavigate,
}: {
  group: ServiceMenuGroup
  onNavigate?: () => void
}) {
  return (
    <ul className="flex flex-col pt-2.5">
      {group.links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            onClick={onNavigate}
            className="flex rounded-[10px] px-2 py-1.5 text-body-sm leading-5 text-grey-1 transition-colors hover:text-brand focus-visible:text-brand"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Desktop dropdown panel: three service groups side by side. */
export function ServicesMegaMenu({
  id,
  className,
  onNavigate,
}: {
  id?: string
  className?: string
  onNavigate?: () => void
}) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-card border border-divider bg-surface p-6 shadow-dropdown",
        className
      )}
    >
      <div className="flex gap-[35px]">
        {SERVICE_MENU.map((group) => (
          <div
            key={group.title}
            className="flex w-[221px] flex-col border-divider not-last:border-r-[0.5px]"
          >
            <GroupHeading group={group} onNavigate={onNavigate} />
            <GroupLinks group={group} onNavigate={onNavigate} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Stacked version for the mobile navigation drawer. */
export function ServicesMenuList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-4 pb-3 pl-2">
      {SERVICE_MENU.map((group) => (
        <div key={group.title} className="flex flex-col">
          <GroupHeading group={group} onNavigate={onNavigate} />
          <GroupLinks group={group} onNavigate={onNavigate} />
        </div>
      ))}
    </div>
  )
}

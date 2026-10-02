import { SectionHeader } from "@/components/ui/section-header"
import { LearnMoreLink } from "@/components/ui/learn-more-link"
import { cn } from "@/lib/utils"

type Module = {
  code: string
  title: string
  description: string
  href: string
}

type ServiceGroup = {
  kicker: string
  title: string
  description: string
  spec: string
  modules: Module[]
  /** Four compact modules in a single row (mobile runtimes) */
  compact?: boolean
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    kicker: "Design",
    title: "UI/UX & Graphic\nDesign",
    description:
      "Brand identities, app and website interfaces, and clickable prototypes you can test with real users before a line of code is written.",
    spec: "Tools:  Figma • Illustrator • Photoshop",
    modules: [
      {
        code: "UX",
        title: "User Experience Design",
        description:
          "Research, user flows and wireframes that make the next step obvious.",
        href: "/services/graphic-ui-ux-design#elevating-user-experiences",
      },
      {
        code: "UI",
        title: "Interface Design",
        description:
          "Screens, components and a design system developers can build from directly.",
        href: "/services/graphic-ui-ux-design#craft-exceptional-user-interfaces",
      },
      {
        code: "BRAND",
        title: "Brand & Graphic Design",
        description:
          "Logos, brand guidelines, brochures and social templates that match your product.",
        href: "/services/graphic-ui-ux-design#custom-web-design-services",
      },
      {
        code: "PROTO",
        title: "Prototyping",
        description:
          "Clickable prototypes for testing ideas and pitching investors before you build.",
        href: "/services/graphic-ui-ux-design#ui-prototyping-services",
      },
    ],
  },
  {
    kicker: "Web",
    title: "Web\nDevelopment",
    description:
      "Business websites, online stores, customer portals and web applications that load fast, rank well and are easy for your team to update.",
    spec: "Stack: React • Angular • Node.js • Laravel • Python",
    modules: [
      {
        code: "MOD_CMS",
        title: "Business Websites & CMS",
        description:
          "Sites your team edits itself, without calling a developer for every change.",
        href: "/services/web-engineering-platforms#efficient-cms-solutions",
      },
      {
        code: "MOD_ECOM",
        title: "E-commerce",
        description:
          "Shopify, WooCommerce and custom stores with Indian and international payments.",
        href: "/services/web-engineering-platforms#tailored-ecommerce-solutions",
      },
      {
        code: "MOD_APPS",
        title: "Web Apps & Portals",
        description:
          "Dashboards, booking systems, B2B portals and internal tools built around your workflow.",
        href: "/services/web-engineering-platforms#accelerating-your-development",
      },
      {
        code: "MOD_BACK",
        title: "Backend & APIs",
        description:
          "Secure databases and connections to the accounting, CRM and payment tools you use.",
        href: "/services/web-engineering-platforms#powerful-backend-development",
      },
    ],
  },
  {
    kicker: "Mobile",
    title: "Mobile App Development",
    description:
      "Android and iOS apps, from a first MVP to a product with thousands of users. We build native when performance matters most, and cross-platform when budget and speed matter more.",
    spec: "Targets: iOS • Android • Cross-platform",
    compact: true,
    modules: [
      {
        code: "GOOGLE",
        title: "Android",
        description: "Kotlin • Jetpack",
        href: "/services/mobile-app-development#android-app-development",
      },
      {
        code: "APPLE",
        title: "iOS",
        description: "Swift • SwiftUI",
        href: "/services/mobile-app-development#ios-app-development",
      },
      {
        code: "DART",
        title: "Flutter",
        description: "Unified UI Base",
        href: "/services/mobile-app-development#flutter-development",
      },
      {
        code: "META",
        title: "ReactNative",
        description: "TypeScript Core",
        href: "/services/mobile-app-development#react-native-development",
      },
    ],
  },
]

function ModuleCard({ module }: { module: Module }) {
  return (
    <div
      data-pointer
      data-hover-group
      className="group/module spotlight flex flex-col gap-1.5 rounded-card border border-divider bg-surface p-6 transition-[color,background-color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-divider/10 hover:bg-ink"
    >
      <p
        data-scramble-hover
        className="font-mono text-eyebrow tracking-normal text-grey-1 transition-[translate,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/module:translate-x-1 group-hover/module:text-brand"
      >
        {module.code}
      </p>
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1">
          <h4 className="text-title font-medium text-ink transition-colors group-hover/module:text-surface">
            {module.title}
          </h4>
          <p className="text-caption text-grey-1">{module.description}</p>
        </div>
        <LearnMoreLink
          href={module.href}
          aria-label={`Learn more about ${module.title}`}
        />
      </div>
    </div>
  )
}

/** Stacked below xl: side-by-side at 1024 squeezes the module cards to ~160px. */
function ServiceGroupRow({ group }: { group: ServiceGroup }) {
  return (
    <article
      data-stack-card
      className={cn(
        "stack-card relative flex flex-col border border-divider bg-surface xl:flex-row xl:items-center",
        group.compact && "xl:min-h-[387px]"
      )}
    >
      {/* Darkens as the next row stacks over this one */}
      <span
        aria-hidden="true"
        data-stack-shade
        className="pointer-events-none absolute inset-0 z-10 bg-night/[0.07] opacity-0 dark:bg-night/45"
      />
      <div
        data-anim="fade-up"
        className="flex flex-col gap-7 p-6 md:p-10 xl:w-[536px] xl:shrink-0"
      >
        <div className="flex flex-col gap-4">
          <p className="font-mono text-eyebrow tracking-[0.08em] text-brand uppercase">
            {group.kicker}
          </p>
          <h3 className="text-h3 font-semibold text-ink xl:whitespace-pre-line">
            {group.title}
          </h3>
          <p className="text-body text-grey-1">{group.description}</p>
        </div>
        <p className="border-t border-divider pt-6 font-mono text-eyebrow tracking-normal text-grey-2 uppercase">
          {group.spec}
        </p>
      </div>

      <div
        data-anim="stagger"
        data-delay="0.15"
        className={cn(
          "grid content-center gap-4 border-t border-divider bg-canvas-muted p-6 md:p-10 xl:flex-1 xl:self-stretch xl:border-t-0 xl:border-l",
          // Four across while stacked (lg), two beside the copy (xl)
          group.compact
            ? "sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4"
            : "sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2"
        )}
      >
        {group.modules.map((module) => (
          <ModuleCard key={module.code} module={module} />
        ))}
      </div>
    </article>
  )
}

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-canvas py-16 md:py-24 xl:py-[110px]"
    >
      <div data-scene="stack" className="container-content flex flex-col gap-8">
        <SectionHeader
          id="services-title"
          index="01"
          eyebrow="What we do"
          title={"Design, Web and\nMobile Development\nUnder One Roof"}
          description="Most projects need all three. With one team handling them, there are fewer handovers, decisions happen faster, and the finished product looks the way it was designed."
          divider
          descriptionClassName="max-w-[415px]"
        />
        {SERVICE_GROUPS.map((group) => (
          <ServiceGroupRow key={group.title} group={group} />
        ))}
      </div>
    </section>
  )
}

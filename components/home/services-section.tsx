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
    kicker: "Visual Architecture",
    title: "Graphic & UI/UX System\nDesign",
    description:
      "Bringing your product vision into crystal clarity. We construct cohesive design systems, atomic UI components, and accessible digital touchpoint that command authority in saturated industries.",
    spec: "Spec:  Figma • Photoshop • Illustrator",
    modules: [
      {
        code: "UX",
        title: "User Experience Design",
        description:
          "Information architecture, cognitive flow mapping, and usability testing.",
        href: "/services/graphic-ui-ux-design#elevating-user-experiences",
      },
      {
        code: "UI",
        title: "User Interface Systems",
        description:
          "Pixel-precise component kits, responsive layouts, and unified design tokens.",
        href: "/services/graphic-ui-ux-design#craft-exceptional-user-interfaces",
      },
      {
        code: "CUSTOM",
        title: "Custom Web Design",
        description:
          "Bespoke digital experiences tailored for conversion and branding resonance.",
        href: "/services/graphic-ui-ux-design#custom-web-design-services",
      },
      {
        code: "PROTO",
        title: "Interactive Prototyping",
        description:
          "High-fidelity animated prototypes validating user journeys prior to deployment.",
        href: "/services/graphic-ui-ux-design#ui-prototyping-services",
      },
    ],
  },
  {
    kicker: "Full Stack Engineering",
    title: "Web Engineering &\nPlatforms",
    description:
      "Tailored web solutions configured for microsecond response times and high concurrency. From headless commerce platforms to bespoke operational SaaS and headless CMS environments.",
    spec: "Stack: Node • React • Django • Postgres",
    modules: [
      {
        code: "MOD_CMS",
        title: "CMS Solutions",
        description:
          "Modular CMS installations designed for speed and autonomy.",
        href: "/services/web-engineering-platforms#efficient-cms-solutions",
      },
      {
        code: "MOD_ECOM",
        title: "E-Commerce Solutions",
        description:
          "Cart pipelines with automated payment gateway fault-tolerance.",
        href: "/services/web-engineering-platforms#tailored-ecommerce-solutions",
      },
      {
        code: "MOD_BACK",
        title: "Backend Development",
        description:
          "Bespoke digital experiences tailored for conversion and branding resonance.",
        href: "/services/web-engineering-platforms#powerful-backend-development",
      },
      {
        code: "MOD_FRONT",
        title: "Frontend Development",
        description:
          "SPA/SSR frameworks with sub-second page loads and clean state trees.",
        href: "/services/web-engineering-platforms#dynamic-frontend-development",
      },
    ],
  },
  {
    kicker: "Mobile Runtimes",
    title: "Mobile App Development",
    description:
      "Native and hybrid applications engineered with surgical precision. Smooth 60 FPS transitions, battery-optimized background synchronizations, and seamless platform-specific APIs.",
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
      className="group/module spotlight flex flex-col gap-1.5 rounded-card border border-divider bg-surface p-6 transition-colors duration-200 hover:border-divider/10 hover:bg-ink"
    >
      <p
        data-scramble-hover
        className="font-mono text-eyebrow tracking-normal text-grey-1"
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
        className="pointer-events-none absolute inset-0 z-10 bg-ink/[0.07] opacity-0"
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
          eyebrow="Services & System Modules"
          title={"Engineered for\nPerformance, Rigor &\nScale"}
          description="Standardized engineering lifecycles. We build scalable backend fabrics, fluid interactive frontends, and unified enterprise applications."
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

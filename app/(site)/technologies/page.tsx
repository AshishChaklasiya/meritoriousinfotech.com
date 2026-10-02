import {
  RiAngularjsLine,
  RiDatabase2Line,
  RiFlutterFill,
  RiJavaLine,
  RiNodejsLine,
  RiPhpLine,
  RiReactjsLine,
  RiWordpressLine,
  type RemixiconComponentType,
} from "@remixicon/react"
import Image from "next/image"

import { PageHero } from "@/components/layout/page-hero"
import { IconCard } from "@/components/ui/icon-card"
import { constructMetadata } from "@/lib/metadata"

const DESCRIPTION =
  "We choose tools to suit your project, budget and team. Here's the stack our designers and developers use every day, from Figma to Flutter."

export const metadata = constructMetadata({
  title: "Technologies We Use",
  description:
    "The design, web, mobile and backend technologies our Surat team uses every day, including Figma, React, Node.js, Laravel, Flutter and Kotlin.",
  canonicalUrl: "/technologies",
})

/** One of: a raster logo in /images/technologies, a Remix icon, or a monogram */
type Tech = {
  name: string
  description: string
  logo?: string
  icon?: RemixiconComponentType
  monogram?: string
}

const GROUPS: { title: string; items: Tech[] }[] = [
  {
    title: "Design",
    items: [
      {
        name: "Figma",
        logo: "figma",
        description:
          "Where we design interfaces, build component libraries and share clickable prototypes.",
      },
      {
        name: "Photoshop",
        logo: "photoshop",
        description: "Image editing, mock-ups and marketing graphics.",
      },
      {
        name: "Illustrator",
        logo: "illustrator",
        description:
          "Logos, icons, illustrations and print-ready brand assets.",
      },
      {
        name: "Sketch",
        logo: "sketch",
        description:
          "Interface design for teams whose files already live in Sketch.",
      },
    ],
  },
  {
    title: "Frontend",
    items: [
      {
        name: "HTML & CSS",
        logo: "html",
        description:
          "Accessible, responsive markup and styling that loads fast on any device.",
      },
      {
        name: "JavaScript",
        logo: "javascript",
        description:
          "The language behind every interactive web experience we build.",
      },
      {
        name: "React",
        logo: "react",
        description: "Interactive web apps, dashboards and customer portals.",
      },
      {
        name: "Angular",
        icon: RiAngularjsLine,
        description:
          "A structured framework for large business applications with many forms and roles.",
      },
      {
        name: "Vue.js",
        logo: "vue",
        description:
          "A lightweight framework for fast, interactive interfaces.",
      },
    ],
  },
  {
    title: "Mobile",
    items: [
      {
        name: "Kotlin",
        monogram: "Kt",
        description:
          "Google's recommended language for native Android apps, with Jetpack Compose.",
      },
      {
        name: "Swift",
        logo: "swift",
        description: "Native iPhone and iPad apps with SwiftUI.",
      },
      {
        name: "Flutter",
        icon: RiFlutterFill,
        description:
          "One codebase for Android and iOS apps with a native look and feel.",
      },
      {
        name: "React Native",
        icon: RiReactjsLine,
        description:
          "Cross-platform apps that share skills and code with a React website.",
      },
    ],
  },
  {
    title: "Backend, CMS & data",
    items: [
      {
        name: "Node.js",
        icon: RiNodejsLine,
        description:
          "JavaScript on the server, for APIs and real-time features.",
      },
      {
        name: "Laravel",
        monogram: "Lv",
        description:
          "A PHP framework for secure business applications that are quick to build.",
      },
      {
        name: "PHP",
        icon: RiPhpLine,
        description: "The language behind Laravel, WordPress and WooCommerce.",
      },
      {
        name: "Python",
        monogram: "Py",
        description: "APIs, automation, data processing and AI integrations.",
      },
      {
        name: "Java",
        icon: RiJavaLine,
        description: "Robust backends for larger enterprise systems.",
      },
      {
        name: "WordPress",
        icon: RiWordpressLine,
        description:
          "Business websites and blogs your team can edit without a developer.",
      },
      {
        name: "MySQL, PostgreSQL & MongoDB",
        icon: RiDatabase2Line,
        description:
          "Relational or document databases, chosen to fit your data.",
      },
    ],
  },
]

function TechMedia({ tech }: { tech: Tech }) {
  if (tech.logo) {
    return (
      <Image
        src={`/images/technologies/${tech.logo}.png`}
        alt=""
        width={25}
        height={24}
        className="h-6 w-[25px] object-contain"
      />
    )
  }
  if (tech.icon) {
    const Icon = tech.icon
    return <Icon aria-hidden="true" className="size-6" />
  }
  return (
    <span aria-hidden="true" className="font-mono text-body-sm font-bold">
      {tech.monogram}
    </span>
  )
}

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Technologies <span className="text-brand">We Use</span>
          </>
        }
        titleClassName="max-w-[900px]"
        description={DESCRIPTION}
      />

      <section
        aria-label="Technologies we use"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
      >
        <div className="container-content flex flex-col gap-14 xl:gap-20">
          {GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-6">
              <h2 className="font-mono text-eyebrow font-bold text-brand uppercase">
                {group.title}
              </h2>
              <ul
                data-anim="stagger"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 xl:gap-y-8"
              >
                {group.items.map((tech) => (
                  <IconCard
                    key={tech.name}
                    as="li"
                    title={tech.name}
                    media={<TechMedia tech={tech} />}
                  >
                    <p>{tech.description}</p>
                  </IconCard>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

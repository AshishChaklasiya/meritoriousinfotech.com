import Image from "next/image"

import { PageHero } from "@/components/layout/page-hero"
import { IconCard } from "@/components/ui/icon-card"
import { constructMetadata } from "@/lib/metadata"

const DESCRIPTION =
  "Explore modern frameworks and tools driving digital innovation. Stay ahead of the curve with insights into the latest trends shaping the tech landscape."

export const metadata = constructMetadata({
  title: "Technologies",
  description: DESCRIPTION,
  canonicalUrl: "/technologies",
})

const TECHNOLOGIES = [
  {
    name: "Adobe XD",
    logo: "adobe-xd",
    description: "Design and prototype user experiences for web and mobile.",
  },
  {
    name: "Sketch",
    logo: "sketch",
    description: "Vector graphics editor for UI/UX design.",
  },
  {
    name: "Figma",
    logo: "figma",
    description:
      "Collaborative interface design tool for creating responsive designs.",
  },
  {
    name: "Photoshop",
    logo: "photoshop",
    description: "Create and edit images, graphics, and layouts.",
  },
  {
    name: "Illustrator",
    logo: "illustrator",
    description:
      "Design logos, icons, typography, and illustrations with vector graphics.",
  },
  {
    name: "HTML",
    logo: "html",
    description:
      "Standard markup language for creating web pages and web applications.",
  },
  {
    name: "CSS",
    logo: "css",
    description:
      "Style sheet language used to define the presentation of HTML documents.",
  },
  {
    name: "Javascript",
    logo: "javascript",
    description:
      "Programming language for adding interactivity and dynamic content to web pages.",
  },
  {
    name: "React.js",
    logo: "react",
    description:
      "JavaScript library for building user interfaces, particularly for single-page applications.",
  },
  {
    name: "AngularJS",
    logo: "angularjs",
    description:
      "Structural framework for dynamic web apps, maintained by Google.",
  },
  {
    name: "Vue.js",
    logo: "vue",
    description:
      "Progressive JavaScript framework for building UIs and single-page applications.",
  },
  {
    name: "Swift",
    logo: "swift",
    description:
      "Programming language for iOS, macOS, watchOS, and tvOS app development by Apple.",
  },
]

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Modern <span className="text-brand">Technologies</span>
          </>
        }
        titleClassName="max-w-[900px]"
        description={DESCRIPTION}
      />

      <section
        aria-label="Technologies we use"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
      >
        <ul
          data-anim="stagger"
          className="container-content grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 xl:gap-y-[50px]"
        >
          {TECHNOLOGIES.map((tech) => (
            <IconCard
              key={tech.name}
              as="li"
              title={tech.name}
              media={
                <Image
                  src={`/images/technologies/${tech.logo}.png`}
                  alt=""
                  width={25}
                  height={24}
                  className="h-6 w-[25px] object-contain"
                />
              }
            >
              <p>{tech.description}</p>
            </IconCard>
          ))}
        </ul>
      </section>
    </>
  )
}

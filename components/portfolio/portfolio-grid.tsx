import Image from "next/image"

import { LearnMoreLink } from "@/components/ui/learn-more-link"
import {
  FEATURED_SLUGS,
  PORTFOLIO,
  type PortfolioProject,
} from "@/lib/content/portfolio"

export const FEATURED_PROJECTS = FEATURED_SLUGS.map(
  (slug) => PORTFOLIO.find((project) => project.slug === slug)!
)

export function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <article
      data-cursor="View"
      className="group/card relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-divider bg-surface transition-[translate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-[0_24px_48px_-24px_rgb(12_13_14/0.25)]"
    >
      <div>
        {/* Masked reveal on scroll, gentle parallax, zoom on hover */}
        <div
          data-anim="image"
          className="relative aspect-[414/208] w-full overflow-hidden"
        >
          <div data-anim-inner data-parallax="4" className="absolute inset-0">
            <Image
              src={project.image}
              alt={`${project.title} project preview`}
              fill
              sizes="(min-width: 1024px) 416px, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-105"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[10.8px] p-6">
          <h3 className="text-title-lg font-semibold text-ink transition-colors group-hover/card:text-brand">
            {project.title}
          </h3>
          <p className="text-body-sm text-grey-1">{project.summary}</p>
        </div>
      </div>
      <div className="px-6 pt-1.5 pb-[25.5px]">
        {/* Stretched: the whole card is the click target */}
        <LearnMoreLink
          href={`/portfolio/${project.slug}`}
          aria-label={`Learn more about ${project.title}`}
          className="after:absolute after:inset-0 after:content-['']"
        />
      </div>
    </article>
  )
}

/** Three-up project grid (Figma "Article - Dispatch" cards). */
export function PortfolioGrid({
  projects = FEATURED_PROJECTS,
}: {
  projects?: PortfolioProject[]
}) {
  return (
    <ul
      data-anim="stagger"
      className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <li key={project.slug}>
          <PortfolioCard project={project} />
        </li>
      ))}
    </ul>
  )
}

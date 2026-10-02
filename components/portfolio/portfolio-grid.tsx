import Image from "next/image"
import type * as React from "react"

import { LearnMoreLink } from "@/components/ui/learn-more-link"
import {
  FEATURED_SLUGS,
  PORTFOLIO,
  type PortfolioProject,
} from "@/lib/content/portfolio"

export const FEATURED_PROJECTS = FEATURED_SLUGS.map(
  (slug) => PORTFOLIO.find((project) => project.slug === slug)!
)

/**
 * Hover is layered, each layer at its own pace: the card lifts and a brand
 * rule sweeps its top edge, the image eases toward the pointer (independent of
 * the copy) under a darkening overlay, the category slides in, the title and
 * arrow respond, and the cursor ring reads OPEN.
 */
export function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <article
      data-cursor="Open"
      data-pointer
      className="group/card relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-divider bg-surface transition-[translate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-[0_24px_48px_-24px_rgb(12_13_14/0.25)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-x-100"
      />
      <div>
        {/* Masked reveal + parallax on scroll; pointer drift + zoom on hover */}
        <div
          data-anim="image"
          className="relative aspect-[414/208] w-full overflow-hidden"
        >
          <div data-anim-inner data-parallax="4" className="absolute inset-0">
            <div
              data-depth
              style={{ "--depth": -12 } as React.CSSProperties}
              className="absolute inset-0"
            >
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                sizes="(min-width: 1024px) 416px, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
              />
            </div>
          </div>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-night/35 via-night/5 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-3 translate-y-1.5 bg-night/85 px-2 py-1 font-mono text-micro tracking-[0.12em] text-snow uppercase opacity-0 transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:translate-y-0 group-hover/card:opacity-100"
          >
            {project.category}
          </span>
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

import type { ReactNode } from "react"

import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs"
import { HeroBackdrop } from "@/components/layout/hero-backdrop"
import { cn } from "@/lib/utils"

export type { Crumb }

type PageHeroProps = {
  /** Trail ending in the current page; omit where the design has none (Contact) */
  breadcrumbs?: Crumb[]
  title: ReactNode
  description: ReactNode
  /** Figma lead widths vary per page (824 / 880px …) */
  descriptionClassName?: string
  titleClassName?: string
  /** Extra line under the lead copy (job meta on Job Detail) */
  meta?: ReactNode
  /** Optional CTA under the copy (About, Careers, Job Detail) */
  action?: ReactNode
}

/** Inner-page hero: breadcrumb, display title and lead copy (Figma "Services" hero). */
export function PageHero({
  breadcrumbs,
  title,
  description,
  descriptionClassName,
  titleClassName,
  meta,
  action,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-title"
      data-scene="hero"
      data-pointer
      className="relative isolate overflow-hidden bg-canvas"
    >
      <HeroBackdrop rightGlowClassName="-top-[145px]" />

      <div
        data-hero-content
        className={cn(
          "container-content flex flex-col items-center pt-14 pb-16 text-center md:pt-20 md:pb-24",
          // Without a breadcrumb the title keeps its Figma position (97 + 20 + 41)
          breadcrumbs ? "xl:pt-[97px]" : "xl:pt-[158px]",
          action ? "xl:pb-[99px]" : "xl:pb-[121px]"
        )}
      >
        {breadcrumbs && (
          <div data-anim="fade-up">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        <div
          className={cn(
            "flex flex-col items-center gap-6 md:gap-[30px]",
            breadcrumbs && "mt-8 xl:mt-[41px]"
          )}
        >
          <h1
            id="page-title"
            data-anim="words"
            data-delay="0.1"
            className={cn(
              "max-w-[726px] text-display font-medium text-ink",
              titleClassName
            )}
          >
            {title}
          </h1>
          <p
            data-anim="lines"
            data-delay="0.35"
            className={cn(
              "max-w-[824px] text-body font-light text-grey-1 md:text-lead",
              descriptionClassName
            )}
          >
            {description}
          </p>
          {meta && (
            <div data-anim="fade-up" data-delay="0.5">
              {meta}
            </div>
          )}
        </div>

        {action && (
          <div
            data-anim="fade-up"
            data-delay="0.6"
            className="mt-10 xl:mt-[63px]"
          >
            {action}
          </div>
        )}
      </div>
    </section>
  )
}

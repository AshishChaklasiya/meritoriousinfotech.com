"use client"

import { AnimatePresence, motion, type Variants } from "motion/react"
import { useLayoutEffect, useRef, useState } from "react"

import { PortfolioCard } from "@/components/portfolio/portfolio-grid"
import {
  PORTFOLIO,
  PORTFOLIO_CATEGORIES,
  type PortfolioCategory,
} from "@/lib/content/portfolio"
import { gsap } from "@/lib/motion/gsap"
import { EASE_OUT, GLIDE } from "@/lib/motion/motion"
import { cn } from "@/lib/utils"

type Filter = PortfolioCategory | "all"

const FILTERS: { value: Filter; label: string; count: number }[] = [
  { value: "all", label: "All Projects", count: PORTFOLIO.length },
  ...PORTFOLIO_CATEGORIES.map((category) => ({
    value: category,
    label: category,
    count: PORTFOLIO.filter((project) => project.category === category).length,
  })),
]

/* Cards that stay glide to their new cell; new ones deal in, in order; the
   rest step out of the way. */
const card: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  shown: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: index * 0.07, ease: EASE_OUT },
  }),
  gone: { opacity: 0, scale: 0.96, transition: { duration: 0.25 } },
}

/** Category chips (Figma "Filter") above the project grid. */
export function PortfolioBrowser() {
  const [filter, setFilter] = useState<Filter>("all")
  const listRef = useRef<HTMLUListElement>(null)
  const handedOff = useRef(false)
  const projects =
    filter === "all"
      ? PORTFOLIO
      : PORTFOLIO.filter((project) => project.category === filter)

  // First paint is GSAP's scroll reveal. From the first filter on, Motion owns
  // the cards: stop a reveal still running, and mark everything revealed
  // (before paint) so cards mounted by the filter aren't held hidden.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || (!handedOff.current && filter === "all")) return
    if (!handedOff.current) {
      handedOff.current = true
      gsap.killTweensOf(list.children)
      gsap.set(list.children, { clearProps: "opacity,visibility" })
      list.setAttribute("data-revealed", "")
    }
    list
      .querySelectorAll("[data-anim]:not([data-revealed])")
      .forEach((el) => el.setAttribute("data-revealed", ""))
  }, [filter])

  return (
    <div className="flex flex-col gap-10 md:gap-16">
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2.5"
      >
        {FILTERS.map((item) => {
          const active = item.value === filter
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.value)}
              className={cn(
                "relative inline-flex rounded-[2px] border px-4 py-2 text-body-sm leading-5 font-medium transition-[color,background-color,border-color,translate] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-px",
                active
                  ? "border-brand text-snow"
                  : "border-divider bg-surface text-ink hover:border-ink"
              )}
            >
              {/* The brand fill travels to whichever chip is active */}
              {active && (
                <motion.span
                  layoutId="portfolio-filter"
                  aria-hidden="true"
                  transition={GLIDE}
                  className="absolute -inset-px rounded-[2px] bg-brand"
                />
              )}
              <span className="relative inline-flex items-center gap-2">
                {item.label}
                <span
                  className={cn(
                    "text-[10px] leading-none font-medium transition-colors duration-300",
                    active ? "text-snow" : "text-grey-1"
                  )}
                >
                  {item.count}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Same markup as PortfolioGrid, with each card animated by Motion */}
      <ul
        ref={listRef}
        data-anim="stagger"
        className="relative grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project, index) => (
            <motion.li
              key={project.slug}
              layout="position"
              custom={index}
              variants={card}
              initial="hidden"
              animate="shown"
              exit="gone"
              transition={{ layout: GLIDE }}
            >
              <PortfolioCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

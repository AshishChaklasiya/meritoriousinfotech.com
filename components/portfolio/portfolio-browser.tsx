"use client"

import { animate, stagger } from "animejs"
import { useEffect, useRef, useState } from "react"

import { PortfolioGrid } from "@/components/portfolio/portfolio-grid"
import {
  PORTFOLIO,
  PORTFOLIO_CATEGORIES,
  type PortfolioCategory,
} from "@/lib/content/portfolio"
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

/** Category chips (Figma "Filter") above the project grid. */
export function PortfolioBrowser() {
  const [filter, setFilter] = useState<Filter>("all")
  const gridRef = useRef<HTMLDivElement>(null)
  const shownFilter = useRef(filter)
  const projects =
    filter === "all"
      ? PORTFOLIO
      : PORTFOLIO.filter((project) => project.category === filter)

  // Re-deal the cards whenever the filter changes (not on first paint; the
  // scroll reveal handles that).
  useEffect(() => {
    if (shownFilter.current === filter) return
    shownFilter.current = filter
    const grid = gridRef.current
    if (!grid || !document.documentElement.classList.contains("motion")) return

    // Cards mounted by the filter skip their scroll reveal
    grid
      .querySelectorAll("[data-anim]")
      .forEach((el) => el.setAttribute("data-revealed", ""))
    const cards = grid.querySelectorAll("ul > li")
    const animation = animate(cards, {
      opacity: [0, 1],
      translateY: [28, 0],
      scale: [0.97, 1],
      duration: 700,
      delay: stagger(70),
      ease: "outExpo",
    })
    return () => {
      animation.revert()
    }
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
                "inline-flex items-center gap-2 rounded-[2px] border px-4 py-2 text-body-sm leading-5 font-medium transition-[color,background-color,border-color,translate] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-px",
                active
                  ? "border-brand bg-brand text-surface"
                  : "border-divider bg-surface text-ink hover:border-ink"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "text-[10px] leading-none font-medium",
                  active ? "text-surface" : "text-grey-1"
                )}
              >
                {item.count}
              </span>
            </button>
          )
        })}
      </div>

      <div ref={gridRef}>
        <PortfolioGrid projects={projects} />
      </div>
    </div>
  )
}

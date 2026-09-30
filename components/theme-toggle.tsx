"use client"

import { RiMoonLine, RiSunLine } from "@remixicon/react"
import { useTheme } from "next-themes"
import { useEffect, useSyncExternalStore } from "react"

import { prefersReducedMotion } from "@/lib/motion/env"
import { cn } from "@/lib/utils"

type Theme = "light" | "dark"

/**
 * Switches theme with a circular reveal expanding from `origin` (View
 * Transitions API). The class is applied synchronously inside the transition
 * — next-themes applies it in an effect, too late for the snapshot — and
 * setTheme persists the choice. Instant where unsupported / reduced motion.
 */
export function switchTheme(
  next: Theme,
  setTheme: (theme: string) => void,
  origin?: { x: number; y: number }
) {
  const root = document.documentElement
  const apply = () => {
    root.classList.remove("light", "dark")
    root.classList.add(next)
    root.style.colorScheme = next
    setTheme(next)
  }

  if (!document.startViewTransition || prefersReducedMotion()) {
    apply()
    return
  }

  const x = origin?.x ?? window.innerWidth / 2
  const y = origin?.y ?? 0
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )
  root.style.setProperty("--theme-x", `${x}px`)
  root.style.setProperty("--theme-y", `${y}px`)
  root.style.setProperty("--theme-r", `${radius}px`)
  document.startViewTransition(apply)
}

const subscribeNoop = () => () => {}

/** Header light/dark switch. The site opens in light; dark is opt-in. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  // The resolved theme is only known on the client; false during SSR and
  // hydration, true after — avoids a mismatch in the pressed state
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )
  const dark = mounted && resolvedTheme === "dark"

  // Keep the mobile address bar in step with the chosen theme
  useEffect(() => {
    if (!mounted) return
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#0d0e0f" : "#f9f9f8")
  }, [dark, mounted])

  return (
    <button
      type="button"
      aria-label="Dark theme"
      aria-pressed={mounted ? dark : undefined}
      title="Toggle theme (D)"
      data-magnetic="0.35"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        switchTheme(dark ? "light" : "dark", setTheme, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      }}
      className={cn(
        "group/theme relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-divider text-ink transition-colors duration-300 hover:border-ink",
        className
      )}
    >
      {/* Icons swap by theme class (no JS needed for the right one to show):
          moon in light (go dark), sun in dark (go light) */}
      <RiMoonLine
        aria-hidden="true"
        className="absolute size-[18px] transition-[rotate,scale,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/theme:-rotate-12 dark:scale-0 dark:rotate-90 dark:opacity-0"
      />
      <RiSunLine
        aria-hidden="true"
        className="absolute size-[18px] scale-0 -rotate-90 opacity-0 transition-[rotate,scale,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] dark:scale-100 dark:rotate-0 dark:opacity-100 dark:group-hover/theme:rotate-45"
      />
    </button>
  )
}

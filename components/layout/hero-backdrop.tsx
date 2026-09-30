import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

type HeroBackdropProps = {
  /** Warm glow on the left edge (Home hero only) */
  leftGlow?: boolean
  /** Vertical offset of the right-hand glow, e.g. "top-[9px]" */
  rightGlowClassName?: string
  /** Extra layers (e.g. the WebGL canvas) painted above the glows, under the fade */
  children?: ReactNode
}

/**
 * Shared hero background: faint grid, soft colour glows and a fade into the
 * canvas. Place inside a `relative isolate overflow-hidden` section; add
 * `data-pointer` to the section to light the grid up under the cursor and
 * let the glows drift with it (layered depth: glows > content).
 */
export function HeroBackdrop({
  leftGlow = false,
  rightGlowClassName = "top-[9px]",
  children,
}: HeroBackdropProps) {
  return (
    <>
      {/* Grid. Figma blends it with EXCLUSION, which its renderer composites to
          lines ~3 levels darker than the canvas; browsers need a low opacity on
          top of the blend to land on the same result. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 aspect-[1920/1358] min-h-full opacity-[0.016] mix-blend-exclusion"
      >
        <Image
          src="/images/home/hero-grid.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Brand-tinted grid revealed around the pointer (fine pointers only) */}
      <div
        aria-hidden="true"
        className="grid-spotlight pointer-events-none absolute inset-0 -z-10"
      />

      {leftGlow && (
        <div
          aria-hidden="true"
          data-hero-glow
          className="absolute top-[34px] -left-[183px] -z-10 size-[519px]"
        >
          {/* Inner layer: pointer depth (CSS) + drift; GSAP owns the wrapper */}
          <div
            data-depth
            style={{ "--depth": 28 } as CSSProperties}
            className="animate-drift size-full rounded-full bg-[#FED7AA]/50 blur-[125px] dark:bg-brand/[0.14]"
          />
        </div>
      )}
      <div
        aria-hidden="true"
        data-hero-glow
        className={cn(
          "absolute -right-[205px] -z-10 size-[503px]",
          rightGlowClassName
        )}
      >
        <div
          data-depth
          style={{ "--depth": -22 } as CSSProperties}
          className="animate-drift-reverse size-full rounded-full bg-[#DC3545]/20 blur-[100px] dark:bg-[#DC3545]/[0.14]"
        />
      </div>

      {children}

      {/* Fade into the page background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[207px] bg-linear-to-b from-canvas/0 to-canvas"
      />
    </>
  )
}

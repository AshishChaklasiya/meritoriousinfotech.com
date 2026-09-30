import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

type MarqueeProps = {
  children: ReactNode
  reverse?: boolean
  /** Seconds for one full loop */
  duration?: number
  /** Gap between items in px (also used to keep the loop seamless) */
  gap?: number
  /** Tailwind `from-*` colour for the edge fades — matches the section background */
  fadeClassName?: string
  /** Edge fade width (Figma: 56px on rows, ~200px on the About gallery) */
  fadeWidthClassName?: string
  className?: string
  pauseOnHover?: boolean
} & { [key: `data-${string}`]: string | number | boolean | undefined }

/**
 * Infinite horizontal ticker. Content is rendered twice and translated by
 * half its width; edge gradients (56px, per Figma) fade items in and out.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  gap = 20,
  fadeClassName = "from-canvas",
  fadeWidthClassName = "w-14",
  className,
  pauseOnHover = true,
  ...dataAttributes
}: MarqueeProps) {
  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-gap": `${gap}px`,
  } as CSSProperties

  return (
    <div
      className={cn("group/marquee relative overflow-hidden", className)}
      style={style}
      {...dataAttributes}
    >
      <div
        className={cn(
          "flex w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]"
        )}
        style={{ gap }}
      >
        <div className="flex shrink-0 items-stretch" style={{ gap }}>
          {children}
        </div>
        <div
          className="flex shrink-0 items-stretch"
          style={{ gap }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 bg-linear-to-r to-transparent",
          fadeWidthClassName,
          fadeClassName
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 bg-linear-to-l to-transparent",
          fadeWidthClassName,
          fadeClassName
        )}
      />
    </div>
  )
}

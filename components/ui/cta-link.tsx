import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CtaLinkProps = ComponentProps<typeof Link> & {
  variant?: "brand" | "brand-inverse"
  size?: "cta" | "nav"
  /** Trailing icon in the default state */
  icon?: ReactNode
  /** Trailing icon swapped in on hover (Figma hover variant) */
  hoverIcon?: ReactNode
}

/**
 * Brand call-to-action link — Figma "Link" / "Action Button → Link" components.
 *
 * Physical feedback: magnetic pull (fine pointers) with the label drifting a
 * little further than the button, fill wipe on hover, 0.97 press, and the
 * hover arrow slides in then nudges forward/back on its own.
 */
export function CtaLink({
  variant = "brand",
  size = "cta",
  icon,
  hoverIcon,
  className,
  children,
  ...props
}: CtaLinkProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      data-magnetic="0.3"
      // Not transition-all: GSAP drives transform for the magnetic pull
      className={cn(
        "transition-[color,background-color,border-color,box-shadow,scale,translate] duration-200",
        className
      )}
    >
      <Link {...props}>
        <span data-magnetic-label className="inline-block">
          {children}
        </span>
        {icon && (
          <span
            className={cn("contents", hoverIcon && "group-hover/button:hidden")}
          >
            {icon}
          </span>
        )}
        {hoverIcon && (
          <span className="hidden animate-in duration-300 fade-in slide-in-from-left-2 group-hover/button:inline-flex [&>svg]:arrow-nudge">
            {hoverIcon}
          </span>
        )}
      </Link>
    </Button>
  )
}

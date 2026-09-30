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
 * Magnetic on fine pointers; the hover icon slides in as it swaps.
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
        "transition-[color,background-color,border-color,box-shadow] duration-200",
        className
      )}
    >
      <Link {...props}>
        {children}
        {icon && (
          <span
            className={cn("contents", hoverIcon && "group-hover/button:hidden")}
          >
            {icon}
          </span>
        )}
        {hoverIcon && (
          <span className="hidden group-hover/button:contents [&>svg]:animate-in [&>svg]:duration-300 [&>svg]:fade-in [&>svg]:slide-in-from-left-2">
            {hoverIcon}
          </span>
        )}
      </Link>
    </Button>
  )
}

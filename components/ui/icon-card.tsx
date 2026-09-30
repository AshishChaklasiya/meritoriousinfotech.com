import type { ComponentType, ReactNode, SVGProps } from "react"

import { cn } from "@/lib/utils"

type IconCardProps = {
  /** Outline icon, or pass `media` for a raster logo (Technologies page) */
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  media?: ReactNode
  title: ReactNode
  children: ReactNode
  /** Dark hover state (Figma "blockquote.group" component, variant "over") */
  interactive?: boolean
  className?: string
  as?: "li" | "div" | "article"
}

/** Bordered card with a 48px outlined icon tile, title and body copy. */
export function IconCard({
  icon: Icon,
  media,
  title,
  children,
  interactive = false,
  className,
  as: Tag = "div",
}: IconCardProps) {
  return (
    <Tag
      data-pointer
      data-tilt={interactive ? 5 : undefined}
      className={cn(
        "group/icon-card spotlight flex flex-col gap-6 border border-divider bg-surface p-6 transition-[color,background-color,border-color,translate] duration-300 sm:p-8",
        // Interactive cards tilt + lift via GSAP; calm ones lift in CSS
        interactive
          ? "hover:bg-ink"
          : "hover:-translate-y-1 hover:border-brand/40",
        className
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center border border-ink-strong text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/icon-card:-rotate-6",
          interactive &&
            "transition-[color,background-color,border-color,rotate] group-hover/icon-card:border-brand group-hover/icon-card:bg-brand group-hover/icon-card:text-snow"
        )}
      >
        {Icon ? <Icon className="size-6" /> : media}
      </span>
      <div className="flex flex-col gap-1.5">
        <h3
          className={cn(
            "text-h4 font-semibold text-ink",
            interactive &&
              "transition-colors group-hover/icon-card:text-surface"
          )}
        >
          {title}
        </h3>
        <div className="text-body text-grey-1">{children}</div>
      </div>
    </Tag>
  )
}

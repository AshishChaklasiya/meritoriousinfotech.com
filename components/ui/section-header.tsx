import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  /** Bottom divider under the header row (Figma "Section Header" with stroke) */
  divider?: boolean
  titleClassName?: string
  descriptionClassName?: string
  className?: string
  id?: string
}

/**
 * `title` may contain "\n" for the design's explicit line breaks (applied from lg up).
 *
 * Eyebrow + H2 on the left, supporting copy bottom-aligned on the right.
 * Stacks on small screens.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  divider = false,
  titleClassName,
  descriptionClassName,
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16",
        divider && "pb-6",
        className
      )}
    >
      <div className="flex flex-col gap-[11.39px]">
        <p
          data-anim="scramble"
          className="font-mono text-eyebrow font-bold text-brand uppercase"
        >
          {eyebrow}
        </p>
        <h2
          id={id}
          data-anim="lines"
          data-delay="0.05"
          className={cn(
            "text-h2 font-medium text-ink lg:whitespace-pre-line",
            titleClassName
          )}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          data-anim="fade-up"
          data-delay="0.25"
          className={cn(
            "text-body-sm leading-normal tracking-[0.03em] text-grey-1 lg:shrink-0",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
      {divider && (
        // The divider draws itself in, left to right
        <span
          aria-hidden="true"
          data-anim="draw"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-divider"
        />
      )}
    </div>
  )
}

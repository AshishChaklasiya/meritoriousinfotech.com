import { Fragment, type ReactNode } from "react"

import { TraceLine } from "@/components/ui/trace-line"
import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  /** Bottom divider under the header row (Figma "Section Header" with stroke) */
  divider?: boolean
  /** Decorative section number ("01") shown before the eyebrow */
  index?: string
  titleClassName?: string
  descriptionClassName?: string
  className?: string
  id?: string
}

/**
 * "\n" in a string title marks the design's line breaks (from lg up). Each
 * segment becomes a span that is `block` from lg — not white-space: pre-line,
 * which the line-split reveal can't see, so lines re-wrapped when it ended.
 */
function withLineBreaks(title: ReactNode) {
  if (typeof title !== "string" || !title.includes("\n")) return title
  return title.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 && " "}
      <span className="lg:block">{line}</span>
    </Fragment>
  ))
}

/**
 * `title` may contain "\n" for the design's explicit line breaks (applied from lg up).
 *
 * Eyebrow + H2 on the left, supporting copy bottom-aligned on the right.
 * Stacks on small screens.
 *
 * Entrance is one sequence (`data-sequence`): number flickers → its rule
 * draws → label decodes → heading rises line by line → copy follows →
 * divider traces across.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  divider = false,
  index,
  titleClassName,
  descriptionClassName,
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div
      data-sequence
      className={cn(
        "relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16",
        divider && "pb-6",
        className
      )}
    >
      <div className="flex flex-col gap-[11.39px]">
        <div className="flex items-center gap-2.5">
          {index && (
            <span
              aria-hidden="true"
              data-velocity="shift"
              className="flex items-center gap-2.5"
            >
              <span
                data-anim="index"
                className="font-mono text-eyebrow text-grey-2 tabular-nums"
              >
                {index}
              </span>
              {/* Rule from the number toward the label; stretches with speed */}
              <span data-velocity="stretch" className="block origin-left">
                <span
                  data-anim="draw"
                  data-delay="0.05"
                  className="block h-px w-5 origin-left bg-grey-2"
                />
              </span>
            </span>
          )}
          <p
            data-anim="scramble"
            data-delay={index ? "0.12" : undefined}
            className="font-mono text-eyebrow font-bold text-brand uppercase"
          >
            {eyebrow}
          </p>
        </div>
        <h2
          id={id}
          data-anim="lines"
          data-delay="0.2"
          className={cn("text-h2 font-medium text-ink", titleClassName)}
        >
          {withLineBreaks(title)}
        </h2>
      </div>
      {description && (
        <p
          data-anim="fade-up"
          data-delay="0.45"
          className={cn(
            "text-body-sm leading-normal tracking-[0.03em] text-grey-1 lg:shrink-0",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
      {divider && (
        <TraceLine delay={0.3} className="absolute inset-x-0 bottom-0" />
      )}
    </div>
  )
}

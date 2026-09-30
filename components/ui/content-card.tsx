import type { ComponentType, ReactNode, SVGProps } from "react"

import { cn } from "@/lib/utils"

/** Bordered white card with a hairline shadow (Job Detail / Portfolio Detail copy blocks). */
export function ContentCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[2px] border border-divider bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-7",
        className
      )}
    >
      {children}
    </div>
  )
}

/** 20px heading with an optional orange leading icon. */
export function ContentHeading({
  icon: Icon,
  children,
  as: Tag = "h2",
}: {
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  children: ReactNode
  as?: "h2" | "h3"
}) {
  return (
    <Tag className="flex items-center gap-2 text-xl leading-[1.4] font-medium tracking-[-0.02em] text-ink">
      {Icon && <Icon className="size-5 shrink-0 text-brand" />}
      {children}
    </Tag>
  )
}

/** Disc list at 16/29 used under a ContentHeading. */
export function ContentList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-0 pt-3.5 pl-6 text-base leading-[29px] text-ink marker:text-ink">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

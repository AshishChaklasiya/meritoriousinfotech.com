import Link from "next/link"
import type { ComponentProps } from "react"

import { ArrowUpRightIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

type LearnMoreLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  label?: string
}

/** Orange "Learn more ↗" text link used across service and portfolio cards. */
export function LearnMoreLink({
  label = "Learn more",
  className,
  ...props
}: LearnMoreLinkProps) {
  return (
    <Link
      className={cn(
        "group/learn inline-flex items-center gap-2 text-body-sm leading-5 font-medium whitespace-nowrap text-brand",
        className
      )}
      {...props}
    >
      {label}
      <ArrowUpRightIcon className="size-4 transition-transform group-hover/learn:translate-x-0.5 group-hover/learn:-translate-y-0.5" />
    </Link>
  )
}

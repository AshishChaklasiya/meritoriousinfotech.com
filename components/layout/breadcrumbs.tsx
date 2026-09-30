import Link from "next/link"

import { cn } from "@/lib/utils"

export type Crumb = { label: string; href: string }

/** "Home / Section / Current" trail; the last crumb renders as the current page. */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-body-sm leading-5">
        {items.map((crumb, index) => {
          const current = index === items.length - 1
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {current ? (
                <span aria-current="page" className="font-medium text-brand">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className={cn(
                      "text-grey-1 transition-colors hover:text-ink"
                    )}
                  >
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-grey-1">
                    /
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

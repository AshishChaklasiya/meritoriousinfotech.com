import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DataTableProps = {
  caption?: string
  columns: string[]
  rows: ReactNode[][]
  className?: string
}

/**
 * Plain bordered table for price/timeline guides and comparisons. The first
 * column reads as the row label; the table scrolls sideways on small screens
 * rather than squeezing the copy.
 */
export function DataTable({
  caption,
  columns,
  rows,
  className,
}: DataTableProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto border border-divider bg-surface",
        className
      )}
    >
      <table className="w-full min-w-[560px] border-collapse text-left">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-divider bg-canvas-muted">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-5 py-4 font-mono text-eyebrow font-bold text-brand uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-divider last:border-b-0">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th
                    key={c}
                    scope="row"
                    className="px-5 py-4 align-top text-body font-medium text-ink"
                  >
                    {cell}
                  </th>
                ) : (
                  <td
                    key={c}
                    className="px-5 py-4 align-top text-body text-grey-1"
                  >
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

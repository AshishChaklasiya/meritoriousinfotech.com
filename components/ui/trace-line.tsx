import { cn } from "@/lib/utils"

/**
 * Brand divider: ●──────────▬ A dot anchors the start, the rule draws out of
 * it and a short brand tick rides the leading edge, parking at the end
 * (data-anim="trace" in lib/motion/scroll-effects.ts). Static without JS.
 */
export function TraceLine({
  tone = "light",
  delay,
  className,
}: {
  tone?: "light" | "dark"
  delay?: number
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      data-anim="trace"
      data-delay={delay}
      className={cn("pointer-events-none relative block h-px", className)}
    >
      <span
        data-trace-line
        className={cn(
          "absolute inset-0 origin-left",
          tone === "dark" ? "bg-divider-inverse" : "bg-divider"
        )}
      />
      <span
        data-trace-dot
        className="absolute top-1/2 left-0 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand"
      />
      <span
        data-trace-tick
        className="absolute top-1/2 right-0 h-[3px] w-6 -translate-y-1/2 bg-brand"
      />
    </span>
  )
}

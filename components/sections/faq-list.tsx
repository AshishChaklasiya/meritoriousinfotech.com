"use client"

import { RiAddLine } from "@remixicon/react"
import { motion, type Variants } from "motion/react"
import { useId, useState } from "react"

import type { FaqItem } from "@/components/sections/faq-section"
import { EASE_OUT, GLIDE } from "@/lib/motion/motion"
import { cn } from "@/lib/utils"

const answer: Variants = {
  closed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
}

const answerText: Variants = {
  closed: { y: -8 },
  open: { y: 0 },
}

function FaqRow({
  item,
  expanded,
  barId,
  onToggle,
}: {
  item: FaqItem
  expanded: boolean
  barId: string
  onToggle: (open: boolean) => void
}) {
  // The <details> stays open while its answer animates shut
  const [rendered, setRendered] = useState(expanded)
  if (expanded && !rendered) setRendered(true)

  const text = (
    <p className="max-w-[860px] pb-6 text-body text-grey-1">{item.answer}</p>
  )

  return (
    <li className="relative border-b border-divider">
      {/* Brand rule on the open question; glides to the next one opened */}
      {expanded && (
        <motion.span
          layoutId={barId}
          aria-hidden="true"
          transition={GLIDE}
          className="absolute inset-x-0 -top-px h-px bg-brand"
        />
      )}
      <details
        open={rendered}
        // Find-in-page (or anything else) opening it natively
        onToggle={(event) => {
          if (event.currentTarget.open && !rendered) onToggle(true)
        }}
        className="group/faq"
      >
        <summary
          onClick={(event) => {
            event.preventDefault()
            onToggle(!expanded)
          }}
          className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-title-lg font-medium text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden"
        >
          {item.question}
          <RiAddLine
            aria-hidden="true"
            className={cn(
              "size-5 shrink-0 text-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              // Native state until hydrated, React state after
              rendered ? expanded && "rotate-45" : "group-open/faq:rotate-45"
            )}
          />
        </summary>
        {rendered ? (
          <motion.div
            variants={answer}
            initial="closed"
            animate={expanded ? "open" : "closed"}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            onAnimationComplete={(definition) => {
              if (definition === "closed") setRendered(false)
            }}
            className="overflow-hidden"
          >
            <motion.div
              variants={answerText}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              {text}
            </motion.div>
          </motion.div>
        ) : (
          text
        )}
      </details>
    </li>
  )
}

/**
 * Questions as native <details> (readable and working without JS), enhanced
 * with Motion: one answer open at a time, opening and closing smoothly.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const barId = useId()

  return (
    <ul data-anim="stagger" className="border-t border-divider">
      {items.map((item, index) => (
        <FaqRow
          key={item.question}
          item={item}
          expanded={open === index}
          barId={barId}
          onToggle={(next) => setOpen(next ? index : null)}
        />
      ))}
    </ul>
  )
}

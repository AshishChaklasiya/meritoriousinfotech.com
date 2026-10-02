import { RiAddLine } from "@remixicon/react"

import { FAQSchema } from "@/components/seo/schema"
import { SectionHeader } from "@/components/ui/section-header"
import { cn } from "@/lib/utils"

export type FaqItem = { question: string; answer: string }

type FaqSectionProps = {
  items: FaqItem[]
  eyebrow?: string
  title?: string
  description?: string
  index?: string
  className?: string
}

/**
 * Question list as native <details> disclosures (works without JS) plus the
 * matching FAQPage structured data.
 */
export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Questions We're Often Asked",
  description,
  index,
  className,
}: FaqSectionProps) {
  return (
    <section
      aria-labelledby="faq-title"
      className={cn(
        "border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]",
        className
      )}
    >
      <FAQSchema faq={items} />
      <div className="container-content flex flex-col gap-10 md:gap-16">
        <SectionHeader
          id="faq-title"
          index={index}
          eyebrow={eyebrow}
          title={title}
          description={description}
          divider
          titleClassName="max-w-[560px]"
          descriptionClassName="max-w-[400px]"
        />

        <ul data-anim="stagger" className="border-t border-divider">
          {items.map((item) => (
            <li key={item.question} className="border-b border-divider">
              <details className="group/faq">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-title-lg font-medium text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <RiAddLine
                    aria-hidden="true"
                    className="size-5 shrink-0 text-brand transition-transform duration-300 group-open/faq:rotate-45"
                  />
                </summary>
                <p className="max-w-[860px] pb-6 text-body text-grey-1">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

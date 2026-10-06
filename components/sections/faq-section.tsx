import { FaqList } from "@/components/sections/faq-list"
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
 * Question list (native <details>, animated once hydrated) plus the matching
 * FAQPage structured data.
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

        <FaqList items={items} />
      </div>
    </section>
  )
}

import { SectionHeader } from "@/components/ui/section-header"
import { cn } from "@/lib/utils"

export type Step = {
  title: string
  /** Short timing note shown above the title ("Days 1–2") */
  when?: string
  description: string
}

type StepsSectionProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  index?: string
  steps: Step[]
  className?: string
}

/** Numbered steps in a row of cards: what the client gets at each stage. */
export function StepsSection({
  id,
  eyebrow,
  title,
  description,
  index,
  steps,
  className,
}: StepsSectionProps) {
  return (
    <section
      aria-labelledby={id}
      className={cn(
        "border-b border-divider bg-canvas py-16 md:py-24 xl:py-[110px]",
        className
      )}
    >
      <div className="container-content flex flex-col gap-10 md:gap-16">
        <SectionHeader
          id={id}
          index={index}
          eyebrow={eyebrow}
          title={title}
          description={description}
          divider
          titleClassName="max-w-[560px]"
          descriptionClassName="max-w-[400px]"
        />

        <ol
          data-anim="stagger"
          className="grid gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4"
        >
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-pointer
              className="spotlight flex flex-col gap-5 border border-divider bg-surface p-6 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-brand/40 sm:p-8"
            >
              <span className="flex size-12 items-center justify-center rounded-[2px] text-2xl leading-none font-semibold text-brand outline outline-1 outline-brand">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                {step.when && (
                  <p className="font-mono text-eyebrow text-grey-2 uppercase">
                    {step.when}
                  </p>
                )}
                <h3 className="text-h4 font-semibold text-ink">{step.title}</h3>
                <p className="text-body text-grey-1">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { SectionHeader } from "@/components/ui/section-header"

const STEPS = [
  {
    title: "Application Review",
    description:
      "We review your portfolio and code repositories (GitHub) to verify engineering style alignments.",
  },
  {
    title: "Interview Round",
    description:
      "A 30-minute introductory conversation to discuss team alignment, values, and mutual expectations.",
  },
  {
    title: "Technical Review",
    description:
      "A hands-on, practical coding or design assessment based on real-world constructible problems.",
  },
  {
    title: "Offer & Final Chat",
    description:
      "We align on target milestones, outline your onboarding support plan, and present the final offer.",
  },
]

/**
 * Figma "Our Interview Process": four numbered steps joined by an orange rule.
 * On large screens the section pins and the rule travels through the steps as
 * you scroll (scene "process" in lib/motion/scroll-effects.ts).
 */
export function InterviewProcessSection() {
  return (
    <section
      aria-labelledby="process-title"
      className="border-b border-divider bg-canvas py-16 md:py-24 xl:py-[144px]"
    >
      <div className="container-content flex flex-col gap-12 md:gap-16 xl:gap-20">
        <SectionHeader
          id="process-title"
          eyebrow="our process"
          title="Our Interview Process"
          description="A quick, transparent, and structured onboarding journey designed to value your time."
          titleClassName="max-w-[647px]"
          descriptionClassName="max-w-[357px]"
        />

        <ol
          data-scene="process"
          className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-11"
        >
          {/* Connector through the number boxes' centres (desktop row only) */}
          <span
            aria-hidden="true"
            className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-divider lg:block"
          />
          <span
            aria-hidden="true"
            data-process-rule
            className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px origin-left bg-brand lg:block"
          />
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              data-process-step
              className="relative flex flex-col items-center gap-6 text-center md:gap-8"
            >
              <span
                data-process-badge
                className="flex size-[49px] items-center justify-center rounded-[2px] bg-surface text-2xl leading-none font-semibold tracking-[-0.0625em] text-brand shadow-[0_0_18px_4px_#FF7C1A26] outline outline-1 outline-brand"
              >
                {index + 1}
              </span>
              <div className="flex max-w-[310px] flex-col gap-3">
                <h3 className="text-2xl leading-[1.3] font-medium tracking-[-0.031em] text-ink-strong">
                  {step.title}
                </h3>
                <p className="text-base leading-[26px] text-ink/75">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { SectionHeader } from "@/components/ui/section-header"
import { LearnMoreLink } from "@/components/ui/learn-more-link"
import { cn } from "@/lib/utils"

const MODELS = [
  {
    code: "FIXED",
    title: "Fixed-scope project",
    bestFor: "Websites, MVPs and clearly defined projects",
    how: "Agreed scope, a fixed price and payment by milestone. You know the total before work starts.",
    cta: { label: "Start a project", href: "/contact" },
  },
  {
    code: "TEAM",
    title: "Dedicated developer or team",
    bestFor: "Ongoing product work and agencies that need capacity",
    how: "Full-time designers or developers billed monthly, working inside your process with daily updates.",
    cta: { label: "Hire developers", href: "/hire-developers" },
  },
  {
    code: "CARE",
    title: "Support & improvements",
    bestFor: "Live websites and apps",
    how: "A monthly block of hours for fixes, updates, security patches and small features.",
    cta: { label: "Ask about support", href: "/contact" },
  },
]

/** Fixed scope / dedicated team / support: the three ways to work with us. */
export function EngagementModelsSection({
  index,
  className,
}: {
  index?: string
  className?: string
}) {
  return (
    <section
      aria-labelledby="engagement-title"
      className={cn(
        "border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]",
        className
      )}
    >
      <div className="container-content flex flex-col gap-10 md:gap-16">
        <SectionHeader
          id="engagement-title"
          index={index}
          eyebrow="Engagement models"
          title="Three ways to work with us"
          description="Not sure which fits? Tell us about the project and we'll recommend one, including when a smaller budget would do the job."
          divider
          titleClassName="max-w-[560px]"
          descriptionClassName="max-w-[400px]"
        />

        <ul data-anim="stagger" className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {MODELS.map((model) => (
            <li
              key={model.code}
              data-pointer
              className="spotlight flex flex-col gap-6 border border-divider bg-surface p-6 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-brand/40 sm:p-8"
            >
              <p className="font-mono text-eyebrow text-grey-1">{model.code}</p>
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="text-h4 font-semibold text-ink">
                  {model.title}
                </h3>
                <p className="text-body text-grey-1">{model.how}</p>
                <p className="border-t border-divider pt-4 text-body-sm text-ink">
                  <span className="font-medium">Best for:</span> {model.bestFor}
                </p>
              </div>
              <LearnMoreLink href={model.cta.href} label={model.cta.label} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

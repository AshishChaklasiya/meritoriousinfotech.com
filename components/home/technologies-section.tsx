import { SectionHeader } from "@/components/ui/section-header"
import { Marquee } from "@/components/ui/marquee"

const TECH_ROWS = [
  [
    "React. JS",
    "Node. JS",
    "Java Script",
    "Angular",
    "Python",
    "C#",
    "Laravel",
    "PHP",
    "Java",
  ],
  [
    "LangChain",
    "My SQL",
    "Claude",
    "Mongo DB",
    "TensorFlow",
    "GPT",
    "Oracle",
    "Redis",
    "PyTorch",
  ],
]

function TechPill({ label }: { label: string }) {
  return (
    <span className="flex min-w-[107px] items-center justify-center rounded-card border border-divider bg-surface px-3.5 py-4 font-tech text-body-sm leading-[1.3] font-medium whitespace-nowrap text-ink transition-[color,border-color,translate] duration-300 hover:-translate-y-1 hover:border-brand hover:text-brand">
      {label}
    </span>
  )
}

export function TechnologiesSection() {
  return (
    <section
      aria-labelledby="technologies-title"
      className="overflow-x-clip border-b border-divider bg-canvas py-16 md:py-24 xl:py-36"
    >
      <div className="container-content flex flex-col gap-11">
        <SectionHeader
          id="technologies-title"
          index="03"
          eyebrow="Technology stack"
          title="Our Technologies we specialize in Development"
          description="We leverage the industry's most advanced frameworks and languages to design scalable, secure, and future-proof digital solutions."
          titleClassName="max-w-[647px]"
          descriptionClassName="max-w-[480px]"
        />

        <ul className="sr-only">
          {TECH_ROWS.flat().map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        {/* Decorative tickers; the list above is the accessible version.
            Rows also drift against each other with scroll and lean into
            fast scrolling. */}
        <div
          aria-hidden="true"
          data-anim="fade"
          className="flex flex-col gap-10"
        >
          {TECH_ROWS.map((row, index) => (
            <div
              key={index}
              data-parallax-x={index % 2 === 1 ? -4 : 4}
              data-velocity="skew"
            >
              <Marquee
                reverse={index % 2 === 1}
                duration={45}
                gap={20}
                fadeClassName="from-canvas"
              >
                {/* Repeat so one copy always spans wider than the container */}
                {[...row, ...row].map((tech, i) => (
                  <TechPill key={`${tech}-${i}`} label={tech} />
                ))}
              </Marquee>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

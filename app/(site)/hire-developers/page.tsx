import {
  RiBugLine,
  RiCheckLine,
  RiCodeSSlashLine,
  RiPenNibLine,
  RiServerLine,
  RiSmartphoneLine,
} from "@remixicon/react"

import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { PageHero } from "@/components/layout/page-hero"
import { FaqSection, type FaqItem } from "@/components/sections/faq-section"
import { StepsSection, type Step } from "@/components/sections/steps-section"
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/schema"
import { CtaLink } from "@/components/ui/cta-link"
import { DataTable } from "@/components/ui/data-table"
import { IconCard } from "@/components/ui/icon-card"
import { SectionHeader } from "@/components/ui/section-header"
import { COMMITMENTS } from "@/lib/content/company"
import { constructMetadata } from "@/lib/metadata"

const DESCRIPTION =
  "Hire dedicated React, Node.js, Laravel, Flutter and mobile developers from our Surat team. Interview first, trial week, NDA and full IP ownership."

export const metadata = constructMetadata({
  title: "Hire Dedicated Developers in India",
  description: DESCRIPTION,
  canonicalUrl: "/hire-developers",
})

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Hire Developers", href: "/hire-developers" },
]

const ROLES = [
  {
    icon: RiCodeSSlashLine,
    title: "Frontend developers",
    description: "React, Angular and Vue.js",
  },
  {
    icon: RiServerLine,
    title: "Backend developers",
    description: "Node.js, Laravel/PHP and Python",
  },
  {
    icon: RiSmartphoneLine,
    title: "Mobile developers",
    description: "Android (Kotlin), iOS (Swift), Flutter and React Native",
  },
  {
    icon: RiPenNibLine,
    title: "UI/UX designers",
    description: "Product design, design systems and prototyping",
  },
  {
    icon: RiBugLine,
    title: "QA engineers",
    description: "Manual and automated testing",
  },
]

// Hiring commitments from the content plan (confirm before launch)
const STEPS: Step[] = [
  {
    title: "Share your requirements",
    description: "Skills, experience level, hours and start date.",
  },
  {
    title: "Interview a shortlist",
    description:
      "You meet 1–3 matched candidates within 3–5 working days and pick who joins.",
  },
  {
    title: "Start with a trial week",
    description: "If it's not the right fit, you don't pay for that week.",
  },
  {
    title: "Scale as you go",
    description: "Add people, or step down with 30 days' notice.",
  },
]

const MODELS = [
  ["Full-time", "160 hours / month", "Ongoing product development"],
  ["Part-time", "80 hours / month", "Steady but lighter workloads"],
  ["Hourly", "Pay as you go", "Fixes, small features and overflow work"],
]

const INCLUDED = [
  "NDA and full IP assignment in the contract",
  "Daily updates and a weekly summary",
  `At least ${COMMITMENTS.overlapHours} hours of overlap with your working day. UK, European, Middle East and Australian hours overlap easily with IST; for US teams we agree fixed overlap hours.`,
  "A free replacement if a developer isn't the right fit",
  "One account manager for billing, leave cover and escalations",
]

const FAQ: FaqItem[] = [
  {
    question: "Can I interview the developer first?",
    answer:
      "Yes. You interview every shortlisted candidate and decide who joins your team. Nobody starts without your approval.",
  },
  {
    question: "How do you handle time zones?",
    answer: `Your developer keeps at least ${COMMITMENTS.overlapHours} hours of overlap with your working day for stand-ups, reviews and questions. For US teams we agree fixed overlap hours before the start date.`,
  },
  {
    question: "What if the developer isn't a good fit?",
    answer:
      "Tell your account manager. We'll replace the developer free of charge and hand over their work, so you don't lose progress.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. The contract assigns all intellectual property to you, and the code lives in your own repositories from day one.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "No long lock-in. After the trial week you can scale up, scale down or stop with 30 days' notice.",
  },
]

export default function HireDevelopersPage() {
  return (
    <>
      <BreadcrumbSchema
        steps={BREADCRUMBS.map((c) => ({ name: c.label, url: c.href }))}
      />
      <ServiceSchema
        name="Dedicated developers"
        description={DESCRIPTION}
        url="/hire-developers"
      />

      <PageHero
        breadcrumbs={BREADCRUMBS}
        titleClassName="max-w-[1000px]"
        title={
          <>
            Hire Dedicated <span className="text-brand">Developers</span> From
            Our Surat Team
          </>
        }
        description="Add experienced designers and developers to your project full-time, part-time or by the hour. They work in your tools, join your stand-ups and report to you. We handle hiring, equipment, payroll and HR."
        descriptionClassName="max-w-[880px]"
        action={
          <CtaLink
            href="/contact"
            icon={<ArrowUpRightSolidIcon />}
            hoverIcon={<ArrowRightIcon />}
          >
            Schedule a developer interview
          </CtaLink>
        }
      />

      <section
        aria-labelledby="roles-title"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
      >
        <div className="container-content flex flex-col gap-10 md:gap-16">
          <SectionHeader
            id="roles-title"
            eyebrow="Roles"
            title="Roles You Can Hire"
            description="We offer dedicated developers to a handful of clients at a time, so every placement gets proper support."
            divider
            titleClassName="max-w-[560px]"
            descriptionClassName="max-w-[400px]"
          />
          <ul
            data-anim="stagger"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-5"
          >
            {ROLES.map(({ icon: Icon, title, description }) => (
              <IconCard
                key={title}
                as="li"
                title={title}
                media={<Icon aria-hidden="true" className="size-6" />}
              >
                <p>{description}</p>
              </IconCard>
            ))}
          </ul>
        </div>
      </section>

      <StepsSection
        id="hire-steps-title"
        eyebrow="How it works"
        title="From Brief to First Commit"
        description="A short, predictable process, with you choosing every person who joins."
        steps={STEPS}
      />

      <section
        aria-labelledby="models-title"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
      >
        <div className="container-content flex flex-col gap-10 md:gap-16">
          <SectionHeader
            id="models-title"
            eyebrow="Hiring models"
            title="Pick the Hours That Fit"
            description={`Pricing depends on the role and experience level. Tell us who you need and we'll send rates within ${COMMITMENTS.estimateHours} hours.`}
            divider
            titleClassName="max-w-[560px]"
            descriptionClassName="max-w-[400px]"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div data-anim="fade-up">
              <DataTable
                caption="Dedicated developer hiring models"
                columns={["Model", "Hours", "Best for"]}
                rows={MODELS}
              />
            </div>
            <div data-anim="fade-up" className="flex flex-col gap-4">
              <h3 className="text-h4 font-semibold text-ink">
                What&apos;s included
              </h3>
              <ul className="flex flex-col gap-3">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-body text-ink"
                  >
                    <RiCheckLine
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={FAQ} className="bg-canvas" />
    </>
  )
}

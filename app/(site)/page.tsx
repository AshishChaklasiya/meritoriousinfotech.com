import { AudienceSection } from "@/components/home/audience-section"
import { HeroSection } from "@/components/home/hero-section"
import { PortfolioSection } from "@/components/home/portfolio-section"
import { ServicesSection } from "@/components/home/services-section"
import { StatsSection } from "@/components/home/stats-section"
import { TechnologiesSection } from "@/components/home/technologies-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { EngagementModelsSection } from "@/components/sections/engagement-models-section"
import { FaqSection, type FaqItem } from "@/components/sections/faq-section"
import { StepsSection, type Step } from "@/components/sections/steps-section"
import { COMMITMENTS } from "@/lib/content/company"
import { constructMetadata, siteConfig } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Software Development Company in Surat",
  description: siteConfig.description,
})

const PROCESS: Step[] = [
  {
    when: "Days 1–2",
    title: "Call and estimate",
    description: `A 30-minute call about your goals, users and budget. Within ${COMMITMENTS.estimateHours} hours you get a price range and a suggested timeline.`,
  },
  {
    when: "Weeks 1–3",
    title: "Scope and design",
    description:
      "A written scope, user flows and a clickable prototype. You approve the design before development starts, and the fixed quote is based on it.",
  },
  {
    when: "Every week",
    title: "Build, with weekly demos",
    description:
      "Development in one- or two-week sprints. Every week you see working software, not a status report, and you can reorder priorities between sprints.",
  },
  {
    when: "Launch day",
    title: "Launch and support",
    description: `We deploy, publish to the app stores, train your team and hand over the code and accounts. ${COMMITMENTS.freeSupportDays} days of free fixes are included.`,
  },
]

const FAQ: FaqItem[] = [
  {
    question: "How much does a website or app cost?",
    answer: `It depends on the features, integrations and design, so we price every project on its scope rather than guessing. After a 30-minute call we send a price range within ${COMMITMENTS.estimateHours} hours, then a fixed quote once the scope is agreed. You know the total before any work starts.`,
  },
  {
    question: "How long will my project take?",
    answer:
      "A business website usually takes 3–6 weeks, an online store 6–10 weeks and a mobile app MVP 10–16 weeks. You get a timeline with milestones before work starts.",
  },
  {
    question: "Do I own the code and designs?",
    answer:
      "Yes. Once the project is paid for, the source code, design files and accounts are yours. We're happy to sign an NDA before you share any details.",
  },
  {
    question: "Do you work with clients outside India?",
    answer: `Yes. We work with overseas clients over email, Slack, Google Meet or WhatsApp, and our team keeps at least ${COMMITMENTS.overlapHours} hours of overlap with your working day.`,
  },
  {
    question: "Can you take over a project another developer started?",
    answer:
      "Yes. We start with a short code and design review, tell you honestly what's worth keeping, then continue development from there.",
  },
  {
    question: "What happens after launch?",
    answer: `Every project includes ${COMMITMENTS.freeSupportDays} days of free bug fixes. After that, you can choose a monthly support plan or contact us whenever you need changes.`,
  },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AudienceSection />
      <StepsSection
        id="process-title"
        index="03"
        eyebrow="How we work"
        title="What You Get at Every Stage"
        description="No black box. You know what happens next, what you'll receive and when."
        steps={PROCESS}
      />
      <PortfolioSection />
      <TestimonialsSection />
      <EngagementModelsSection index="06" />
      <TechnologiesSection />
      <FaqSection items={FAQ} index="08" />
    </>
  )
}

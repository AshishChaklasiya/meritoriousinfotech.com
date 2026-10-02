import { InterviewProcessSection } from "@/components/careers/interview-process"
import { JobGrid } from "@/components/careers/job-card"
import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { PageHero } from "@/components/layout/page-hero"
import { BreadcrumbSchema } from "@/components/seo/schema"
import { CtaLink } from "@/components/ui/cta-link"
import { IconCard } from "@/components/ui/icon-card"
import { SectionHeader } from "@/components/ui/section-header"
import { CONTACT } from "@/lib/content/company"
import { JOBS } from "@/lib/content/jobs"
import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Careers – IT Jobs in Surat",
  description:
    "Join Meritorious Infotech in Surat. Open roles in development, design, QA and business development, with real projects from your first month.",
  canonicalUrl: "/careers",
})

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Careers", href: "/careers" },
]

const WHY_JOIN = [
  {
    code: "01",
    title: "Real projects, early",
    description:
      "No months of dummy tasks. You'll ship client work within weeks of joining.",
  },
  {
    code: "02",
    title: "Learn from seniors",
    description:
      "Code reviews, design critiques and pairing with people who've done it before.",
  },
  {
    code: "03",
    title: "Real ownership",
    description:
      "In a small team, your name is on the features you build and clients know it.",
  },
  {
    code: "04",
    title: "Time to learn",
    description:
      "We make room for courses, certifications and trying out new tools.",
  },
]

export default function CareersPage() {
  return (
    <>
      <BreadcrumbSchema
        steps={BREADCRUMBS.map((c) => ({ name: c.label, url: c.href }))}
      />

      <PageHero
        breadcrumbs={BREADCRUMBS}
        titleClassName="max-w-[874px]"
        title={
          <>
            Build Your Future With{" "}
            <span className="text-brand">Meritorious</span>
          </>
        }
        description="Join a small team in Surat that designs and builds real products for clients in India and abroad. You'll work on live projects from your first month, learn from experienced developers and designers, and see your work in the hands of real users."
        descriptionClassName="max-w-[970px]"
        action={
          <CtaLink
            href="#open-roles"
            icon={<ArrowUpRightSolidIcon />}
            hoverIcon={<ArrowRightIcon />}
          >
            See open roles
          </CtaLink>
        }
      />

      <section
        id="open-roles"
        aria-labelledby="open-roles-title"
        className="scroll-mt-20 border-b border-divider bg-surface py-16 md:py-24 xl:py-[144px]"
      >
        <div className="container-content flex flex-col gap-10 md:gap-16">
          <SectionHeader
            id="open-roles-title"
            eyebrow={`Open roles · ${JOBS.length}`}
            title="Current Openings"
            description={`Choose a role to see the details and apply. Don't see a fit? Send your CV to ${CONTACT.emails.hr} and tell us what you'd like to work on.`}
            divider
            titleClassName="max-w-[477px]"
            descriptionClassName="max-w-[343px]"
          />
          <JobGrid jobs={JOBS} />
        </div>
      </section>

      <InterviewProcessSection />

      <section
        aria-labelledby="why-join-title"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
      >
        <div className="container-content flex flex-col gap-10 md:gap-16">
          <SectionHeader
            id="why-join-title"
            eyebrow="Why join us"
            title="Why People Join Meritorious"
            description="A small team means your work is seen, your ideas are heard and you grow faster."
            divider
            titleClassName="max-w-[560px]"
            descriptionClassName="max-w-[380px]"
          />
          <ul
            data-anim="stagger"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {WHY_JOIN.map((item) => (
              <IconCard
                key={item.title}
                as="li"
                title={item.title}
                media={
                  <span className="font-mono text-eyebrow text-brand">
                    {item.code}
                  </span>
                }
              >
                <p>{item.description}</p>
              </IconCard>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

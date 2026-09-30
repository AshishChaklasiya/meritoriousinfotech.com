import { InterviewProcessSection } from "@/components/careers/interview-process"
import { JobGrid } from "@/components/careers/job-card"
import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { PageHero } from "@/components/layout/page-hero"
import { BreadcrumbSchema } from "@/components/seo/schema"
import { CtaLink } from "@/components/ui/cta-link"
import { SectionHeader } from "@/components/ui/section-header"
import { JOBS } from "@/lib/content/jobs"
import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Careers",
  description:
    "Build your future with Meritorious Infotech. Explore open roles across AI, engineering, design and business development.",
  canonicalUrl: "/careers",
})

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Careers", href: "/careers" },
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
        description="It feels professional, positive, and career-focused without sounding too generic. It also pairs naturally with your supporting paragraph about talent, creativity, collaboration, meaningful projects, and professional growth."
        descriptionClassName="max-w-[970px]"
        action={
          <CtaLink
            href="#open-roles"
            icon={<ArrowUpRightSolidIcon />}
            hoverIcon={<ArrowRightIcon />}
          >
            open Job’s roles
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
            title="Discover our Current Opening"
            description="Explore our current vacancies. Click a role to view full description and apply."
            divider
            titleClassName="max-w-[477px]"
            descriptionClassName="max-w-[343px]"
          />
          <JobGrid jobs={JOBS} />
        </div>
      </section>

      <InterviewProcessSection />
    </>
  )
}

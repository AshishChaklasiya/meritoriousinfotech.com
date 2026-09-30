import { notFound } from "next/navigation"

import { JobApplicationForm } from "@/components/careers/job-application-form"
import { JobGrid } from "@/components/careers/job-card"
import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { PageHero } from "@/components/layout/page-hero"
import { BreadcrumbSchema } from "@/components/seo/schema"
import {
  ContentCard,
  ContentHeading,
  ContentList,
} from "@/components/ui/content-card"
import { CtaLink } from "@/components/ui/cta-link"
import { SectionHeader } from "@/components/ui/section-header"
import { getJob, JOBS } from "@/lib/content/jobs"
import { constructMetadata } from "@/lib/metadata"

type JobDetailPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return JOBS.map((job) => ({ slug: job.slug }))
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) return {}

  return constructMetadata({
    title: `${job.title} — Careers`,
    description: job.summary,
    canonicalUrl: `/careers/${job.slug}`,
  })
}

/** Design highlights the last word of the role title in brand orange. */
function splitTitle(title: string) {
  const index = title.lastIndexOf(" ")
  return index === -1
    ? { before: "", last: title }
    : { before: title.slice(0, index + 1), last: title.slice(index + 1) }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) notFound()

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Careers", href: "/careers" },
    { label: job.title, href: `/careers/${job.slug}` },
  ]
  const { before, last } = splitTitle(job.title)
  const otherJobs = JOBS.filter((other) => other.slug !== job.slug).slice(0, 3)

  return (
    <>
      <BreadcrumbSchema
        steps={breadcrumbs.map((c) => ({ name: c.label, url: c.href }))}
      />

      <PageHero
        breadcrumbs={breadcrumbs}
        titleClassName="max-w-[986px]"
        title={
          <>
            {before}
            <span className="text-brand">{last}</span>
          </>
        }
        description={job.intro}
        descriptionClassName="max-w-[798px]"
        meta={
          <p className="text-base font-medium tracking-[-0.04em] text-brand uppercase md:text-xl">
            {job.meta}
          </p>
        }
        action={
          <CtaLink
            href="#apply"
            icon={<ArrowUpRightSolidIcon />}
            hoverIcon={<ArrowRightIcon />}
          >
            Apply for role
          </CtaLink>
        }
      />

      <section
        aria-label="Role details"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
      >
        <div className="container-content flex flex-col gap-10 lg:flex-row lg:items-start">
          <div
            data-anim="stagger"
            className="flex min-w-0 flex-1 flex-col gap-6"
          >
            {job.requirements.map((group) => (
              <ContentCard key={group.title}>
                <ContentHeading icon={group.icon}>{group.title}</ContentHeading>
                <ContentList items={group.items} />
              </ContentCard>
            ))}
          </div>
          <div
            data-anim="fade-up"
            data-delay="0.15"
            className="lg:sticky lg:top-28 lg:w-[48%] lg:max-w-[632px] lg:shrink-0"
          >
            <JobApplicationForm jobTitle={job.title} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="other-jobs-title"
        className="border-b border-divider bg-canvas py-16 md:py-24 xl:py-[144px]"
      >
        <div className="container-content flex flex-col gap-10 md:gap-16">
          <SectionHeader
            id="other-jobs-title"
            eyebrow="Open roles"
            title="Explore other Job Opening"
            description="Explore our current vacancies. Click a role to view full description and apply."
            divider
            titleClassName="max-w-[640px]"
            descriptionClassName="max-w-[343px]"
          />
          <JobGrid jobs={otherJobs} />
        </div>
      </section>
    </>
  )
}

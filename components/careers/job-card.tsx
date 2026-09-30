import { LearnMoreLink } from "@/components/ui/learn-more-link"
import type { Job } from "@/lib/content/jobs"

/** Figma "Job card": icon tile, meta line, title, summary, skill tags, apply link. */
export function JobCard({ job }: { job: Job }) {
  const Icon = job.icon
  return (
    <article
      data-pointer
      data-tilt="4"
      data-cursor="Apply"
      className="group/job spotlight flex h-full flex-col gap-6 border border-divider bg-surface p-6 transition-[border-color,box-shadow] duration-500 hover:border-brand/40 hover:shadow-[0_24px_48px_-28px_rgb(255_124_26/0.45)] sm:p-8"
    >
      <span className="flex size-12 items-center justify-center border border-ink-strong text-ink transition-[color,background-color,border-color,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/job:-rotate-6 group-hover/job:border-brand group-hover/job:bg-brand group-hover/job:text-snow">
        <Icon className="size-6" />
      </span>

      <div className="flex flex-1 flex-col gap-3">
        <p className="text-label font-medium tracking-[-0.067em] text-brand uppercase transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/job:translate-x-1">
          {job.meta}
        </p>
        <h3 className="text-[22px] leading-[1.3] font-medium tracking-[0.045em] text-ink">
          {job.title}
        </h3>
        <p className="text-[15px] leading-[24.38px] text-grey-1">
          {job.summary}
        </p>
      </div>

      <ul className="flex flex-wrap gap-[7px]" aria-label="Skills">
        {job.tags.map((tag) => (
          <li
            key={tag}
            className="border border-divider px-2.5 py-1 text-label font-medium tracking-normal text-grey-1"
          >
            {tag}
          </li>
        ))}
      </ul>

      <LearnMoreLink
        href={`/careers/${job.slug}`}
        label="Apply for this role"
        aria-label={`Apply for the ${job.title} role`}
        className="after:absolute after:inset-0 after:content-['']"
      />
    </article>
  )
}

export function JobGrid({ jobs }: { jobs: Job[] }) {
  return (
    <ul
      data-anim="stagger"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      {jobs.map((job) => (
        <li key={job.slug}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  )
}

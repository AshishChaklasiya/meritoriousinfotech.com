import Image from "next/image"
import { notFound } from "next/navigation"

import { StarIcon } from "@/components/icons"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { HeroBackdrop } from "@/components/layout/hero-backdrop"
import { MorePortfolioSection } from "@/components/portfolio/more-portfolio-section"
import { BreadcrumbSchema } from "@/components/seo/schema"
import { ContentCard, ContentHeading } from "@/components/ui/content-card"
import { getProject, PORTFOLIO } from "@/lib/content/portfolio"
import { constructMetadata } from "@/lib/metadata"

type PortfolioDetailPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return PORTFOLIO.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return constructMetadata({
    title: `${project.title} — Portfolio`,
    description: project.summary,
    canonicalUrl: `/portfolio/${project.slug}`,
  })
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: project.title, href: `/portfolio/${project.slug}` },
  ]
  const related = PORTFOLIO.filter((other) => other.slug !== project.slug)
    .filter((other) => other.category === project.category)
    .concat(PORTFOLIO.filter((other) => other.category !== project.category))
    .slice(0, 3)

  return (
    <>
      <BreadcrumbSchema
        steps={breadcrumbs.map((c) => ({ name: c.label, url: c.href }))}
      />

      {/* Figma "Portfolio Details" hero: copy left, device frame right */}
      <section
        aria-labelledby="page-title"
        data-scene="hero"
        data-pointer
        className="relative isolate overflow-hidden bg-canvas"
      >
        <HeroBackdrop rightGlowClassName="-top-[145px]" />
        <div
          data-hero-content
          className="container-content flex flex-col gap-12 pt-14 pb-16 md:pt-20 md:pb-24 lg:flex-row lg:items-center lg:justify-between xl:pt-[97px] xl:pb-[121px]"
        >
          <div className="flex flex-col gap-8 xl:gap-[41px]">
            <div data-anim="fade-up">
              <Breadcrumbs items={breadcrumbs} />
            </div>
            <div className="flex flex-col gap-8">
              <h1
                id="page-title"
                data-anim="words"
                data-delay="0.1"
                className="max-w-[625px] text-display font-medium text-ink"
              >
                {project.heroTitle.before}
                <span className="text-brand">
                  {project.heroTitle.highlight}
                </span>
              </h1>
              <dl
                data-anim="stagger"
                data-delay="0.4"
                className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3.5"
              >
                {project.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex min-w-0 flex-col-reverse justify-end gap-1 border border-divider bg-surface px-3 py-2 sm:min-w-[150px] sm:gap-1.5 sm:px-[21px]"
                  >
                    <dt className="text-xs leading-5 text-grey-1 sm:text-body-sm sm:leading-[22.75px]">
                      {stat.label}
                    </dt>
                    <dd className="flex items-center gap-1 text-lg leading-[27.5px] font-semibold text-ink sm:text-xl">
                      {stat.value}
                      {stat.rating && (
                        <>
                          <StarIcon className="size-4 text-star" />
                          <span className="sr-only">out of 5 stars</span>
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Device frame: rises in, then tilts toward the pointer */}
          <div
            data-anim="fade-up"
            data-delay="0.3"
            data-tilt="7"
            className="w-full max-w-[530px] shrink-0 rounded-[24px] bg-surface p-2.5 shadow-[0_4px_4px_-4px_#0C0C0D0D,0_16px_32px_-4px_#0C0C0D1A] sm:rounded-[35px] sm:p-[14px] lg:w-[42%]"
          >
            <div
              data-anim="image"
              data-delay="0.45"
              className="relative aspect-[502/283] overflow-hidden rounded-[16px] sm:rounded-[25px]"
            >
              <Image
                src={project.screenshot}
                alt={`${project.title} screenshot`}
                fill
                priority
                sizes="(min-width: 1024px) 502px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Project overview"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[144px]"
      >
        <div data-anim="fade-up" className="container-content">
          <ContentCard className="flex flex-col gap-5 text-base leading-[29px] text-ink">
            <p>{project.intro}</p>
            {project.blocks.map((block) => (
              <div key={block.heading}>
                <ContentHeading>{block.heading}</ContentHeading>
                {"items" in block ? (
                  <ul className="list-disc pt-3.5 pl-6">
                    {block.items.map((item) => (
                      <li key={item.label}>
                        <strong className="font-semibold">{item.label}:</strong>{" "}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="pt-3.5">{block.paragraph}</p>
                )}
              </div>
            ))}
          </ContentCard>
        </div>
      </section>

      <MorePortfolioSection projects={related} />
    </>
  )
}

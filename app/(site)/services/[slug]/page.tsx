import { notFound } from "next/navigation"

import { PageHero } from "@/components/layout/page-hero"
import { MorePortfolioSection } from "@/components/portfolio/more-portfolio-section"
import { BreadcrumbSchema } from "@/components/seo/schema"
import { ServiceCapabilityTabs } from "@/components/services/service-capability-tabs"
import { SectionHeader } from "@/components/ui/section-header"
import {
  getServiceDetail,
  SERVICE_DETAILS,
} from "@/lib/content/service-details"
import { constructMetadata } from "@/lib/metadata"

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params
  const service = getServiceDetail(slug)
  if (!service) return {}

  return constructMetadata({
    title: service.name,
    description: service.description,
    canonicalUrl: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params
  const service = getServiceDetail(slug)
  if (!service) notFound()

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name, href: `/services/${service.slug}` },
  ]

  return (
    <>
      <BreadcrumbSchema
        steps={breadcrumbs.map((crumb) => ({
          name: crumb.label,
          url: crumb.href,
        }))}
      />

      <PageHero
        breadcrumbs={breadcrumbs}
        title={
          <>
            {service.title.before}
            <span className="text-brand">{service.title.highlight}</span>
            {service.title.after}
          </>
        }
        description={service.description}
        descriptionClassName="max-w-[880px]"
      />

      <section
        aria-labelledby="capabilities-title"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
      >
        <div className="container-content flex flex-col gap-10 md:gap-16">
          <SectionHeader
            id="capabilities-title"
            eyebrow="What we offer"
            title={service.capabilitiesTitle}
            description="Industry-grade solutions engineered to deliver optimal speed, maximum security, and robust scalability."
            divider
            titleClassName={service.capabilitiesTitleClassName}
            descriptionClassName="max-w-[381px]"
          />
          <ServiceCapabilityTabs tabs={service.tabs} />
        </div>
      </section>

      <MorePortfolioSection />
    </>
  )
}

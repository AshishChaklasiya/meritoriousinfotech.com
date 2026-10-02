import { RiCheckLine } from "@remixicon/react"

import { DataTable } from "@/components/ui/data-table"
import { SectionHeader } from "@/components/ui/section-header"
import { COMMITMENTS } from "@/lib/content/company"
import type { ServiceDetail } from "@/lib/content/service-details"

/**
 * "Is this you?" problems list beside the typical-timeline table, plus the
 * optional decision table (mobile: native vs cross-platform).
 */
export function ServiceFitSection({ service }: { service: ServiceDetail }) {
  return (
    <section
      aria-labelledby="fit-title"
      className="border-b border-divider bg-canvas py-16 md:py-24 xl:py-[110px]"
    >
      <div className="container-content flex flex-col gap-10 md:gap-16">
        <SectionHeader
          id="fit-title"
          eyebrow="Where we help"
          title={service.problems.title}
          description={`Every project starts with a 30-minute call. Within ${COMMITMENTS.estimateHours} hours you get a price range and a timeline, then a fixed quote once the scope is agreed.`}
          divider
          titleClassName="max-w-[560px]"
          descriptionClassName="max-w-[400px]"
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ul data-anim="stagger" className="flex flex-col gap-4">
            {service.problems.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 border border-divider bg-surface p-5 text-body text-ink"
              >
                <RiCheckLine
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-brand"
                />
                {item}
              </li>
            ))}
          </ul>

          <div data-anim="fade-up" className="flex flex-col gap-4">
            <h3 className="text-h4 font-semibold text-ink">
              Typical timelines
            </h3>
            <DataTable
              caption={`Typical ${service.name} timelines`}
              columns={["Project", "Typical timeline"]}
              rows={service.timelines.map((row) => [row.project, row.timeline])}
            />
          </div>
        </div>

        {service.comparison && (
          <div data-anim="fade-up" className="flex flex-col gap-4">
            <h3 className="text-h4 font-semibold text-ink">
              {service.comparison.title}
            </h3>
            <DataTable
              caption={service.comparison.title}
              columns={service.comparison.columns}
              rows={service.comparison.rows}
            />
          </div>
        )}
      </div>
    </section>
  )
}

import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { PageHero } from "@/components/layout/page-hero"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { CtaLink } from "@/components/ui/cta-link"
import { LearnMoreLink } from "@/components/ui/learn-more-link"
import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  noIndex: true,
})

/**
 * Site-wide 404. Lives outside the (site) group so it catches every unmatched
 * URL, and therefore renders the header/footer chrome itself.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title={
            <>
              Page Not <span className="text-brand">Found</span>
            </>
          }
          meta={
            <p className="font-mono text-eyebrow font-bold text-brand uppercase">
              Error 404
            </p>
          }
          description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
          descriptionClassName="max-w-[640px]"
          action={
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
              <CtaLink
                href="/"
                icon={<ArrowUpRightSolidIcon />}
                hoverIcon={<ArrowRightIcon />}
              >
                Back to Homepage
              </CtaLink>
              <LearnMoreLink href="/services" label="Explore our services" />
            </div>
          }
        />
      </main>
      <SiteFooter />
    </>
  )
}

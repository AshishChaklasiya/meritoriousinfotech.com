import type { ReactNode } from "react"

import { ContactForm } from "@/components/contact/contact-form"
import { PageHero } from "@/components/layout/page-hero"
import { SOCIAL_LINKS } from "@/components/layout/site-footer"
import {
  COMMITMENTS,
  CONTACT,
  FULL_ADDRESS,
  telHref,
} from "@/lib/content/company"
import { constructMetadata } from "@/lib/metadata"

const DESCRIPTION = `Tell us what you're planning. We reply within one working day, and after a short call we'll send a price range and timeline within ${COMMITMENTS.estimateHours} hours. Prefer to talk now? Call or WhatsApp ${CONTACT.phones[0]}.`

export const metadata = constructMetadata({
  title: "Contact Us – Get a Project Estimate",
  description: `Tell us about your website, app or software project. We reply within one working day and send a price range within ${COMMITMENTS.estimateHours} hours. Call ${CONTACT.phones[0]}.`,
  canonicalUrl: "/contact",
})

const EMAILS = [CONTACT.emails.business, CONTACT.emails.hr]
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  `Meritorious Infotech, ${FULL_ADDRESS}`
)}&output=embed`

const NEXT_STEPS = [
  {
    when: "Within one working day",
    text: "We reply with a few questions, or suggest a time for a call.",
  },
  {
    when: "A 30-minute call",
    text: "We talk through your goals, users, must-have features and budget.",
  },
  {
    when: `Within ${COMMITMENTS.estimateHours} hours of the call`,
    text: "You receive a price range, a suggested approach and a timeline.",
  },
]

function InfoBlock({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl leading-[30px] font-medium text-ink">{title}</h2>
      <div className="text-base leading-[30px] font-medium text-grey-1">
        {children}
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Let’s Talk About Your <span className="text-brand">Project</span>
          </>
        }
        titleClassName="max-w-[900px]"
        description={DESCRIPTION}
        descriptionClassName="max-w-[970px]"
      />

      <section
        aria-label="Contact details"
        className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
      >
        <div className="container-content flex flex-col gap-10 xl:gap-[50px]">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <address
              data-anim="stagger"
              className="grid gap-10 not-italic sm:grid-cols-2 lg:flex lg:shrink-0 lg:justify-between lg:gap-8"
            >
              <div className="flex flex-col gap-10 lg:min-w-[200px] lg:gap-[61px] lg:p-2.5">
                <InfoBlock title="Call or WhatsApp">
                  <ul>
                    {CONTACT.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={telHref(phone)}
                          className="transition-colors hover:text-brand"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </InfoBlock>
                <InfoBlock title="Email">
                  <ul>
                    {EMAILS.map((email) => (
                      <li key={email}>
                        <a
                          href={`mailto:${email}`}
                          className="[overflow-wrap:anywhere] transition-colors hover:text-brand"
                        >
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </InfoBlock>
              </div>

              <div className="flex flex-col gap-10 lg:w-[280px] lg:gap-[31px] lg:pt-2 lg:pl-5">
                <InfoBlock title="Visit our office">
                  <p>{FULL_ADDRESS}</p>
                </InfoBlock>
                <InfoBlock title="Social network">
                  <ul className="flex gap-3.5 pt-1">
                    {SOCIAL_LINKS.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          aria-label={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-magnetic="0.4"
                          className="flex size-10 items-center justify-center rounded-[2px] border border-divider text-ink transition-colors hover:border-brand hover:text-brand"
                        >
                          {social.icon}
                        </a>
                      </li>
                    ))}
                  </ul>
                </InfoBlock>
              </div>
            </address>

            <div
              data-anim="fade-up"
              data-delay="0.15"
              className="min-w-0 flex-1"
            >
              <ContactForm />
            </div>
          </div>

          <div
            data-anim="fade-up"
            className="flex flex-col gap-6 border-t border-divider pt-10"
          >
            <h2 className="text-h4 font-semibold text-ink">
              What happens next
            </h2>
            <ol className="grid gap-6 md:grid-cols-3">
              {NEXT_STEPS.map((step, index) => (
                <li key={step.when} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[2px] text-base font-semibold text-brand outline outline-1 outline-brand">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-title font-medium text-ink">
                      {step.when}
                    </p>
                    <p className="text-body text-grey-1">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div
            data-anim="image"
            className="h-[320px] border border-divider p-3 md:h-[463px]"
          >
            <iframe
              title="Meritorious Infotech office location on Google Maps"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              // Cross-origin map can't be themed; in dark mode invert it and
              // rotate hues back so water stays blue and parks stay green
              className="size-full border-0 grayscale-[0.2] dark:brightness-90 dark:hue-rotate-180 dark:invert"
            />
          </div>
        </div>
      </section>
    </>
  )
}

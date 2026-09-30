import type { ReactNode } from "react"

import { ContactForm } from "@/components/contact/contact-form"
import { PageHero } from "@/components/layout/page-hero"
import { SOCIAL_LINKS } from "@/components/layout/site-footer"
import { constructMetadata } from "@/lib/metadata"

const DESCRIPTION =
  "Ready to streamline your IT needs and unlock new possibilities? We’re here to help! Contact us today for a free consultation. Our IT professionals are ready to talk about your specific goals and create a solution that is specifically suited to your company’s needs."

export const metadata = constructMetadata({
  title: "Contact Us",
  description: DESCRIPTION,
  canonicalUrl: "/contact",
})

const PHONES = ["+91 99795-07813", "+91 87801-44391"]
const EMAILS = ["info@meritoriousinfotech.com", "hr@meritoriousinfotech.com"]
const ADDRESS =
  "401 - 4th Floor, 1/954 Palia street, Nanpura, Surat - 395001, Gujarat, India"
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  `Meritorious Infotech, ${ADDRESS}`
)}&output=embed`

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
            Let’s Build Something <span className="text-brand">Great</span>
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
                <InfoBlock title="Call Center">
                  <ul>
                    {PHONES.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone.replace(/[\s-]/g, "")}`}
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
                <InfoBlock title="Our Location">
                  <p>{ADDRESS}</p>
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
            data-anim="image"
            className="h-[320px] border border-divider p-3 md:h-[463px]"
          >
            <iframe
              title="Meritorious Infotech office location on Google Maps"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0 grayscale-[0.2]"
            />
          </div>
        </div>
      </section>
    </>
  )
}

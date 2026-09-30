import Image from "next/image"
import Link from "next/link"

import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons"
import { CtaLink } from "@/components/ui/cta-link"

const SERVICE_LINKS = [
  { label: "UI UX & Graphics Design", href: "/services/graphic-ui-ux-design" },
  { label: "Web Development", href: "/services/web-engineering-platforms" },
  { label: "App Development", href: "/services/mobile-app-development" },
]

const HELPFUL_LINKS = [
  { label: "About US", href: "/about-us" },
  { label: "Our Services", href: "/services" },
  { label: "Technologies", href: "/technologies" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
]

const CONTACT_GROUPS = [
  {
    title: "For Business",
    phone: "+91 9979507813",
    email: "info@meritoriousinfotech.com",
  },
  {
    title: "For HR",
    phone: "+91 9979507813",
    email: "hr@meritoriousinfotech.com",
  },
]

export const SOCIAL_LINKS = [
  {
    label: "Follow us on Facebook",
    href: "https://www.facebook.com/",
    icon: <FacebookIcon className="size-[18px]" />,
  },
  {
    label: "Follow us on LinkedIn",
    href: "https://www.linkedin.com/",
    icon: <LinkedinIcon className="size-[19px]" />,
  },
  {
    label: "Follow us on Instagram",
    href: "https://www.instagram.com/",
    icon: <InstagramIcon className="size-6" />,
  },
]

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pb-2 text-title leading-5 font-semibold tracking-[0.09em] text-surface">
      {children}
    </h2>
  )
}

function ContactCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative container-content flex flex-col items-center gap-12 pt-20 text-center md:gap-[81px] md:pt-32"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2.5">
          <p
            data-anim="scramble"
            className="rounded-[30px] px-[13px] pt-[5px] pb-1.5 font-mono text-eyebrow leading-[15px] font-bold text-brand uppercase"
          >
            Let’s Talk
          </p>
          <h2
            id="cta-title"
            data-anim="lines"
            data-delay="0.05"
            className="text-cta font-semibold text-surface"
          >
            We design and develop
            <br />
            <span className="font-mono font-bold tracking-[0.029em] text-brand uppercase italic">
              web-apps
            </span>{" "}
            that grow your business.
          </h2>
        </div>
        <p
          data-anim="fade-up"
          data-delay="0.3"
          className="max-w-[606px] text-title text-grey-1"
        >
          We are committed to providing exceptional web and mobile app
          development solutions to businesses globally, ensuring the successful
          completion of each sprint.
        </p>
      </div>
      <div data-anim="fade-up" data-delay="0.45">
        <CtaLink
          href="/contact"
          variant="brand-inverse"
          icon={<ArrowUpRightIcon />}
          hoverIcon={<ArrowRightIcon />}
        >
          Contact Us
        </CtaLink>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <div className="relative isolate overflow-hidden bg-ink">
      {/* Soft colour glows */}
      <div
        aria-hidden="true"
        className="animate-drift absolute -top-[304px] -left-[236px] -z-10 size-[518px] rounded-full bg-[#A855F7]/50 blur-[125px]"
      />
      <div
        aria-hidden="true"
        className="animate-drift-reverse absolute -top-[254px] -right-[237px] -z-10 size-[519px] rounded-full bg-[#B16206]/50 blur-[125px]"
      />

      <ContactCta />

      {/* Oversized wordmark, fading into the footer */}
      <div aria-hidden="true" className="relative mt-16 md:mt-[104px]">
        {/* Letters rise into place as the footer scrolls into view */}
        <p
          data-anim="wordmark"
          className="text-center text-[min(12vw,11.25rem)] leading-none font-semibold tracking-[0.06em] text-surface/26 select-none"
        >
          MERITORIOUS
        </p>
        <div className="absolute inset-0 bg-linear-to-b from-ink/25 to-ink" />
      </div>

      <footer className="relative -mt-3.5">
        <div className="container-content flex flex-col gap-[50px] py-20">
          <div
            data-anim="stagger"
            className="grid gap-12 sm:grid-cols-2 lg:flex lg:justify-between lg:gap-16"
          >
            <div className="flex flex-col gap-[22px] sm:col-span-2 lg:max-w-[348px]">
              <Link href="/" aria-label="Meritorious Infotech — home">
                <Image
                  src="/brand/logo-footer.svg"
                  alt="Meritorious Infotech"
                  width={178}
                  height={34}
                  unoptimized
                />
              </Link>
              <p className="max-w-[348px] text-body-sm text-grey-2">
                Disciplined digital infrastructure engineering and
                high-performance software synthesis. Modern web, mobile, and
                enterprise solutions architected with mathematical precision.
              </p>
              <address className="max-w-[267px] text-body-sm leading-[22px] text-grey-2 not-italic">
                401 - 4th Floor, 1/954 Palia street, Nanpura, Surat - 395001,
                Gujarat, India
              </address>
              <ul className="flex gap-3.5">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-magnetic="0.4"
                      className="flex size-10 items-center justify-center rounded-[14px] border border-divider-inverse text-surface transition-colors hover:border-brand hover:text-brand"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav
              aria-label="Services"
              className="flex flex-col gap-2 lg:w-[231px]"
            >
              <ColumnHeading>SERVICES BREAKDOWN</ColumnHeading>
              <ul className="flex flex-col gap-4 text-body-sm leading-[18px]">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-grey-2 transition-[color,translate] duration-300 hover:translate-x-1 hover:text-surface"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav
              aria-label="Helpful links"
              className="flex flex-col gap-2 lg:w-[162px]"
            >
              <ColumnHeading>Helpful Links</ColumnHeading>
              <ul className="flex flex-col gap-4 text-body-sm leading-[18px]">
                {HELPFUL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-grey-2 transition-[color,translate] duration-300 hover:translate-x-1 hover:text-surface"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-7 lg:w-[246px]">
              {CONTACT_GROUPS.map((group) => (
                <div key={group.title} className="flex flex-col gap-2">
                  <ColumnHeading>{group.title}</ColumnHeading>
                  <ul className="flex flex-col gap-3.5 text-body-sm leading-[18px] text-grey-2">
                    <li>
                      TEL:{" "}
                      <a
                        href={`tel:${group.phone.replace(/\s/g, "")}`}
                        className="transition-colors hover:text-surface"
                      >
                        {group.phone}
                      </a>
                    </li>
                    <li>
                      Email:{" "}
                      <a
                        href={`mailto:${group.email}`}
                        className="transition-colors hover:text-surface"
                      >
                        {group.email}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 border-t border-divider-inverse pt-8">
            <p className="text-body-sm text-grey-2">
              © {year} MERITORIOUS INFOTECH. ALL RIGHTS RESERVED.
            </p>
            <a
              href="#top"
              aria-label="Back to top"
              data-magnetic="0.4"
              className="group/top flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-divider-inverse text-surface shadow-dropdown transition-colors hover:border-brand hover:text-brand"
            >
              {/* Arrow launches up and re-enters from below on hover */}
              <ArrowUpIcon className="size-[22px] group-hover/top:animate-[launch_0.6s_cubic-bezier(0.16,1,0.3,1)]" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { RiCloseLine, RiMenuLine } from "@remixicon/react"
import {
  animate,
  AnimatePresence,
  motion,
  stagger,
  useIsPresent,
  type Variants,
} from "motion/react"

import {
  ArrowRightIcon,
  ArrowUpRightSolidIcon,
  ChevronDownIcon,
} from "@/components/icons"
import {
  ServicesMegaMenu,
  ServicesMenuList,
} from "@/components/layout/services-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { CtaLink } from "@/components/ui/cta-link"
import { prefersReducedMotion } from "@/lib/motion/env"
import { gsap, SCRAMBLE_CHARS } from "@/lib/motion/gsap"
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion/motion"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/services", hasMenu: true },
  { label: "About Us", href: "/about-us" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
]

/** Home matches exactly; other sections stay active on their sub-pages */
function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

// Hover: text lifts 1px while the underline wipes in from the left
const navItemClass =
  "flex items-center gap-1.5 py-2 text-body-sm leading-[18px] tracking-[0.0686em] uppercase transition-[color,translate] duration-300 hover:-translate-y-px"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLLIElement>(null)
  const servicesTriggerRef = useRef<HTMLButtonElement>(null)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const menuOpen = open || servicesOpen

  // Hide while scrolling down, return on scroll up; never while a menu is open
  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0
    function update() {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 8)
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 240)
        lastY = y
      }
    }
    function onScroll() {
      frame ||= requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Each new page starts with the header visible
  useEffect(() => {
    setHidden(false)
  }, [pathname])

  // Menu contents cascade in
  useEffect(() => {
    if (!servicesOpen || !megaMenuRef.current || prefersReducedMotion()) return
    const animation = animate(
      megaMenuRef.current.querySelectorAll("#services-menu a"),
      { opacity: [0, 1], y: [8, 0] },
      { duration: 0.45, delay: stagger(0.018), ease: EASE_OUT }
    )
    return () => animation.complete()
  }, [servicesOpen])

  // Close the desktop mega menu on outside click / Escape
  useEffect(() => {
    if (!servicesOpen) return

    function onPointerDown(event: PointerEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false)
        servicesTriggerRef.current?.focus()
      }
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [servicesOpen])

  function closeMobile() {
    setOpen(false)
    setMobileServicesOpen(false)
  }

  return (
    <header
      id="top"
      data-scrolled={scrolled || undefined}
      className={cn(
        "sticky top-0 z-50 border-b border-transparent bg-canvas transition-[translate,background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "data-scrolled:border-divider data-scrolled:bg-canvas/85 data-scrolled:backdrop-blur-md",
        hidden && !menuOpen && "-translate-y-full"
      )}
    >
      {/* Reading progress (CSS scroll-driven; no JS) */}
      <span
        aria-hidden="true"
        className="scroll-progress pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] bg-brand"
      />
      <div className="container-content flex h-[81px] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Meritorious Infotech — home"
          className="shrink-0"
        >
          <Image
            src="/brand/logo.png"
            alt="Meritorious Infotech"
            width={146}
            height={28}
            priority
            className="dark:hidden"
          />
          {/* Light-text logo for the dark theme */}
          <Image
            src="/brand/logo-footer.svg"
            alt="Meritorious Infotech"
            width={146}
            height={28}
            unoptimized
            className="hidden dark:block"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="relative flex items-center">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href, pathname)

              if (link.hasMenu) {
                const sectionActive = pathname.startsWith(link.href)
                return (
                  <li
                    key={link.href}
                    ref={servicesRef}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    onBlur={(event) => {
                      if (
                        !event.currentTarget.contains(
                          event.relatedTarget as Node | null
                        )
                      ) {
                        setServicesOpen(false)
                      }
                    }}
                  >
                    <button
                      ref={servicesTriggerRef}
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={cn(
                        navItemClass,
                        "pr-4 pl-5 hover:text-ink",
                        servicesOpen || sectionActive
                          ? "text-ink"
                          : "text-grey-1",
                        sectionActive && "font-medium"
                      )}
                    >
                      {link.label}
                      <ChevronDownIcon
                        className={cn(
                          "size-[17px] transition-transform duration-200",
                          servicesOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Positioned against the link list (Figma: 33px left of it,
                        7.5px below); the top padding bridges the hover gap. */}
                    <div
                      ref={megaMenuRef}
                      className={cn(
                        "absolute top-full -left-[33px] z-50 pt-[7.5px] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        servicesOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0"
                      )}
                    >
                      <ServicesMegaMenu
                        id="services-menu"
                        onNavigate={() => setServicesOpen(false)}
                      />
                    </div>
                  </li>
                )
              }

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      navItemClass,
                      "nav-underline",
                      active
                        ? "px-4 font-medium text-ink [--underline-inset-l:1rem]"
                        : "pr-4 pl-5 text-grey-1 hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <CtaLink
            href="/contact"
            size="nav"
            icon={<ArrowRightIcon />}
            hoverIcon={<ArrowUpRightSolidIcon />}
            className="hidden sm:inline-flex"
          >
            Contact Us
          </CtaLink>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? closeMobile() : setOpen(true))}
          >
            {/* Icons swap with a short turn */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {open ? (
                  <RiCloseLine className="size-6" />
                ) : (
                  <RiMenuLine className="size-6" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <MobileNav
            pathname={pathname}
            servicesOpen={mobileServicesOpen}
            onToggleServices={() => setMobileServicesOpen((v) => !v)}
            onNavigate={closeMobile}
          />
        )}
      </AnimatePresence>
    </header>
  )
}

/* Mobile menu: panel wipes down → items stagger in → rule draws → status
   decodes. Closing plays it back quicker: items first, then the panel. */
const mobilePanel: Variants = {
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      duration: 0.3,
      delay: 0.12,
      ease: EASE_IN_OUT,
      delayChildren: stagger(0.025, { from: "last" }),
    },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.42,
      ease: EASE_OUT,
      delayChildren: stagger(0.045, { startDelay: 0.08 }),
    },
  },
}

const mobileItem: Variants = {
  closed: { opacity: 0, x: -8, transition: { duration: 0.18, ease: "easeIn" } },
  open: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

const mobileRule: Variants = {
  closed: { scaleX: 0 },
  open: {
    scaleX: 1,
    transition: { duration: 0.7, delay: 0.25, ease: EASE_OUT },
  },
}

function MobileNav({
  pathname,
  servicesOpen,
  onToggleServices,
  onNavigate,
}: {
  pathname: string
  servicesOpen: boolean
  onToggleServices: () => void
  onNavigate: () => void
}) {
  // Still mounted while it animates out; not interactive by then
  const isPresent = useIsPresent()
  const metaRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const meta = metaRef.current
    if (!meta || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.to(meta, {
        duration: 0.6,
        delay: 0.3,
        ease: "none",
        scrambleText: {
          text: meta.textContent ?? "",
          chars: SCRAMBLE_CHARS,
          speed: 0.8,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <motion.nav
      id="mobile-nav"
      aria-label="Mobile"
      inert={!isPresent}
      variants={mobilePanel}
      initial="closed"
      animate="open"
      exit="closed"
      className="max-h-[calc(100svh-81px)] overflow-y-auto border-t border-divider bg-canvas lg:hidden"
    >
      <ul className="container-content flex flex-col py-4">
        {NAV_LINKS.map((link) => (
          <motion.li key={link.href} variants={mobileItem}>
            {link.hasMenu ? (
              <>
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services-menu"
                  onClick={onToggleServices}
                  className="flex w-full items-center justify-between py-3 text-body-sm tracking-[0.0686em] text-grey-1 uppercase"
                >
                  {link.label}
                  <ChevronDownIcon
                    className={cn(
                      "size-[17px] transition-transform duration-200",
                      servicesOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <motion.div
                      id="mobile-services-menu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <ServicesMenuList onNavigate={onNavigate} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={link.href}
                aria-current={
                  isActive(link.href, pathname) ? "page" : undefined
                }
                onClick={onNavigate}
                className={cn(
                  "block py-3 text-body-sm tracking-[0.0686em] uppercase",
                  isActive(link.href, pathname)
                    ? "font-medium text-ink"
                    : "text-grey-1"
                )}
              >
                {link.label}
              </Link>
            )}
          </motion.li>
        ))}
        <motion.li variants={mobileItem} className="pt-4 sm:hidden">
          <CtaLink
            href="/contact"
            size="nav"
            icon={<ArrowRightIcon />}
            onClick={onNavigate}
          >
            Contact Us
          </CtaLink>
        </motion.li>
      </ul>
      {/* Menu telemetry: rule draws, status decodes (decorative) */}
      <div
        aria-hidden="true"
        className="container-content flex items-center gap-3 pb-6 font-mono text-micro tracking-[0.14em] text-grey-2 uppercase"
      >
        <span className="animate-breathe size-1.5 shrink-0 rounded-full bg-brand" />
        <span ref={metaRef} className="shrink-0">
          NAV_{String(NAV_LINKS.length).padStart(2, "0")} · SYSTEM_READY
        </span>
        <motion.span
          variants={mobileRule}
          className="h-px flex-1 origin-left bg-divider"
        />
      </div>
    </motion.nav>
  )
}

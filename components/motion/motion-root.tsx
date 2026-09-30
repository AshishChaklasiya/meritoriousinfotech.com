"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

import { hasFinePointer } from "@/lib/motion/env"
import { EASE, gsap } from "@/lib/motion/gsap"
import { onReveal, releaseReveal, setCovered } from "@/lib/motion/reveal-gate"
import { createScrollEffects } from "@/lib/motion/scroll-effects"

declare global {
  interface Window {
    __motionReady?: boolean
  }
}

const SECTION_LABELS: Record<string, string> = {
  "": "Home",
  services: "Services",
  portfolio: "Portfolio",
  careers: "Careers",
  "about-us": "About Us",
  contact: "Contact",
  technologies: "Technologies",
}

function routeLabel(pathname: string) {
  const section = pathname.split("/")[1] ?? ""
  return SECTION_LABELS[section] ?? "Loading"
}

function motionEnabled() {
  return document.documentElement.classList.contains("motion")
}

/** Internal page link that should get the curtain transition, or null. */
function transitionTarget(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return null
  }
  const link = (event.target as Element | null)?.closest?.("a[href]")
  if (!(link instanceof HTMLAnchorElement)) return null
  if (link.target && link.target !== "_self") return null
  if (link.hasAttribute("download") || link.closest("[data-no-transition]")) {
    return null
  }
  const url = new URL(link.href)
  if (url.origin !== window.location.origin) return null
  // Same page (hash links, tab deep links): let the page handle it
  if (url.pathname === window.location.pathname) return null
  if (url.pathname.startsWith("/api/") || /\.\w+$/.test(url.pathname)) {
    return null
  }
  return url
}

/** Lifts the route-transition curtain (no-op unless a transition is active). */
function liftCurtain(
  curtain: HTMLElement | null,
  navigating: { current: boolean }
) {
  if (!curtain || !navigating.current) return
  navigating.current = false
  gsap.killTweensOf(curtain)
  gsap.to(curtain, {
    yPercent: -100,
    duration: 0.75,
    delay: 0.05,
    ease: EASE.inOut,
    onStart: releaseReveal,
    onComplete: () => {
      gsap.set(curtain, { autoAlpha: 0, yPercent: 100 })
    },
  })
}

/**
 * Site-wide motion shell: first-visit loader, route-transition curtain,
 * cursor follower, pointer tracking for spotlights, and the per-route scroll
 * effects. Renders nothing interactive; everything is aria-hidden.
 */
export function MotionRoot() {
  const pathname = usePathname()
  const router = useRouter()
  const curtainRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const navigating = useRef(false)

  /* First-visit loader: counts up, then the curtain lifts into the page. */
  useEffect(() => {
    window.__motionReady = true
    const html = document.documentElement
    const curtain = curtainRef.current
    if (!curtain || !motionEnabled() || !html.classList.contains("intro")) {
      return
    }

    const count = curtain.querySelector("[data-count]")
    const bar = curtain.querySelector("[data-bar]")
    const chars = curtain.querySelectorAll("[data-intro-char]")
    const progress = { value: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        html.classList.remove("intro")
        gsap.set(curtain, { autoAlpha: 0, yPercent: 100 })
        try {
          sessionStorage.setItem("mi-intro", "1")
        } catch {}
      },
    })
    tl.from(chars, { yPercent: 110, stagger: 0.035, duration: 0.8 }, 0)
      .to(
        progress,
        {
          value: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count) count.textContent = String(Math.round(progress.value))
          },
        },
        0
      )
      .fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
        0
      )
      .to(curtain.querySelector("[data-curtain-intro]"), {
        autoAlpha: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(curtain, {
        yPercent: -100,
        duration: 0.9,
        ease: EASE.inOut,
        onStart: releaseReveal,
      })

    return () => {
      tl.kill()
    }
  }, [])

  /* Route transitions: cover, navigate, then lift on the new page. */
  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain || !motionEnabled()) return

    const label = curtain.querySelector("[data-route-label]")
    const path = curtain.querySelector("[data-route-path]")
    let fallback: ReturnType<typeof setTimeout> | undefined

    function onClick(event: MouseEvent) {
      const url = transitionTarget(event)
      if (!url) return
      event.preventDefault()
      if (navigating.current || !curtain) return
      navigating.current = true
      setCovered()

      if (label) label.textContent = routeLabel(url.pathname)
      if (path) path.textContent = url.pathname
      gsap.set(curtain.querySelector("[data-curtain-intro]"), {
        display: "none",
      })
      gsap.set(curtain.querySelector("[data-curtain-route]"), {
        display: "flex",
      })

      gsap
        .timeline({
          onComplete: () => {
            router.push(url.pathname + url.search + url.hash)
            // Never leave the page covered if navigation stalls
            fallback = setTimeout(() => liftCurtain(curtain, navigating), 3000)
          },
        })
        .fromTo(
          curtain,
          { autoAlpha: 1, yPercent: 100 },
          { yPercent: 0, duration: 0.55, ease: EASE.inOut }
        )
        .from(
          curtain.querySelectorAll("[data-route-line]"),
          { yPercent: 110, stagger: 0.05, duration: 0.5 },
          "-=0.2"
        )
    }

    document.addEventListener("click", onClick, true)
    return () => {
      document.removeEventListener("click", onClick, true)
      clearTimeout(fallback)
    }
  }, [router])

  /* Per-route scroll effects, started once the page is uncovered. */
  useEffect(() => {
    if (!motionEnabled()) return
    let cleanup: (() => void) | undefined
    const cancel = onReveal(() => {
      cleanup = createScrollEffects(document)
    })
    liftCurtain(curtainRef.current, navigating)
    return () => {
      cancel()
      cleanup?.()
    }
  }, [pathname])

  /* Cursor follower + spotlight pointer tracking (mouse/trackpad only). */
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor || !motionEnabled() || !hasFinePointer()) return

    const label = cursor.querySelector("[data-cursor-label]")!
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: EASE.follow })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: EASE.follow })
    let visible = false

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return
      if (!visible) {
        visible = true
        gsap.set(cursor, { x: event.clientX, y: event.clientY })
        cursor!.dataset.visible = ""
      }
      xTo(event.clientX)
      yTo(event.clientY)

      // Feed --mx/--my to the nearest spotlight surface
      const target = event.target as Element
      const surface = target.closest?.<HTMLElement>("[data-pointer]") ?? null
      if (surface) {
        const rect = surface.getBoundingClientRect()
        surface.style.setProperty("--mx", `${event.clientX - rect.left}px`)
        surface.style.setProperty("--my", `${event.clientY - rect.top}px`)
      }
    }

    function onOver(event: PointerEvent) {
      const target = event.target as Element
      const labelled = target.closest?.<HTMLElement>("[data-cursor]")
      const interactive = target.closest?.(
        "a, button, [role='tab'], label, input, textarea, select, summary"
      )
      label.textContent = labelled?.dataset.cursor ?? ""
      cursor!.dataset.state = labelled ? "label" : interactive ? "hover" : ""
    }

    function onLeaveWindow() {
      visible = false
      delete cursor!.dataset.visible
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerover", onOver, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeaveWindow)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      document.documentElement.removeEventListener(
        "pointerleave",
        onLeaveWindow
      )
    }
  }, [])

  return (
    <>
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="curtain fixed inset-0 z-[100] flex items-center justify-center bg-ink text-surface"
      >
        {/* Brand rules on the leading edges */}
        <span className="absolute inset-x-0 top-0 h-[3px] bg-brand" />
        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-brand" />

        <div
          data-curtain-intro
          className="curtain-intro flex-col items-center gap-6"
        >
          <p className="flex overflow-hidden font-mono text-eyebrow font-bold tracking-[0.3em] text-brand uppercase">
            {"Meritorious Infotech".split("").map((char, i) => (
              <span key={i} data-intro-char className="inline-block">
                {char === " " ? " " : char}
              </span>
            ))}
          </p>
          <p className="flex items-start text-[clamp(4.5rem,14vw,11rem)] leading-none font-semibold tracking-[-0.05em] tabular-nums">
            <span data-count>0</span>
            <span className="text-[0.35em] text-brand">%</span>
          </p>
          <span className="block h-px w-56 bg-divider-inverse">
            <span data-bar className="block h-full origin-left bg-brand" />
          </span>
        </div>

        <div
          data-curtain-route
          className="hidden flex-col items-center gap-3 text-center"
        >
          <span className="overflow-hidden">
            <span
              data-route-line
              data-route-path
              className="block font-mono text-eyebrow font-bold tracking-[0.2em] text-brand uppercase"
            />
          </span>
          <span className="overflow-hidden pb-2">
            <span
              data-route-line
              data-route-label
              className="block text-h2 font-medium"
            />
          </span>
        </div>
      </div>

      <div ref={cursorRef} aria-hidden="true" className="cursor-follower">
        <span data-cursor-label className="cursor-follower-label" />
      </div>
    </>
  )
}

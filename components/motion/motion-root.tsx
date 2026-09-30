"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

import { hasFinePointer } from "@/lib/motion/env"
import { EASE, gsap, SCRAMBLE_CHARS } from "@/lib/motion/gsap"
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

/**
 * Lifts the route-transition curtain once `arrived` is the page the active
 * transition is heading to (null = force, e.g. the stall fallback). Keyed to
 * the destination so a late effect from a previous navigation can't lift a
 * newer cover.
 */
function liftCurtain(
  curtain: HTMLElement | null,
  navigating: { current: string | null },
  arrived: string | null
) {
  if (!curtain || !navigating.current) return
  if (arrived !== null && arrived !== navigating.current) return
  navigating.current = null
  gsap.killTweensOf(curtain)
  const bar = curtain.querySelector("[data-route-bar]")
  const status = curtain.querySelector("[data-route-status]")
  gsap
    .timeline()
    // Progress completes and the status resolves as the new page is ready
    .to(bar, { scaleX: 1, duration: 0.2, ease: "power2.out" })
    .to(
      status,
      {
        duration: 0.2,
        ease: "none",
        scrambleText: { text: "READY", chars: SCRAMBLE_CHARS, speed: 1 },
      },
      0
    )
    .to(curtain, {
      yPercent: -100,
      duration: 0.7,
      ease: EASE.inOut,
      onStart: () => {
        // The persistent <main> stepped back with the old page; reset it
        // before the new page measures its scroll positions
        gsap.set("main", { clearProps: "opacity,transform" })
        releaseReveal()
      },
      onComplete: () => {
        gsap.set(curtain, { autoAlpha: 0, yPercent: 100 })
      },
    })
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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
  /** Destination pathname of the transition in flight, if any */
  const navigating = useRef<string | null>(null)

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
    const status = curtain.querySelector("[data-intro-status]")
    const chars = curtain.querySelectorAll("[data-intro-char]")
    const progress = { value: 0 }
    let cancelled = false

    const ctx = gsap.context(() => {
      gsap.from(chars, { yPercent: 110, stagger: 0.03, duration: 0.7 })
    })

    // Progress follows real readiness (DOM → fonts → load), each step capped,
    // so the loader never holds the site back just to perform.
    const step = (value: number, text: string) =>
      ctx.add(
        () =>
          gsap
            .timeline()
            .to(progress, {
              value,
              duration: 0.3,
              ease: "power2.out",
              onUpdate: () => {
                const v = Math.round(progress.value)
                if (count) count.textContent = String(v).padStart(2, "0")
                gsap.set(bar, { scaleX: v / 100 })
              },
            })
            .to(
              status,
              {
                duration: 0.3,
                ease: "none",
                scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 1 },
              },
              0
            )
        // Context.add(fn) returns fn's result at runtime; GSAP's types say void
      ) as unknown as gsap.core.Timeline
    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve()
      else window.addEventListener("load", () => resolve(), { once: true })
    })

    async function run() {
      await step(37, "LOADING_ASSETS")
      await Promise.race([document.fonts.ready, wait(450)])
      if (cancelled) return
      await step(74, "CONNECTED")
      await Promise.race([loaded, wait(350)])
      if (cancelled) return
      await step(100, "SYSTEM_READY")
      if (cancelled || !curtain) return
      ctx.add(() => {
        gsap
          .timeline({
            onComplete: () => {
              html.classList.remove("intro")
              gsap.set(curtain, { autoAlpha: 0, yPercent: 100 })
              try {
                sessionStorage.setItem("mi-intro", "1")
              } catch {}
            },
          })
          .to(curtain.querySelector("[data-curtain-intro]"), {
            autoAlpha: 0,
            y: -24,
            duration: 0.3,
            delay: 0.1,
            ease: "power2.in",
          })
          .to(curtain, {
            yPercent: -100,
            duration: 0.75,
            ease: EASE.inOut,
            onStart: releaseReveal,
          })
      })
    }
    void run()

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [])

  /* Route transitions: cover, navigate, then lift on the new page. */
  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain || !motionEnabled()) return

    // Rest position below the viewport (unless the loader is covering)
    if (!document.documentElement.classList.contains("intro")) {
      gsap.set(curtain, { yPercent: 100 })
    }
    const label = curtain.querySelector("[data-route-label]")
    const path = curtain.querySelector("[data-route-path]")
    const status = curtain.querySelector("[data-route-status]")
    const bar = curtain.querySelector("[data-route-bar]")
    let fallback: ReturnType<typeof setTimeout> | undefined

    function onClick(event: MouseEvent) {
      const url = transitionTarget(event)
      if (!url) return
      event.preventDefault()
      // A new click supersedes one in flight (never swallowed); the same
      // destination twice is ignored
      if (!curtain || navigating.current === url.pathname) return
      navigating.current = url.pathname
      clearTimeout(fallback)
      setCovered()
      // A click can land while the previous curtain is still lifting; kill
      // that lift so its onComplete can't hide this cover midway
      gsap.killTweensOf([curtain, bar, status, path, "main"])

      if (label) label.textContent = routeLabel(url.pathname)
      if (path) path.textContent = ""
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
            fallback = setTimeout(
              () => liftCurtain(curtain, navigating, null),
              3000
            )
          },
        })
        // Current content steps back as the panel rises over it
        .to(
          "main",
          { opacity: 0.4, y: -24, duration: 0.45, ease: "power2.in" },
          0
        )
        // From wherever the panel is: below at rest, or mid-lift when this
        // click supersedes a transition still in flight (no jump, no flash)
        .set(curtain, { autoAlpha: 1 }, 0)
        .to(curtain, { yPercent: 0, duration: 0.55, ease: EASE.inOut }, 0)
        .from(
          curtain.querySelectorAll("[data-route-line]"),
          { yPercent: 110, stagger: 0.05, duration: 0.5 },
          "-=0.2"
        )
        .to(
          path,
          {
            duration: 0.4,
            ease: "none",
            scrambleText: {
              text: url.pathname,
              chars: SCRAMBLE_CHARS,
              speed: 1,
            },
          },
          "<"
        )
        .set(status, { textContent: "ROUTING" }, "<")
        .fromTo(bar, { scaleX: 0 }, { scaleX: 0.7, duration: 0.5 }, "<")
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
    liftCurtain(curtainRef.current, navigating, pathname)
    return () => {
      cancel()
      cleanup?.()
    }
  }, [pathname])

  /* Cursor follower + pointer tracking (mouse/trackpad only). */
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor || !motionEnabled() || !hasFinePointer()) return

    const label = cursor.querySelector("[data-cursor-label]")!
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: EASE.follow })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: EASE.follow })
    let visible = false
    let magnet: HTMLElement | null = null
    let surface: HTMLElement | null = null

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return
      if (!visible) {
        visible = true
        gsap.set(cursor, { x: event.clientX, y: event.clientY })
        cursor!.dataset.visible = ""
      }

      // Over a magnetic control the ring snaps toward its centre and only
      // loosely follows the pointer, riding along with the magnetic pull
      if (magnet) {
        const r = magnet.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        xTo(cx + (event.clientX - cx) * 0.25)
        yTo(cy + (event.clientY - cy) * 0.25)
      } else {
        xTo(event.clientX)
        yTo(event.clientY)
      }

      // Pointer coordinates for spotlights (--mx/--my, px) and layered depth
      // (--px/--py, 0..1) on the nearest [data-pointer] surface
      const next =
        (event.target as Element).closest?.<HTMLElement>("[data-pointer]") ??
        null
      if (surface && surface !== next) {
        // Layers on the surface we just left drift back to rest
        surface.style.setProperty("--px", "0.5")
        surface.style.setProperty("--py", "0.5")
      }
      surface = next
      if (surface) {
        const r = surface.getBoundingClientRect()
        const x = event.clientX - r.left
        const y = event.clientY - r.top
        surface.style.setProperty("--mx", `${x}px`)
        surface.style.setProperty("--my", `${y}px`)
        surface.style.setProperty("--px", (x / r.width).toFixed(3))
        surface.style.setProperty("--py", (y / r.height).toFixed(3))
      }
    }

    // Context states, most specific first
    function onOver(event: PointerEvent) {
      const target = event.target as Element
      const labelled = target.closest?.<HTMLElement>("[data-cursor]")
      const field = target.closest?.("input, textarea, select")
      const magnetic = target.closest?.<HTMLElement>("[data-magnetic]")
      const control = target.closest?.(
        "button, [role='tab'], label, summary, [data-slot='button']"
      )
      const link = target.closest?.("a")

      magnet = !labelled && !field ? magnetic : null
      label.textContent = labelled?.dataset.cursor ?? ""
      cursor!.dataset.state = labelled
        ? "label"
        : field
          ? "text"
          : magnet
            ? "magnetic"
            : control
              ? "control"
              : link
                ? "link"
                : ""
    }

    // Press: the ring tightens and springs back (GSAP owns its transform)
    function onDown(event: PointerEvent) {
      if (event.pointerType !== "mouse") return
      gsap.to(cursor, { scale: 0.85, duration: 0.15, ease: "power2.out" })
    }
    function onUp() {
      gsap.to(cursor, { scale: 1, duration: 0.4, ease: "back.out(2.5)" })
    }

    function onLeaveWindow() {
      visible = false
      delete cursor!.dataset.visible
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerover", onOver, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeaveWindow)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
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
        className="curtain fixed inset-0 z-[100] flex items-center justify-center bg-night text-snow"
      >
        {/* Faint engineering grid drifting behind the panel (ambient) */}
        <span className="curtain-grid absolute -inset-16 opacity-[0.07]" />
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
            <span data-count>00</span>
            <span className="text-[0.35em] text-brand">%</span>
          </p>
          <span className="block h-px w-56 bg-divider-inverse">
            <span
              data-bar
              className="block h-full origin-left scale-x-0 bg-brand"
            />
          </span>
          <p
            data-intro-status
            className="font-mono text-micro tracking-[0.2em] text-grey-2 uppercase"
          >
            INITIALIZING
          </p>
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
          <span className="flex items-center gap-3 font-mono text-micro tracking-[0.2em] text-grey-2 uppercase">
            <span data-route-status>ROUTING</span>
            <span className="block h-px w-24 bg-divider-inverse">
              <span
                data-route-bar
                className="block h-full origin-left scale-x-0 bg-brand"
              />
            </span>
          </span>
        </div>
      </div>

      <div ref={cursorRef} aria-hidden="true" className="cursor-follower">
        <span data-cursor-label className="cursor-follower-label" />
      </div>
    </>
  )
}

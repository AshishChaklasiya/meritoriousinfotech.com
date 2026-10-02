"use client"

import { useEffect, useRef } from "react"

import type { HeroScene } from "@/components/home/hero-scene"
import { canRunWebGLHero, hasFinePointer } from "@/lib/motion/env"
import {
  gsap,
  SCRAMBLE_CHARS,
  ScrollTrigger,
  splitStable,
} from "@/lib/motion/gsap"
import { onReveal } from "@/lib/motion/reveal-gate"

/**
 * Home hero choreography + the lazily-loaded WebGL terrain behind it.
 * The hero markup stays server-rendered; this finds its parts via
 * `data-hero-el` inside the parent section.
 */
export function HeroMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* Intro timeline */
  useEffect(() => {
    const section = canvasRef.current?.closest("section")
    if (!section || !document.documentElement.classList.contains("motion")) {
      return
    }

    let ctx: gsap.Context | undefined
    const cancel = onReveal(() => {
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(section)
        const [title] = q("[data-hero-el='title']")
        const [accent] = q("[data-hero-el='accent']")
        const [lead] = q("[data-hero-el='lead']")
        const [cta] = q("[data-hero-el='cta']")
        const [meta] = q("[data-hero-el='meta']")
        const decodes = q("[data-hero-el='meta'] [data-decode]")
        const glows = q("[data-hero-glow]")
        const accentText = accent?.textContent ?? ""

        const titleSplit = splitStable(title, {
          type: "lines,words",
          mask: "lines",
          ignore: accent,
        })
        const leadSplit = splitStable(lead, {
          type: "lines",
          mask: "lines",
        })
        gsap.set([title, lead], { autoAlpha: 1 })

        gsap
          .timeline({
            onComplete: () => {
              // revert() restores the original markup (fresh nodes), so flag
              // every part as revealed to keep it out of the hidden state
              titleSplit.revert()
              leadSplit.revert()
              section
                .querySelectorAll("[data-hero-el]")
                .forEach((el) => el.setAttribute("data-revealed", ""))
            },
          })
          .from(
            glows,
            { autoAlpha: 0, scale: 0.6, duration: 2.2, ease: "power2.out" },
            0
          )
          .from(
            titleSplit.split.words,
            { yPercent: 115, opacity: 0, duration: 1.3, stagger: 0.07 },
            0.05
          )
          .fromTo(
            accent,
            { autoAlpha: 1, yPercent: 115 },
            { yPercent: 0, duration: 1.2 },
            0.3
          )
          .to(
            accent,
            {
              duration: 1.1,
              ease: "none",
              scrambleText: {
                text: accentText,
                chars: SCRAMBLE_CHARS,
                speed: 0.5,
              },
            },
            0.35
          )
          .from(
            leadSplit.split.lines,
            { yPercent: 115, duration: 1.1, stagger: 0.08 },
            0.45
          )
          .fromTo(
            cta,
            { autoAlpha: 0, y: 24, scale: 0.94 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1,
              clearProps: "transform",
            },
            0.75
          )
          // Telemetry strip settles in last, its values decoding
          .fromTo(
            meta ?? [],
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            1
          )
        decodes.forEach((el, index) =>
          gsap.to(el, {
            delay: 1.05 + index * 0.12,
            duration: 0.7,
            ease: "none",
            scrambleText: {
              text: el.textContent ?? "",
              chars: SCRAMBLE_CHARS,
              speed: 0.8,
            },
          })
        )
      }, section)
    })

    return () => {
      cancel()
      ctx?.revert()
    }
  }, [])

  /* WebGL terrain: only on capable devices, after the intro has started */
  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.closest("section")
    if (!canvas || !section || !canRunWebGLHero()) return

    let scene: HeroScene | undefined
    let disposed = false
    let visible = true
    const cleanups: (() => void)[] = []

    const start = () =>
      import("@/components/home/hero-scene").then(({ createHeroScene }) => {
        if (disposed) return
        scene = createHeroScene(canvas, {
          onFirstFrame: () => canvas.setAttribute("data-ready", ""),
        })
        scene.setActive(visible && !document.hidden)

        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
          scene?.setActive(visible && !document.hidden)
        })
        observer.observe(section)
        const onVisibility = () => scene?.setActive(visible && !document.hidden)
        document.addEventListener("visibilitychange", onVisibility)

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => scene?.setScroll(self.progress),
        })

        cleanups.push(() => {
          observer.disconnect()
          document.removeEventListener("visibilitychange", onVisibility)
          trigger.kill()
        })

        if (hasFinePointer()) {
          const onMove = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect()
            scene?.setPointer({
              x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
              y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
            })
          }
          const onLeave = () => scene?.setPointer(null)
          section.addEventListener("pointermove", onMove, { passive: true })
          section.addEventListener("pointerleave", onLeave)
          cleanups.push(() => {
            section.removeEventListener("pointermove", onMove)
            section.removeEventListener("pointerleave", onLeave)
          })
        }
      })

    // Keep the main thread free for the intro; build the scene when idle
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => void start(), { timeout: 1500 })
      : window.setTimeout(() => void start(), 600)

    return () => {
      disposed = true
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      cleanups.forEach((cleanup) => cleanup())
      scene?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-canvas pointer-events-none absolute inset-0 -z-10 size-full"
    />
  )
}

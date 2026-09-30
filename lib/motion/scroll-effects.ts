"use client"

import {
  EASE,
  gsap,
  SCRAMBLE_CHARS,
  ScrollTrigger,
  splitStable,
  SplitText,
} from "@/lib/motion/gsap"
import { hasFinePointer } from "@/lib/motion/env"

/*
 * Declarative motion for server-rendered markup. Components opt in with data
 * attributes; this module wires them up per route and reverts on navigation.
 *
 *   data-anim="fade-up | fade | lines | words | scramble | stagger | draw |
 *              image | wordmark | counter"
 *   data-delay="0.2"             extra delay (s) for entrances
 *   data-parallax="8"            scroll-scrubbed yPercent drift (±value)
 *   data-parallax-x="6"          scroll-scrubbed xPercent drift (±value)
 *   data-velocity-skew           skews with scroll velocity
 *   data-magnetic="0.3"          pulls toward the pointer (fine pointers)
 *   data-tilt="6"                3D tilt toward the pointer (fine pointers)
 *   data-scramble-hover          re-decodes its text when its card is hovered
 *   data-scene="stack | process | hero"  bespoke scroll scenes
 *
 * Hidden initial states live in globals.css under `html.motion`, so nothing
 * flashes before hydration and everything is visible without JS.
 */

const DESKTOP = "(min-width: 1024px)"

function delayOf(el: Element) {
  return Number((el as HTMLElement).dataset.delay ?? 0)
}

function markRevealed(el: Element) {
  el.setAttribute("data-revealed", "")
}

/** Fires once when the element scrolls into view (or is already in view). */
function onEnter(el: Element, play: () => void, start = "top 88%") {
  ScrollTrigger.create({ trigger: el, start, once: true, onEnter: play })
}

type Tuning = { distance: number; duration: number }

function entrances(root: ParentNode, { distance, duration }: Tuning) {
  root.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
    if (el.hasAttribute("data-revealed")) return
    const delay = delayOf(el)

    switch (el.dataset.anim) {
      case "fade-up":
        onEnter(el, () =>
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: distance },
            {
              autoAlpha: 1,
              y: 0,
              duration,
              delay,
              clearProps: "transform",
              onComplete: () => markRevealed(el),
            }
          )
        )
        break

      case "fade":
        onEnter(el, () =>
          gsap.fromTo(
            el,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration,
              delay,
              onComplete: () => markRevealed(el),
            }
          )
        )
        break

      case "lines":
      case "words": {
        const byWord = el.dataset.anim === "words"
        onEnter(el, () => {
          const { split, revert } = splitStable(el, {
            type: byWord ? "lines,words" : "lines",
            mask: "lines",
          })
          gsap.set(el, { autoAlpha: 1 })
          gsap.from(byWord ? split.words : split.lines, {
            yPercent: 115,
            duration: duration * 1.15,
            delay,
            stagger: byWord ? 0.045 : 0.09,
            onComplete: () => {
              // Restore the original DOM so resizes re-flow naturally
              revert()
              markRevealed(el)
            },
          })
        })
        break
      }

      case "scramble": {
        const text = el.textContent ?? ""
        onEnter(el, () => {
          gsap.set(el, { autoAlpha: 1 })
          gsap.to(el, {
            duration: 0.9,
            delay,
            ease: "none",
            scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.6 },
            onComplete: () => markRevealed(el),
          })
        })
        break
      }

      case "stagger": {
        const items = Array.from(el.children)
        onEnter(el, () => {
          gsap.set(el, { autoAlpha: 1 })
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: distance },
            {
              autoAlpha: 1,
              y: 0,
              duration,
              delay,
              stagger: { each: 0.09, grid: "auto", from: "start" },
              clearProps: "transform",
              onComplete: () => markRevealed(el),
            }
          )
        })
        break
      }

      case "draw":
        onEnter(el, () =>
          gsap.fromTo(
            el,
            { autoAlpha: 1, scaleX: 0 },
            {
              scaleX: 1,
              duration: duration * 1.4,
              delay,
              ease: EASE.inOut,
              onComplete: () => markRevealed(el),
            }
          )
        )
        break

      case "image": {
        const inner = el.querySelector<HTMLElement>("[data-anim-inner]")
        onEnter(el, () => {
          gsap.set(el, { autoAlpha: 1 })
          const tl = gsap.timeline({
            delay,
            onComplete: () => markRevealed(el),
          })
          tl.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: duration * 1.3,
              ease: EASE.inOut,
              clearProps: "clipPath",
            }
          )
          if (inner) {
            tl.fromTo(
              inner,
              { scale: 1.35 },
              { scale: 1.1, duration: duration * 1.8 },
              0
            )
          }
        })
        break
      }

      case "counter": {
        const target = Number(el.textContent?.replace(/\D/g, "") || 0)
        // Lock the width at its final value so neighbours don't jiggle
        el.style.minWidth = `${el.offsetWidth}px`
        el.style.display = "inline-block"
        el.style.textAlign = "right"
        const counter = { value: 0 }
        // Starts as soon as the figure is on screen: a lone "+" reads broken
        onEnter(
          el,
          () => {
            el.textContent = "0"
            gsap.set(el, { autoAlpha: 1 })
            gsap.to(counter, {
              value: target,
              duration: 2,
              delay,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = String(Math.round(counter.value))
              },
              onComplete: () => markRevealed(el),
            })
          },
          "top bottom"
        )
        break
      }

      case "wordmark": {
        const split = SplitText.create(el, {
          type: "chars",
          mask: "lines",
          linesClass: "split-line",
        })
        gsap.set(el, { autoAlpha: 1 })
        gsap.from(split.chars, {
          yPercent: 100,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom 80%",
            scrub: 0.8,
          },
        })
        break
      }
    }
  })
}

function parallax(root: ParentNode, factor: number) {
  root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const amount = Number(el.dataset.parallax) * factor
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    )
  })

  root.querySelectorAll<HTMLElement>("[data-parallax-x]").forEach((el) => {
    const amount = Number(el.dataset.parallaxX) * factor
    gsap.fromTo(
      el,
      { xPercent: amount },
      {
        xPercent: -amount,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    )
  })
}

/** Rows lean into fast scrolling and settle when it stops. */
function velocitySkew(root: ParentNode) {
  const targets = root.querySelectorAll<HTMLElement>("[data-velocity-skew]")
  if (!targets.length) return

  const proxy = { skew: 0 }
  const setSkew = gsap.quickSetter(targets, "skewX", "deg")
  const clamp = gsap.utils.clamp(-6, 6)

  ScrollTrigger.create({
    onUpdate(self) {
      const skew = clamp(self.getVelocity() / -400)
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: "power3",
          overwrite: true,
          onUpdate: () => setSkew(proxy.skew),
        })
      }
    },
  })
}

type Cleanup = () => void

function magnetic(root: ParentNode, cleanups: Cleanup[]) {
  root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const strength = Number(el.dataset.magnetic || 0.3)
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: EASE.follow })
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: EASE.follow })
    let rect: DOMRect | null = null

    const enter = () => {
      rect = el.getBoundingClientRect()
    }
    const move = (event: PointerEvent) => {
      rect ??= el.getBoundingClientRect()
      xTo((event.clientX - (rect.left + rect.width / 2)) * strength)
      yTo((event.clientY - (rect.top + rect.height / 2)) * strength)
    }
    const leave = () => {
      rect = null
      xTo(0)
      yTo(0)
    }

    el.addEventListener("pointerenter", enter)
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    cleanups.push(() => {
      el.removeEventListener("pointerenter", enter)
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
    })
  })
}

function tilt(root: ParentNode, cleanups: Cleanup[]) {
  root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
    const max = Number(el.dataset.tilt || 6)
    gsap.set(el, { transformPerspective: 900 })
    const rxTo = gsap.quickTo(el, "rotationX", {
      duration: 0.7,
      ease: EASE.follow,
    })
    const ryTo = gsap.quickTo(el, "rotationY", {
      duration: 0.7,
      ease: EASE.follow,
    })

    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      ryTo(px * max)
      rxTo(-py * max)
    }
    const leave = () => {
      rxTo(0)
      ryTo(0)
    }

    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    cleanups.push(() => {
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
    })
  })
}

/** Mono labels re-decode when their card is hovered. */
function scrambleOnHover(root: ParentNode, cleanups: Cleanup[]) {
  root.querySelectorAll<HTMLElement>("[data-scramble-hover]").forEach((el) => {
    const host = el.closest<HTMLElement>("[data-hover-group]") ?? el
    const text = el.textContent ?? ""
    const play = () =>
      gsap.to(el, {
        duration: 0.6,
        ease: "none",
        overwrite: true,
        scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.8 },
      })
    host.addEventListener("pointerenter", play)
    cleanups.push(() => host.removeEventListener("pointerenter", play))
  })
}

/* ---------------------------------------------------------------- scenes */

/** Home services: rows pin in a stack; the one underneath recedes. */
function stackScene(scene: HTMLElement) {
  const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", scene)
  cards.slice(0, -1).forEach((card, index) => {
    const shade = card.querySelector("[data-stack-shade]")
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cards[index + 1],
        start: "top bottom",
        end: "top 20%",
        scrub: true,
      },
    })
    tl.to(card, { scale: 0.94, ease: "none" }, 0)
    if (shade) tl.to(shade, { opacity: 1, ease: "none" }, 0)
  })
}

/** Careers interview steps: pinned; the orange rule "travels" through them. */
function processScene(scene: HTMLElement, pinned: boolean, tuning: Tuning) {
  const rule = scene.querySelector("[data-process-rule]")
  const steps = gsap.utils.toArray<HTMLElement>("[data-process-step]", scene)

  if (!pinned) {
    // Steps start hidden (globals.css); reveal each as it arrives
    steps.forEach((step) =>
      onEnter(step, () =>
        gsap.fromTo(
          step,
          { autoAlpha: 0, y: tuning.distance },
          { autoAlpha: 1, y: 0, duration: tuning.duration }
        )
      )
    )
    return
  }

  const section = scene.closest("section") ?? scene
  gsap.set(steps, { autoAlpha: 0.25 })
  gsap.set(rule, { scaleX: 0 })

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: () =>
        section.offsetHeight < window.innerHeight ? "center center" : "top top",
      end: "+=900",
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
    },
  })
  tl.to(rule, { scaleX: 1, duration: steps.length - 1 }, 0)
  steps.forEach((step, index) => {
    const badge = step.querySelector("[data-process-badge]")
    tl.to(step, { autoAlpha: 1, duration: 0.3 }, Math.max(0, index - 0.15))
    if (badge) {
      tl.fromTo(
        badge,
        { backgroundColor: "#ffffff", color: "#ff7c1a" },
        { backgroundColor: "#ff7c1a", color: "#ffffff", duration: 0.3 },
        Math.max(0, index - 0.15)
      )
    }
  })
  // Hold on the finished state for a beat before releasing the pin
  tl.to({}, { duration: 0.6 })
}

/** Hero copy drifts up and fades as the page scrolls past it. */
function heroScene(scene: HTMLElement) {
  const content = scene.querySelector("[data-hero-content]")
  if (!content) return
  gsap.to(content, {
    y: -80,
    opacity: 0.15,
    ease: "none",
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  })
}

/* ------------------------------------------------------------------ main */

/**
 * Wires every opted-in element under `root`. Returns a cleanup that reverts
 * all tweens, ScrollTriggers, splits and listeners.
 */
export function createScrollEffects(root: ParentNode = document): Cleanup {
  const cleanups: Cleanup[] = []
  const mm = gsap.matchMedia()

  mm.add(
    {
      desktop: DESKTOP,
      mobile: `not all and ${DESKTOP}`,
      tallDesktop: "(min-width: 1024px) and (min-height: 700px)",
      stackable: "(min-width: 1280px) and (min-height: 720px)",
    },
    (context) => {
      const { desktop, tallDesktop, stackable } = context.conditions!
      const tuning: Tuning = desktop
        ? { distance: 48, duration: 1.1 }
        : { distance: 28, duration: 0.8 }

      entrances(root, tuning)
      parallax(root, desktop ? 1 : 0.5)
      velocitySkew(root)

      root.querySelectorAll<HTMLElement>("[data-scene]").forEach((scene) => {
        switch (scene.dataset.scene) {
          case "stack":
            if (stackable) stackScene(scene)
            break
          case "process":
            processScene(scene, Boolean(tallDesktop), tuning)
            break
          case "hero":
            heroScene(scene)
            break
        }
      })
    }
  )

  if (hasFinePointer()) {
    magnetic(root, cleanups)
    tilt(root, cleanups)
    scrambleOnHover(root, cleanups)
  }

  // Web fonts shift line boxes; re-measure once they settle
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  return () => {
    cleanups.forEach((cleanup) => cleanup())
    mm.revert()
  }
}

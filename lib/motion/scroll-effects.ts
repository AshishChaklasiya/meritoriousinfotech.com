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
 *              trace | index | image | wordmark | counter"
 *   data-delay="0.2"             extra delay (s) for entrances
 *   data-sequence                entrances inside share this element's trigger,
 *                                so their delays play as one choreography
 *   data-parallax="8"            scroll-scrubbed yPercent drift (±value)
 *   data-parallax-x="6"          scroll-scrubbed xPercent drift (±value)
 *   data-velocity="skew | stretch | shift"  reacts to scroll speed, settles
 *                                when scrolling stops (desktop only)
 *   data-magnetic="0.3"          pulls toward the pointer (fine pointers)
 *   data-tilt="6"                3D tilt toward the pointer (fine pointers)
 *   data-scramble-hover          re-decodes its text when its card is hovered
 *   data-scene="stack | process | hero"  bespoke scroll scenes
 *
 * Hidden initial states live in globals.css under `html.motion`, so nothing
 * flashes before hydration and everything is visible without JS.
 *
 * Transform ownership: once GSAP transforms an element it writes
 * `translate/rotate/scale: none` inline, which silences CSS `translate`/`scale`
 * utilities on that same element. So an element's transform has ONE owner —
 * GSAP-driven elements (magnetic, tilt) get their press/lift from GSAP here,
 * and CSS hover/depth layers live on wrappers or children GSAP never touches.
 */

const DESKTOP = "(min-width: 1024px)"

function delayOf(el: Element) {
  return Number((el as HTMLElement).dataset.delay ?? 0)
}

function markRevealed(el: Element) {
  el.setAttribute("data-revealed", "")
}

/**
 * Fires once when the element scrolls into view (or is already in view).
 * Inside a `[data-sequence]` the group is the trigger, so siblings start
 * together and their `data-delay`s form one choreographed sequence.
 */
function onEnter(el: Element, play: () => void, start = "top 88%") {
  const trigger = el.closest("[data-sequence]") ?? el
  ScrollTrigger.create({ trigger, start, once: true, onEnter: play })
}

/**
 * Pointer-driven elements (tilt/magnetic) own their transform; an entrance's
 * `clearProps: "transform"` would wipe their live rotation, so skip those.
 */
const INTERACTIVE = "[data-tilt], [data-magnetic]"
function settle(targets: Element[]) {
  const plain = targets.filter((el) => !el.matches(INTERACTIVE))
  if (plain.length) gsap.set(plain, { clearProps: "transform" })
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
              onComplete: () => {
                settle([el])
                markRevealed(el)
              },
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
            opacity: 0,
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
          // Label fades in, lifts a few px and decodes into place
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 6 },
            { autoAlpha: 1, y: 0, duration: 0.6, delay, ease: "power3.out" }
          )
          gsap.to(el, {
            duration: 0.8,
            delay,
            ease: "none",
            scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.6 },
            onComplete: () => markRevealed(el),
          })
        })
        break
      }

      case "index": {
        // Section number: digits flicker briefly, then settle (very fast)
        const text = el.textContent ?? ""
        onEnter(el, () => {
          gsap.set(el, { autoAlpha: 1 })
          gsap.to(el, {
            duration: 0.45,
            delay,
            ease: "none",
            scrambleText: { text, chars: "0123456789", speed: 1 },
            onComplete: () => markRevealed(el),
          })
        })
        break
      }

      case "trace": {
        // ●──────▬  dot appears, rule draws out of it, a tick rides the
        // leading edge and parks at the end
        const dot = el.querySelector("[data-trace-dot]")
        const line = el.querySelector<HTMLElement>("[data-trace-line]")
        const tick = el.querySelector<HTMLElement>("[data-trace-tick]")
        onEnter(el, () => {
          gsap.set(el, { autoAlpha: 1 })
          const run = duration * 1.3
          const tl = gsap.timeline({
            delay,
            onComplete: () => markRevealed(el),
          })
          if (dot) {
            tl.from(dot, { scale: 0, duration: 0.4, ease: "back.out(3)" }, 0)
          }
          if (line) {
            tl.fromTo(
              line,
              { scaleX: 0 },
              { scaleX: 1, duration: run, ease: EASE.inOut },
              0.1
            )
          }
          if (line && tick) {
            tl.fromTo(
              tick,
              { x: () => -(line.offsetWidth - tick.offsetWidth), opacity: 0 },
              { x: 0, opacity: 1, duration: run, ease: EASE.inOut },
              0.1
            )
          }
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
              onComplete: () => {
                settle(items)
                markRevealed(el)
              },
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
              // Overshoots a hair and settles — an instrument needle, not a tick
              ease: "back.out(1.1)",
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
          // Numeric scrub: catches up over 0.6s, so it settles, never stops dead
          scrub: 0.6,
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

/**
 * One scroll-velocity signal for every speed-reactive element. Fast scrolling
 * pushes a value in [-1, 1]; it eases back to 0 when scrolling stops, so
 * things lean, stretch or trail and then settle. Direction flips naturally.
 *
 *   skew     marquee rows lean (skewX, ±5deg)
 *   stretch  short decorative rules stretch (scaleX, up to +60%)
 *   shift    labels trail by a few px (y, ±4px)
 *   images   revealed images lag a touch behind the page (y, ±8px)
 */
function velocity(root: ParentNode) {
  const pick = (mode: string) =>
    Array.from(root.querySelectorAll(`[data-velocity="${mode}"]`))
  const skew = pick("skew")
  const stretch = pick("stretch")
  const shift = pick("shift")
  const images = Array.from(
    root.querySelectorAll("[data-anim='image'] [data-anim-inner]")
  )
  if (!skew.length && !stretch.length && !shift.length && !images.length) return

  const setters = [
    skew.length && gsap.quickSetter(skew, "skewX", "deg"),
    stretch.length && gsap.quickSetter(stretch, "scaleX"),
    shift.length && gsap.quickSetter(shift, "y", "px"),
    images.length && gsap.quickSetter(images, "y", "px"),
  ]
  const apply = (v: number) => {
    if (setters[0]) setters[0](-v * 5)
    if (setters[1]) setters[1](1 + Math.abs(v) * 0.6)
    if (setters[2]) setters[2](v * 4)
    if (setters[3]) setters[3](v * 8)
  }

  const proxy = { v: 0 }
  const clamp = gsap.utils.clamp(-1, 1)
  ScrollTrigger.create({
    onUpdate(self) {
      const v = clamp(self.getVelocity() / 2400)
      if (Math.abs(v) > Math.abs(proxy.v)) {
        proxy.v = v
        gsap.to(proxy, {
          v: 0,
          duration: 0.9,
          ease: "power3",
          overwrite: true,
          onUpdate: () => apply(proxy.v),
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
    // The label drifts a little further than its button, so the two layers
    // separate slightly under the pointer
    const label = el.querySelector<HTMLElement>("[data-magnetic-label]")
    const lxTo = label
      ? gsap.quickTo(label, "x", { duration: 0.7, ease: EASE.follow })
      : null
    const lyTo = label
      ? gsap.quickTo(label, "y", { duration: 0.7, ease: EASE.follow })
      : null
    let rect: DOMRect | null = null

    const enter = () => {
      rect = el.getBoundingClientRect()
    }
    const move = (event: PointerEvent) => {
      rect ??= el.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      xTo(dx * strength)
      yTo(dy * strength)
      lxTo?.(dx * strength * 0.35)
      lyTo?.(dy * strength * 0.35)
    }
    // Press: settle to 0.97, then ease back (GSAP owns this transform, so
    // the CSS active:scale fallback can't apply here)
    const press = () =>
      gsap.to(el, { scale: 0.97, duration: 0.12, ease: "power2.out" })
    const release = () =>
      gsap.to(el, { scale: 1, duration: 0.45, ease: "back.out(2.5)" })
    const leave = () => {
      rect = null
      xTo(0)
      yTo(0)
      lxTo?.(0)
      lyTo?.(0)
      release()
    }

    el.addEventListener("pointerenter", enter)
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    el.addEventListener("pointerdown", press)
    el.addEventListener("pointerup", release)
    cleanups.push(() => {
      el.removeEventListener("pointerenter", enter)
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
      el.removeEventListener("pointerdown", press)
      el.removeEventListener("pointerup", release)
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

    // The card also lifts a few px while hovered (first layer of the hover)
    const liftTo = gsap.quickTo(el, "y", { duration: 0.6, ease: EASE.follow })

    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      ryTo(px * max)
      rxTo(-py * max)
    }
    const enter = () => liftTo(-4)
    const leave = () => {
      rxTo(0)
      ryTo(0)
      liftTo(0)
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
        scrub: 0.5,
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

  // Pin the section's inner container, never the section itself: pinning
  // wraps the target in a .pin-spacer, and if that target is a direct child
  // of a React-owned parent (<main>), React's removeChild on route change
  // throws before the effect cleanup can un-pin. Wrapping inside the section
  // keeps the section — the node React removes — untouched.
  const section = scene.parentElement ?? scene
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
      // --lit mixes surface→brand in CSS, so the badge follows the theme
      tl.fromTo(
        badge,
        { "--lit": 0 },
        { "--lit": 1, duration: 0.3 },
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
      scrub: 0.5,
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
      // Touch momentum scrolling + speed effects read as jitter: desktop only
      if (desktop) velocity(root)

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

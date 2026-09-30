"use client"

import { gsap } from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin)

/* Motion language — "engineered precision": fast starts, long settles. One
   ease family everywhere so every section feels like the same machine. */
export const EASE = {
  /** Entrances: text, cards, images */
  out: "expo.out",
  /** Curtain / full-screen wipes */
  inOut: "power4.inOut",
  /** Pointer-driven follow (magnetic, tilt) */
  follow: "power3.out",
} as const

/** Glyphs for the "decode" effect on mono labels — telemetry flavoured. */
export const SCRAMBLE_CHARS = "01<>/_{}#$%+=*"

gsap.defaults({ ease: EASE.out, duration: 1 })
ScrollTrigger.config({ ignoreMobileResize: true })

/**
 * SplitText with the element's height locked while it is split: the temporary
 * line/word wrappers measure a few px differently from inline text, which
 * would otherwise nudge the layout below (CLS) on split and again on revert.
 */
export function splitStable(el: HTMLElement, vars: SplitText.Vars) {
  el.style.height = `${el.getBoundingClientRect().height}px`
  const split = SplitText.create(el, { linesClass: "split-line", ...vars })
  return {
    split,
    revert() {
      split.revert()
      el.style.removeProperty("height")
    },
  }
}

export { gsap, ScrollTrigger, SplitText }

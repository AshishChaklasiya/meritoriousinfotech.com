"use client"

import { useEffect, useRef } from "react"

const TIME = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
})

/**
 * Decorative telemetry strip along the foot of the home hero: system status,
 * the studio's coordinates (Surat) and its local time. Desktop only and
 * aria-hidden — brand texture, not content. Enters last in the hero intro
 * (HeroMotion) with its values decoding.
 */
export function HeroTelemetry() {
  const timeRef = useRef<HTMLSpanElement>(null)

  // Written through the ref: no hydration mismatch, no re-renders
  useEffect(() => {
    const update = () => {
      if (timeRef.current) timeRef.current.textContent = TIME.format(new Date())
    }
    update()
    const interval = window.setInterval(update, 30_000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div
      aria-hidden="true"
      data-hero-el="meta"
      className="pointer-events-none absolute inset-x-0 bottom-8 hidden lg:block"
    >
      <div className="container-content flex items-center justify-between font-mono text-micro tracking-[0.16em] text-grey-2 uppercase">
        <span className="flex items-center gap-2">
          <span className="animate-breathe size-1.5 rounded-full bg-brand" />
          <span data-decode>System_Ready</span>
        </span>
        <span data-decode>N 21.1702° · E 72.8311°</span>
        <span className="flex items-center gap-2">
          <span data-decode>Surat · IST</span>
          <span ref={timeRef} className="tabular-nums">
            --:--
          </span>
        </span>
      </div>
    </div>
  )
}

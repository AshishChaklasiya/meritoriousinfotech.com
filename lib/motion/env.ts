/* Capability checks shared by the motion system. Client-only. */

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Mouse/trackpad: enables cursor, magnetic and tilt effects */
export function hasFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches
}

/** Whether the machine can afford the WebGL hero */
export function canRunWebGLHero() {
  if (prefersReducedMotion()) return false
  if (!window.matchMedia("(min-width: 768px)").matches) return false

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean }
    deviceMemory?: number
  }
  if (nav.connection?.saveData) return false
  if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) return false
  if (nav.deviceMemory && nav.deviceMemory < 4) return false

  try {
    const canvas = document.createElement("canvas")
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"))
  } catch {
    return false
  }
}

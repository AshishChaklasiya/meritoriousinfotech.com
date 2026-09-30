/**
 * Coordinates page intros with the full-screen curtain (first-visit loader and
 * route transitions). While the curtain covers the page, intro callbacks are
 * queued; they run as the curtain starts lifting so content animates in as it
 * is uncovered rather than behind the panel.
 */

type Callback = () => void

let covered: boolean | null = null
const queue = new Set<Callback>()

function isCovered() {
  // First load: the inline boot script marks <html> with `intro` when the
  // loader will play.
  if (covered === null) {
    covered = document.documentElement.classList.contains("intro")
  }
  return covered
}

export function setCovered() {
  covered = true
}

/** Called by the curtain as it begins to lift. */
export function releaseReveal() {
  covered = false
  const pending = [...queue]
  queue.clear()
  pending.forEach((callback) => callback())
}

/** Run `callback` once the page is visible. Returns a cancel function. */
export function onReveal(callback: Callback) {
  if (!isCovered()) {
    const frame = requestAnimationFrame(callback)
    return () => cancelAnimationFrame(frame)
  }
  queue.add(callback)
  return () => {
    queue.delete(callback)
  }
}

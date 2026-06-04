import { useEffect, useRef } from 'react'

/**
 * useMagnetic — a restrained magnetic pull for a primary CTA.
 *
 * Returns a ref. Attach it to a wrapper around the button (so the button keeps
 * its own :hover transition); the wrapper translates a few px toward the cursor
 * as it nears, then eases back on leave. Hard-gated to fine pointers with
 * motion allowed, so touch / keyboard / reduced-motion users get nothing.
 *
 * Tunables: `strength` (fraction of cursor distance), `max` (px cap).
 * To disable entirely, just don't attach the ref.
 */
export default function useMagnetic({ strength = 0.22, max = 8 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let tx = 0
    let ty = 0

    const apply = () => {
      raf = 0
      el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`
    }
    const clamp = (n) => Math.max(-max, Math.min(max, n))

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      tx = clamp((e.clientX - (r.left + r.width / 2)) * strength)
      ty = clamp((e.clientY - (r.top + r.height / 2)) * strength)
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      tx = 0
      ty = 0
      if (!raf) raf = requestAnimationFrame(apply)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [strength, max])

  return ref
}

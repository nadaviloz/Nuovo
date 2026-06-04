import { useEffect, useRef, useState } from 'react'
import styles from './PremiumImage.module.css'
import lqip from '../../data/lqip.js'

/**
 * PremiumImage — the Michelin image pipeline.
 *
 * Renders a fixed-aspect frame that paints the photo's dominant colour first,
 * then a 24px blurred base64 LQIP (generated offline by sharp), and finally
 * fades the sharp image over it once decoded — a true progressive blur-up with
 * zero layout shift.
 *
 * The clip-path "unmask from behind a wall" reveal is driven by the page's
 * existing reveal orchestrator: when the ancestor section gains `.he-revealed`
 * the tile wipes open on the brand bezier. Reusing that one proven observer
 * (instead of a private one per image) keeps the choreography in lock-step with
 * the headlines and sidesteps StrictMode double-mount races.
 *
 * The sharp <img> stays transform-free so the optional hover-zoom is the only
 * thing that ever scales it (no rule collisions with section CSS).
 *
 * Props:
 *   src        public path (also the LQIP lookup key)
 *   alt        accessible text ("" for decorative)
 *   aspect     e.g. "4 / 5" — reserves space; omit when the parent is sized
 *   fill       fill a parent that already has a definite height (grid cell)
 *   sizes      responsive sizes hint
 *   priority   above-the-fold: eager + high fetch priority, skips the reveal
 *   reveal     clip-path reveal with the section (default true)
 *   zoom       slow hover zoom (default false)
 *   position   object-position override (e.g. "center 22%")
 *   className  extra class on the frame (carries the section's aspect ratio)
 */
export default function PremiumImage({
  src,
  alt = '',
  aspect,
  sizes,
  priority = false,
  reveal = true,
  zoom = false,
  fill = false,
  position,
  className = ''
}) {
  const meta = lqip[src] || {}
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Honour images already in the cache (no onLoad fires for those).
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  const frameStyle = { backgroundColor: meta.c || 'rgba(27,19,10,.05)' }
  if (aspect) frameStyle.aspectRatio = aspect

  const cls = [
    styles.frame,
    fill ? styles.fill : '',
    reveal && !priority ? styles.canReveal : '',
    loaded ? styles.loaded : '',
    zoom ? styles.zoom : '',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls} style={frameStyle}>
      {meta.d && (
        <span
          className={styles.lqip}
          style={{ backgroundImage: `url("${meta.d}")` }}
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        className={styles.img}
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  )
}

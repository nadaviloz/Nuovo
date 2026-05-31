import { useEffect, useRef } from 'react'
import styles from './Gallery.module.css'
import useReveal from '../../hooks/useReveal.js'

const items = [
  { cls: 'tall',   src: '/uploads/gallery/gallery-1.jpg', tag: 'בופה · שולחן שף' },
  { cls: 'wide',   src: '/uploads/gallery/gallery-2.jpg', tag: 'קרפצ׳יו דג ים' },
  { cls: '',       src: '/uploads/gallery/gallery-3.jpg', tag: 'פיצה נאפולי' },
  { cls: 'square', src: '/uploads/gallery/gallery-4.jpg', tag: 'פסטה נילושה בבית' },
  { cls: 'tall',   src: '/uploads/gallery/gallery-5.jpg', tag: 'אווירת שולחן שף' },
  { cls: 'wide',   src: '/uploads/gallery/gallery-6.jpg', tag: 'טרטר על טוסט' },
  { cls: '',       src: '/uploads/gallery/gallery-7.jpg', tag: 'סלט עשבים ועגבניות' },
  { cls: 'square', src: '/uploads/gallery/gallery-8.jpg', tag: 'פריקי על לבנה' }
]

export default function Gallery() {
  const { ref: headRef, style: headStyle } = useReveal()
  const trackRef = useRef(null)
  const wrapRef = useRef(null)

  const all = [...items, ...items]

  useEffect(() => {
    const track = trackRef.current
    const wrap = wrapRef.current
    if (!track || !wrap) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // ~50 px/sec — slower than the text marquee so the eye can land on each frame.
    const BASE_SPEED = 0.85
    let pos = 0
    let speed = 1
    let targetSpeed = 1
    let raf = 0
    let half = track.scrollWidth / 2

    const recompute = () => { half = track.scrollWidth / 2 }
    window.addEventListener('resize', recompute)
    // Recompute when images finish loading (sizes change once they paint).
    const imgs = Array.from(track.querySelectorAll('img'))
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', recompute, { once: true })
    })

    const tick = () => {
      speed += (targetSpeed - speed) * 0.06
      pos -= speed * BASE_SPEED
      if (half > 0 && -pos >= half) pos += half
      track.style.transform = `translate3d(${pos.toFixed(2)}px, 0, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onEnter = () => { targetSpeed = 0 }
    const onLeave = () => { targetSpeed = 1 }
    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', recompute)
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section className={styles.section}>
      <div ref={headRef} className={styles.head} style={headStyle}>
        <h3>אירועים<br/><em>שהיו</em></h3>
        <p>מטבחים של לקוחות, מנות לאור נר, רגעים שאנשים מסתכלים אחד על השני. מה שקורה כשהמטבח הופך לבמה.</p>
      </div>
      <div ref={wrapRef} className={styles.marquee}>
        <div ref={trackRef} className={styles.track}>
          {all.map((it, i) => (
            <div key={i} className={`${styles.item} ${it.cls ? styles[it.cls] : ''}`}>
              <img className={styles.photo} src={it.src} alt={it.tag} loading="lazy" draggable="false" />
              <span className={styles.tag}>{it.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

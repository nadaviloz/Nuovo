import { useEffect, useRef } from 'react'
import styles from './Gallery.module.css'
import useReveal from '../../hooks/useReveal.js'

const items = [
  { cls: 'tall',   tag: '/01 - plating' },
  { cls: 'wide',   tag: '/02 - dining room' },
  { cls: '',       tag: '/03 - the chef' },
  { cls: 'square', tag: '/04 - detail, sauce' },
  { cls: 'tall',   tag: '/05 - host pours' },
  { cls: 'wide',   tag: '/06 - table candles' },
  { cls: '',       tag: '/07 - market produce' },
  { cls: 'square', tag: '/08 - dessert' }
]

export default function Gallery() {
  const { ref: headRef, style: headStyle } = useReveal()
  const marqueeRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const m = marqueeRef.current
    const t = trackRef.current
    if (!m || !t) return
    let isDown = false, startX = 0, manualOffset = 0
    const down = (e) => { isDown = true; m.classList.add(styles.dragging); startX = e.pageX }
    const up = () => { if (!isDown) return; isDown = false; m.classList.remove(styles.dragging) }
    const move = (e) => {
      if (!isDown) return
      const walk = (e.pageX - startX)
      manualOffset += walk
      t.style.transform = `translateX(${manualOffset}px)`
      t.style.animation = 'none'
      startX = e.pageX
    }
    m.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mousemove', move)
    return () => {
      m.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mousemove', move)
    }
  }, [])

  const all = [...items, ...items]

  return (
    <section className={styles.section}>
      <div ref={headRef} className={styles.head} style={headStyle}>
        <h3>אירועים<br/><em>שהיו.</em></h3>
        <p>מטבחים של לקוחות, מנות לאור נר, רגעים שאנשים מסתכלים אחד על השני. מה שקורה כשהמטבח הופך לבמה.</p>
      </div>
      <div ref={marqueeRef} className={styles.marquee}>
        <div ref={trackRef} className={styles.track}>
          {all.map((it, i) => (
            <div key={i} className={`${styles.item} ${it.cls ? styles[it.cls] : ''}`}>
              <span className={styles.tag}>{it.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

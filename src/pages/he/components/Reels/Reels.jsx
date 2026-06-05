import { useCallback, useRef, useState } from 'react'
import styles from './Reels.module.css'

function Reel({ src, poster, name }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <div ref={cardRef} className={`${styles.card} ${playing ? styles.playing : ''}`}>
      {src ? (
        <video
          ref={videoRef}
          className={styles.media}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img className={styles.media} src={poster} alt={name} />
      )}
      {src && !playing && <img className={styles.poster} src={poster} alt={name} />}
      <div className={styles.veil} />
      {src && (
        <button
          type="button"
          className={styles.toggle}
          onClick={toggle}
          aria-label={playing ? 'עצור' : 'נגן'}
        >
          {playing ? (
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <rect x="3" y="2.5" width="3.2" height="11" rx="1" fill="currentColor"/>
              <rect x="9.8" y="2.5" width="3.2" height="11" rx="1" fill="currentColor"/>
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor"/>
            </svg>
          )}
        </button>
      )}
      <div className={styles.caption}>
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  )
}

const categories = {
  pizza: {
    label: 'פיצה',
    reels: [
      { name: 'פסטו וזיתים',    poster: '/uploads/reel-pizza-1.jpg', src: '/uploads/reel-pizza-1.mp4' },
      { name: 'פסטו ורוקט',     poster: '/uploads/reel-pizza-2.jpg', src: '/uploads/reel-pizza-2.mp4' },
      { name: 'צ׳דר ובזיליקום', poster: '/uploads/reel-pizza-3.jpg', src: '/uploads/reel-pizza-3.mp4' },
      { name: 'פסטו ומוצרלה',   poster: '/uploads/reel-pizza-4.jpg', src: '/uploads/reel-pizza-4.mp4' },
      { name: 'עגבניות שרי',    poster: '/uploads/reel-pizza-5.jpg', src: '/uploads/reel-pizza-5.mp4' },
      { name: 'פיצה ירוקה',     poster: '/uploads/reel-pizza-6.jpg', src: '/uploads/reel-pizza-6.mp4' },
      { name: 'מרגריטה קלאסית', poster: '/uploads/reel-pizza-7.jpg', src: '/uploads/reel-pizza-7.mp4' }
    ]
  },
  chef: {
    label: 'מנות שף',
    reels: [
      { name: 'דגים נאים',  poster: '/uploads/reel-chef-1.jpg',  src: '/uploads/reel-chef-1.mp4' },
      { name: 'מנה ראשונה', poster: '/uploads/reel-chef-2.jpg',  src: '/uploads/reel-chef-2.mp4' },
      { name: 'דלעת צלויה', poster: '/uploads/reel-chef-3.jpg',  src: '/uploads/reel-chef-3.mp4' },
      { name: 'רוטב ירוק',  poster: '/uploads/reel-chef-4.jpg',  src: '/uploads/reel-chef-4.mp4' },
      { name: 'הדרים',      poster: '/uploads/reel-chef-5.jpg',  src: '/uploads/reel-chef-5.mp4' },
      { name: 'רביולי',     poster: '/uploads/reel-chef-6.jpg',  src: '/uploads/reel-chef-6.mp4' },
      { name: 'שמן ירוק',   poster: '/uploads/reel-chef-7.jpg',  src: '/uploads/reel-chef-7.mp4' },
      { name: 'פסטה טרייה', poster: '/uploads/reel-chef-8.jpg',  src: '/uploads/reel-chef-8.mp4' },
      { name: 'חציל וסלסה', poster: '/uploads/reel-chef-9.jpg',  src: '/uploads/reel-chef-9.mp4' },
      { name: 'מנת שף',     poster: '/uploads/reel-chef-10.jpg', src: '/uploads/reel-chef-10.mp4' }
    ]
  }
}

const order = ['pizza', 'chef']

// Cache-buster - bump when a reel's contents change but its filename is reused.
const V = '?v=23'

export default function Reels() {
  const [active, setActive] = useState('pizza')
  const reels = categories[active].reels
  const gridRef = useRef(null)

  // Mouse users (no trackpad) can't scroll a horizontal row with the wheel and
  // the scrollbar is hidden — so give them arrow controls. RTL: the row starts
  // at the right and reveals more content to the left, where scrollLeft goes
  // negative in every current browser. So "forward" (◀) scrolls left.
  const scrollByCards = useCallback((dir) => {
    const el = gridRef.current
    if (!el) return
    const card = el.querySelector(`.${styles.card}`)
    const step = card ? card.getBoundingClientRect().width + 18 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }, [])

  // Click-and-drag to pan the row with a plain mouse, like a touchpad swipe.
  const drag = useRef(null)
  const onPointerDown = (e) => {
    if (e.pointerType === 'touch') return // native touch scroll already works
    const el = gridRef.current
    if (!el) return
    drag.current = { startX: e.clientX, startLeft: el.scrollLeft, moved: false }
  }
  const onPointerMove = (e) => {
    const el = gridRef.current
    if (!drag.current || !el) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 4) {
      drag.current.moved = true
      el.classList.add(styles.dragging)
      el.setPointerCapture?.(e.pointerId)
    }
    el.scrollLeft = drag.current.startLeft - dx
  }
  const endDrag = () => {
    const el = gridRef.current
    if (el) el.classList.remove(styles.dragging)
    drag.current = null
  }
  // Swallow the click that fires after a drag so it doesn't toggle a clip.
  const onClickCapture = (e) => {
    if (drag.current?.moved) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div className={styles.tabs} role="tablist" aria-label="סוגי סרטונים">
          {order.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              className={`${styles.tab} ${active === key ? styles.tabActive : ''}`}
              onClick={() => setActive(key)}
            >
              {categories[key].label}
            </button>
          ))}
        </div>
        <div className={styles.controls}>
          <span className={styles.hint}>לחצו לנגן</span>
          <div className={styles.nav}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollByCards(1)}
              aria-label="הקודם"
            >
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <path d="M5.5 2.5 L11 8 L5.5 13.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollByCards(-1)}
              aria-label="הבא"
            >
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <path d="M10.5 2.5 L5 8 L10.5 13.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* key remounts the grid on tab change so a playing clip stops when you switch. */}
      <div
        key={active}
        ref={gridRef}
        className={`${styles.grid} ${styles.multi}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {reels.map((r, i) => (
          <Reel key={i} name={r.name} src={r.src + V} poster={r.poster + V} />
        ))}
      </div>
    </div>
  )
}

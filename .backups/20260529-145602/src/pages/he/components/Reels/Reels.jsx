import { useRef, useState } from 'react'
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

const reels = [
  { name: 'פיצה · נאפולי', poster: '/uploads/reel-pizza-1.jpg', src: '/uploads/reel-pizza-1.mp4' },
  { name: 'חציל · ירוק',   poster: '/uploads/reel-pizza-2.jpg', src: '/uploads/reel-pizza-2.mp4' }
]

export default function Reels() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div className={styles.label}>מהמטבח של אוהד</div>
        <div className={styles.hint}>לחצו לנגן</div>
      </div>
      <div className={`${styles.grid} ${reels.length > 1 ? styles.multi : ''}`}>
        {reels.map((r, i) => <Reel key={i} {...r} />)}
      </div>
    </div>
  )
}

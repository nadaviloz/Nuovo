import { useEffect } from 'react'
import styles from './VideoLightbox.module.css'

export default function VideoLightbox({ open, src, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
    >
      <div className={styles.close} aria-label="סגור" onClick={onClose}>×</div>
      {src
        ? <video src={src} controls playsInline />
        : <video controls playsInline />
      }
    </div>
  )
}

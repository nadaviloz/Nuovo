import { useEffect, useState } from 'react'
import styles from './FloatBook.module.css'

// Floating booking CTA that appears once you scroll past the hero.
export default function FloatBook() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#book"
      className={`${styles.book} ${show ? styles.show : ''}`}
      aria-label="לתיאום אירוע"
    >
      <span className={styles.icon} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3v3M17 3v3M4 8.5h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
        </svg>
      </span>
      <span className={styles.label}>לתיאום אירוע</span>
    </a>
  )
}

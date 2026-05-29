import { useEffect, useState } from 'react'
import styles from './Nav.module.css'

const LINKS = [
  { href: '#about', label: 'מי אני' },
  { href: '#how', label: 'איך זה עובד' },
  { href: '#tracks', label: 'מסלולים' },
  { href: '#faq', label: 'שאלות נפוצות' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${open ? styles.open : ''}`}>
      <div className={styles.navInner}>
        <button
          type="button"
          className={styles.burger}
          aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span></span><span></span><span></span>
        </button>
        <div className={styles.brand}>Nuovo<span className={styles.dot}></span></div>
        <div className={styles.navLinks}>
          {LINKS.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </div>
        <div className={styles.right}>
          <a href="#book" className={styles.navCta}>ליצירת קשר</a>
        </div>
      </div>

      <div className={styles.mobileMenu} aria-hidden={!open}>
        <div className={styles.mobileLinks}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
        <a href="#book" className={styles.mobileCta} onClick={() => setOpen(false)}>ליצירת קשר</a>
      </div>
    </nav>
  )
}

import { useEffect, useState } from 'react'
import styles from './Nav.module.css'

// Minimal line icons (24px, currentColor stroke) for the mobile tab bar. Kept in
// this file so the bar stays a single self-contained unit; the calendar mirrors
// the FloatBook glyph so the booking action reads consistently across the site.
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.3" />
      <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}
function IconRoute() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6.5" cy="18" r="2.2" />
      <circle cx="17.5" cy="6" r="2.2" />
      <path d="M8.7 18h5.3a3.5 3.5 0 0 0 3.5-3.5V8.2" />
    </svg>
  )
}
function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5z" />
      <path d="M3.5 12.5 12 17l8.5-4.5" />
      <path d="M3.5 16 12 20.5 20.5 16" />
    </svg>
  )
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.3 11 14.8 15.8 9.3" />
    </svg>
  )
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 8.5h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
    </svg>
  )
}

// Desktop top-pill links.
const LINKS = [
  { href: '#about', label: 'מי אני' },
  { href: '#how', label: 'איך זה עובד' },
  { href: '#tracks', label: 'מסלולים' },
  { href: '#service', label: 'מה כלול' },
]

// Mobile thumb-zone tabs. Labels are deliberately short (the full nav phrases
// don't fit a tab cell); the booking cell is the emphasized primary action.
const TABS = [
  { id: 'about', href: '#about', label: 'מי אני', Icon: IconUser },
  { id: 'how', href: '#how', label: 'תהליך', Icon: IconRoute },
  { id: 'tracks', href: '#tracks', label: 'מסלולים', Icon: IconLayers },
  { id: 'service', href: '#service', label: 'מה כלול', Icon: IconCheck },
  { id: 'book', href: '#book', label: 'לתיאום', Icon: IconCalendar, primary: true },
]

export default function Nav({ bookingActive = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy for the bottom tab bar. ONE shared observer over the section
  // targets — not a per-element reveal observer — so it never touches or races
  // the headline/child reveal orchestrator. A section is "active" while it
  // crosses the vertical middle of the viewport.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const targets = TABS
      .map(t => document.getElementById(t.id))
      .filter(Boolean)
    if (!targets.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActiveId(e.target.id)
      })
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 })
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <div className={styles.brand}>Nuovo<span className={styles.dot}></span></div>
          <div className={styles.navLinks}>
            {LINKS.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
          <div className={styles.right}>
            <a href="#book" className={styles.navCta}>ליצירת קשר</a>
          </div>
        </div>
      </nav>

      <nav className={`${styles.bottomBar} ${bookingActive ? styles.barHidden : ''}`} aria-label="ניווט מהיר">
        {TABS.map(({ id, href, label, Icon, primary }) => {
          const active = activeId === id
          return (
            <a
              key={id}
              href={href}
              className={`${styles.tab} ${primary ? styles.primary : ''} ${active ? styles.active : ''}`}
              aria-current={active ? 'true' : undefined}
            >
              <span className={styles.tabIcon}><Icon /></span>
              <span className={styles.tabLabel}>{label}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}

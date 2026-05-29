import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.brand}>Nuovo<span className={styles.dot}></span></Link>
        <div className={styles.navLinks}>
          <a href="#about">מי אני</a>
          <a href="#how">איך זה עובד</a>
          <a href="#tracks">מסלולים</a>
          <a href="#faq">שאלות נפוצות</a>
          <Link to="/page-2">עמוד 2</Link>
        </div>
        <div className={styles.right}>
          <a href="#book" className={styles.navCta}>ליצירת קשר</a>
        </div>
      </div>
    </nav>
  )
}

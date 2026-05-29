import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navInner}>
        <div className={styles.brand}>Nuovo<span className={styles.dot}></span></div>
        <div className={styles.navLinks}>
          <a href="#about">מי אני</a>
          <a href="#how">איך זה עובד</a>
          <a href="#tracks">מסלולים</a>
        </div>
        <div className={styles.right}>
          <div className={styles.lang}>
            <button className={styles.active} onClick={() => navigate('/he')}>HE</button>
            <span>·</span>
            <button onClick={() => navigate('/en')}>EN</button>
          </div>
          <a href="#book" className={styles.navCta}>ליצירת קשר</a>
        </div>
      </div>
    </nav>
  )
}

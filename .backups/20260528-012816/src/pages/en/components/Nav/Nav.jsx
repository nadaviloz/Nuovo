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
        <div className={styles.brand}>Hearth<span className={styles.dot}></span></div>
        <div className={styles.navLinks}>
          <a href="#">The Evening</a>
          <a href="#">Chefs</a>
          <a href="#">Menus</a>
          <a href="#">Journal</a>
        </div>
        <div className={styles.right}>
          <div className={styles.lang}>
            <button className={styles.active} onClick={() => navigate('/en')}>EN</button>
            <span>·</span>
            <button onClick={() => navigate('/he')}>HE</button>
          </div>
          <a href="#book" className={styles.navCta}>Reserve</a>
        </div>
      </div>
    </nav>
  )
}

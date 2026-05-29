import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY
          if (heroRef.current && y < window.innerHeight) {
            heroRef.current.style.backgroundPositionY = (y * 0.35) + 'px'
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header ref={heroRef} className={styles.hero}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>שף פרטי · אצלך בבית</div>
      </div>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <h1 className={styles.headline}>האירוח הכי טוב<br/><em>הוא בבית.</em></h1>
          <div>
            <p className={styles.lede}>שף. תפריט שנתפר סביב השולחן שלך. אירוע שאתם מארחים בלי להרים מחבת. אנחנו מביאים את המסעדה - המפתחות נשארים אצלכם.</p>
            <div className={styles.ctas}>
              <a href="#book" className={styles.btnPrimary}>
                להזמנה
                <span className={styles.arrow}>←</span>
              </a>
              <a href="#how" className={styles.btnText}>איך זה עובד</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

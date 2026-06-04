import { useRef } from 'react'
import styles from './Hero.module.css'
import useMagnetic from '../../hooks/useMagnetic.js'

export default function Hero() {
  const heroRef = useRef(null)
  const magRef = useMagnetic()

  return (
    <header ref={heroRef} className={styles.hero}>
      <div className={styles.photoFrame} aria-hidden="true">
        <div className={styles.photoLayer} />
      </div>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>שף פרטי · אצלך בבית</div>
          <h1 className={styles.headline} data-he-masked="skip">
            <span className={styles.line}>
              <span className={styles.word} style={{ '--i': 0 }}><span>האירוח</span></span>{' '}
              <span className={styles.word} style={{ '--i': 1 }}><span>הכי</span></span>{' '}
              <span className={styles.word} style={{ '--i': 2 }}><span>טוב</span></span>
            </span>
            <br/>
            <em className={styles.line}>
              <span className={styles.word} style={{ '--i': 3 }}><span>הוא</span></span>{' '}
              <span className={styles.word} style={{ '--i': 4 }}><span>בבית</span></span>
            </em>
          </h1>
          <p className={styles.lede}>שף. תפריט שנתפר סביב השולחן שלך. אירוע שאתם מארחים בלי להרים מחבת. אנחנו מביאים את המסעדה - המפתחות נשארים אצלכם.</p>
          <div className={styles.ctas}>
            <a ref={magRef} href="#book" className={styles.btnPrimary}>
              לתיאום אירוע
              <span className={styles.arrow}>←</span>
            </a>
            <a href="#how" className={styles.btnText}>איך זה עובד</a>
          </div>
        </div>
      </div>
    </header>
  )
}

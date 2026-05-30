import { useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const heroRef = useRef(null)

  return (
    <header ref={heroRef} className={styles.hero}>
      <div className={styles.photoFrame} aria-hidden="true">
        <div className={styles.photoLayer} />
      </div>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <svg
              className="he-signature-svg he-signature-svg--tick he-signature-svg--on-load"
              viewBox="0 0 32 5"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Hero eyebrow signature — its own unique curve, not from the bank. */}
              <path
                d="M 1 3 Q 16 1 32 3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="100"
                className="he-signature-path"
              />
            </svg>
            שף פרטי · אצלך בבית
          </div>
          <h1 className={styles.headline}>
            <span className={styles.word} style={{ animationDelay: '0.10s' }}>האירוח</span>{' '}
            <span className={styles.word} style={{ animationDelay: '0.25s' }}>הכי</span>{' '}
            <span className={styles.word} style={{ animationDelay: '0.40s' }}>טוב</span>
            <br/>
            <em className={styles.emphasis}>
              <span className={styles.word} style={{ animationDelay: '0.60s' }}>הוא</span>{' '}
              <span className={styles.word} style={{ animationDelay: '0.80s' }}>בבית.</span>
              <svg
                className={styles.signature}
                viewBox="0 0 320 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* A path with two soft quadratic waves — looks brush-drawn, not ruler-straight. */}
                <path
                  d="M 2 8 Q 70 4 138 7.5 T 268 7 Q 296 6.5 318 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="100"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </em>
          </h1>
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
    </header>
  )
}

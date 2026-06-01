import styles from './MenuBridge.module.css'

/* Editorial typographic bridge — step 1 (base menu) flows into step 2
   (upgrades). Pure negative space, vertical hairline, no card boxes. */
export default function MenuBridge() {
  return (
    <section id="menu-bridge" className={styles.bridge} aria-label="בחירת תפריט — שלב 1 ושלב 2">
      <div className={styles.spine} aria-hidden="true" />

      <div className={styles.wrap}>
        <a
          href="#tracks"
          className={`${styles.bridgeStep} ${styles.stepOne} ${styles.reveal}`}
          style={{ '--i': 0 }}
        >
          <span className={styles.numeral} aria-hidden="true">01</span>
          <div className={styles.copy}>
            <span className={styles.stepTitle}>בוחרים מסלול בסיס</span>
            <span className={styles.stepHint}>Classic · Farina · Premium · Finger Food · All Fish</span>
          </div>
        </a>

        <a
          href="#upgrades"
          className={`${styles.bridgeStep} ${styles.stepTwo} ${styles.reveal}`}
          style={{ '--i': 2 }}
        >
          <span className={styles.numeral} aria-hidden="true">02</span>
          <div className={styles.copy}>
            <span className={styles.stepTitle}>מוסיפים תוספות לבחירה</span>
            <span className={styles.stepHint}>לא חובה — לשדרוג חוויית האירוח</span>
          </div>
        </a>
      </div>
    </section>
  )
}

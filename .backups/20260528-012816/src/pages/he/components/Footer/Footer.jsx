import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div>
            <p className={styles.tag}>שף פרטי, במטבח שלכם, לאנשים שאתם כבר אוהבים להאכיל.</p>
          </div>
          <div className={styles.col}>
            <h5>יצירת קשר</h5>
            <a href="https://instagram.com/" target="_blank" rel="noopener">
              <span className={styles.iconLink}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>
                </svg>
                @nuovo.chef
              </span>
            </a>
            <a className={styles.ltr} href="mailto:hello@nuovo.co.il">hello@nuovo.co.il</a>
            <a className={styles.ltr} href="tel:+972500000000">+972 50 000 0000</a>
          </div>
        </div>
        <div className={styles.base}>
          <div>© Nuovo studio · תשפ״ו</div>
          <div>תל אביב · ירושלים · חיפה</div>
        </div>
      </div>
    </footer>
  )
}

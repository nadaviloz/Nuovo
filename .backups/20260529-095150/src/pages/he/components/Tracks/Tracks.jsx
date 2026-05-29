import styles from './Tracks.module.css'

function TrackCard({ className, children }) {
  return <div className={className}>{children}</div>
}

export default function Tracks({ onSelectTrack }) {
  const select = (value) => () => {
    onSelectTrack?.(value)
    const el = document.getElementById('book')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="tracks" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ 04 - מסלולים</div>
            <h2 className={styles.title}>שלושה מסלולים.<br/><em>שף אחד.</em></h2>
          </div>
          <p className={styles.lede}>שלוש דרכים שונות לארח. בוחרים את הסגנון, ואנחנו בונים את התפריט מסביב לאירוע, השוק והאורחים. אפשר להוסיף מנות, להחליף, להתאים - נחזור איתכם על הכול.</p>
        </div>

        <div className={styles.grid}>
          <TrackCard className={styles.track}>
            <div className={styles.tNum}>01</div>
            <div className={styles.tName}>בופה</div>
            <div className={styles.tDesc}>מינימום 20 אורחים · אירוע גדול · ללא הגשה אישית</div>
            <ul className={styles.menu}>
              <li>תפריט בופה רחב - האורחים מגישים לעצמם</li>
              <li>הקמת הבופה והסטיילינג</li>
              <li>הזנה ותחזוקה לאורך האירוע</li>
              <li>פינוי וניקיון מלא אחרי</li>
              <li>המתאים ביותר לאירועים גדולים - חתונות קטנות, ימי הולדת, אירועי חברה</li>
            </ul>
            <div className={styles.price}><span>הכי משתלם לאירועים גדולים</span></div>
            <a href="#book" className={styles.cta} onClick={select('בופה - מינימום 20 אורחים')}>להזמין ←</a>
          </TrackCard>

          <TrackCard className={`${styles.track} ${styles.featured}`}>
            <div className={styles.badge}>הכי מבוקש</div>
            <div className={styles.tNum}>02</div>
            <div className={styles.tName}>אירוע שף</div>
            <div className={styles.tDesc}>השף בבית · הגשה אישית · ניתן להוסיף מנות</div>
            <ul className={styles.menu}>
              <li>שף ראשי במטבח שלכם - בישול חי</li>
              <li>תפריט קבוע של מנות · אפשר להרחיב</li>
              <li><em>תוספות בתשלום:</em> מנת דגים, מנת בשר, מנה ראשונה, קינוח מורחב</li>
              <li>מצרכים טריים מהשוק</li>
              <li>הגשה אישית לכל אורח</li>
              <li>ניקיון מלא אחרי</li>
            </ul>
            <div className={styles.price}><span style={{color:'var(--paper)'}}>החוויה האישית. המסלול שאנשים זוכרים.</span></div>
            <a href="#book" className={styles.cta} onClick={select('אירוע שף - בבית, הגשה אישית')}>להזמין ←</a>
          </TrackCard>

          <TrackCard className={styles.track}>
            <div className={styles.tNum}>03</div>
            <div className={styles.tName}>מנות ביס</div>
            <div className={styles.tDesc}>אירוע יוקרתי · מנות אצבע · אירוע עמידה</div>
            <ul className={styles.menu}>
              <li>מבחר רחב של מנות ביס וקנפה</li>
              <li>הגשה אישית במגשי כסף לאורחים</li>
              <li>סטיילינג ועיצוב הגשה</li>
              <li>מתאים לאירועי השקה, חגיגות יוקרה ואירועי עמידה</li>
              <li>מינימום 15 אורחים</li>
              <li>ניקיון מלא אחרי</li>
            </ul>
            <div className={styles.price}><span>חוויה יוקרתית · אירוע עומד</span></div>
            <a href="#book" className={styles.cta} onClick={select('מנות ביס - מינימום 15 אורחים')}>להזמין ←</a>
          </TrackCard>
        </div>
      </div>
    </section>
  )
}

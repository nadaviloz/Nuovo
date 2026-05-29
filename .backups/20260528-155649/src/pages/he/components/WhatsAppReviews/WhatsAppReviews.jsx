import styles from './WhatsAppReviews.module.css'

const reviews = [
  {
    name: 'המלצת לקוח',
    text: 'אוהד תודה רבה רבה! היה מדהים באמת אתם מקצוענים, לא הרגשנו אתכם בבית בכלל והבית נשאר נקי ומתוקתק כשהלכתם, הכל היה טעים ברמות קיצוניות כולמממם החמיאו על האוכל! באמת ממש תודה אנחנו נמליץ עליכם בכל הזדמנות 🫶🫶',
    time: '11:01'
  }
]

function WaGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.07L2 22l5.05-1.32A10 10 0 1 0 12 2Zm5.3 14.1c-.22.62-1.3 1.2-1.8 1.24-.46.04-.9.2-3.06-.64-2.58-1.02-4.2-3.66-4.32-3.83-.13-.16-1.04-1.38-1.04-2.64s.66-1.87.9-2.13c.23-.25.5-.32.67-.32l.48.01c.16 0 .37-.06.58.44.22.53.74 1.83.8 1.96.07.13.11.29.02.46-.08.16-.13.27-.25.42-.13.15-.27.33-.38.44-.13.13-.26.27-.11.52.15.26.66 1.09 1.42 1.77.98.87 1.8 1.14 2.05 1.27.26.13.4.11.55-.07.16-.18.64-.74.8-1 .17-.26.33-.21.56-.13.22.08 1.42.67 1.66.79.24.13.4.19.46.29.06.1.06.6-.16 1.22Z"/>
    </svg>
  )
}

function Ticks() {
  return (
    <svg viewBox="0 0 18 12" width="17" height="11" aria-hidden="true" className={styles.ticks}>
      <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M1 6.5 4 9.5 9.5 3"/>
      <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M7 9 8 9.5 13.5 3"/>
    </svg>
  )
}

export default function WhatsAppReviews() {
  return (
    <section className={styles.host}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ ישר מהוואטסאפ</div>
            <h2 className={styles.title}>מה שכותבים<br/><em>אחרי.</em></h2>
          </div>
          <p className={styles.lede}>ההודעות שמגיעות יום אחרי האירוע — מהמטבח של הלקוחות, במילים שלהם.</p>
        </div>

        <div className={styles.grid}>
          {reviews.map((r, i) => (
            <div key={i} className={styles.chat}>
              <div className={styles.chatHead}>
                <div className={styles.avatar} aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 1.8c-3.7 0-8 1.9-8 4.6V21h16v-2.6c0-2.7-4.3-4.6-8-4.6Z"/></svg>
                </div>
                <div className={styles.who}>
                  <div className={styles.whoName}>{r.name}</div>
                  <div className={styles.whoStatus}><span className={styles.dot} /> וואטסאפ</div>
                </div>
                <div className={styles.waBadge}><WaGlyph /></div>
              </div>

              <div className={styles.bubble}>
                <p className={styles.text}>{r.text}</p>
                <div className={styles.meta}>
                  <span className={styles.time}>{r.time}</span>
                  <Ticks />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

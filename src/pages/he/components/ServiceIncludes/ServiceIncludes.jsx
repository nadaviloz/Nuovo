import styles from './ServiceIncludes.module.css'

/* "מה כלול בשירות שלנו?" — the expectation-setter from the brief (page 6).
   Two editorial columns: what the service includes vs. what it doesn't.
   Wording kept verbatim to the client PDF. Hairline rows, no card boxes,
   off-white paper, with the seared-tuna plate peeking off the left edge. */
const included = [
  {
    title: 'שולחנות ומפות שעליהם יוגש כל האוכל',
    body: 'עיצוב המפות בסגנון נשפך עם מפות איכותיות בצבעים לבן ושמנת, ניתן לבחון בחירה של מפות וצבעים בסגנון אחר בתוספת תשלום.'
  },
  {
    title: 'כלי הגשה',
    body: 'כלי קרמיקה יוקרתיים עבודת יד מאיטליה בסגנון לבן ושמנת במרכז השולחן עליהם יוגש כל האוכל יחד עם כפות הגשה בסגנון כסף.'
  },
  {
    title: 'סידורי פרחים',
    body: 'עיצוב ושזירה של פרחים חיים באגרטלים יוקרתיים מונחים על השולחן, ניתן לבחור את צבע הפרחים בתיאום מראש בלבד - הזרים לא נשארים בבית הלקוח.'
  },
  {
    title: 'הקמה ופירוק',
    body: 'הצוות שלנו אחראי להקמה של כל השולחנות והעמדות שסגרתם איתנו וגם לפירוקם בסוף האירוע.'
  },
  {
    title: 'נוכחות הצוות באירוע',
    body: 'הצוות שלנו מלווה אתכם לאורך כל האירוע מהתחלה ועד סופו, הצוות אחראי להפקת האירוע ומתן שירותים קולינריים.'
  }
]

const excluded = [
  {
    title: 'כלי אכילה אישיים לסועדים',
    body: 'השירות שלנו לא כולל צלחות אישיות, סכום אישי ומפיות לכל סועד, ניתן לבדוק בהתאם לזמינות על השכרת ציוד כזה דרכינו בתוספת תשלום.'
  },
  {
    title: 'שתייה וכוסות',
    body: 'השירות שלנו לא כולל שתייה קלה ואלכוהול ולא כוסות שתייה, ניתן לבדוק מולנו על ספקים שנותנים שירותי בר שאנחנו מכירים וננסה לעזור.'
  },
  {
    title: 'מטבח נייד',
    body: 'כדי שנוכל לתת לכם את השירות הטוב ביותר אנחנו זקוקים לאזור תפעולי ומרחב עבודה מטעמכם לטובת הכנת האוכל.'
  },
  {
    title: 'עיצוב החלל',
    body: 'השירות שלנו לא כולל עיצוב מלא של החלל מעבר לעיצוב השולחנות והעמדות שסגרתם איתנו.'
  }
]

function Check() {
  return (
    <svg className={styles.mark} viewBox="0 0 22 22" width="22" height="22" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M5 11.5l4 4 8-9" />
    </svg>
  )
}

function Dash() {
  return (
    <svg className={styles.mark} viewBox="0 0 22 22" width="22" height="22" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M5 11h12" />
    </svg>
  )
}

export default function ServiceIncludes() {
  return (
    <section id="service" className={styles.section} aria-labelledby="service-title">
      {/* Seared-tuna plate peeking off the left edge. Uses a pre-cut PNG
          (slate background removed, soft feathered alpha) so the white plate
          bleeds into the paper with no gray rim — no CSS mask needed. */}
      <img
        src="/assets/plate-cutout.png"
        alt=""
        aria-hidden="true"
        className={styles.peek}
        loading="lazy"
      />
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ מה כלול</div>
            <h2 id="service-title" className={styles.title}>מה כלול<br /><em>בשירות שלנו</em></h2>
          </div>
          <p className={styles.lede}>
            כדי שתדעו בדיוק למה לצפות — לפניכם מה שאנחנו דואגים לו עבורכם, ומה כדאי להשלים מצדכם.
          </p>
        </div>

        <div className={styles.cols}>
          <div className={styles.spine} aria-hidden="true" />

          <div className={styles.col}>
            <h3 className={`${styles.colHead} ${styles.colHeadIn}`}>השירות שלנו כולל</h3>
            <ul className={styles.list}>
              {included.map((it) => (
                <li key={it.title} className={styles.item}>
                  <span className={`${styles.markWrap} ${styles.markIn}`}><Check /></span>
                  <div className={styles.itemBody}>
                    <h4 className={styles.itemTitle}>{it.title}</h4>
                    <p className={styles.itemText}>{it.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={`${styles.colHead} ${styles.colHeadOut}`}>השירות לא כולל</h3>
            <ul className={styles.list}>
              {excluded.map((it) => (
                <li key={it.title} className={styles.item}>
                  <span className={`${styles.markWrap} ${styles.markOut}`}><Dash /></span>
                  <div className={styles.itemBody}>
                    <h4 className={styles.itemTitle}>{it.title}</h4>
                    <p className={styles.itemText}>{it.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className={styles.note}>
          אנחנו מגיעים מהדרום לכמעט כל אזור בארץ · עלות תוספת נסיעות בהתאם למיקום האירוע.
        </p>
      </div>
    </section>
  )
}

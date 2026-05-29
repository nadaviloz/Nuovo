import styles from './Faq.module.css'

const items = [
  {
    q: 'איך מזמינים אצלכם אירוע?',
    a: 'ממלאים את הטופס כאן באתר או שולחים לנו הודעה בוואטסאפ. נחזור אליכם עם הצעת תפריט מותאמת — לא עם עוד שאלות.'
  },
  {
    q: 'צריך לשלם מראש או למסור כרטיס אשראי?',
    a: 'לא. קודם נשלח הצעה שמותאמת להיקף האירוע ולמספר האורחים, וסוגרים רק כשמתאים לכם.'
  },
  {
    q: 'מה כולל השירות?',
    a: 'השף מבשל אצלכם בבית עם כלי הגשה איכותיים, מגיש לאורחים לאורך הערב, והמטבח נשאר נקי ומסודר כשהוא הולך.'
  },
  {
    q: 'אפשר להוסיף עיצוב שולחן מהודר?',
    a: 'בהחלט. עיצוב השולחן הוא תוספת בתשלום לכל אחד מהמסלולים — שולחנות לבנים, פרחים טריים וסידור מלא לאווירת שולחן שף.'
  },
  {
    q: 'מגישים גם שתייה או אלכוהול?',
    a: 'אנחנו מתמקדים באוכל בלבד. שתייה ואלכוהול אינם חלק מהשירות.'
  },
  {
    q: 'באילו אזורים אתם פועלים?',
    a: 'תל אביב, ירושלים, חיפה והסביבה. מרחק נוסף? כתבו לנו ונבדוק.'
  },
  {
    q: 'כמה זמן מראש כדאי להזמין?',
    a: 'מומלץ לתאם מספר שבועות מראש כדי לשריין תאריך, אך נשתדל להיענות גם לבקשות בהתראה קצרה.'
  }
]

function Chevron() {
  return (
    <svg className={styles.chev} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/>
    </svg>
  )
}

export default function Faq() {
  return (
    <section id="faq" className={styles.host}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ שאלות נפוצות</div>
            <h2 className={styles.title}>לפני שמזמינים<br/><em>כדאי לדעת.</em></h2>
          </div>
          <p className={styles.lede}>כל מה שחשוב לדעת לפני האירוע. לא מצאתם תשובה? כתבו לנו בוואטסאפ ונחזור אליכם.</p>
        </div>

        <div className={styles.list}>
          {items.map((it, i) => (
            <details key={i} className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.q}>{it.q}</span>
                <Chevron />
              </summary>
              <div className={styles.answer}>{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

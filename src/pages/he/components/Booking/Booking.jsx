import { useMemo, useState, useEffect } from 'react'
import styles from './Booking.module.css'

const trackOptions = [
  '',
  'אירוע שף - בבית, הגשה אישית',
  'בופה - מינימום 20 אורחים',
  'מנות ביס - מינימום 15 אורחים',
  'עוד לא יודע - תייעצו לי'
]

const trackMinima = {
  'בופה - מינימום 20 אורחים':              0,
  'אירוע שף - בבית, הגשה אישית':           500,
  'מנות ביס - מינימום 15 אורחים': 700,
  'עוד לא יודע - תייעצו לי':               0
}

const budgetChips = [
  { min: '300',  label: '₪300-500',   ceil: 500 },
  { min: '500',  label: '₪500-700',   ceil: 700 },
  { min: '700',  label: '₪700-1,000', ceil: 1000 },
  { min: '1000', label: '₪1,000+',    ceil: 9999 },
  { min: '0',    label: 'לא בטוח',     ceil: 9999 }
]

const occasionChips = ['יום הולדת','יום נישואין','הצעת נישואין','ארוחה משפחתית','אירוע עסקי','חברים','סתם בא לי']
const vibeChips = ['אינטימי, שקט','חגיגי, רעשני','קליל, צוחקים הרבה','מהודר, רומנטי','כמו בבית של סבתא']
const dietChips = ['צמחוני','טבעוני','ללא גלוטן','ללא חלב','כשר','אגוזים','פירות ים','הכל אוכלים']

const timeSegs = ['צהריים','ערב מוקדם','ערב מאוחר']
const channelSegs = ['וואטסאפ','טלפון','מייל']
const hourSegs = ['בוקר','צהריים','ערב']

function Cal() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 8.5h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
    </svg>
  )
}
function Pin() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}
function Arrow() {
  return (
    <svg className="bk-arrow" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}

export default function Booking() {
  const [values, setValues] = useState({
    track: '',
    date: '',
    guests: '',
    location: '',
    story: '',
    extra: '',
    name: '',
    phone: '',
    email: ''
  })
  const [time, setTime] = useState(null)
  const [channel, setChannel] = useState(null)
  const [hours, setHours] = useState(null)
  const [occasion, setOccasion] = useState([])
  const [vibe, setVibe] = useState([])
  const [budget, setBudget] = useState(null)
  const [diet, setDiet] = useState([])
  const [submitted, setSubmitted] = useState(false)

  // Today in local-time YYYY-MM-DD - used as the date picker's floor (no past dates).
  const todayISO = useMemo(() => new Date().toLocaleDateString('en-CA'), [])

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  const stepGuests = (delta) => setValues((v) => {
    const n = Math.max(1, (parseInt(v.guests, 10) || 0) + delta)
    return { ...v, guests: String(n) }
  })

  const toggle = (state, setter) => (v) => {
    setter(state.includes(v) ? state.filter(x => x !== v) : [...state, v])
  }

  const floor = trackMinima[values.track] ?? 0
  const isBudgetDisabled = (chip) => chip.ceil <= floor

  useEffect(() => {
    if (budget && isBudgetDisabled(budgetChips.find(c => c.min === budget) || {})) {
      setBudget(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floor])

  const pct = useMemo(() => {
    let score = 0
    if (values.track) score += 6
    if (time) score += 4
    if (values.date.trim()) score += 8
    if (values.guests.trim()) score += 6
    if (values.location.trim()) score += 6
    if (values.name.trim()) score += 5
    if (values.phone.trim()) score += 5

    if (occasion.length) score += 6
    if (vibe.length) score += 6
    if (budget) score += 10
    if (diet.length) score += 4

    const story = values.story.trim()
    if (story.length > 0) score += 5
    if (story.length > 40) score += 5
    if (story.length > 120) score += 8
    if (story.length > 220) score += 7
    if (story.length > 350) score += 5

    if (values.extra.trim().length > 20) score += 3
    if (values.email.trim()) score += 2
    if (channel) score += 2
    if (hours) score += 2

    return Math.min(100, score)
  }, [values, time, channel, hours, occasion, vibe, budget, diet])

  const note = pct < 25
    ? <>התחילו למלא - <em>כל פרט נוסף עוזר לאוהד להגיע מוכן.</em></>
    : pct < 55
    ? <><em>טוב.</em> עוד כמה פרטים על האווירה והאורחים - והתפריט יהיה הרבה יותר מדויק.</>
    : pct < 80
    ? <><em>מצוין.</em> כבר יש לאוהד תמונה ברורה. עוד שני דברים והתפריט יהיה תפור עליכם.</>
    : <><em>מושלם.</em> אוהד יחזור אליכם עם הצעת תפריט אמיתית - לא שאלות.</>

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const budgetHint = budgetChips.some(isBudgetDisabled)
    ? <><em>מסלול זה</em> מתחיל ב־₪{floor} לאדם - סוננו אפשרויות נמוכות יותר.</>
    : null

  return (
    <section id="book" className={styles.section}>
      <div className={styles.texture} aria-hidden="true" />

      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ 06 - הזמנה</div>
            <h2 className={styles.title}>ספרו לנו<br/><em>על הערב</em></h2>
          </div>
          <p className={styles.lede}>לא טופס בירוקרטי - סיפור קצר. ככל שתשתפו יותר, השף יחזור אליכם עם הצעת תפריט מדויקת, לא עם שאלות.</p>
        </div>

        <form className={styles.bento} onSubmit={onSubmit}>
          {/* ── 01 · האירוע ───────────────────────────────────────────── */}
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.cardTitle}>האירוע</span>
              <span className={styles.cardNum}>01</span>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>בחירת מסלול</label>
              <div className={styles.selectWrap}>
                <select className={styles.select} value={values.track} onChange={set('track')}>
                  <option value="">בחרו מסלול</option>
                  {trackOptions.slice(1).map(o => <option key={o}>{o}</option>)}
                </select>
                <span className={styles.selectChevron} aria-hidden="true">⌄</span>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>שעה של היום</label>
              <div className={`${styles.segmented} ${styles.segmentedFull}`}>
                {timeSegs.map((v) => (
                  <button type="button" key={v} className={`${styles.seg} ${time === v ? styles.segActive : ''}`} onClick={() => setTime(v)}>{v}</button>
                ))}
              </div>
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label className={styles.label}>מספר אורחים</label>
                <div className={styles.stepper}>
                  <button type="button" className={styles.stepBtn} onClick={() => stepGuests(-1)} aria-label="פחות אורחים">−</button>
                  <input className={styles.stepVal} value={values.guests} onChange={set('guests')} inputMode="numeric" placeholder="6" aria-label="מספר אורחים" />
                  <button type="button" className={styles.stepBtn} onClick={() => stepGuests(1)} aria-label="עוד אורחים">+</button>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>תאריך</label>
                <div className={styles.inputWrap}>
                  <input
                    type="date"
                    className={`${styles.input} ${styles.dateInput} ${values.date ? '' : styles.dateEmpty}`}
                    value={values.date}
                    onChange={set('date')}
                    min={todayISO}
                    aria-label="תאריך האירוע"
                  />
                  {!values.date && <span className={styles.datePlaceholder} aria-hidden="true">בחרו תאריך</span>}
                  <span className={styles.inputIco}><Cal /></span>
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>מיקום</label>
              <div className={styles.inputWrap}>
                <input type="text" className={styles.input} value={values.location} onChange={set('location')} placeholder="תל אביב צפון, רמת השרון, חיפה…" />
                <span className={styles.inputIco}><Pin /></span>
              </div>
            </div>
          </div>

          {/* ── 02 · הסיפור ───────────────────────────────────────────── */}
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.cardTitle}>הסיפור</span>
              <span className={styles.cardNum}>02</span>
            </div>

            <p className={styles.hint}>החלק הכי חשוב. אוהד קורא כל מילה - וזה מה שמאפשר לו להגיע מוכן, עם תפריט שמתאים בדיוק לערב שלכם.</p>

            <div className={styles.field}>
              <label className={styles.label}>סוג האירוע</label>
              <div className={styles.chipRow}>
                {occasionChips.map((v) => (
                  <button key={v} type="button" className={`${styles.chip} ${occasion.includes(v) ? styles.chipActive : ''}`} onClick={() => toggle(occasion, setOccasion)(v)}>{v}</button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>ספרו לנו עוד - מי האנשים, מה החגיגה, מה תרצו שיקרה</label>
              <textarea className={styles.textarea} rows="5" value={values.story} onChange={set('story')} placeholder="לדוגמה: אנחנו זוג, חוגגים 5 שנים יחד, מזמינים שמונה חברים קרובים. אוהבים אוכל איטלקי, אבל אנה צמחונית ולא אוכלת גלוטן. רוצים ערב איכותי שלא נשכח." />
              <div className={styles.helper}>ככל שתספרו יותר - <em>מי האורחים, מה החגיגה, מה שירגישו</em> - כך התפריט יהיה מדויק.</div>
            </div>
          </div>

          {/* ── 03 · פרטים שנותרו ─────────────────────────────────────── */}
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.cardTitle}>פרטים שנותרו</span>
              <span className={styles.cardNum}>03</span>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>תקציב לאדם</label>
              <div className={styles.chipRow}>
                {budgetChips.map((c) => {
                  const disabled = isBudgetDisabled(c)
                  const active = budget === c.min
                  return (
                    <button
                      key={c.min}
                      type="button"
                      className={`${styles.chip} ${active ? styles.chipActive : ''} ${disabled ? styles.chipDisabled : ''}`}
                      onClick={() => { if (!disabled) setBudget(c.min) }}
                    >{c.label}</button>
                  )
                })}
              </div>
              {budgetHint && <div className={styles.helper}>{budgetHint}</div>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>אלרגיות / דיאטות</label>
              <div className={styles.chipRow}>
                {dietChips.map((v) => (
                  <button key={v} type="button" className={`${styles.chip} ${diet.includes(v) ? styles.chipActive : ''}`} onClick={() => toggle(diet, setDiet)(v)}>{v}</button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>האווירה</label>
              <div className={styles.chipRow}>
                {vibeChips.map((v) => (
                  <button key={v} type="button" className={`${styles.chip} ${vibe.includes(v) ? styles.chipActive : ''}`} onClick={() => toggle(vibe, setVibe)(v)}>{v}</button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>משהו נוסף שכדאי לדעת?</label>
              <textarea className={styles.textarea} rows="2" value={values.extra} onChange={set('extra')} placeholder="ילדים שאוכלים איתנו, מטבח קטן, שכנים רגישים, הפתעה לאחד האורחים…" />
            </div>
          </div>

          {/* ── 04 · איך נחזור אליכם ───────────────────────────────────── */}
          <div className={`${styles.card} ${styles.cardFinish}`}>
            <div className={styles.cardHead}>
              <span className={styles.cardTitle}>איך נחזור אליכם</span>
              <span className={styles.cardNum}>04</span>
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label className={styles.label}>שם מלא</label>
                <input type="text" className={styles.input} value={values.name} onChange={set('name')} placeholder="דנה כהן" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>טלפון</label>
                <input type="tel" className={`${styles.input} ${styles.ltr}`} value={values.phone} onChange={set('phone')} placeholder="050-000-0000" />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>מייל</label>
              <input type="email" className={`${styles.input} ${styles.ltr}`} value={values.email} onChange={set('email')} placeholder="dana@example.com" />
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label className={styles.label}>דרך תקשורת מועדפת</label>
                <div className={`${styles.segmented} ${styles.segmentedFull}`}>
                  {channelSegs.map((v) => (
                    <button type="button" key={v} className={`${styles.seg} ${channel === v ? styles.segActive : ''}`} onClick={() => setChannel(v)}>{v === 'טלפון' ? 'שיחה' : v}</button>
                  ))}
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>שעות נוחות</label>
                <div className={`${styles.segmented} ${styles.segmentedFull}`}>
                  {hourSegs.map((v) => (
                    <button type="button" key={v} className={`${styles.seg} ${hours === v ? styles.segActive : ''}`} onClick={() => setHours(v)}>{v}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.meter}>
              <div className={styles.meterHead}>
                <span>השלמות הסיפור</span>
                <span className={styles.pct}>{pct}%</span>
              </div>
              <div className={styles.meterBar}>
                <div className={styles.meterFill} style={{ width: pct + '%' }} />
              </div>
              <div className={styles.meterNote}>{note}</div>
            </div>

            <button type="submit" className={styles.submit} disabled={submitted}>
              <Arrow />
              <span>{submitted ? 'נשלח - נחזור אליכם תוך 24 שעות' : 'שליחה לאוהד'}</span>
            </button>
            <div className={styles.fine}>ללא כרטיס אשראי · ללא התחייבות · רק אחרי שראיתם את התפריט</div>
          </div>
        </form>
      </div>
    </section>
  )
}

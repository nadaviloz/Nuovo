import { useMemo, useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import styles from './Booking.module.css'
import Reels from '../Reels/Reels.jsx'
import MenuTiers from '../MenuTiers/MenuTiers.jsx'

const CHEF_TRACK = 'אירוע שף - בבית, הגשה אישית'

function TableDesignMedia() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const reset = () => {
    const v = videoRef.current
    if (v) v.currentTime = 0
    setPlaying(false)
  }

  return (
    <div className={styles.tdMedia}>
      <video
        ref={videoRef}
        className={styles.tdVideo}
        src="/uploads/table-design-1.mp4"
        poster="/uploads/table-design-1.jpg"
        muted
        playsInline
        preload="metadata"
        onEnded={reset}
      />
      {!playing && <img className={styles.tdPoster} src="/uploads/table-design-1.jpg" alt="עיצוב שולחן יוקרתי" />}
      <button type="button" className={styles.tdPlay} onClick={toggle} aria-label={playing ? 'עצור' : 'נגן'}>
        {playing ? (
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <rect x="3" y="2.5" width="3.2" height="11" rx="1" fill="currentColor"/>
            <rect x="9.8" y="2.5" width="3.2" height="11" rx="1" fill="currentColor"/>
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor"/>
          </svg>
        )}
      </button>
    </div>
  )
}

const trackOptions = [
  '',
  'אירוע שף - בבית, הגשה אישית',
  'בופה - מינימום 20 אורחים',
  'מנות ביס - קוקטייל, מינימום 15 אורחים',
  'עוד לא יודע - תייעצו לי'
]

const trackMinima = {
  'בופה - מינימום 20 אורחים':              0,
  'אירוע שף - בבית, הגשה אישית':           500,
  'מנות ביס - קוקטייל, מינימום 15 אורחים': 700,
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
const drinkChips = ['יין מלווה (אנחנו נתאים)','קוקטיילים','יש לנו כבר משלנו','בלי אלכוהול']

const timeSegs = ['צהריים','ערב מוקדם','ערב מאוחר']
const channelSegs = ['וואטסאפ','טלפון','מייל']
const hourSegs = ['בוקר','צהריים','ערב']

const Booking = forwardRef(function Booking(_, ref) {
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
  const [drinks, setDrinks] = useState([])
  const [menuTiers, setMenuTiers] = useState({ basics: [], pastas: [], fishes: [] })
  const [tableDesign, setTableDesign] = useState(false)
  const [tableDesignConfirmed, setTableDesignConfirmed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useImperativeHandle(ref, () => ({
    setTrack(value) {
      setValues((v) => ({ ...v, track: value }))
    }
  }))

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

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
    if (drinks.length) score += 4

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
    if (tableDesignConfirmed) score += 3

    return Math.min(100, score)
  }, [values, time, channel, hours, occasion, vibe, budget, diet, drinks, tableDesignConfirmed])

  const note = pct < 25
    ? <>התחילו למלא - <em>כל פרט נוסף עוזר לדור להגיע מוכן.</em></>
    : pct < 55
    ? <><em>טוב.</em> עוד כמה פרטים על האווירה והאורחים - והתפריט יהיה הרבה יותר מדויק.</>
    : pct < 80
    ? <><em>מצוין.</em> כבר יש לדור תמונה ברורה. עוד שני דברים והתפריט יהיה תפור עליכם.</>
    : <><em>מושלם.</em> דור יחזור אליכם עם הצעת תפריט אמיתית - לא שאלות.</>

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const budgetHint = budgetChips.some(isBudgetDisabled)
    ? <><em>מסלול זה</em> מתחיל ב־₪{floor} לאדם - סוננו אפשרויות נמוכות יותר.</>
    : null

  return (
    <section id="book" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ 05 - הזמנה</div>
            <h2 className={styles.title}>ספרו לנו<br/><em>על הערב.</em></h2>
          </div>
          <p className={styles.lede}>לפני שנחזור אליכם, אנחנו רוצים להבין את האירוע - לא טופס בירוקרטי, סיפור קצר. ככל שתשתפו יותר, השף יוכל להציע תפריט מדויק יותר ולחזור עם הצעה אמיתית, לא רק שאלות.</p>
        </div>

        <div className={styles.grid}>
          <div>
            <div className={styles.headline}>פחות שיחות.<br/><em>יותר תכנון.</em></div>
            <p className={styles.sideText}>השף לא יתקשר לשאול שאלות. הוא יחזור אליכם עם הצעת תפריט מותאמת - אחרי שקרא את מה שכתבתם.</p>
            <ul className={styles.sideList}>
              <li><span className={styles.marker}>i</span><span>הטופס נשלח ישירות לדור - לא מוקד שיחות.</span></li>
              <li><span className={styles.marker}>ii</span><span>נחזור תוך 24 שעות, במייל או בוואטסאפ - איך שתבחרו.</span></li>
              <li><span className={styles.marker}>iii</span><span>אין כרטיס אשראי. סוגרים אחרי שראיתם את התפריט.</span></li>
            </ul>
            <Reels />
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            {/* Section 01 - האירוע */}
            <div className={styles.formSection}>
              <div className={styles.formSectionHead}>
                <div className={styles.formSectionNum}>01</div>
                <div className={styles.formSectionTitle}>האירוע</div>
              </div>
              <div className={styles.field}>
                <label>מסלול</label>
                <select value={values.track} onChange={set('track')}>
                  <option value="">- בחרו מסלול -</option>
                  {trackOptions.slice(1).map(o => <option key={o}>{o}</option>)}
                </select>
                {values.track === CHEF_TRACK && (
                  <MenuTiers value={menuTiers} onChange={setMenuTiers} guests={values.guests} />
                )}
              </div>
              <div className={styles.field}>
                <label>שעה של היום</label>
                <div className={styles.segmented}>
                  {timeSegs.map((v) => (
                    <div key={v} className={`${styles.seg} ${time === v ? styles.segActive : ''}`} onClick={() => setTime(v)}>{v}</div>
                  ))}
                </div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>תאריך</label>
                  <input type="text" value={values.date} onChange={set('date')} placeholder="שבת, 13 ביוני" />
                </div>
                <div className={styles.field}>
                  <label>אורחים</label>
                  <input type="text" value={values.guests} onChange={set('guests')} placeholder="6" />
                </div>
              </div>
              <div className={styles.field}>
                <label>שכונה / עיר</label>
                <input type="text" value={values.location} onChange={set('location')} placeholder="תל אביב צפון, רמת השרון, חיפה…" />
              </div>
            </div>

            {/* שדרוג - עיצוב שולחן ואווירה יוקרתית (תוספת לכל מסלול) */}
            <div className={styles.formSection}>
              {!tableDesign ? (
                <button type="button" className={styles.upgrade} onClick={() => setTableDesign(true)}>
                  <span className={styles.upgradeThumb}>
                    <img src="/uploads/table-design-1.jpg" alt="עיצוב שולחן יוקרתי" />
                  </span>
                  <span className={styles.upgradeText}>
                    <span className={styles.upgradeEyebrow}>שדרוג בתשלום · לכל מסלול</span>
                    <span className={styles.upgradeTitle}>עיצוב שולחן ואווירה יוקרתית</span>
                    <span className={styles.upgradeSub}>כלים מהודרים · עיצוב שולחן · נרות ופרחים · הקמה ופירוק</span>
                  </span>
                  <span className={styles.upgradePlus}>+</span>
                </button>
              ) : (
                <div className={`${styles.upgradeOpen} ${tableDesignConfirmed ? styles.upgradeOpenOn : ''}`}>
                  <button type="button" className={styles.upgradeRemove} onClick={() => { setTableDesign(false); setTableDesignConfirmed(false) }} aria-label="הסר שדרוג">×</button>
                  <div className={styles.upgradeOpenHead}>
                    <div className={styles.upgradeEyebrow}>{tableDesignConfirmed ? 'נוסף לאירוע · בתשלום' : 'שדרוג בתשלום · לכל מסלול'}</div>
                    <div className={styles.upgradeOpenTitle}>עיצוב שולחן ואווירה יוקרתית</div>
                  </div>
                  <TableDesignMedia />
                  <p className={styles.upgradeDesc}>
                    הופכים את השולחן לחלק מהחוויה - <em>כלים מהודרים, מפות פשתן, פרחים טריים ונרות.</em> אנחנו מביאים, מקימים ומפרקים. לכם נשארת רק האווירה.
                  </p>
                  <ul className={styles.upgradeList}>
                    <li>כלים וסכו"ם מהודרים</li>
                    <li>עיצוב שולחן, מפות וראנר</li>
                    <li>סידורי פרחים ונרות</li>
                    <li>הקמה מלאה ופירוק אחרי</li>
                  </ul>
                  <div className={styles.upgradeNote}>תוספת בתשלום - <em>נתאים הצעה לפי היקף האירוע ומספר האורחים.</em></div>
                  {tableDesignConfirmed ? (
                    <button type="button" className={styles.upgradeConfirmed} onClick={() => setTableDesignConfirmed(false)}>
                      <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4 10-10"/></svg>
                      נוסף לאירוע · לחצו לעריכה
                    </button>
                  ) : (
                    <button type="button" className={styles.upgradeConfirm} onClick={() => setTableDesignConfirmed(true)}>
                      אישור - הוסיפו לאירוע
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Section 02 - הסיפור */}
            <div className={styles.formSection}>
              <div className={styles.formSectionHead}>
                <div className={styles.formSectionNum}>02</div>
                <div className={styles.formSectionTitle}>הסיפור</div>
              </div>
              <p className={styles.formSectionHint}>החלק הכי חשוב. אוהד (השף) קורא כל מילה - וזה מה שמאפשר לו להגיע מוכן, עם תפריט שמתאים בדיוק לערב שלכם, בלי שיחות מקדימות.</p>

              <div className={styles.field}>
                <label>סוג האירוע</label>
                <div className={styles.chipRow}>
                  {occasionChips.map((v) => (
                    <button key={v} type="button" className={`${styles.chip} ${occasion.includes(v) ? styles.chipActive : ''}`} onClick={() => toggle(occasion, setOccasion)(v)}>{v}</button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>האווירה שאתם מדמיינים</label>
                <div className={styles.chipRow}>
                  {vibeChips.map((v) => (
                    <button key={v} type="button" className={`${styles.chip} ${vibe.includes(v) ? styles.chipActive : ''}`} onClick={() => toggle(vibe, setVibe)(v)}>{v}</button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>ספרו לנו על הערב - מי האנשים, מה החגיגה, מה תרצו שיקרה</label>
                <textarea rows="6" value={values.story} onChange={set('story')} placeholder="לדוגמה: אנחנו זוג, חוגגים 5 שנים יחד, מזמינים שמונה חברים הכי קרובים. אנחנו אוהבים אוכל איטלקי, אבל אנה הצמחונית והיא לא אוכלת גלוטן. רוצים שזה יהיה ערב שלא נשכח - לאו דווקא ארוך, אבל איכותי." />
                <div className={styles.helper}>ככל שתספרו יותר - <em>הכי חשוב מה האירוע, מי האורחים, מה אתם רוצים שירגישו</em> - כך התפריט שנחזור איתו יהיה מדויק.</div>
              </div>

              <div className={styles.field}>
                <label>טווח תקציב לאדם</label>
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
            </div>

            {/* Section 03 - פרטים שעוזרים */}
            <div className={styles.formSection}>
              <div className={styles.formSectionHead}>
                <div className={styles.formSectionNum}>03</div>
                <div className={styles.formSectionTitle}>פרטים שעוזרים</div>
              </div>
              <p className={styles.formSectionHint}>לא חובה, אבל חוסך לכם שיחה אחרי.</p>

              <div className={styles.field}>
                <label>אלרגיות / דיאטות בקבוצה</label>
                <div className={styles.chipRow}>
                  {dietChips.map((v) => (
                    <button key={v} type="button" className={`${styles.chip} ${diet.includes(v) ? styles.chipActive : ''}`} onClick={() => toggle(diet, setDiet)(v)}>{v}</button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>שתייה</label>
                <div className={styles.chipRow}>
                  {drinkChips.map((v) => (
                    <button key={v} type="button" className={`${styles.chip} ${drinks.includes(v) ? styles.chipActive : ''}`} onClick={() => toggle(drinks, setDrinks)(v)}>{v}</button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>משהו עוד שכדאי לדור לדעת?</label>
                <textarea rows="3" value={values.extra} onChange={set('extra')} placeholder="ילדים שאוכלים איתנו, מטבח קטן, שכנים רגישים, הפתעה לאחד האורחים…" style={{minHeight:90}} />
              </div>
            </div>

            {/* Section 04 - איך נחזור */}
            <div className={styles.formSection}>
              <div className={styles.formSectionHead}>
                <div className={styles.formSectionNum}>04</div>
                <div className={styles.formSectionTitle}>איך נחזור אליכם</div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>שם מלא</label>
                  <input type="text" value={values.name} onChange={set('name')} placeholder="דנה כהן" />
                </div>
                <div className={styles.field}>
                  <label>טלפון</label>
                  <input type="tel" className={styles.phoneInput} value={values.phone} onChange={set('phone')} placeholder="050-000-0000" />
                </div>
              </div>

              <div className={styles.field}>
                <label>מייל</label>
                <input type="email" className={styles.phoneInput} value={values.email} onChange={set('email')} placeholder="dana@example.com" />
              </div>

              <div className={styles.field}>
                <label>איך הכי נוח לכם שנחזור</label>
                <div className={styles.segmented}>
                  {channelSegs.map((v) => (
                    <div key={v} className={`${styles.seg} ${channel === v ? styles.segActive : ''}`} onClick={() => setChannel(v)}>{v === 'טלפון' ? 'שיחת טלפון' : v}</div>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>שעות נוחות</label>
                <div className={styles.segmented}>
                  {hourSegs.map((v) => (
                    <div key={v} className={`${styles.seg} ${hours === v ? styles.segActive : ''}`} onClick={() => setHours(v)}>{v}</div>
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
              {submitted ? 'נשלח - דור יחזור אליכם תוך 24 שעות' : 'שליחה לדור · חוזרים תוך 24 שעות'}
            </button>
            <div className={styles.fine}>ללא כרטיס אשראי · ללא התחייבות · רק אחרי שראיתם את התפריט</div>
          </form>
        </div>
      </div>
    </section>
  )
})

export default Booking

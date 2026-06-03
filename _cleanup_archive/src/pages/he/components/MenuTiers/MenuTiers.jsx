import { useState } from 'react'
import styles from './MenuTiers.module.css'

const basicPool = [
  { id: 'b1', name: 'ברוסקטה עגבניות שרי וריחן',     img: null },
  { id: 'b2', name: 'בורטה עם חצילים צרובים',        img: null },
  { id: 'b3', name: 'קרפצ\'יו דג ים בלימון',         img: null },
  { id: 'b4', name: 'סלט מעורב עם פיניוקי וחמניות',  img: null },
  { id: 'b5', name: 'פיצה מרגריטה',                   img: null },
  { id: 'b6', name: 'פיצה דיאבולה',                   img: null },
  { id: 'b7', name: 'פיצה ארבע גבינות',               img: null },
  { id: 'b8', name: 'פיצה פטריות וטרטופו',            img: null }
]

const pastaPool = [
  { id: 'p1', name: 'פפרדלה ברגו שור',                  img: null },
  { id: 'p2', name: 'ראביולי גבינת עזים ואגוזים',       img: null },
  { id: 'p3', name: 'ניוקי גורגונזולה ואגוז מלך',       img: null },
  { id: 'p4', name: 'ספגטי קאצ\'ו אה פפה',              img: null },
  { id: 'p5', name: 'לזניה ביתית',                       img: null },
  { id: 'p6', name: 'פאקרי בקרם דלעת וריקוטה',          img: '/uploads/menu/paccheri-ricotta.jpg' },
  { id: 'p7', name: 'אורקייטה ברוקולי ושקדים',           img: null },
  { id: 'p8', name: 'טליאטלה תרד ומסקרפונה',             img: null }
]

const fishPool = [
  { id: 'f1', name: 'ברנזינו צלוי בעשבי תיבול',         img: null },
  { id: 'f2', name: 'דניס בתנור עם לימון מלוח',         img: null },
  { id: 'f3', name: 'לבן ים צרוב עם פירות ים',          img: null },
  { id: 'f4', name: 'סלמון בקרם מיסו ויוזו',             img: null },
  { id: 'f5', name: 'פילה אמנון על הפלאנצ\'ה',           img: null },
  { id: 'f6', name: 'קרפצ\'יו טונה בלימון מלוח',         img: null }
]

const PASTA_PRICE_PER_GUEST = 30
const FISH_PRICE_PER_GUEST = 50

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4 10-10"/>
    </svg>
  )
}

const namesOf = (pool, ids) => ids.map(id => pool.find(m => m.id === id)?.name).filter(Boolean)

function ConfirmedSummary({ title, names, priceLine, dark, onEdit, onRemove }) {
  return (
    <div className={`${styles.summary} ${dark ? styles.summaryDark : ''}`}>
      <div className={styles.summaryHead}>
        <div className={styles.summaryTitle}>
          <span className={styles.summaryCheck}><CheckIcon /></span>
          {title} · נוסף
        </div>
        <div className={styles.summaryActions}>
          <button type="button" className={styles.summaryEdit} onClick={onEdit}>ערוך</button>
          <button type="button" className={styles.summaryRemove} onClick={onRemove}>הסר</button>
        </div>
      </div>
      <div className={styles.summaryNames}>{names.join(' · ')}</div>
      {priceLine && <div className={styles.summaryPrice}>{priceLine}</div>}
    </div>
  )
}

function MealCard({ meal, selected, disabled, onToggle }) {
  const initial = meal.name.trim().charAt(0)
  return (
    <button
      type="button"
      className={`${styles.card} ${selected ? styles.cardOn : ''} ${disabled ? styles.cardDim : ''}`}
      onClick={() => onToggle(meal.id)}
      aria-pressed={selected}
    >
      <div className={styles.thumb}>
        {meal.img ? (
          <img src={meal.img} alt={meal.name} />
        ) : (
          <div className={styles.placeholder}>
            <span>{initial}</span>
          </div>
        )}
        {selected && (
          <div className={styles.check} aria-hidden>
            <svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4 10-10"/></svg>
          </div>
        )}
      </div>
      <div className={styles.cardName}>{meal.name}</div>
    </button>
  )
}

function TierSection({ title, badge, badgeKind, hint, pool, selected, onChange, limit = 3, priceLine }) {
  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter(x => x !== id))
    } else if (selected.length < limit) {
      onChange([...selected, id])
    }
  }
  const atLimit = selected.length >= limit

  return (
    <div className={`${styles.tier} ${badgeKind === 'fish' ? styles.tierFish : ''}`}>
      <div className={styles.tierHead}>
        <div className={`${styles.tierBadge} ${styles['badge_' + badgeKind]}`}>{badge}</div>
        <div className={styles.tierName}>{title}</div>
        <div className={styles.count}>{selected.length}/{limit}</div>
      </div>
      {hint && <div className={styles.tierHint}>{hint}</div>}
      <div className={styles.grid}>
        {pool.map(m => (
          <MealCard
            key={m.id}
            meal={m}
            selected={selected.includes(m.id)}
            disabled={atLimit && !selected.includes(m.id)}
            onToggle={toggle}
          />
        ))}
      </div>
      {priceLine && <div className={styles.priceLine}>{priceLine}</div>}
    </div>
  )
}

export default function MenuTiers({ value, onChange, guests }) {
  const [pastaOpen, setPastaOpen] = useState((value?.pastas?.length ?? 0) > 0)
  const [fishOpen, setFishOpen] = useState((value?.fishes?.length ?? 0) > 0)
  const [pastaConfirmed, setPastaConfirmed] = useState(false)
  const [fishConfirmed, setFishConfirmed] = useState(false)
  const [pastaHadConfirm, setPastaHadConfirm] = useState(false)
  const [fishHadConfirm, setFishHadConfirm] = useState(false)

  const basics = value?.basics || []
  const pastas = value?.pastas || []
  const fishes = value?.fishes || []

  const setBasics = (next) => onChange({ ...value, basics: next, pastas, fishes })
  const setPastas = (next) => { setPastaConfirmed(false); onChange({ ...value, basics, pastas: next, fishes }) }
  const setFishes = (next) => { setFishConfirmed(false); onChange({ ...value, basics, pastas, fishes: next }) }

  const guestsNum = parseInt(String(guests || '').replace(/[^\d]/g, ''), 10)
  const hasGuests = Number.isFinite(guestsNum) && guestsNum > 0

  const pastaLine = hasGuests && pastas.length > 0
    ? <><em>{PASTA_PRICE_PER_GUEST} ₪</em> × {guestsNum} אורחים = <em>+{PASTA_PRICE_PER_GUEST * guestsNum} ₪</em></>
    : <><em>+{PASTA_PRICE_PER_GUEST} ₪</em> לאורח · נחשב לפי מספר האורחים שתמלאו למעלה</>

  const fishLine = hasGuests && fishes.length > 0
    ? <><em>{FISH_PRICE_PER_GUEST} ₪</em> × {guestsNum} אורחים = <em>+{FISH_PRICE_PER_GUEST * guestsNum} ₪</em></>
    : <><em>+{FISH_PRICE_PER_GUEST} ₪</em> לאורח · נחשב לפי מספר האורחים שתמלאו למעלה</>

  const totalPerGuest =
    (pastas.length > 0 ? PASTA_PRICE_PER_GUEST : 0) +
    (fishes.length > 0 ? FISH_PRICE_PER_GUEST : 0)

  const openPasta = () => setPastaOpen(true)
  const removePasta = () => { setPastaOpen(false); setPastaConfirmed(false); setPastaHadConfirm(false); setPastas([]) }
  const confirmPasta = () => { setPastaConfirmed(true); setPastaHadConfirm(true) }
  const cancelPasta = () => { if (pastaHadConfirm) setPastaConfirmed(true); else removePasta() }

  const openFish = () => setFishOpen(true)
  const removeFish = () => { setFishOpen(false); setFishConfirmed(false); setFishHadConfirm(false); setFishes([]) }
  const confirmFish = () => { setFishConfirmed(true); setFishHadConfirm(true) }
  const cancelFish = () => { if (fishHadConfirm) setFishConfirmed(true); else removeFish() }

  return (
    <div className={styles.tiers}>
      <div className={styles.intro}>
        <em>בחרו</em> את התפריט. שלוש מנות בכל שכבה. הבסיס כלול - פסטה ודגים בתוספת.
      </div>

      <TierSection
        title="שכבה ראשונה - בסיס"
        badge="כלול"
        badgeKind="base"
        hint="פתיחות ופיצות מהטאבון - בוחרים 3"
        pool={basicPool}
        selected={basics}
        onChange={setBasics}
      />

      {!pastaOpen ? (
        <button type="button" className={styles.addBtn} onClick={openPasta}>
          <span className={styles.addBtnLabel}>להוסיף שכבת פסטות</span>
          <span className={styles.addBtnSub}>שלוש פסטות · +{PASTA_PRICE_PER_GUEST} ₪ לאורח</span>
          <span className={styles.addBtnPlus}>+</span>
        </button>
      ) : pastaConfirmed ? (
        <ConfirmedSummary
          title="שכבת פסטות"
          names={namesOf(pastaPool, pastas)}
          priceLine={pastaLine}
          onEdit={() => setPastaConfirmed(false)}
          onRemove={removePasta}
        />
      ) : (
        <div className={styles.tierWrap}>
          <button type="button" className={styles.remove} onClick={cancelPasta} aria-label="ביטול">×</button>
          <TierSection
            title="שכבה שנייה - פסטות"
            badge={`+${PASTA_PRICE_PER_GUEST} ₪ לאורח`}
            badgeKind="ext"
            hint="כל הפסטות שלנו נילושות בבית - בוחרים 3"
            pool={pastaPool}
            selected={pastas}
            onChange={setPastas}
            priceLine={pastaLine}
          />
          <button type="button" className={styles.confirm} disabled={pastas.length === 0} onClick={confirmPasta}>
            {pastas.length === 0 ? 'בחרו פסטות כדי לאשר' : 'אישור - הוסיפו את שכבת הפסטות'}
          </button>
        </div>
      )}

      {!fishOpen ? (
        <button type="button" className={`${styles.addBtn} ${styles.addBtnDark}`} onClick={openFish}>
          <span className={styles.addBtnLabel}>לשדרג לחוויית דגים</span>
          <span className={styles.addBtnSub}>שלוש מנות דגים · +{FISH_PRICE_PER_GUEST} ₪ לאורח · אקסקלוסיבי</span>
          <span className={styles.addBtnPlus}>+</span>
        </button>
      ) : fishConfirmed ? (
        <ConfirmedSummary
          title="שכבת דגים"
          names={namesOf(fishPool, fishes)}
          priceLine={fishLine}
          dark
          onEdit={() => setFishConfirmed(false)}
          onRemove={removeFish}
        />
      ) : (
        <div className={styles.tierWrap}>
          <button type="button" className={`${styles.remove} ${styles.removeDark}`} onClick={cancelFish} aria-label="ביטול">×</button>
          <TierSection
            title="שכבה שלישית - דגים"
            badge={`+${FISH_PRICE_PER_GUEST} ₪ לאורח`}
            badgeKind="fish"
            hint="מהשוק של היום - בוחרים 3"
            pool={fishPool}
            selected={fishes}
            onChange={setFishes}
            priceLine={fishLine}
          />
          <button type="button" className={styles.confirm} disabled={fishes.length === 0} onClick={confirmFish}>
            {fishes.length === 0 ? 'בחרו דגים כדי לאשר' : 'אישור - הוסיפו את שכבת הדגים'}
          </button>
        </div>
      )}

      {totalPerGuest > 0 && (
        <div className={styles.totals}>
          <div className={styles.totalsLabel}>סך תוספת לאורח</div>
          <div className={styles.totalsValue}>
            +{totalPerGuest} ₪
            {hasGuests && <span className={styles.totalsAside}> · ×{guestsNum} = <em>+{totalPerGuest * guestsNum} ₪</em></span>}
          </div>
        </div>
      )}
    </div>
  )
}

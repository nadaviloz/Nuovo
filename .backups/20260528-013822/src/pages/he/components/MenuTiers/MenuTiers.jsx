import { useState } from 'react'
import styles from './MenuTiers.module.css'

const openings = [
  'ברוסקטה עגבניות שרי וריחן',
  'בורטה עם חצילים צרובים',
  'קרפצ\'יו דג ים בלימון',
  'סלט מעורב עם פיניוקי וגרעיני חמניות'
]

const pizzas = [
  'מרגריטה — עגבנייה, מוצרלה, ריחן',
  'דיאבולה — סלמי חריף',
  'ארבע גבינות',
  'פטריות וטרטופו'
]

const pastas = [
  'פפרדלה ברגו שור',
  'ראביולי גבינת עזים ואגוזים',
  'ניוקי גורגונזולה ואגוז מלך',
  'ספגטי קאצ\'ו אה פפה',
  'לזניה ביתית'
]

const fishes = [
  'ברנזינו צלוי בעשבי תיבול',
  'דניס בתנור עם לימון מלוח',
  'לבן ים צרוב עם פירות ים'
]

export default function MenuTiers({ value, onChange }) {
  const [pastaOpen, setPastaOpen] = useState(value?.pastas?.length > 0)
  const [fishOpen, setFishOpen] = useState(value?.fish === true)

  const selectedPastas = value?.pastas || []
  const fishOn = value?.fish === true

  const togglePasta = (name) => {
    let next = selectedPastas.includes(name)
      ? selectedPastas.filter(n => n !== name)
      : [...selectedPastas, name]
    if (next.length > 2) next = next.slice(-2)
    onChange({ ...value, pastas: next, fish: fishOn })
  }

  const openPasta = () => {
    setPastaOpen(true)
    onChange({ ...value, pastas: selectedPastas, fish: fishOn })
  }

  const closePasta = () => {
    setPastaOpen(false)
    onChange({ ...value, pastas: [], fish: fishOn })
  }

  const openFish = () => {
    setFishOpen(true)
    onChange({ ...value, pastas: selectedPastas, fish: true })
  }

  const closeFish = () => {
    setFishOpen(false)
    onChange({ ...value, pastas: selectedPastas, fish: false })
  }

  return (
    <div className={styles.tiers}>
      <div className={styles.intro}>
        <em>בחרו</em> את היקף התפריט. הבסיס תמיד כלול — אפשר להוסיף שכבות לפי תיאבון ותקציב.
      </div>

      {/* Tier 1 — base */}
      <div className={`${styles.tier} ${styles.tierBase}`}>
        <div className={styles.tierHead}>
          <div className={styles.tierBadge}>כלול</div>
          <div className={styles.tierName}>שכבה ראשונה — פתיחות ופיצות</div>
        </div>
        <div className={styles.cols}>
          <div className={styles.col}>
            <div className={styles.colTitle}>מנות פתיחה</div>
            <ul className={styles.list}>
              {openings.map(o => <li key={o}>{o}</li>)}
            </ul>
          </div>
          <div className={styles.col}>
            <div className={styles.colTitle}>פיצות מהטאבון</div>
            <ul className={styles.list}>
              {pizzas.map(p => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Tier 2 — pasta */}
      {!pastaOpen ? (
        <button type="button" className={styles.addBtn} onClick={openPasta}>
          <span className={styles.addBtnLabel}>להוסיף שכבת פסטות</span>
          <span className={styles.addBtnSub}>בוחרים שתי מנות · תוספת בתשלום</span>
          <span className={styles.addBtnPlus}>+</span>
        </button>
      ) : (
        <div className={`${styles.tier} ${styles.tierExt}`}>
          <div className={styles.tierHead}>
            <div className={styles.tierBadge}>תוספת</div>
            <div className={styles.tierName}>שכבה שנייה — פסטות (בוחרים 2)</div>
            <button type="button" className={styles.remove} onClick={closePasta} aria-label="הסר שכבה">×</button>
          </div>
          <div className={styles.chipRow}>
            {pastas.map(p => {
              const on = selectedPastas.includes(p)
              const atLimit = !on && selectedPastas.length >= 2
              return (
                <button
                  key={p}
                  type="button"
                  className={`${styles.chip} ${on ? styles.chipActive : ''} ${atLimit ? styles.chipDim : ''}`}
                  onClick={() => togglePasta(p)}
                >
                  {p}
                </button>
              )
            })}
          </div>
          <div className={styles.helper}>
            נבחרו {selectedPastas.length}/2
          </div>
        </div>
      )}

      {/* Tier 3 — fish */}
      {!fishOpen ? (
        <button type="button" className={`${styles.addBtn} ${styles.addBtnDark}`} onClick={openFish}>
          <span className={styles.addBtnLabel}>לשדרג לחוויית דגים</span>
          <span className={styles.addBtnSub}>שלוש מנות דגים · אקסקלוסיבי</span>
          <span className={styles.addBtnPlus}>+</span>
        </button>
      ) : (
        <div className={`${styles.tier} ${styles.tierFish}`}>
          <div className={styles.tierHead}>
            <div className={styles.tierBadge}>אקסקלוסיבי</div>
            <div className={styles.tierName}>שכבה שלישית — שלוש מנות דגים</div>
            <button type="button" className={styles.remove} onClick={closeFish} aria-label="הסר שכבה">×</button>
          </div>
          <ul className={styles.list}>
            {fishes.map(f => <li key={f}>{f}</li>)}
          </ul>
          <div className={styles.helper}><em>החוויה הכי מלאה.</em> תוספת לאדם — נסגור איתכם בשיחת חזרה.</div>
        </div>
      )}
    </div>
  )
}

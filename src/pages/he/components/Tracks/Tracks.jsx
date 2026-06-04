import styles from './Tracks.module.css'

// Ambient aura - write the cursor's card-local position into CSS vars so the
// card's radial glow tracks the pointer. No state, no re-render; the CSS
// (gated to fine pointers + no-reduced-motion) decides whether it shows.
function onCardMove(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px')
  el.style.setProperty('--my', (e.clientY - r.top) + 'px')
}

const packages = [
  {
    num: '01',
    name: 'Classic Menu',
    min: 'מינימום 35 סועדים',
    desc: "תפריט בופה עשיר עם דגש על מנות אירוח קלילות הכולל פוקצ'ות ולחמים, מנות ראשונות, סלטים טריים, ומנות מהטאבון.",
    price: '170'
  },
  {
    num: '02',
    name: 'Farina Menu',
    min: 'מינימום 30 סועדים',
    desc: "תפריט בופה עשיר המשלב מנות פסטות בעבודת יד, פוקצ'ות, מנות ראשונות, סלטים טריים ומנות מהטאבון.",
    price: '190'
  },
  {
    num: '03',
    name: 'Premium Menu',
    min: 'מינימום 25 סועדים',
    desc: "תפריט בופה עשיר המשלב מנות דגים יחד עם מגוון מנות פסטות בעבודת יד, פוקצ'ות, מנות ראשונות, סלטים טריים ומנות טאבון.",
    price: '230'
  },
  {
    num: '04',
    name: 'Finger Food',
    min: 'החל מ-30 ועד 50 סועדים',
    desc: 'תפריט עם דגש על מנות פינגר פוד וטאפסים המאפשרות לטעום מגוון רחב של מנות מפוצצות בטעמים.',
    price: '190'
  },
  {
    num: '05',
    name: 'All Fish Menu',
    min: 'מינימום 20 סועדים',
    desc: 'תפריט שכולו ארוחת דגים, עם דגים מכל הסוגים: נאים, מבושלים, מהטאבון, מטוגנים, ראשונות דגים ועוד מגוון של מנות דגים.',
    price: '300'
  }
]

export default function Tracks() {
  return (
    <section id="tracks" className={styles.section}>
      {/* Decorative plates bleeding off opposite edges (tomato left, fish-salad bottom-right). */}
      <img
        src="/assets/tomato.jpg"
        alt=""
        aria-hidden="true"
        className={`${styles.peek} ${styles.peekLeft}`}
        data-parallax
        loading="lazy"
      />
      <img
        src="/assets/fish-salad.jpg"
        alt=""
        aria-hidden="true"
        className={`${styles.peek} ${styles.peekRight}`}
        data-parallax
        loading="lazy"
      />

      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ שלב 1 · מסלולים</div>
            <h2 className={styles.title}>חמישה מסלולים<br/><em>שף אחד</em></h2>
          </div>
          <p className={styles.lede}>חמש דרכים שונות לארח. בוחרים את הסגנון, ואנחנו בונים את התפריט מסביב לאירוע, השוק והאורחים. אפשר להוסיף מנות, להחליף, להתאים - נחזור איתכם על הכול.</p>
        </div>
      </div>

      <div className={styles.grid}>
          {packages.map((p, i) => (
            <article
              key={p.num}
              className={styles.track}
              style={{ '--i': i }}
              onMouseMove={onCardMove}
            >
              <header className={styles.tHead}>
                <div className={styles.tNum}>{p.num}</div>
                <div className={styles.tName}>{p.name}</div>
              </header>

              <p className={styles.tDesc}>{p.desc}</p>

              <div className={styles.tFoot}>
                <div className={styles.tMeta}>
                  <span className={styles.tMin}>{p.min}</span>
                  <div className={styles.tPriceWrap}>
                    <span className={styles.tPrice}>{p.price}<span className={styles.tCurrency}>₪</span></span>
                    <span className={styles.tPriceSuffix}>לסועד</span>
                  </div>
                </div>
                <a href="#book" className={styles.cta}>לתיאום אירוע</a>
              </div>
            </article>
          ))}
      </div>
    </section>
  )
}

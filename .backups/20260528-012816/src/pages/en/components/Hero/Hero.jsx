import styles from './Hero.module.css'

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.wrap}>
        <div className={styles.heroGrid}>
          <div>
            <div className={styles.eyebrow}>Private Chef · At Home</div>
            <h1 className={styles.headline}>Your kitchen<br/>is the <em>destination.</em></h1>
            <p className={styles.lede}>A chef. A menu shaped around your table. An evening you host without lifting a pan. We bring the restaurant; you keep the keys.</p>
            <div className={styles.ctas}>
              <a href="#book" className={styles.btnPrimary}>
                Reserve an evening
                <span className={styles.arrow}>→</span>
              </a>
              <a href="#how" className={styles.btnText}>How it works</a>
            </div>
          </div>
          <div>
            <div className={styles.visual}>
              <div className={styles.visualTag}>/hero — chef plating at client's island, warm light, 4:5</div>
            </div>
          </div>
        </div>
        <div className={styles.meta}>
          <div><b>14</b>Chefs in your neighborhood</div>
          <div><b>2,400+</b>Evenings hosted at home</div>
          <div><b>4.96</b>Average guest rating</div>
          <div><b>0</b>Dishes left for you to wash</div>
        </div>
      </div>
    </header>
  )
}

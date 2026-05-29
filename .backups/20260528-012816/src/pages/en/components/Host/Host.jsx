import styles from './Host.module.css'

export default function Host() {
  return (
    <section className={styles.host}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ 02 — The host</div>
            <h2 className={styles.title}>You sit down<br/>for your own party.</h2>
          </div>
          <p className={styles.lede}>Most "experiences" make the host run the show. Hearth flips it — the chef is the staff, the kitchen is the stage, and you're a guest at your own table.</p>
        </div>

        <div className={styles.layout}>
          <div>
            <div className={styles.quote}>
              "I haven't sat down at my <span className={styles.clay}>own</span> dinner in eleven years.<br/>Last Saturday I did. Twice."
            </div>
            <div className={styles.byline}>
              <span className={styles.bylineDash}></span>
              <span>Maya R. · Hosted six, Brooklyn</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTag}>/host — wide shot, dining room, candles lit, 4:5</div>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNum}>0&nbsp;hrs</div>
            <div className={styles.statLabel}>Time you spend prepping, plating, or apologizing for the kitchen.</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>90&nbsp;min</div>
            <div className={styles.statLabel}>From chef's first knock to first course on the table.</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>1&nbsp;mile</div>
            <div className={styles.statLabel}>Average distance from your chef. Local hands, local markets.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

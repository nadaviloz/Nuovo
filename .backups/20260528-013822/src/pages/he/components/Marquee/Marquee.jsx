import styles from './Marquee.module.css'

export default function Marquee() {
  const Phrase = () => (
    <>
      מבושל כאן. נאהב כאן.<span className={styles.dot}></span>
      שולחן לאנשים שלך.<span className={styles.dot}></span>
      מגיעים. מארחים. נהנים.<span className={styles.dot}></span>
    </>
  )
  return (
    <section className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        <span className={styles.firstSpan}><Phrase /><Phrase /></span>
        <span><Phrase /><Phrase /></span>
      </div>
    </section>
  )
}

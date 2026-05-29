import styles from './Marquee.module.css'

export default function Marquee() {
  const Phrase = () => (
    <>
      Cooked here. Loved here.<span className={styles.dot}></span>
      A table for your people.<span className={styles.dot}></span>
      Arrive. Host. Enjoy.<span className={styles.dot}></span>
    </>
  )
  return (
    <section className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        <span><Phrase /><Phrase /></span>
        <span><Phrase /><Phrase /></span>
      </div>
    </section>
  )
}

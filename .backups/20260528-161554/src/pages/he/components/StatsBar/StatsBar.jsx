import styles from './StatsBar.module.css'
import useCountUp from '../../hooks/useCountUp.js'

function Stat({ value, decimals = 0, prefix = '', children }) {
  const { ref, display } = useCountUp(value, { decimals, duration: 1800 })
  return (
    <div ref={ref}>
      <b>{prefix}{display}</b>{children}
    </div>
  )
}

export default function StatsBar() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.meta}>
          <Stat value={14}>שנה של ניסיון</Stat>
          <Stat value={2400} prefix="+">אירועים שאירחנו</Stat>
          <Stat value={4.96} decimals={2}>דירוג ממוצע מאורחים</Stat>
          <Stat value={0}>כלים שנשאר לשטוף</Stat>
        </div>
      </div>
    </section>
  )
}

import styles from './Kitchen.module.css'
import Reels from '../Reels/Reels.jsx'

export default function Kitchen() {
  return (
    <section id="kitchen" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ 05 - מהמטבח</div>
            <h2 className={styles.title}>המטבח<br/><em>של אוהד</em></h2>
          </div>
          <p className={styles.lede}>הצצה קצרה למה שיוצא מהמטבח - מהפיצה בטאבון ועד מנות השף. בחרו קטגוריה ולחצו לנגן.</p>
        </div>
        <div className={styles.reelsHost}>
          <Reels />
        </div>
      </div>
    </section>
  )
}

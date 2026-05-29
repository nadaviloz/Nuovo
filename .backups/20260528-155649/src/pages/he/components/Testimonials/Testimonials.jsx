import styles from './Testimonials.module.css'

export default function Testimonials({ onOpenVideo }) {
  return (
    <section className={`${styles.host}`}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}></div>
            <h2 className={styles.title}>המארחים<br/><em>מספרים.</em></h2>
          </div>
          <p className={styles.lede}>לחץ לנגן להשמעת הסאונד של האירוע. מה שהמארחים אמרו בעצמם, במטבח שלהם, אחרי שהאורחים הלכו.</p>
        </div>

        <div className={styles.grid}>
          <div
            className={`${styles.tile} ${styles.featured} ${styles.videoPlaceholder}`}
            onClick={() => onOpenVideo?.()}
          >
            <div className={styles.badge}>▶ video · with sound</div>
            <div className={styles.play} aria-label="הפעל וידאו"></div>
            <div className={styles.overlay}>
              <div className={styles.tName}>”הדבר הטוב ביותר זה שלא הייתי במטבח כל הערב.“</div>
              <div className={styles.tMeta}>משפחת מ. · יום הולדת, רמת גן · 14 אורחים</div>
            </div>
          </div>

          <div className={styles.side}>
            <div className={`${styles.tile} ${styles.quote}`}>
              <div>
                <div className={styles.qStars}>★★★★★</div>
                <p className={styles.qText}>”הלכתי לישון אחרי עשר ימי שההורים שלי מדברים על התה של מיכל.“</p>
              </div>
              <div className={styles.qFoot}>
                <div className={styles.qAvatar}></div>
                <div>
                  <div className={styles.qName}>דנה ו.</div>
                  <div className={styles.qMeta}>ארוחת שישי, רמת השרון</div>
                </div>
              </div>
            </div>

            <div
              className={`${styles.tile} ${styles.videoPlaceholder}`}
              onClick={() => onOpenVideo?.()}
            >
              <div className={styles.badge}>▶ video</div>
              <div className={styles.play} aria-label="הפעל וידאו"></div>
              <div className={styles.overlay}>
                <div className={styles.tName}>איטן ומיכל</div>
                <div className={styles.tMeta}>הצעת נישואין · 22 אורחים</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div
            className={`${styles.tile} ${styles.videoPlaceholder}`}
            onClick={() => onOpenVideo?.()}
          >
            <div className={styles.badge}>▶ short</div>
            <div className={styles.play} aria-label="הפעל וידאו"></div>
            <div className={styles.overlay}>
              <div className={styles.tName}>רותם ב.</div>
              <div className={styles.tMeta}>ברית מצוה · 8 אורחים</div>
            </div>
          </div>

          <div className={`${styles.tile} ${styles.quote}`}>
            <div>
              <div className={styles.qStars}>★★★★★</div>
              <p className={`${styles.qText} ${styles.qTextSm}`}>”קמה מהדברים שמשתנים את המשמעות של ”שף לאירוע“. זה אחד מהם.“</p>
            </div>
            <div className={styles.qFoot}>
              <div className={styles.qAvatar}></div>
              <div>
                <div className={styles.qName}>עמית ל.</div>
                <div className={styles.qMeta}>אירוע עסקי, הרצליה</div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.tile} ${styles.videoPlaceholder}`}
            onClick={() => onOpenVideo?.()}
          >
            <div className={styles.badge}>▶ short</div>
            <div className={styles.play} aria-label="הפעל וידאו"></div>
            <div className={styles.overlay}>
              <div className={styles.tName}>אליעור ס.</div>
              <div className={styles.tMeta}>יום הולדת 40 · לוד 80</div>
            </div>
          </div>

          <div className={`${styles.tile} ${styles.quote}`}>
            <div>
              <div className={styles.qStars}>★★★★★</div>
              <p className={`${styles.qText} ${styles.qTextSm}`}>”הזמנו את נובו לליל הולדת שלי. האורחים עדיין מדברים על המנות.“</p>
            </div>
            <div className={styles.qFoot}>
              <div className={styles.qAvatar}></div>
              <div>
                <div className={styles.qName}>מיכל א.</div>
                <div className={styles.qMeta}>יום הולדת לאשתו</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

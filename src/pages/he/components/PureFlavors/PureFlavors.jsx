import styles from './PureFlavors.module.css'

// Concept intro that sits before the menus: what a chef's table actually is.
export default function PureFlavors() {
  return (
    <section id="chef-table" className={styles.section} aria-labelledby="chef-table-title">
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ Chef Table</div>
            <h2 id="chef-table-title" className={styles.title}>אז מה זה<br /><em>שולחן השף?</em></h2>
          </div>
          <p className={styles.lede}>
            החזון שלנו לקחת את שני העולמות שאנחנו הכי אוהבים ולחבר אותם לחוויה אחת מושלמת.
          </p>
        </div>

        <div className={styles.body}>
          <figure className={styles.media}>
            <img
              src="/uploads/gallery/gallery-2.jpg"
              alt="מנת שף — דג נא בעבודת יד עם שמן זית ועשבי תיבול"
              loading="lazy"
            />
          </figure>

          <div className={styles.copy}>
            <div className={styles.label}>Pure Flavors</div>
            <p className={styles.para}>
              מנות שף מוקפדות עם המון מחשבה ויצירתיות, מחומרי גלם מעולים — והכל נעשה בעבודת יד, ממש במקום, אצלכם באירוע.
            </p>
            <p className={styles.para}>
              מגוון מנות שיתאימו לכל האורחים שלכם, כאלו שכולם יאהבו ויבקשו מהם עוד.
            </p>
            <p className={styles.para}>
              אנחנו איתכם יד ביד כדי להרכיב עבורכם את התפריט שיתאים בדיוק לכם ולאורחים שלכם.
            </p>
            <p className={styles.closing}>כי אוכל טעים זה לפני הכל.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

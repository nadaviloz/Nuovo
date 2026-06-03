import styles from './TableArt.module.css'

const steps = [
  {
    num: 'I',
    title: 'נראות וסטייל',
    body: 'אנחנו מאמינים שנראות וסטייל הם חלק בלתי נפרד מחווית אירוח מדהימה ואת זה אנחנו רוצים להעניק באירוע שלכם.',
    img: '/assets/tableart-style.jpg',
    alt: 'שולחן מעוצב במפות נשפכות עם סידורי פרחים ונרות',
    flip: false
  },
  {
    num: 'II',
    title: 'קולקציית כלי ההגשה',
    body: 'עם קולקציית כלי ההגשה שלנו מאיטליה המיוצרת בעבודת יד, עד לעיצוב עוצר הנשימה המשלב פרחים חיים והתייחסות לכל הפרטים הקטנים.',
    img: '/assets/tableart-serveware.jpg',
    alt: 'כלי הגשה יוקרתיים — קערות ומגשי כסף מעוטרים',
    flip: true
  },
  {
    num: 'III',
    title: 'הכל במטרה אחת',
    body: 'הכל במטרה אחת, לגרום לכל האורחים לדבר על האוכל ביום שאחרי',
    img: '/uploads/gallery/gallery-5.jpg',
    alt: 'סידור פרחים חיים על שולחן אירוח',
    flip: false
  }
]

const photos = [
  {
    src: '/uploads/table-design-1.jpg',
    alt: 'שולחן ארוך עם מפות לבנות, פרחים ונרות',
    layout: 'galleryHero'
  },
  {
    src: '/uploads/gallery/gallery-5.jpg',
    alt: 'סידור פרחים לבנים על שולחן מעוצב',
    layout: 'a'
  },
  {
    src: '/uploads/gallery/gallery-1.jpg',
    alt: 'בופה עם מפות draped וסידור ורדים',
    layout: 'b'
  },
  {
    src: '/uploads/gallery/gallery-8.jpg',
    alt: 'קרמיקה מעוטרת עם מנה מוגשת',
    layout: 'c'
  },
  {
    src: '/uploads/gallery/gallery-6.jpg',
    alt: 'מפה לבנה מקופלת עם הגשה על קרמיקה',
    layout: 'd'
  },
  {
    src: '/uploads/gallery/gallery-7.jpg',
    alt: 'קערת קרמיקה עם סלט טרי',
    layout: 'e'
  }
]

export default function TableArt() {
  return (
    <section id="table-art" className={styles.section} aria-labelledby="table-art-title">
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ Table Art</div>
            <h2 id="table-art-title" className={styles.title}>
              TABLE<br /><em>ART</em>
            </h2>
          </div>
          <p className={styles.lede}>
            אנחנו מאמינים שנראות וסטייל הם חלק בלתי נפרד מחווית אירוח מדהימה ואת זה אנחנו רוצים להעניק באירוע שלכם.
          </p>
        </div>

        <div className={styles.flow} aria-label="מרכיבי עיצוב השולחן">
          {steps.map((step, i) => (
            <div key={step.num} className={styles.flowItem}>
              <article className={`${styles.step} ${step.flip ? styles.stepFlip : ''}`}>
                <figure className={styles.stepMedia}>
                  <img src={step.img} alt={step.alt} loading="lazy" />
                </figure>
                <div className={styles.stepCopy}>
                  <div className={styles.stepKicker}>
                    <span className={styles.stepNum}>{step.num}</span>
                    <span className={styles.stepRule} aria-hidden="true" />
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </article>

              <img
                src="/assets/image_fcbc10.png"
                alt=""
                aria-hidden="true"
                className={`${styles.arrow} ${i === 1 ? styles.arrowFlip : ''} ${i === 2 ? styles.arrowDown : ''}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className={styles.finalStatement}>
          <p>להביא לכם את השלמות באירוח.</p>
        </div>

        <div className={styles.galleryWrap}>
          <div className={styles.galleryHead}>
            <span>Inspiration</span>
            <h3>רגעים קטנים<br /><em>של שולחן שלם</em></h3>
          </div>

          <div className={styles.masonry} aria-label="גלריית השראה לעיצוב שולחן">
            {photos.map((ph, i) => (
              <figure
                key={ph.src}
                className={`${styles.photo} ${styles[ph.layout]}`}
                style={{ '--i': i }}
              >
                <img src={ph.src} alt={ph.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import styles from './Gallery.module.css'
import useReveal from '../../hooks/useReveal.js'

const items = [
  { cls: 'tall',   src: '/uploads/gallery/gallery-1.jpg', tag: 'בופה · שולחן שף' },
  { cls: 'wide',   src: '/uploads/gallery/gallery-2.jpg', tag: 'קרפצ׳יו דג ים' },
  { cls: '',       src: '/uploads/gallery/gallery-3.jpg', tag: 'פיצה נאפולי' },
  { cls: 'square', src: '/uploads/gallery/gallery-4.jpg', tag: 'פסטה נילושה בבית' },
  { cls: 'tall',   src: '/uploads/gallery/gallery-5.jpg', tag: 'אווירת שולחן שף' },
  { cls: 'wide',   src: '/uploads/gallery/gallery-6.jpg', tag: 'טרטר על טוסט' },
  { cls: '',       src: '/uploads/gallery/gallery-7.jpg', tag: 'סלט עשבים ועגבניות' },
  { cls: 'square', src: '/uploads/gallery/gallery-8.jpg', tag: 'פריקי על לבנה' }
]

export default function Gallery() {
  const { ref: headRef, style: headStyle } = useReveal()

  const all = [...items, ...items]

  return (
    <section className={styles.section}>
      <div ref={headRef} className={styles.head} style={headStyle}>
        <h3>אירועים<br/><em>שהיו.</em></h3>
        <p>מטבחים של לקוחות, מנות לאור נר, רגעים שאנשים מסתכלים אחד על השני. מה שקורה כשהמטבח הופך לבמה.</p>
      </div>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {all.map((it, i) => (
            <div key={i} className={`${styles.item} ${it.cls ? styles[it.cls] : ''}`}>
              <img className={styles.photo} src={it.src} alt={it.tag} loading="lazy" draggable="false" />
              <span className={styles.tag}>{it.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

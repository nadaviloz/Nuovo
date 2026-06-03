import styles from './Upgrades.module.css'

/* Nuovo Upgrades — step 2 of the menu journey. Alternating editorial photo
   bands (option 2). Swap `img` paths when real photography is ready. */
const upgrades = [
  {
    id: 'pizza',
    title: 'עמדת פיצות נאפולי סטייל',
    desc: 'בר פיצות מבצק משובח עם מחמצת 15 שנים, הפיצות נאפות בטאבון במקום לעיני הסועדים ויוצאות במגוון תוספות ורטבים.',
    price: '30',
    img: '/assets/pizza-station.png'
  },
  {
    id: 'pasta',
    title: 'עמדת פסטות טריות',
    desc: 'בר פסטות טריות עבודת יד, מתבשלות ומוגשות לעיני הסועדים עם מגוון עשיר של סוגים וטעמים. ניתן לבחור עד 4 סוגים שונים של פסטות ורטבים.',
    price: '35',
    img: '/assets/pasta-station.png'
  },
  {
    id: 'fish',
    title: 'עמדת דגים נאים',
    desc: 'בר של דגים נאים על הקרח במגוון סוגים, מרקמים ורטבים. ניתן לבחור עד 4 סוגים שונים של מנות דגים.',
    price: '45',
    img: '/assets/fish-station.png'
  },
  {
    id: 'dessert',
    title: 'קינוחים',
    desc: '4 סוגי קינוחים לבחירה לשילוב טעים ומתוק לארוחה.',
    price: '20',
    img: '/uploads/gallery/gallery-1.jpg'
  }
]

export default function Upgrades() {
  return (
    <section id="upgrades" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div className={styles.num}>/ שלב 2 · Nuovo Upgrades</div>
          <h2 className={styles.title}>Nuovo <em>Upgrades</em></h2>
          <p className={styles.lede}>כאן תוכלו לבחור תוספות למסלול שלכם ולשדרג את חווית האירוח שלכם לאורחים.</p>
        </div>
      </div>

      <div className={styles.bands}>
        {upgrades.map((u, i) => (
          <article
            key={u.id}
            className={`${styles.band} ${i % 2 === 1 ? styles.bandFlip : ''}`}
            style={{ '--i': i }}
          >
            {u.accentImg && (
              <img
                src={u.accentImg}
                alt=""
                aria-hidden="true"
                className={styles.accentDish}
                loading="lazy"
              />
            )}
            <div className={styles.media}>
              <img src={u.img} alt={u.title} loading="lazy" />
            </div>
            <div className={styles.body}>
              <h3 className={styles.name}>{u.title}</h3>
              <p className={styles.desc}>{u.desc}</p>
              <div className={styles.price}>
                <span className={styles.priceLabel}>תוספת של</span>
                <span className={styles.priceValue}>{u.price}</span>
                <span className={styles.priceUnit}>{'ש"ח לסועד'}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

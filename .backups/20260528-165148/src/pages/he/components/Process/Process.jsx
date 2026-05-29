import styles from './Process.module.css'

const steps = [
  { icon: 'i',   num: ' הזמנה', title: <>תאריך,<br/>שף,<br/>אווירה.</>,           body: 'בוחרים תאריך. כותבים כמה כיסאות, אלרגיות, ואם האירוע שקט או רעשני. שתי דקות, לא יותר.' },
  { icon: 'ii',  num: ' תפריט', title: <>תפריט<br/>שלא<br/>כתבתם.</>,             body: 'השף שולח הצעת ארבע מנות מהשוק של השבוע. אישור בלחיצה, החלפה של כל מנה לפי הטעם שלכם.' },
  { icon: 'iii', num: ' בישול', title: <>הוא מבשל.<br/>אתם<br/>נהנים.</>,    body: 'השף מגיע 90 דקות לפני, עם הכל איתו. אתם מקבלים את האורחים בדלת; המטבח מסתדר לבדו.' },
  { icon: 'iv',  num: ' שקט',   title: <>מטבח<br/>נקי יותר<br/>ממה שהיה.</>,      body: 'כלים שטופים, משטחים מנוגבים, שאריות במקרר עם תיוג. מתעוררים לאותו מטבח - בלי החרדה.' }
]

export default function Process() {
  return (
    <section id="how" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ 02 - האירוע</div>
            <h2 className={styles.title}>ארבעה שלבים.<br/><em>לילה אחד בלתי נשכח.</em></h2>
          </div>
          <p className={styles.lede}>בלי שיחות טעימה, בלי טופס משעמם. בוחרים מסלול תאריך ואנחנו דואגים לכל השאר - מהבצק הראשון ועד הכוס האחרונה במקומה.</p>
        </div>
        <div className={styles.grid}>
          {steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepIcon}>{s.icon}</div>
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.stepTitle}>{s.title}</div>
              <p className={styles.stepBody}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import styles from './About.module.css'
import useReveal from '../../hooks/useReveal.js'

export default function About() {
  const portrait = useReveal()
  return (
    <section id="about" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}> מי אני</div>
            <h2 className={styles.title}>השף<br/><em>שמגיע אליכם.</em></h2>
          </div>
          <p className={styles.lede}>שנים של ניסיון במטבחים, מאות אירועים - ויחס אישי שמרגישים מהרגע הראשון.</p>
        </div>

        <div className={styles.grid}>
          <div ref={portrait.ref} className={styles.portrait} style={portrait.style}>
            <div className={styles.portraitTag}>/portrait - chef, 4:5</div>
          </div>
          <div className={styles.copy}>
            <p className={styles.lead}>”לקחתי את הארוחה הכי משעממת<br/>והפכתי אותה לניסוי טעמים.“</p>
            <p className={styles.body}>מגיל צעיר האוכל היה חלק ממני. כשנכנסתי לעולם הכושר, הייתי צריך לאכול ”נכון“ - ומשם התחיל הקסם. לקחתי את הארוחה הכי משעממת והפכתי אותה לניסוי טעמים.</p>
            <p className={styles.body}>אחרי השחרור מהצבא, מצאתי את עצמי בתוך מטבח של מסעדת שף - ומהר מאוד נמשכתי לעולם הבצקים. עבדתי סביב השעון, ובמקביל התבשל לי רעיון.</p>
            <p className={styles.body}>עזבתי הכל, טסתי לאיטליה, ובפינה קטנה בנאפולי הבנתי מי אני. שם נולד השם   - Nuovo. התחדשות באיטלקית, פתיחת דלת חדשה.</p>
            <p className={styles.body}>מאז לא הפסקתי לנסוע, ללמוד ולספוג. עברתי ממטבח למטבח, הכרתי פרודוקטים איכותיים במקור שלהם, וקיבלתי השראות קולינריות ממדינות וסגנונות שונים - כל אחת הוסיפה שכבה נוספת לשפה שלי.</p>
            <p className={styles.body}>מאז המשכתי לחקור, להעביר סדנאות והתמחויות, ולעבוד לצד שפים כמו מושיק רות.</p>
            <p className={`${styles.body} ${styles.pull}`}>כשאני מגיע לאירוע שלך - אני מביא איתי את כל הדרך הזו. כל פרט, כל טעם, כל תשוקה.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

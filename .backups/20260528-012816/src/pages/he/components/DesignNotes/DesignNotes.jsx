import { useState } from 'react'
import styles from './DesignNotes.module.css'

export default function DesignNotes() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className={styles.button} onClick={() => setOpen(o => !o)}>הערות עיצוב</button>
      {open && (
        <aside className={styles.panel}>
          <h4>שולחן — כיוון עיצובי</h4>
          <div className={styles.sub}>לוקסוס נגיש · קלאסי · שחור־לבן</div>

          <div className={styles.sub} style={{marginBottom:8}}>פלטה</div>
          <div className={styles.swatches}>
            <div className={styles.sw} style={{background:'#FAFAFA',color:'#0A0A0A',border:'1px solid #eee'}}>#FAFAFA</div>
            <div className={styles.sw} style={{background:'#EEEEEE',color:'#0A0A0A'}}>#EEEEEE</div>
            <div className={styles.sw} style={{background:'#0A0A0A',color:'#FAFAFA'}}>#0A0A0A</div>
          </div>

          <div className={styles.sub} style={{margin:'14px 0 6px'}}>טיפוגרפיה</div>
          <ul>
            <li><b>Frank Ruhl Libre</b> — כותרות בעברית</li>
            <li><b>Cormorant Garamond</b> — נטוי לטיני · המותג</li>
            <li><b>Josefin Sans</b> — תוויות, נווט, כפתורים (UPPERCASE)</li>
            <li><b>Assistant</b> — גוף הטקסט</li>
          </ul>

          <div className={styles.sub} style={{margin:'14px 0 6px'}}>סלוגנים</div>
          <ul>
            <li><b>מבושל כאן. נאהב כאן.</b> — מקומי</li>
            <li><b>שולחן לאנשים שלך.</b> — אינטימי</li>
            <li><b>מגיעים. מארחים. נהנים.</b> — קל</li>
          </ul>

          <div className={styles.sub} style={{margin:'14px 0 6px'}}>מבנה העמוד</div>
          <ul>
            <li><b>01</b> פתיחה — כותרת + CTA</li>
            <li><b>02</b> תהליך — הזמנה / תפריט / בישול / שקט</li>
            <li><b>03</b> חוויית המארח</li>
            <li><b>04</b> הזמנה — שלושה אירועים + טופס</li>
          </ul>
        </aside>
      )}
    </>
  )
}

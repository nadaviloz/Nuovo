import { useState } from 'react'
import styles from './DesignNotes.module.css'

export default function DesignNotes() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className={styles.button} onClick={() => setOpen(o => !o)}>Design notes</button>
      {open && (
        <aside className={styles.panel}>
          <h4>Hearth — visual direction</h4>
          <div className={styles.sub}>Accessible luxury · warm · editorial</div>

          <div className={styles.sub} style={{marginBottom:8}}>Palette</div>
          <div className={styles.swatches}>
            <div className={styles.sw} style={{background:'#F4EDE2',color:'#2A211C'}}>#F4EDE2</div>
            <div className={styles.sw} style={{background:'#B5573B',color:'#F4EDE2'}}>#B5573B</div>
            <div className={styles.sw} style={{background:'#2A211C',color:'#F4EDE2'}}>#2A211C</div>
          </div>

          <div className={styles.sub} style={{margin:'14px 0 6px'}}>Type</div>
          <ul>
            <li><b>Cormorant Garamond</b> — display & quotes</li>
            <li><b>Manrope</b> — UI, body, micro</li>
            <li>Italic clay accents do the emotional lifting</li>
          </ul>

          <div className={styles.sub} style={{margin:'14px 0 6px'}}>Microcopy slogans</div>
          <ul>
            <li><b>Cooked here. Loved here.</b> — local</li>
            <li><b>A table for your people.</b> — intimate</li>
            <li><b>Arrive. Host. Enjoy.</b> — effortless</li>
          </ul>

          <div className={styles.sub} style={{margin:'14px 0 6px'}}>Page flow</div>
          <ul>
            <li><b>01</b> Hero — headline + reserve CTA</li>
            <li><b>02</b> Process — Book / Menu / Cook / Quiet</li>
            <li><b>03</b> Host experience — guest at your own table</li>
            <li><b>04</b> Booking — three evenings + form</li>
          </ul>
        </aside>
      )}
    </>
  )
}

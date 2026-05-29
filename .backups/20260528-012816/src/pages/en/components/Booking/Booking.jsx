import { useState } from 'react'
import styles from './Booking.module.css'

export default function Booking() {
  const [form, setForm] = useState({
    evening: 'The Table — 4 courses, pairings',
    date: 'Sat, 13 June',
    guests: '6',
    postcode: '',
    occasion: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const onChange = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="book" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ 03 — Reserve</div>
            <h2 className={styles.title}>Open<br/>your kitchen.</h2>
          </div>
          <p className={styles.lede}>Tell us when. We'll match you with two chefs nearby, free, within the hour. No commitment until you say go.</p>
        </div>

        <div className={styles.grid}>
          <div>
            <div className={styles.headline}>Saturday,<br/>seven sharp,<br/><em>your place.</em></div>
            <div className={styles.list}>
              <div className={styles.row}>
                <div className={styles.rowNum}>01</div>
                <div className={styles.rowName}>The Weeknight</div>
                <div className={styles.rowDetail}>3 courses · up to 6 guests</div>
                <div className={styles.rowPrice}>from $95/pp</div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowNum}>02</div>
                <div className={styles.rowName}>The Table</div>
                <div className={styles.rowDetail}>4 courses · pairings · up to 10</div>
                <div className={styles.rowPrice}>from $165/pp</div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowNum}>03</div>
                <div className={styles.rowName}>The Long Night</div>
                <div className={styles.rowDetail}>7 courses · chef's choice · up to 14</div>
                <div className={styles.rowPrice}>from $245/pp</div>
              </div>
            </div>
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.field}>
              <label>The evening</label>
              <select value={form.evening} onChange={onChange('evening')}>
                <option>The Table — 4 courses, pairings</option>
                <option>The Weeknight — 3 courses</option>
                <option>The Long Night — 7 courses</option>
              </select>
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label>Date</label>
                <input type="text" value={form.date} onChange={onChange('date')} />
              </div>
              <div className={styles.field}>
                <label>Guests</label>
                <input type="text" value={form.guests} onChange={onChange('guests')} />
              </div>
            </div>
            <div className={styles.field}>
              <label>Postcode</label>
              <input type="text" value={form.postcode} onChange={onChange('postcode')} placeholder="So we can match a local chef" />
            </div>
            <div className={styles.field}>
              <label>The occasion (optional)</label>
              <input type="text" value={form.occasion} onChange={onChange('occasion')} placeholder="A birthday, a Tuesday, an apology…" />
            </div>
            <button type="submit" className={styles.submit}>
              {submitted ? "Sent — we'll be in touch" : 'Match me with a chef · free'}
            </button>
            <div className={styles.fine}>No card needed. You confirm after you've seen the menu.</div>
          </form>
        </div>
      </div>
    </section>
  )
}

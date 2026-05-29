import styles from './Process.module.css'

const steps = [
  { icon: 'i',   num: '01 / Book',  title: <>A date,<br/>a chef,<br/>a vibe.</>,        body: "Pick a Friday. Tell us how many seats, any allergies, and whether it's quiet or boisterous. Two minutes." },
  { icon: 'ii',  num: '02 / Menu',  title: <>A menu<br/>you didn't<br/>write.</>,       body: "Your chef sends a four-course proposal sourced from this week's market. Approve in a tap, swap anything you'd like." },
  { icon: 'iii', num: '03 / Cook',  title: <>They cook.<br/>You pour<br/>the wine.</>,  body: "Chef arrives 90 minutes ahead with everything in tow. You greet your guests; the kitchen handles itself." },
  { icon: 'iv',  num: '04 / Quiet', title: <>A kitchen<br/>cleaner<br/>than before.</>, body: "Dishes washed, surfaces wiped, leftovers labeled in the fridge. You wake up to the same kitchen — minus the dread." }
]

export default function Process() {
  return (
    <section id="how" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <div className={styles.num}>/ 01 — The evening</div>
            <h2 className={styles.title}>Four steps.<br/>One unforgettable night.</h2>
          </div>
          <p className={styles.lede}>No tasting calls, no clipboard. You choose a chef, we handle the rest — from the first sourdough to the last glass back in the cupboard.</p>
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

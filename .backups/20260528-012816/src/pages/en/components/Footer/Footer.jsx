import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div>
            <div className={styles.brand}>Hearth<span className={styles.brandDot}>.</span></div>
            <p className={styles.tag}>A private chef, in your kitchen, for the people you already love feeding.</p>
          </div>
          <div className={styles.col}>
            <h5>The Evening</h5>
            <a href="#">How it works</a>
            <a href="#">Menus</a>
            <a href="#">Pricing</a>
            <a href="#">Gift an evening</a>
          </div>
          <div className={styles.col}>
            <h5>Chefs</h5>
            <a href="#">Meet the chefs</a>
            <a href="#">Become a chef</a>
            <a href="#">Our standards</a>
          </div>
          <div className={styles.col}>
            <h5>Hearth</h5>
            <a href="#">Journal</a>
            <a href="#">Press</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className={styles.base}>
          <div>© Hearth Studio, MMXXVI</div>
          <div>Brooklyn · Los Angeles · Lisbon</div>
        </div>
      </div>
    </footer>
  )
}

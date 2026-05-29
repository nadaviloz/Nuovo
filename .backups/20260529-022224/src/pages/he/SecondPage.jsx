import { useEffect } from 'react'
import styles from './HebrewPage.module.css'
import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollProgress from './components/ScrollProgress/ScrollProgress.jsx'
import FloatWhatsApp from './components/FloatWhatsApp/FloatWhatsApp.jsx'

export default function SecondPage() {
  useEffect(() => {
    document.title = 'שולחן - עמוד 2'
    const prevBg = document.body.style.background
    document.body.style.background = '#FAFAFA'
    return () => { document.body.style.background = prevBg }
  }, [])

  return (
    <div className={styles.page}>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Footer />
      <FloatWhatsApp />
    </div>
  )
}

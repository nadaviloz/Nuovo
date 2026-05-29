import { useEffect } from 'react'
import styles from './EnglishPage.module.css'
import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import Marquee from './components/Marquee/Marquee.jsx'
import Process from './components/Process/Process.jsx'
import Host from './components/Host/Host.jsx'
import Booking from './components/Booking/Booking.jsx'
import Footer from './components/Footer/Footer.jsx'
import DesignNotes from './components/DesignNotes/DesignNotes.jsx'

export default function EnglishPage() {
  useEffect(() => {
    document.title = 'Hearth — Private Chef'
    const prevBg = document.body.style.background
    document.body.style.background = '#F4EDE2'
    return () => { document.body.style.background = prevBg }
  }, [])

  return (
    <div className={styles.page}>
      <Nav />
      <Hero />
      <Marquee />
      <Process />
      <Host />
      <Booking />
      <Footer />
      <DesignNotes />
    </div>
  )
}

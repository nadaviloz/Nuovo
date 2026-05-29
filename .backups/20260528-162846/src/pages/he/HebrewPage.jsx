import { useEffect, useRef } from 'react'
import styles from './HebrewPage.module.css'
import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import StatsBar from './components/StatsBar/StatsBar.jsx'
import Marquee from './components/Marquee/Marquee.jsx'
import Gallery from './components/Gallery/Gallery.jsx'
import Reels from './components/Reels/Reels.jsx'
import About from './components/About/About.jsx'
import Process from './components/Process/Process.jsx'
import Tracks from './components/Tracks/Tracks.jsx'
import Testimonials from './components/Testimonials/Testimonials.jsx'
import Faq from './components/Faq/Faq.jsx'
import Booking from './components/Booking/Booking.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollProgress from './components/ScrollProgress/ScrollProgress.jsx'
import FloatWhatsApp from './components/FloatWhatsApp/FloatWhatsApp.jsx'

export default function HebrewPage() {
  const bookingRef = useRef(null)

  useEffect(() => {
    document.title = 'שולחן - שף פרטי'
    const prevBg = document.body.style.background
    document.body.style.background = '#FAFAFA'
    return () => { document.body.style.background = prevBg }
  }, [])

  const onSelectTrack = (value) => {
    bookingRef.current?.setTrack(value)
  }

  return (
    <div className={styles.page}>
      <ScrollProgress />
      <Nav />
      <Hero />
      <StatsBar />
      <Marquee />
      <Gallery />
      <section className={styles.reelsSection}>
        <div className={styles.wrap}>
          <Reels />
        </div>
      </section>
      <About />
      <Process />
      <Tracks onSelectTrack={onSelectTrack} />
      <Testimonials />
      <Faq />
      <Booking ref={bookingRef} />
      <Footer />
      <FloatWhatsApp />
    </div>
  )
}

import { useEffect, useRef } from 'react'
import styles from './HebrewPage.module.css'
import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import StatsBar from './components/StatsBar/StatsBar.jsx'
import Marquee from './components/Marquee/Marquee.jsx'
import Gallery from './components/Gallery/Gallery.jsx'
import About from './components/About/About.jsx'
import Process from './components/Process/Process.jsx'
import Testimonials from './components/Testimonials/Testimonials.jsx'
import Tracks from './components/Tracks/Tracks.jsx'
import Booking from './components/Booking/Booking.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollProgress from './components/ScrollProgress/ScrollProgress.jsx'

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
      <About />
      <Process />
      <Testimonials />
      <Tracks onSelectTrack={onSelectTrack} />
      <Booking ref={bookingRef} />
      <Footer />
    </div>
  )
}

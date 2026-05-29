import { useEffect, useRef, useState } from 'react'
import styles from './HebrewPage.module.css'
import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import StatsBar from './components/StatsBar/StatsBar.jsx'
import Marquee from './components/Marquee/Marquee.jsx'
import Gallery from './components/Gallery/Gallery.jsx'
import About from './components/About/About.jsx'
import Process from './components/Process/Process.jsx'
import Testimonials from './components/Testimonials/Testimonials.jsx'
import WhatsAppReviews from './components/WhatsAppReviews/WhatsAppReviews.jsx'
import Tracks from './components/Tracks/Tracks.jsx'
import Booking from './components/Booking/Booking.jsx'
import Footer from './components/Footer/Footer.jsx'
import VideoLightbox from './components/VideoLightbox/VideoLightbox.jsx'
import ScrollProgress from './components/ScrollProgress/ScrollProgress.jsx'

export default function HebrewPage() {
  const bookingRef = useRef(null)
  const [lightbox, setLightbox] = useState({ open: false, src: '' })

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
      <Testimonials onOpenVideo={() => setLightbox({ open: true, src: '' })} />
      <WhatsAppReviews />
      <Tracks onSelectTrack={onSelectTrack} />
      <Booking ref={bookingRef} />
      <Footer />
      <VideoLightbox
        open={lightbox.open}
        src={lightbox.src}
        onClose={() => setLightbox({ open: false, src: '' })}
      />
    </div>
  )
}

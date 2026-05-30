import { useEffect, useRef } from 'react'
import styles from './HebrewPage.module.css'

/* ─────────────────────────────────────────────────────────────────────────
   Hand-drawn clay signature library. Each path is intentionally imperfect
   — slight dip, slight crest, asymmetric quad/cubic curves — so no two
   clay accents on the page render identical. Stroke widths alternate
   between 1.5 and 2 for visual rhythm. PathLength is normalised to 100
   so the CSS dasharray/dashoffset math stays clean.
   ───────────────────────────────────────────────────────────────────── */
const LONG_PATHS = [
  { d: 'M 2 5 Q 50 3 100 5.5 T 198 5',                  w: 2   },
  { d: 'M 2 6 Q 50 4 100 5 T 198 5.5',                  w: 1.5 },
  { d: 'M 2 5 C 40 3 80 7 120 5 S 180 4 198 6',         w: 2   },
  { d: 'M 2 6 Q 40 4 80 5.5 T 140 5 T 198 6',           w: 1.5 },
  { d: 'M 2 4 Q 60 5 100 5.5 T 198 7',                  w: 2   },
  { d: 'M 2 7 Q 60 5 100 5 T 198 4',                    w: 1.5 },
  { d: 'M 2 5 Q 25 4 50 5.5 T 100 5 T 150 5.5 T 198 5', w: 2   },
  { d: 'M 2 5.5 Q 60 7 110 5.5 T 198 7.5',              w: 1.5 },
]
const TICK_PATHS = [
  { d: 'M 1 3 Q 8 1.5 15 3 T 21 3',     w: 1.5 },
  { d: 'M 1 3 Q 11 4 21 2.5',           w: 1.5 },
  { d: 'M 1 2.5 C 6 1.5 16 4 21 3',     w: 2   },
  { d: 'M 1 3.5 Q 11 2 21 3',           w: 1.5 },
  { d: 'M 1 3 Q 6 3.5 11 2.5 T 21 3',   w: 2   },
  { d: 'M 1 2.5 Q 11 4 21 2.5',         w: 1.5 },
  { d: 'M 1 3.5 Q 8 2 16 4 T 21 3',     w: 2   },
  { d: 'M 1 2 Q 11 3.5 21 2.5',         w: 1.5 },
]

const SVG_NS = 'http://www.w3.org/2000/svg'
function buildSignatureSvg({ vbW, vbH, d, w, classes }) {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('viewBox', `0 0 ${vbW} ${vbH}`)
  svg.setAttribute('preserveAspectRatio', 'none')
  svg.setAttribute('aria-hidden', 'true')
  classes.forEach((c) => svg.classList.add(c))
  const p = document.createElementNS(SVG_NS, 'path')
  p.setAttribute('d', d)
  p.setAttribute('stroke', 'currentColor')
  p.setAttribute('stroke-width', String(w))
  p.setAttribute('stroke-linecap', 'round')
  p.setAttribute('stroke-linejoin', 'round')
  p.setAttribute('fill', 'none')
  p.setAttribute('pathLength', '100')
  p.classList.add('he-signature-path')
  svg.appendChild(p)
  return svg
}
import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import Marquee from './components/Marquee/Marquee.jsx'
import Gallery from './components/Gallery/Gallery.jsx'
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
  const pageRef = useRef(null)
  const wipeRef = useRef(null)

  useEffect(() => {
    document.title = 'שולחן - שף פרטי'
    const prevBg = document.body.style.background
    document.body.style.background = '#FAFAFA'
    return () => { document.body.style.background = prevBg }
  }, [])

  useEffect(() => {
    const root = pageRef.current
    if (!root) return
    // Reveal every <section> as it enters the viewport (Hero is a <header>, so it's skipped).
    const targets = Array.from(root.querySelectorAll('section'))
    if (!targets.length) return
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('he-reveal', 'he-in'))
      return
    }
    targets.forEach(el => {
      el.classList.add('he-reveal')
      // Sections with a grid/cards layout get staggered children.
      const stagger = el.querySelector('[class*="grid"], [class*="steps"], [class*="cards"], [class*="tiers"]')
      if (stagger) el.setAttribute('data-stagger', '')
    })
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('he-in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
    targets.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* ── Inject a unique hand-drawn SVG signature into every clay accent slot.
        Each tick (section eyebrow) and underline (italic em) gets a different
        path from the curated library, so no two clay lines render identical.
        A MutationObserver re-injects if React rebuilds the em's children
        (Faq accordion, Booking form). ── */
  useEffect(() => {
    const root = pageRef.current
    if (!root) return

    let longIdx = 0
    let tickIdx = 0
    const observers = []

    const injectUnderline = (em) => {
      if (!em || em.dataset.heSigned === 'em') return
      const path = LONG_PATHS[longIdx % LONG_PATHS.length]
      longIdx += 1
      const svg = buildSignatureSvg({
        vbW: 200, vbH: 10, d: path.d, w: path.w,
        classes: ['he-signature-svg', 'he-signature-svg--underline'],
      })
      em.appendChild(svg)
      em.dataset.heSigned = 'em'

      const obs = new MutationObserver(() => {
        if (!em.querySelector('svg.he-signature-svg')) {
          em.dataset.heSigned = ''
          injectUnderline(em)
        }
      })
      obs.observe(em, { childList: true })
      observers.push(obs)
    }

    const injectTick = (num) => {
      if (!num || num.dataset.heSigned === 'tick') return
      const path = TICK_PATHS[tickIdx % TICK_PATHS.length]
      tickIdx += 1
      const svg = buildSignatureSvg({
        vbW: 22, vbH: 5, d: path.d, w: path.w,
        classes: ['he-signature-svg', 'he-signature-svg--tick'],
      })
      num.insertBefore(svg, num.firstChild)
      num.dataset.heSigned = 'tick'

      const obs = new MutationObserver(() => {
        if (!num.querySelector('svg.he-signature-svg')) {
          num.dataset.heSigned = ''
          injectTick(num)
        }
      })
      obs.observe(num, { childList: true })
      observers.push(obs)
    }

    root.querySelectorAll('[class*="_num_"]').forEach(injectTick)
    root.querySelectorAll('[class*="_title_"] em, [class*="_head_"] h3 em').forEach(injectUnderline)

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Cinematic section-to-section transition: intercept anchor links, run a clay
  // wipe across the page, then ease-scroll to the target with cubic timing.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const scrollTo = (targetY, duration = 950) => {
      const startY = window.scrollY
      const dist = targetY - startY
      if (Math.abs(dist) < 4) return
      if (reduceMotion) { window.scrollTo(0, targetY); return }
      const t0 = performance.now()
      const step = (now) => {
        const t = Math.min((now - t0) / duration, 1)
        window.scrollTo(0, startY + dist * easeInOutCubic(t))
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href.length < 2) return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()

      const top = target.getBoundingClientRect().top + window.scrollY - 80
      const wipe = wipeRef.current
      if (wipe && !reduceMotion) {
        wipe.classList.remove(styles.wipeRun)
        // Force reflow so the animation restarts even on rapid clicks.
        void wipe.offsetWidth
        wipe.classList.add(styles.wipeRun)
      }
      scrollTo(top, 950)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const onSelectTrack = (value) => {
    bookingRef.current?.setTrack(value)
  }

  return (
    <div ref={pageRef} className={styles.page}>
      <div ref={wipeRef} className={styles.wipe} aria-hidden="true">
        <span className={styles.wipePanel} />
        <span className={styles.wipeLine} />
      </div>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <Gallery />
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

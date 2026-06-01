import { useEffect, useRef } from 'react'
import styles from './HebrewPage.module.css'
import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Process from './components/Process/Process.jsx'
import Tracks from './components/Tracks/Tracks.jsx'
import MenuBridge from './components/MenuBridge/MenuBridge.jsx'
import Upgrades from './components/Upgrades/Upgrades.jsx'
import TableArt from './components/TableArt/TableArt.jsx'
import Testimonials from './components/Testimonials/Testimonials.jsx'
import Faq from './components/Faq/Faq.jsx'
import Kitchen from './components/Kitchen/Kitchen.jsx'
import Booking from './components/Booking/Booking.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollProgress from './components/ScrollProgress/ScrollProgress.jsx'
import FloatWhatsApp from './components/FloatWhatsApp/FloatWhatsApp.jsx'

/* Split a headline element's children by <br> into lines, then wrap each
   line in <span.he-mask><span.he-inner>…</span></span>. Idempotent. */
function maskifyHeadline(el) {
  if (!el || el.dataset.heMasked === '1') return
  if (el.dataset.heMasked === 'skip') return

  const lines = [[]]
  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeName === 'BR') lines.push([])
    else lines[lines.length - 1].push(node.cloneNode(true))
  })

  const fragment = document.createDocumentFragment()
  lines.forEach((nodes, i) => {
    if (!nodes.length) return
    const mask = document.createElement('span')
    mask.className = 'he-mask'
    mask.style.setProperty('--i', i)
    const inner = document.createElement('span')
    inner.className = 'he-inner'
    nodes.forEach((n) => inner.appendChild(n))
    mask.appendChild(inner)
    fragment.appendChild(mask)
    if (i < lines.length - 1) fragment.appendChild(document.createElement('br'))
  })

  el.innerHTML = ''
  el.appendChild(fragment)
  el.dataset.heMasked = '1'
}

export default function HebrewPage() {
  const pageRef = useRef(null)
  const wipeRef = useRef(null)

  useEffect(() => {
    document.title = 'שולחן - שף פרטי'
    const prevBg = document.body.style.background
    document.body.style.background = '#DAD7D1'
    return () => { document.body.style.background = prevBg }
  }, [])

  /* ── Editorial reveal: clip-mask headlines + staggered children, fired by
        IntersectionObserver as each section enters the viewport. ── */
  useEffect(() => {
    const root = pageRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const sections = Array.from(root.querySelectorAll('section, header'))

    const watched = []
    const guard = (h) => {
      // If React re-renders the headline (Faq accordion, Booking form), the
      // masks get stripped. Watch the headline's children and re-mask whenever
      // the masks disappear.
      const obs = new MutationObserver(() => {
        if (h.dataset.heMasked === 'skip') return
        if (!h.querySelector('.he-mask')) {
          h.dataset.heMasked = ''
          maskifyHeadline(h)
        }
      })
      obs.observe(h, { childList: true })
      watched.push(obs)
    }

    sections.forEach((sec) => {
      // Headlines: maskify every h1/h2/h3 inside the section.
      sec.querySelectorAll('h1, h2, h3').forEach((h) => { maskifyHeadline(h); guard(h) })

      // Children that fade-up after the headline. These get their own --i
      // so they cascade. We target ledes, eyebrow numbers, paragraphs, ctas
      // — but NOT children of headlines themselves (those are masked).
      const childSelectors = [
        '[class*="_lede_"]', '[class*="_num_"]',
        '[class*="_ctas_"]', '[class*="_copy_"] p',
        '[class*="_card_"]', '[class*="_step_"]', '[class*="_band_"]', '[class*="_pillar_"]', '[class*="_photo_"]',
        '[class*="_chat_"]', '[class*="_qa_"]',
        '[class*="_eyebrow_"]'
      ].join(', ')

      let idx = 0
      sec.querySelectorAll(childSelectors).forEach((el) => {
        if (el.closest('h1, h2, h3')) return
        if (el.dataset.heChildSet === '1') return
        el.dataset.heChildSet = '1'
        el.classList.add('he-child')
        el.style.setProperty('--i', idx % 8)
        idx += 1
      })
    })

    if (reduce) {
      sections.forEach((s) => s.classList.add('he-revealed'))
      return
    }

    // Hero is visible at first paint — reveal immediately so the headline
    // clips in on load instead of waiting for an intersection event.
    const hero = root.querySelector('header')
    if (hero) requestAnimationFrame(() => hero.classList.add('he-revealed'))

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('he-revealed')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' })

    sections.forEach((s) => { if (s !== hero) io.observe(s) })
    return () => { io.disconnect(); watched.forEach((o) => o.disconnect()) }
  }, [])

  /* ── Image parallax (0.15). JS writes --parallax-y on every [data-parallax]
        element on each scroll frame; the CSS rule handles the transform. ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = pageRef.current
    if (!root) return

    // Tag the elements we want to parallax (idempotent).
    root.querySelectorAll('[class*="_photo_"], [class*="_portraitImg_"]').forEach((el) => {
      if (!el.hasAttribute('data-parallax')) el.setAttribute('data-parallax', '')
    })

    const els = Array.from(root.querySelectorAll('[data-parallax]'))
    if (!els.length) return

    let ticking = false
    const update = () => {
      const vh = window.innerHeight
      const amount = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--parallax-amount')
      ) || 0.15
      els.forEach((el) => {
        const r = el.getBoundingClientRect()
        // skip work for elements far outside the viewport
        if (r.bottom < -vh || r.top > vh * 2) return
        const center = r.top + r.height / 2
        const offset = (center - vh / 2) * -amount
        el.style.setProperty('--parallax-y', offset.toFixed(1) + 'px')
      })
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

/* ── Eased anchor navigation + a single hairline sweep across the
        screen as the page transitions. No dark overlay — line only. ── */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const scrollTo = (targetY, duration = 1000) => {
      const startY = window.scrollY
      const dist = targetY - startY
      if (Math.abs(dist) < 4) return
      if (reduce) { window.scrollTo(0, targetY); return }
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
      const a = e.target.closest && e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href.length < 2) return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()

      const top = target.getBoundingClientRect().top + window.scrollY - 80
      scrollTo(top, 1000)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div ref={pageRef} className={styles.page}>
      <div ref={wipeRef} className={styles.wipe} aria-hidden="true">
        <span className={styles.wipeLine} />
      </div>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <Process />
      <MenuBridge />
      <Tracks />
      <Upgrades />
      <TableArt />
      <Testimonials />
      <Faq />
      <Kitchen />
      <Booking />
      <Footer />
      <FloatWhatsApp />
    </div>
  )
}

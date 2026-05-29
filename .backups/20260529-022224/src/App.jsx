import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HebrewPage from './pages/he/HebrewPage.jsx'
import SecondPage from './pages/he/SecondPage.jsx'

export default function App() {
  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('lang', 'he')
    html.setAttribute('dir', 'rtl')
  }, [])

  return (
    <Routes>
      <Route path="/" element={<HebrewPage />} />
      <Route path="/page-2" element={<SecondPage />} />
      <Route path="*" element={<HebrewPage />} />
    </Routes>
  )
}

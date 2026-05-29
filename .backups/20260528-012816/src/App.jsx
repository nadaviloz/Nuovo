import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import EnglishPage from './pages/en/EnglishPage.jsx'
import HebrewPage from './pages/he/HebrewPage.jsx'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const html = document.documentElement
    if (location.pathname.startsWith('/he')) {
      html.setAttribute('lang', 'he')
      html.setAttribute('dir', 'rtl')
    } else {
      html.setAttribute('lang', 'en')
      html.setAttribute('dir', 'ltr')
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/en" element={<EnglishPage />} />
      <Route path="/he" element={<HebrewPage />} />
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  )
}

import { useEffect } from 'react'
import HebrewPage from './pages/he/HebrewPage.jsx'

export default function App() {
  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('lang', 'he')
    html.setAttribute('dir', 'rtl')
  }, [])

  return <HebrewPage />
}

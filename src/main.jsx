import React from 'react'
import ReactDOM from 'react-dom/client'

// Self-hosted fonts — no Google CDN dependency, so they can't be ad-blocked or
// fail offline, and there's no FOUT from a third-party round-trip. Family names
// match the CSS verbatim: "Assistant", "DM Sans", "Libre Baskerville",
// "Cormorant Garamond". (Each Assistant weight bundles the Hebrew subset.)
import '@fontsource/assistant/300.css'
import '@fontsource/assistant/400.css'
import '@fontsource/assistant/500.css'
import '@fontsource/assistant/600.css'
import '@fontsource/assistant/700.css'
import '@fontsource/assistant/800.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/libre-baskerville/400.css'
import '@fontsource/libre-baskerville/700.css'
import '@fontsource/cormorant-garamond/500-italic.css'

import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

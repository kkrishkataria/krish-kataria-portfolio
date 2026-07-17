import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Console easter egg for curious developers
console.log(
  '%c👋 Hey, curious developer!',
  'font-size: 24px; font-weight: bold; color: #38bdf8; margin-bottom: 8px;'
)
console.log(
  '%cThanks for checking under the hood!',
  'font-size: 14px; color: #94a3b8; margin-bottom: 8px;'
)
console.log(
  '%cBuilt with React, Tailwind CSS, and Framer Motion',
  'font-size: 12px; color: #64748b; margin-bottom: 8px;'
)
console.log(
  '%cCheck out the source code: %chttps://github.com/kkrishkataria',
  'font-size: 12px; color: #64748b;',
  'font-size: 12px; color: #38bdf8; text-decoration: underline;'
)
console.log(
  '%c─────────────────────────────────────────',
  'font-size: 12px; color: #334155;'
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

window.addEventListener('popstate', () => {
  // simple scroll restoration for SPA navigation
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

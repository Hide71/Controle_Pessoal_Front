import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './pages/AppRoutes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './contexts/theme-provider.tsx'
import AppRouter from './AppRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
        <AppRouter />
    </ThemeProvider>
  </StrictMode>,
)

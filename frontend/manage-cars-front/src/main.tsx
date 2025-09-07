import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/Theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App/>
        <Toaster position="bottom-right" richColors closeButton />
     </ThemeProvider>
  </StrictMode>,
)

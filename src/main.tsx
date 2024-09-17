import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api'
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
)

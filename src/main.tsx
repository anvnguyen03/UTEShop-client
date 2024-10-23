import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/lara-light-blue/theme.css'; // Theme for PrimeReact
import 'primereact/resources/primereact.min.css';         // Core PrimeReact styles
import 'primeicons/primeicons.css';                       // PrimeIcons
import 'primeflex/primeflex.css';                         // PrimeFlex
import './index.css'

const value = {
  ripple: true,

}

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <PrimeReactProvider value={value}>
        <App />
      </PrimeReactProvider>
    </Provider>
  // </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api'
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

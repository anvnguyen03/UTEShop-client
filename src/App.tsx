import LoginPage from './pages/Login/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/Register/register'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

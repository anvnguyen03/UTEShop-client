import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/login'
import ForgotPassword from './pages/ResetPassword/sentotp';
import VerifyOTP from './pages/ResetPassword/verifyotp';
import ResetPassword from './pages/ResetPassword/resetpassword';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

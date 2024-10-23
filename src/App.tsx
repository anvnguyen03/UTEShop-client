import { useEffect } from 'react'
import LoginPage from './pages/Login/login'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchAccount } from './redux/slice/accountSlide'
import HomePage from './pages/Home/home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/Register/register'
import ShopPage from './pages/Shop/shop'
import ViewProductPage from './pages/Product/product'
import ForgotPassword from './pages/ResetPassword/sentotp'
import VerifyOTP from './pages/ResetPassword/verifyotp'
import ResetPassword from './pages/ResetPassword/resetpassword'
import { SearchProvider } from './pages/Shop/search'
import ProtectedRoute from './configs/ProtectedRoute'
import CartPage from './pages/Cart/cart'
import CheckoutForm from './pages/Checkout/checkout'
import OrderSummary from './pages/OrderSummary/ordersummary'
import ScrollToTop from './configs/ScrollToTop'
import OrderHistory from './pages/OrderHistory/orderhistory'

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.account.isLoading);

  useEffect(() => {
    // if (
    //   window.location.pathname === '/login'
    //   || window.location.pathname === '/register'
    // ) {
    //   return;
    // }    
    dispatch(fetchAccount())
  }, [])

  return (
    <BrowserRouter>
      <SearchProvider>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/product' element={<ViewProductPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* <Route element={ <ProtectedRoute allowedRoles={['customer, admin']}/> }> */}
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/checkout' element={<CheckoutForm/>} />
            <Route path='/ordersummary' element={<OrderSummary/>} />
            <Route path='/orderhistory' element={<OrderHistory/>} />
          {/* </Route> */}
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  )
}

export default App

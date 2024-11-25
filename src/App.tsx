import { useEffect, useState, useRef } from 'react'
import LoginPage from './pages/Login/login'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchAccount } from './redux/slice/accountSlide'
import HomePage from './pages/Home/home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/Register/register'
import ShopPage from './pages/shop/shop'
import ViewProductPage from './pages/product/product'
import ForgotPassword from './pages/ResetPassword/sentotp'
import VerifyOTP from './pages/ResetPassword/verifyotp'
import ResetPassword from './pages/ResetPassword/resetpassword'
import { SearchProvider } from './pages/shop/search'
import ProtectedRoute from './configs/ProtectedRoute'
import CartPage from './pages/Cart/cart'
import CheckoutForm from './pages/Checkout/checkout'
import OrderSummary from './pages/OrderSummary/ordersummary'
import ScrollToTop from './configs/ScrollToTop'
import OrderHistory from './pages/OrderHistory/orderhistory'
import WishList from './pages/Wishlist/wishlist'
import AdminLayoutComponent from './pages/Admin/admin'
import AdminCategory from './pages/Admin/admin-category'
import AdminProduct from './pages/Admin/product/admin-product'
import AdminUser from './pages/Admin/admin-user'
import AdminRevenue from './pages/Admin/admin-revenue'
import AdminOrder from './pages/Admin/order/admin-order'
import AdminCoupon from './pages/Admin/admin-coupon'
import AdminAddProduct from './pages/Admin/product/admin-addproduct'
import useWebSocket from './hooks/useWebSocket'
import { Toast } from 'primereact/toast';
import EditProductPage from './pages/Admin/product/admin-editproduct'

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.account.isLoading);
  const [popupMessage, setPopupMessage] = useState('');
  const toast = useRef<Toast>(null);

  // WebSocket hook
  const { message } = useWebSocket(`ws://localhost:8080?email=${localStorage.getItem("email")}`);

  useEffect(() => {
    // if (
    //   window.location.pathname === '/login'
    //   || window.location.pathname === '/register'
    // ) {
    //   return;
    // }    
    dispatch(fetchAccount())
  }, []);

  useEffect(() => {
    
    console.log("Message: " + message);
    if (message) {
      const parsedMessage = JSON.parse(message);
      setPopupMessage(parsedMessage.payload);
      toast.current?.show({
        severity: 'info',
        summary: `${parsedMessage.type}`,
        detail: parsedMessage.payload,
        sticky: true
      });
    }
  }, [message]);

  return (
    <BrowserRouter>
      <SearchProvider>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/shop/:categoryName?' element={<ShopPage />} />
          <Route path='/product' element={<ViewProductPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* <Route element={ <ProtectedRoute allowedRoles={['customer, admin']}/> }> */}
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutForm />} />
          <Route path='/ordersummary' element={<OrderSummary />} />
          <Route path='/orderhistory' element={<OrderHistory />} />
          <Route path='/wishlist' element={<WishList />} />
          {/* </Route> */}

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayoutComponent />}>
            <Route path="category" element={<AdminCategory />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path="addproduct" element={<AdminAddProduct />} />
            <Route path="/admin/editproduct/:id" element={<EditProductPage />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="revenue" element={<AdminRevenue />} />
            <Route path="order" element={<AdminOrder />} />
            <Route path="coupon" element={<AdminCoupon />} />
          </Route>
        </Routes>
        <Toast ref={toast} />
      </SearchProvider>
    </BrowserRouter>
  )
}

export default App

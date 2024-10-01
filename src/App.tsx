import { useEffect } from 'react'
import LoginPage from './pages/Login/login'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchAccount } from './redux/slice/accountSlide';
import HomePage from './pages/Home/home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/Register/register'
import ShopPage from './pages/shop/shop';
import ViewProductPage from './pages/product/product';
import { SearchProvider } from './pages/shop/search';

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
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/product' element={<ViewProductPage />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  )
}

export default App

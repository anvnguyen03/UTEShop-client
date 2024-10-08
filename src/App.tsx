import { useEffect } from 'react'
import LoginPage from './pages/Login/login'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchAccount } from './redux/slice/accountSlide';
import HomePage from './pages/Home/home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

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
      <Routes>
        <Route path='/' element={<Navigate to='/home' />}/>
        <Route path='/home' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

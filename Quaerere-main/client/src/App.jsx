import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Similar from './pages/Similar'
import Search from './pages/Search'
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes'
import { useEffect } from 'react'
import History from './pages/History'
import ImageSearch from './pages/ImageSearch'
import ImageRecognition from './pages/ImageDesc'
import Image from './pages/Image'


function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]);

  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route element={<PrivateRoutes />}>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/search-link" element={<Similar />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/saved-history" element={<History />} />
          <Route exact path="/image-search" element={<Image/>} />
          <Route exact path="/image-search/text" element={<ImageSearch/>} />
          <Route exact path="/image-search/img" element={<ImageRecognition/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

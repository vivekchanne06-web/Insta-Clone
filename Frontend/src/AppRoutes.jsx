import {BrowserRouter, Route, Routes} from 'react-router'
import Login  from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Feed from './features/auth/pages/Feed'
import CreatePost from './features/auth/pages/CreatePost'
import About from './features/auth/pages/About'
import Home from './features/auth/pages/Home'


const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/> } />
      <Route path='/feed' element={<Feed/> } />
      <Route path='/login' element={<Login/>} />
      <Route path='/Register' element={<Register/>} />
      <Route path='/CreatePost' element={<CreatePost/>} />
      <Route path='/about' element={<About/>} />
      <Route path='*' element={<h1>404 - Page Not Found</h1>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
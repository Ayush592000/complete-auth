import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Home from './components/Home'
import RefreshHandler from './components/RefreshHandler'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const PrivateRouting = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }
  return (
    <div className='App'>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<PrivateRouting element={<Home />} />} />
      </Routes>
    </div>
  )
}

export default App

import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Home from './components/Home'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const LogIn = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email"
            onChange={handleChange}
            name='name'
            value={loginInfo.email}
            placeholder='Enter your email...' />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input type="password"
            onChange={handleChange}
            name='password'
            value={loginInfo.password}
            placeholder='Enter your password...' />
        </div>
        <button type='submit  '>Login</button>
        <span>Don't have an account than to go?<Link to='/signup'>Signup</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default LogIn

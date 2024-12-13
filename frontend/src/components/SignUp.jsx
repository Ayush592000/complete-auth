import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const SignUp = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='container'>
      <h1>Sign up</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text"
            onChange={handleChange}
            name='name'
            autoFocus
            value={signupInfo.name}
            placeholder='Enter your name...' />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email"
            onChange={handleChange}
            name='name'
            value={signupInfo.email}
            placeholder='Enter your email...' />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input type="password"
            onChange={handleChange}
            name='password'
            value={signupInfo.password}
            placeholder='Enter your password...' />
        </div>
        <button type='submit  '>Signup</button>
        <span>Already hae an account ?<Link to='/login'>Login</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SignUp

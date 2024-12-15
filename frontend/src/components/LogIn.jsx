import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const LogIn = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    console.log("loginInfo", loginInfo)
    if (!email || !password) {
      return handleError("email and password are required")
    }
    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      console.log(response)


      const result = await response.json();
      console.log("Success", result)
      const { success, message, jwtToken, name, error } = result;
      console.log(message)
      if (success) {
        handleSuccess(message);
        localStorage.setItem('Token', jwtToken);
        localStorage.setItem('Name', name)
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const detail = error?.details[0].message;
        handleError(detail)
      } else if (!success) {
        handleError(message)
      }
      else {
        console.error("Login failed:", message);
      }
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email"
            onChange={handleChange}
            name='email'
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
        <button type='submit'>Login</button>
        <span>Don't have an account than to go?<Link to='/signup'>Signup</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default LogIn

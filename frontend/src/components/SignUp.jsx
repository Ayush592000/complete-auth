import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const SignUp = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })
    // console.log(signupInfo)
  }
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name,email and password are required")
    }
    try {
      const url = "http://localhost:3000/auth/signup";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });
      console.log(response)


      const result = await response.json();
      console.log("Success", result)
      const { success, message, error } = result;
      console.log(message)
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const detail = error?.details[0].message;
        handleError(detail)
      } else if (!success) {
        handleError(message)
      }
      else {
        console.error("Signup failed:", message);
      }
    } catch (error) {
      handleError(error)
    }
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
            name='email'
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
        <span>Already have an account ?<Link to='/login'>Login</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SignUp

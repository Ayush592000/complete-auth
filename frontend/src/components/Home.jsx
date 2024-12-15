import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState()
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('Name'))
  }, [])
  const navigate = useNavigate()
  const handleLogout = (e) => {
    localStorage.removeItem('Token')
    localStorage.removeItem('Name')
    handleSuccess('User Loggedout')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        throw new Error("User is not logged in. Token is missing.");
      }

      const response = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      });

      const products = await response.json();
      console.log("Fetched Products:", products);
    } catch (error) {
      handleError(error.message);
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  )
}

export default Home

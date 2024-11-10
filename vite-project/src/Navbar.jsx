import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar({username,setUsername}) {
  const navigate = useNavigate();
   async function handleLogout(e) {
        e.preventDefault();
      const response= await axios.post('http://localhost:5000/auth/logout');
        Cookies.remove('token');
       
        localStorage.removeItem('token');
        setUsername(null);
        navigate('/login');
        // window.location.href = '/login';
      }
    const [data,setData]=useState(localStorage.getItem('token'));
      
  return (
    <div className='flex justify-between p-7'>
        <div ><Link to="/">Home</Link></div>
        <div><Link to="/employeelist">Employee List</Link></div>
        <div>{username? username : "user"}</div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar
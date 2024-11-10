import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className='flex justify-between align-center'>
        <div>Home</div>
        <div>Employee List</div>
        <div>user Name</div>
        <div>Logout</div>
    </div>
  )
}

export default Header
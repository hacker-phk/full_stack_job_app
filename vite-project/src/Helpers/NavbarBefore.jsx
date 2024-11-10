import React from 'react'
import { Link } from 'react-router-dom'
function NavbarBefore() {
  return (
    <div className='flex justify-between p-5 '>
        <div><Link to={"/"}> Home</Link></div>
        <div><Link to={"/login"}> Login</Link></div>
    </div>
  )
}

export default NavbarBefore
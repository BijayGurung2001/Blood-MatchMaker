import React from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
       <p>
        B
       </p>
      </div>
      <div className="list">
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">News</Link></li>
        <li><Link to="/donation">Donation</Link></li>
        <li><Link to="/search">Search Blood</Link></li>
        <li><Link to="/login">User Login</Link></li>
        <li><Link to="/orglogin">ORG Login</Link></li>
    
        
        </ul>
      </div>
    </div>
  )
}

export default NavBar
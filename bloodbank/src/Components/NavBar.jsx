import React from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
       <p className='logo-name'>
        BLOOD MATCHMAKER
       </p>
      </div>
      <div className="list">
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/news">News</Link></li>
       
   
        <li><Link to="/login">User Login</Link></li>
        <li><Link to="/orglogin">ORG Login</Link></li>
    
        
        </ul>
      </div>
    </div>
  )
}

export default NavBar
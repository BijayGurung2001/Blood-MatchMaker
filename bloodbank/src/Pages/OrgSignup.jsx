import React, { useState } from 'react'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
const OrgSignup = () => {
 
const nav= useNavigate()
const [Input, setInput]=useState({})

 const handleorginput=(e)=>{
  e.preventDefault();
  setInput({...Input,[e.target.name]:e.target.value})
 }

  const handleorgsignup =()=>{
    const response=axios.post('http://localhost:5000/orgsignup', Input)
        const data=response.json();
    if(data){
nav('/orglogin')
    }
    nav('/orgsignup')
    
  }

  return (
    <div className="orgsignup">
      <div className="orgsignup_container">
        <form method='post' onSubmit={handleorgsignup}>
          <table>
            <th>Signup</th>
            <tr>
              <td><label>Organization Name :</label></td>
              <td><input type='text' name='orgname' placeholder='org-name' required onChange={handleorginput} /></td>
            </tr>
            <tr>
              <td><label>Address :</label></td>
              <td><input type='text' name='orgaddress' placeholder='org-address' required onChange={handleorginput} /></td>
            </tr>
            <tr>
              <td><label>Contact :</label></td>
              <td><input type='number' name='orgcontact' placeholder='org-contact' required onChange={handleorginput} /></td>
            </tr>
            <tr>
              <td><label>Email</label></td>
              <td><input type='email' name='orgemail' placeholder='org-email' required onChange={handleorginput} /></td>
            </tr>
            <tr>
              <td><label>Password</label></td>
              <td><input type='password' name='orgpassword' placeholder='org-password' required onChange={handleorginput} /></td>
            </tr>
           <tr>
            <td></td>
            <td><button onSubmit={handleorgsignup}>Submit</button></td>
           </tr>
          </table>
        </form>
      </div>
    </div>
  )
}

export default OrgSignup
import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Login.css'
import loginpic from '../Photos/10.png'
import axios from 'axios'

const Login = () => {
  const [Input, SetInput]=useState({
    email:"",
    password:""
  })
  const navigate=useNavigate();


  const HandleInput =(e)=>{
    e.preventDefault();
    SetInput({...Input,[e.target.name]:e.target.value})
    console.log(Input)
  }
  const handleloginform=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post('http://localhost:5000/login',Input);
     
      const token=response.data.token;
       localStorage.setItem('token',token);
       navigate('/userprofile')
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="login">
      <img className='loginpic' src={loginpic}/>
      <NavBar/>
         <div className="login_container">
       
        <div className="login_elements">
           <h3>Login Page</h3>
        </div>
        <div className="login_entries">
         <form method='post' onSubmit={handleloginform}>
          <div className="forminput">
          <label>Email :</label>
          <input type='email' name='email'  placeholder='email' required onChange={HandleInput}/>
          </div>
          <div className="forminput">
          <label>Password :</label>
          <input type='password' name='password'  placeholder='password' required onChange={HandleInput}/>
           </div>
          <button>Login</button>

          <li id='quick'><Link to='/forget'>Forget Password</Link></li>
          <li>Don't have account <Link to="/signup" id='signup'>Sign up</Link></li>

         </form>
        </div>
      </div>
    
    </div>
  )
}

export default Login
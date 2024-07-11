// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginpic from '../Photos/10.png';
import '../css/Login.css';
import NavBar from '../Components/NavBar'

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', input);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/userprofile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
       <NavBar/>
      <img className="loginpic" src={loginpic} alt="Login" />
      <div className="login_container">
        <h3 id='login-h'>Login Page</h3>
        <form className="login_form" onSubmit={handleLoginForm}>
          <div className="forminput">
            <label>Email :</label>
            <input type="email" name="email" placeholder="email" required onChange={handleInput} />
          </div>
          <div className="forminput">
            <label>Password :</label>
            <input type="password" name="password" placeholder="password" required onChange={handleInput} />
          </div>
          <button>Login</button>
          <div className="links">
            <Link to="/forget"><b>Forget Password</b></Link>
            <br/>
            <span>Don't have an account <Link to="/signup" > <b>Sign up</b></Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

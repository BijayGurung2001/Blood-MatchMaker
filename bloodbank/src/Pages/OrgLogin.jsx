import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/orglogin.css';
import NavBar from '../Components/NavBar'
const OrgLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/orglogin', loginData);
      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem('id', user.org_id);  // Ensure you store org_id
        navigate('/orgprofile');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="org_login">
        <NavBar/>
      <div className="login_container">
        <h1 className="login_title"> Organization Login</h1>
        <form onSubmit={handleLogin} className="login_form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="login_button">Login</button>
        </form>
        {errorMessage && <p className="error_message">{errorMessage}</p>}
        <p className="signup_link">
          Don't have an account? <span onClick={() => navigate('/orgsignup')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default OrgLogin;

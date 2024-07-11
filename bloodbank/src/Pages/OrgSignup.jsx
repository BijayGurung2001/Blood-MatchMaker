import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import '../css/orgsignup.css'
const OrgSignup = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({});

    const handleorginput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleorgsignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/orgsignup', input);
            if (response.status === 200) {
                navigate('/orglogin');
            }
        } catch (error) {
            console.error('Error during signup', error);
            // handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="orgsignup">
            <NavBar />
            <div className="orgsignup_container">
                <form method="post" onSubmit={handleorgsignup}>
                    <div className="form-section">
                        <h2>Enter Genuine Details</h2>
                        <div className="form-group">
                            <label>Full Name:</label>
                            <input type="text" name="orgname" placeholder="Organization Name" required onChange={handleorginput} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="orgemail" placeholder="Organization Email" required onChange={handleorginput} />
                        </div>
                        <div className="form-group">
                            <label>Date Of Birth:</label>
                            <input type="date" name="orgdob" placeholder="Organization Date Of Birth" required onChange={handleorginput} />
                        </div>
                        <div className="form-group">
                            <label>User name:</label>
                            <input type="text" name="orgusername" placeholder="Organization Username" required onChange={handleorginput} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" name="orgpassword" placeholder="Password" required onChange={handleorginput} />
                        </div>
                        <div className="form-group">
                            <label>Re-Password:</label>
                            <input type="password" name="orgrepassword" placeholder="Re-Password" required onChange={handleorginput} />
                        </div>
                        <button className='buttonh' type="submit">Signup</button>
                    </div>
                    <div className="form-section right-section">
                        <h2>Sign-up Form</h2>
                        <p>Already have an account? <a href="/orglogin">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrgSignup;

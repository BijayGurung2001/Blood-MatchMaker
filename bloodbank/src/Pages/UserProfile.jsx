import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import profile from '../Photos/profile.jpg'
import backgroundimg from '../Photos/6.webp'
import '../css/Userprofile.css'
import { useNavigate } from 'react-router-dom'
import { Axios } from 'axios'

const UserProfile = () => {
const [userData, setUserData]=useState({});
const Navigate=useNavigate();

useEffect(()=>{

  const tok=localStorage.getItem('token');
  if(!tok){
    Navigate('login')
  }
  Axios.get('http://localhost:5000/profile',{tok})
  .then((response=>response.json()))
  .then((data)=>{setUserData(data)})
  .catch((err)=>console.log(err))
})
const data2=[{
  date:"asdfasd",
  org:"asdfasdf",
  charge:"asdfasdf",
  qnt:"asfasdf"
}]
  return (
  <div className="userprofile">
    <img className='bgpic' src={backgroundimg}></img>
    <NavBar/>
    <div className="profile_content">

   
     
          <div className="user_details">
<div className="details_main">
      <img src={profile} id='profile_pic'/>
      <h3>{userData.name}</h3>
     </div>
     <div className="details_sub">
      <p>Email: {userData.email}</p>
      <p>Date of Birth:{userData.dob}</p>
      <p>Blood Group: {userData.bloodgroup}</p>
      <p>User Name: {userData.username}</p>
      <p>Contact: {userData.contact}</p>
          </div>
     <div className="details_end">
      <button>Edit Info</button>
      <button>Delete Account</button>
     </div>
     </div>
    
    
     
  
    <div className="user_history">
      <table>
        <th>History</th>
        <tr>
          <td>Date</td>
          <td>Organization</td>
          <td>Charge</td>
          <td>Quantity</td>
         
        </tr>
        {data2.map((e)=>{
          return(
            <>
             <tr>
        <td>{e.date}</td>
        <td>{e.org}</td>
        <td>{e.charge}</td>
        <td>{e.qty}</td>
        </tr>
            </>
          )
        })}
       
       
      </table>
      <button>Rev</button>
      <button>Next</button>
    </div>
    </div>
  </div>
  )
}

export default UserProfile
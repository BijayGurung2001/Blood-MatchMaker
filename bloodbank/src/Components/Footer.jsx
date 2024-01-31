import React from 'react'

import profile from '../Photos/profile.jpg'
import '../css/Footer.css'

const Footer = () => {
  const PersonalInfo =[{
    Name:"Bijay Gurung",
    Title:"Founder of Blood MatchMaker",
    Contact1:"+977 9823207346",
    Contact2:"+977 9823207346",
    Email1:"bjgurung2000@gmail.com",
    Email:"bjgurung2002@gmail.com",
     Address:"Boudha-8, Kathmandu, Nepal"
}]

  return (
    <div className="footer">
     
        {PersonalInfo.map((e)=>{
          return(
            <div className="footer_container">
          <div className="footer_info">
          <img className='footerimg' src={profile} />
          <p id='name'>{e.Name}</p>
          <p id='normal'>{e.Title}</p>
          <p id='update'>{e.Contact1}</p>
          <p id='normal'>{e.Email}</p>
      </div>
      <div className="footer_contactus">
      <p id='updatep'>Contact Us</p>
      <label>Address:</label>
      <p id='normal'>{e.Address}</p>
      <label>Email:</label>
      <p id='normal'>{e.Email1}</p>
      <label>Phone:</label>
      <p id='normal'>{e.Contact2}</p>
      </div>
      <div className="footer_quick">
<label  id='updatep'>Quick Links</label>
<p id='normal'>News</p>
<p id='normal'>Report</p>
<label id='updatep'>Connect with US!!</label>
<ul>
  <li><a href='#'>a</a></li>
  <li><a href='#'>a</a></li>
  <li><a href='#'>a</a></li>
</ul>

      </div>
      </div>
        )})}
      
      
      <div className="footerend">
        <p>Copyright 2023, All Rights Reserved</p>
        <p>BLOOD MATCHMAKER</p>
      </div>
    </div>
  )
}

export default Footer
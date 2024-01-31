import React, { useState } from 'react'
import '../css/orglogin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const OrgLogin = () => {
  
const [Input,setInput]=useState({})
const nav=useNavigate()

const handleinput=(e)=>{
 e.preventDefault();

  setInput({...Input,[e.target.name]:e.target.value})
}
    const handleorglogin=async(e)=>{
      e.preventDefault()
      try {
              const response=await axios.post('http://localhost:5000/orglogin', Input)
    const data=response.data;
    console.log(data)
       if(data.user.id){
        
       const id=data.user.id;
       console.log(id);
        localStorage.setItem('id',id);
        nav('/orgprofile');
               }else{
               nav('/orglogin');
               console.log('Email no tfound in presponse')
               }
            }
             catch (error) {
        console.log(error)
              }
          }
        
 return (
    
    <div className="">
      <form onSubmit={handleorglogin} method='post'>
          <label>Email</label>
        <input type='email' name='email' 
        placeholder='email' required onChange={handleinput}/>
            <label>password</label>
      <input type='password' name='password' 
      placeholder='password' required onChange={handleinput} />
           
            <button > Submit </button>
                  </form>
    </div>
  )
}

export default OrgLogin
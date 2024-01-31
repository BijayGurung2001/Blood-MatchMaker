
import NavBar from '../Components/NavBar'
import { Link } from 'react-router-dom'
import signuppic from '../Photos/9.webp'
import { useState } from 'react'
import '../css/Signup.css'
import axios from 'axios'
//import useApihooks from '../Hooks/APIhooks'

const Signup = () => {
 // const {data, error, sendData}=useApihooks()
  const [Input, SetInput]=useState({
    fullname:"",
    email:"",
    dob:"",
    bloodtype:"",
    password:""
    
  })
  const HandleInput =(e)=>{
    e.preventDefault();
    SetInput({...Input,[e.target.name]:e.target.value})
    console.log(Input)
  }
  const handlesignupform=async(e)=>{
    //const url='https://localhost:5000/signup'
    //const method='post'
    //send data to backend
    //sendData(url, method, Input)
    e.preventDefault();
    try{
      await axios.post('http://localhost:5000/signup', Input);
    }catch(err){
      console.log(err)
    }
   
    
  }
  return (
    <div className="signup">
      <img className='spic' src={signuppic}/>
      <NavBar/>
      <div className="signup_container">
       
        <div className="signup_elements">
           <h3>Sign UP Page</h3>
        </div>
        <div className="signup_entries">
         <form method='post' onSubmit={handlesignupform}>
         <div className="forminput">
          <label >Full Name :</label>
          <input type='fullname' name='fullname'  placeholder='full name' required onChange={HandleInput}/>
           </div>
           <div className="dobforminput">
          <label>Email :</label>
          <input type='email' name='email'  placeholder='email' required onChange={HandleInput}/>
           </div>
           <div className="forminput">
          <label>Date of Birth:</label>
          <input type='date' name='dob'  placeholder='dob' required onChange={HandleInput}/>
           </div>
           
           <div className="forminput">
          <label>BloodType :</label>
          <select id='bloodoption' name='bloodoption'>
            <option value='o+'>O+</option>
            <option value='o-'>O-</option>
            <option value='a+'>A+</option>
            <option value='a-'>A-</option>
            <option value='ab+'>AB+</option>
            <option value='ab-'>AB-</option>
          </select>
           </div>
         
          <div className="forminput">
          <label>Password :</label>
          <input type='password' name='password'  placeholder='password' required onChange={HandleInput}/>
           </div>
          
          <button >Sign Up</button>
          <li id='quicktab'>Already have account <Link to="/login" id='signup'>Login</Link></li>

         </form>
        </div>
      </div>
    
    </div>
  )
}



export default Signup
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/orgprofile.css'
import NavBar from '../Components/NavBar'
import { useNavigate } from 'react-router-dom'

const OrgProfile = () => {
  const [links, setLinks] =useState('inventory')
  console.log(links)
 const nav=useNavigate()
  const[orgData, setOrgData]=useState({})
  const id=localStorage.getItem('id');

  useEffect(()=>{
    const fetchdata=async()=>{
try {
  const response=await axios.post('http://localhost:5000/orgprofile', {id:id} )
  const data=response.data;
  
  if(data){
    setOrgData(data)
  }else{
    console.log("no data found")
  }
} catch (error) {
  console.log(error);
}
    }
if(id){
  fetchdata()
}
  },[id])
   const handlelogout=(e)=>{
    localStorage.removeItem('id')
nav('/orglogin')
        }
const handleclick=(e)=>{
  setLinks(e.target.value)

}
  return (
    <div className="org_profile">
      <NavBar/>
      
         <div className="org_info">
         <div className='org_details'>
        {orgData.org ? (
               <>
               <tr>
              <th id='org_data'>Organization Details :</th>
               </tr>
               <tr>
                <td id='org_data'>ID :</td>
                <td id='org_data'>{orgData.org.id}</td>
               </tr>
               <tr>
                <td id='org_data'>Name :</td>
                <td id='org_data'>{orgData.org.orgname}</td>
               </tr>
               <tr>
                <td id='org_data'>Address :</td>
                <td id='org_data'>{orgData.org.orgaddress}</td>
               </tr>
               <tr>
                <td id='org_data'>Contact :</td>
                <td id='org_data'>{orgData.org.orgcontact}</td>
               </tr>
               <tr>
                <td id='org_data'>Email :</td>
                <td id='org_data'>{orgData.org.orgemail}</td>
               </tr>
                  <p>UPDATE INFO</p>
                  <p>Delete Account</p> 
                  <button onClick={handlelogout}>Logout</button>       
                 </>
        ):(
        <p>No data available </p>)
                }
         </div>  
         <div className="org_selection">
          <div className="org_links">
            <li><button onClick={handleclick} value='inventory'>Inventory</button></li>
            <li><button onClick={handleclick} value='update'>Update</button></li>
            <li><button onClick={handleclick} value='requests'>Requests</button></li>
          </div>
          <div className="org_links_details">
           {links ? (
            <>
              <div className="bloodtypes">
              <p>O+</p>
              <p>1</p>
             </div>
             <div className="bloodtypes">
              <p>O-</p>
              <p>1</p>
             </div>
             <div className="bloodtypes">
              <p>A+</p>
              <p>1</p>
             </div>
             <div className="bloodtypes">
              <p>A-</p>
              <p>1</p>
             </div>
             <div className="bloodtypes">
              <p>AB+</p>
              <p>1</p>
             </div>
             <div className="bloodtypes">
              <p>AB-</p>
              <p>1</p>
             </div>
             </>
           ):(<p>There is no page available</p>)
           }
          {links?(
            <>
             <p>No update page available</p>
            </>
  ):(
          <>
          <p>No update page available</p>
          </>
          )}

          </div>
         </div>
         </div>
         
            
       
    </div>
  )
}

export default OrgProfile
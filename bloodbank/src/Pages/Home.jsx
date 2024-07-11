import React from 'react'
import NavBar from '../Components/NavBar'
import Intro from '../Components/Intro'
import News from '../Components/News'
import Options from '../Components/Options'
import Details from '../Components/Details'
import Footer from '../Components/Footer'
import '../css/Home.css'


const Home = () => {
  return (
    <div className='home'>
    
     <div className='home_comp'>
     <NavBar/>
      <Intro/>
      <News/>
      <Options/>
      <Details/>
      <Footer/>
     </div>
      
      
    </div>
  )
  }

export default Home
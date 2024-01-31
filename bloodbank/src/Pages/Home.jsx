import React from 'react'
import NavBar from '../Components/NavBar'
import Intro from '../Components/Intro'
import News from '../Components/News'
import Options from '../Components/Options'
import Details from '../Components/Details'
import Footer from '../Components/Footer'



const Home = () => {
  return (
    <div className='home'>
        <NavBar/>
      <Intro/>
      <News/>
      <Options/>
      <Details/>
      <Footer/>
      
    </div>
  )
  }

export default Home
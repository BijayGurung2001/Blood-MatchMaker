import React from 'react'
import photo from '../Photos/2.png'
import '../css/intro.css';


const Intro = () => {
  
  return (
    <div className="intro">

      <div className="intro_info">
       <h1>Blood <br></br> MatchMaker</h1>
       <div className="intro_container">
        <h2>A trusted site to search <br></br>nearby blood banks organizations.</h2>
        <button>Search Blood</button>
       </div>
      </div>
      <div className="intro_img">
        <img id='intro_img_photo' src={photo} />
        
        <p id="donation">DONATION <br/> is more important <br/> than <br/> thinking to donate.</p>
      </div>
      
    </div>
  )
}

export default Intro
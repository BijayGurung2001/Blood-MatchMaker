import React from 'react'
import '../css/details.css'
import picone from '../Photos/7.png'
import pictwo from '../Photos/8.png'


const Details = () => {
 
return (
   <div className="details">
    <div className="details_container">
    <h4>Introduction of <spam id='detailmain'>BLOOD MATCHMAKER</spam></h4>
    <div className="details_picture">
      <img id='detailpic' src={picone} />
      <img id='detailpic' src={pictwo} />
    </div>
   <p id='detailsp'>Blood MatchMaker is a non-profit organization came into begin in 2023.
We are Nepal based organization helping user to find the nearby blood bank organizations that have availability of requirements. 
</p>
<button id='detailsbutton'>Learn More</button>
    </div>
    <div className="details_options">
     <button id='detailsbutton'>Our Mission </button>
     <button id='detailsbutton'>Our Vission </button>
     <button id='detailsbutton'>Objective& Function </button>
    </div>
   </div>
  )
}

export default Details
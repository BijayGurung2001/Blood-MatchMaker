import React from 'react'
import picture from '../Photos/5.jpg'
import '../css/news.css'

const News = () => {
  return (
    <div className="news">
      <h3>Latest Events and News :</h3>
      <div className="news_container">
        <img  src={picture} />
        <div className="news_elements">
          <p><spam  className='tittle'>Blood Donation program <br/> held in Boudha-8 </spam></p>
          <p id='date'>28th OCT 2023</p>
          <p id='info'>There will be three days program where many have help to save life by simply donating blood. If you also want to save life by donating blood then please visit the near by donation program or blood bank organization.</p>
        <button>READ MORE</button>
        </div>
      </div>
    </div>
  )
}

export default News
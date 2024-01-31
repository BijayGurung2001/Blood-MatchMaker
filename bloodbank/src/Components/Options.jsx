import React from 'react'

import '../css/option.css'

const Options = () => {
  const data=[{
    title:"Become a Member",
    sub:"Join Us!!"
  },
  {
    title:"Donate Blood",
    sub:"Save Life!!"
  },
  {
    title:"Search nearby Blood Bank",
    sub:"Search !!"
  }
]
  return (
    <div className="option">
       
       
        {data.map((e)=>{
         return(
          <div className="optiondesign">
       
            <p id='headlogo'>a</p>
          <div className='body'>
          <p>{e.title}</p>
          <p>{e.sub}</p>
          </div>
          </div>
         )
        })}

      
    
    </div>
  )
}

export default Options
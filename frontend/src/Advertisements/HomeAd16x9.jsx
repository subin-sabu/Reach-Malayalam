import React from 'react'
import ad from "./ReachAd16x9.jpg"
import { Link } from 'react-router-dom'

function HomeAd16x9({className}) {
  return (
    <div className={className}>
      <Link to='/kerala/2024-04-20T17:10:20.307Z' alt='ad link' style={{textDecoration:'none', color:'inherit'}}>
        {/* Add 'aspectRatio:"16/9",' to img style to set aspect ratio  */}
      <img style={{ maxWidth:'100%', marginTop:'1rem'}} src={ad} alt="home ad2 16*9" />
      </Link>
    </div>
  )
}

export default HomeAd16x9
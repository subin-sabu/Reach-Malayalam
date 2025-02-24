import React from 'react'
import ad from "./kerala_vision_ad.jpeg"
import { Link } from 'react-router-dom'

function HomeAd16x9_2({className}) {
  return (
    <div className={className}>
      <Link to='https://www.keralavisionisp.com/search-plans' alt='ad link' style={{textDecoration:'none', color:'inherit'}}>
      <img style={{aspectRatio:"16/9", maxWidth:'100%', marginTop:'1rem'}} src={ad} alt="home ad2 16*9" />
      </Link>
    </div>
  )
}

export default HomeAd16x9_2


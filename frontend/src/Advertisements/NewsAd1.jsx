import React from 'react'
import altAd from './banner.gif'
import { Link, useMediaQuery } from '@mui/material'
import Ad from './ayurveda.jpg'



//className prop helps apply custom css (eg. to hide in grid) when used in different pages. 
function NewsAd1({className}) {
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    
    <div className={className} style={{ marginTop: '1rem' , marginBottom:'0.5rem', display:'flex' , justifyContent:'center'}}>
      <Link  target="_blank" rel="noopener noreferrer" alt='news ad1 link' style={{textDecoration:'none', color:'inherit'}}>
        <img  style={{
            width: isMdUp ? '50vw' : '100%', // Set width to 60vw on md and up screens, and 100% on xs and sm screens
            maxWidth: '100%',
          }}
          src={Ad || altAd} alt="NewsAd1" />
      </Link>

    </div>
    
  )
}

export default NewsAd1
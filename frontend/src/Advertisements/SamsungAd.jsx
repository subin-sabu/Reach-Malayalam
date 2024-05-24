import React from 'react'
import Ad from './kalari.jpg'
import { Link } from '@mui/material'


//className prop helps apply custom css (eg. to hide in grid) when used in different pages. 
function HomeAd1({className}) {
  return (
    
    <div className={className} style={{ marginTop: '1rem' , marginBottom:'0.5rem'}}>
      <Link target="_blank" rel="noopener noreferrer"  href="https://agasthyam.com/" alt='home ad1 link' style={{textDecoration:'none', color:'inherit'}}>
        <img style={{ width: '100%' }}
          src={Ad} alt="HomeAd1" />
      </Link>

    </div>
    
  )
}

export default HomeAd1
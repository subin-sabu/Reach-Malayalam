import React from 'react'
import altAd from './banner.gif'
import { Link } from '@mui/material'
import Ad from './umesh banner.jpg'


//className prop helps apply custom css (eg. to hide in grid) when used in different pages. 
function HomeAd1({className}) {
  return (
    
    <div className={className} style={{ marginTop: '1rem' , marginBottom:'0.5rem'}}>
      <Link href="https://www.justdial.com/Kasaragod/Umesh-Kamath-Co-Near-Minarva-Theatre-Kanhangadaffic-Circle-Kanhangad/9999P4994-4994-140308113806-A5Y9_BZDET" target="_blank" rel="noopener noreferrer" alt='home ad1 link' style={{textDecoration:'none', color:'inherit'}}>
        <img style={{ width: '100%' , border: '1px solid lightgray'}}
          src={Ad || altAd} alt="HomeAd1" />
      </Link>

    </div>
    
  )
}

export default HomeAd1
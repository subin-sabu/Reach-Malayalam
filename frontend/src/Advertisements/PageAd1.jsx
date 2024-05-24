
import React from 'react'
import Ad from './banner.gif'
import {Link} from 'react-router-dom'

function NewsAd1() {
  return (
    <div style={{marginTop:'1rem', marginBottom:'1rem'}}>
      <Link to="/kerala/2024-04-20T17:10:20.307Z" alt='ad banner category page' style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={Ad} alt="reach promo" style={{ display: 'flex', width: '100%', marginTop: '1rem' }} />
      </Link>

    </div>
  )
}

export default NewsAd1
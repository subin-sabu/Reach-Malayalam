import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';




function handleClick(event) {
  event.preventDefault();

}

export default function HomeBreadcrumbs({ category }) {


  return (
    <div role="presentation" onClick={handleClick} style={{paddingBottom:'0.4rem'}}>
      <Breadcrumbs aria-label="breadcrumb" >
        <Link to="/" style={{ color: '#212121', textDecoration: 'none', }}>
          Home
        </Link>
      </Breadcrumbs>
    </div>
  );
}
import React , { useEffect } from 'react'
import NewsForm from '../Components/NewsForm/NewsForm'
import { Container } from '@mui/system'

function ReportNews() {

 // Scrolls to the top of the page when the component mounts
 useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div>
      
    <NewsForm />
      
    </div>
  )
}

export default ReportNews
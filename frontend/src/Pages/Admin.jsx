import React, { useEffect } from 'react'
import AdminPage from '../Components/Admin Page/AdminPage'



function Admin() {

  // Scrolls to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <AdminPage />
    </div>
  )
}

export default Admin
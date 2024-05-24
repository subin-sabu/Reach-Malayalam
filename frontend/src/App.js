
import React, { useContext, useEffect} from 'react';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router';
import { NewsContext } from './Context/NewsContext';
import { CircularProgress, Typography } from '@mui/material';


import Navbar from './Components/Navbar/Navbar';
import TopNav from './Components/Navbar/TopNav';
import Footer from './Components/Footer/Footer';

//Pages
import Home from './Pages/Home';
import News from './Pages/News';
import Kerala from './Pages/Kerala';

//Admin routes
import NewsManager from './Pages/NewsManager';
import Admin from './Pages/Admin';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Components/Admin Login/Login';
import ReportNews from './Pages/ReportNews';
import HomeAd1 from './Advertisements/HomeAd1';
import NewsEditForm from './Pages/NewsEditForm';
import EditForm from './Components/NewsForm/EditForm'
import { NewsBulletForm } from './Components/NewsForm/NewsBulletForm';
import NewsBulletManager from './Components/NewsBullets/NewBulletManager';
import EditBullet from './Components/NewsForm/EditBullet'
//Admin routes end
// Import your loader image
import LoaderImage from './Components/Assets/logo200.png';

// Utility function to clean up hash URLs
const cleanHashURL = (location, navigate) => {
  if (location.hash) {
    let cleanUrl = location.hash.replace(/^#/, ''); // Remove leading hash
    // Check if the hash URL matches Type 1 or Type 2
    if (cleanUrl.startsWith('/#')) {
      // Convert Type 1 or Type 2 to Type 3
      cleanUrl = cleanUrl.replace('/#', '/');
      navigate(cleanUrl, { replace: true });
    } else {
      // Already Type 3, no need for conversion
      navigate(cleanUrl, { replace: true });
    }
  }
};



// Wrapper component to clean hash URLs
const HashURLCleaner = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    cleanHashURL(location, navigate);
  }, [location, navigate]);

  return children;
};

function App() {
  const { contextLoading } = useContext(NewsContext);

  return (
    <div>
      <HashURLCleaner>
        {/* Conditionally render the loader if context is loading */}
        {contextLoading && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(24, 24, 24, 0.8)', zIndex: 9999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={LoaderImage} alt="Loading..." style={{ width: '200px', height: 'auto' }} />
            <CircularProgress style={{ marginTop: '20px' }} />
            <Typography variant="body1" style={{ marginTop: '10px', color: 'white' }}>Setting up the best experience for you...</Typography>
          </div>
        )}

        <Navbar />
        <TopNav />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='Home' element={<Home />} />
          <Route path='/:category/:id' element={<News />} />
          <Route path='/:category' element={<Kerala />} />




          <Route path='/login' element={<Login />} />
          {/* Protected route wrap for admin routes */}
          <Route path='/Admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path='/ReportNews' element={<ProtectedRoute><ReportNews /></ProtectedRoute>} />
          <Route path='/NewsManager' element={<ProtectedRoute><NewsManager /></ProtectedRoute>} />
          <Route path='/newsmanager/edit/:id' element={<ProtectedRoute><NewsEditForm /></ProtectedRoute>} />
          <Route path='/newsmanager/editor/:id' element={<ProtectedRoute><EditForm /></ProtectedRoute>} />
          <Route path='/newsbullet' element=
            {<ProtectedRoute><NewsBulletForm /></ProtectedRoute>} />
          <Route path='/NewsBulletManager' element={<ProtectedRoute><NewsBulletManager /></ProtectedRoute>} />
          <Route path='/newsbulletmanager/editor/:id' element={<ProtectedRoute><EditBullet /></ProtectedRoute>} />


        </Routes>
        <Footer />
      </HashURLCleaner>

    </div>
  );
}

export default App;

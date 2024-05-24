import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme'
import { app } from './firebase/config';
import { NewsProvider } from './Context/NewsContext'
import { AuthProvider } from './Context/AuthContext';
import { BulletProvider } from './Context/BulletContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NewsProvider>
          <BulletProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </BulletProvider>
        </NewsProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);



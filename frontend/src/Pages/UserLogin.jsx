import React, { useState , useEffect} from 'react';
import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 
import {auth} from '../firebase/config'



const UserLogin = ({ onLogin, errorMessage }) => {

  // Scrolls to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(auth)
  const [isLoading, setIsLoading]=useState(false);
  
  const [loginData, setLoginData] = useState({
    userIdEmail: '',
    password: '',
    keepSignedIn: false,
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: name === 'keepSignedIn' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(loginData);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom align="center">
              Login
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userIdEmail"
                  label="User ID (Email)"
                  name="userIdEmail"
                  autoComplete="username"
                  value={loginData.userIdEmail}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={handleChange}
                />
                {errorMessage && (
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={loginData.keepSignedIn}
                      onChange={handleChange}
                      name="keepSignedIn"
                      color="primary"
                    />
                  }
                  label="Keep me signed in"
                />
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Link to="/Forgot" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Link to="/SignUp" variant="body2" style={{ textDecoration: 'none', marginTop: '8px' }}>
                  Create an Account
                </Link>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserLogin;

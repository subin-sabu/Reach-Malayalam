import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import reach from '../Assets/logo512.png';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {useAuth} from '../../Context/AuthContext'
import NewsScroll from '../NewsScroll/NewsScroll';
import pages from './Categories';




// Mock functions and data
const isAuthenticated = () => false;
const getUserProfile = () => ({ name: "John Doe", profilePic: "" });


const settings = isAuthenticated() ? ['Profile', 'Account', 'Dashboard', 'Logout'] : [''];

function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSettingsOpen, setMobileSettingsOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSettingsToggle = () => {
    setMobileSettingsOpen(!mobileSettingsOpen);
  };

  

  const user = getUserProfile();

  const drawerPages = (
    <Box onClick={handleDrawerToggle} sx={{ width: 200 }}>
      <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>
        Pages
      </Typography>
      <List>
        {pages.map((page) => (
          <ListItem key={page.english} disablePadding>
            <ListItemButton  onClick={() => navigate(`/${page.english}`)}>
              <ListItemText sx={{variant:'body2', 'span':{fontWeight:'600', }}} primary={page.malayalam} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const drawerSettings = (
    <Box onClick={handleSettingsToggle} sx={{ width: 200 }}>
      <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>
        Settings
      </Typography>
      <List>
        {settings.map((setting) => (
          <ListItem key={setting} disablePadding>
            <ListItemButton onClick={() => navigate(`/${setting}`)}>
              <ListItemText sx={{'span':{fontWeight:'500',}}} primary={setting} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

const { currentUser } = useAuth();
console.log(currentUser)

  return (
    <AppBar sx={{ bgcolor: '#181818' }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* Logo/Image Box */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, paddingRight: {xs: '40px', md: 'none'}}} >
            <Link to="/" style={{textDecoration:'none'}}>
              <img src={reach} alt="Logo" style={{ maxHeight: '90px' }} />
            </Link>
          </Box>
          {/* Navigation Links for Larger Screens */}
          <Box sx={{
            flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-start', overflowX: 'auto', whiteSpace: 'nowrap', 
            WebkitOverflowScrolling: 'touch',
            '-ms-overflow-style': 'none',
            scrollbarWidth: 'none', 
          }}>
            {pages.map((page, index) => (
              <Button
                key={page.english}
                onClick={() => navigate(`/${page.english}`)}
                sx={{
                  my: 2, color: 'white', display: 'inline-block', flexShrink:'0', fontWeight:'600', variant:'body2',
                  // Preserve original spacing between nav items
                  marginLeft: index !== 0 ? '5px' : null,
                }}
              >
                {page.malayalam}
              </Button>
            ))}
          </Box>
          {/* User Account Icon/Avatar */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleSettingsToggle} sx={{ p: 0, mr: 0, display: { md: 'none', xs: 'none' } }}>
                <Avatar><AccountCircleIcon /></Avatar>
              </IconButton>
            </Tooltip>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {settings.map((setting) => (
                <Button key={setting} onClick={() => navigate(`/${setting}`)} sx={{ color: 'white' }}>
                  {setting}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
      {/* Mobile Drawer for Pages */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', md: 'none', fontWeight:'600', } }}
      >
        {drawerPages}
      </Drawer>
      {/* Mobile Drawer for Settings */}
      <Drawer
        anchor="right"
        open={mobileSettingsOpen}
        onClose={handleSettingsToggle}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawerSettings}
      </Drawer>

      <NewsScroll/>
    </AppBar>
  );
}

export default Navbar;

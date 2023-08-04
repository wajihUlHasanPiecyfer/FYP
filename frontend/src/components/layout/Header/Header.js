import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import UserOptions from "./UserOptions.js";
import { Link } from 'react-router-dom';


function ResponsiveAppBar({ isAuthenticated, user }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (

    <div className='overflow-hidden'>

    <AppBar position="fixed" sx={{
      backgroundColor: '#2f2c2c',
      width: "fit"
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '0rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { color: "grey" }
            }}
          >
            Scholor's Library
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                <Typography textAlign="center" key="Home" color="text.secondary">Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/books">
                <Typography textAlign="center"key="Books" color="text.secondary">Books</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/about">
                <Typography textAlign="center"key="About" color="text.secondary">About</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/contact">
                <Typography textAlign="center"key="Contact" color="text.secondary">Contact</Typography>
                </MenuItem>
                {!isAuthenticated ? (
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/login">
                <Typography textAlign="center"key="Login" color="text.secondary">Login</Typography>
              </MenuItem>
            ) : null}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '0rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { color: "grey" }
            }}
          >
            Scholor's Library
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button
              component={Link}
              to="/"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2, color: 'white', display: 'block',
                '&:hover': { color: "#2f2c2c", bgcolor: 'white' }
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/books"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2, color: 'white', display: 'block',
                '&:hover': { color: "#2f2c2c", bgcolor: 'white' }
              }}
            >
              Books
            </Button>
            <Button
              component={Link}
              to="/about"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2, color: 'white', display: 'block',
                '&:hover': { color: "#2f2c2c", bgcolor: 'white' }
              }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/contact"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2, color: 'white', display: 'block',
                '&:hover': { color: "#2f2c2c", bgcolor: 'white' }
              }}
            >
              Contact
            </Button>
            {!isAuthenticated ? (

              <Button
              component={Link}
              to="/login"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2, color: 'white', display: 'block',
                  '&:hover': { color: "#2f2c2c", bgcolor: 'white' }
                }}
              >
                Login
              </Button>
            ) : null}
          </Box>

          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <UserOptions user={user} />
              </IconButton>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
              </div>
  );
}
export default ResponsiveAppBar;
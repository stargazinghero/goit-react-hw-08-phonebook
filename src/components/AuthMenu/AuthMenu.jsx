import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function AuthMenu({ setAnchorElNav }) {
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <Link to={'/register'} style={{ textDecoration: 'none', color: 'white' }}>
        <Button
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Register
        </Button>
      </Link>

      <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>
        <Button
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Login
        </Button>
      </Link>
    </>
  );
}

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Avatar from '@mui/material/Avatar';
import { ButtonBase } from '@mui/material';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from 'redux/auth/authOperations';
import { getUserEmail, getUserName } from 'redux/auth/authSlice';

const settings = ['Logout'];

export default function UserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector(getUserEmail);
  const userName = useSelector(getUserName);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const getShortName = name => {
    return name
      ?.trim()
      .split(' ')
      .map(word => word[0])
      .join('');
  };

  const logOut = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Typography color="white" marginRight={2}>
            {userEmail}
          </Typography>
          <Avatar>{getShortName(userName)}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(setting => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <ButtonBase onClick={logOut}>
              <Typography textAlign="center">{setting}</Typography>
            </ButtonBase>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { setLogout } from '@containers/Client/actions';
import { setLocale, setTheme } from '@containers/App/actions';

import classes from './style.module.scss';
import { selectUserDetails } from '@containers/Client/selectors';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 240,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const NavbarAdmin = ({ title, locale, theme, children, userDetails }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openLang = Boolean(menuPosition);
  const isSelectedLoc = (path) => location.pathname === path;

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const goHome = () => {
    if (userDetails?.user_role == 1) {
      navigate('/admin');
    } else if (userDetails?.user_role == 2) {
      navigate('/manager');
    } else if (userDetails?.user_role == 3) {
      navigate('/member');
    } else {
      navigate('/')
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open} className={classes.appBar}>
        <Toolbar sx={{ pr: '24px', }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logoImage} onClick={goHome}>
            <img src="/vite.svg" alt="logo" className={classes.logo} />
            <div className={classes.title}>{title}</div>
          </div>
          <Box className={classes.toolbar}>
            <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
              {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
            </div>
            <div className={classes.toggle} onClick={handleClick}>
              <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
              <div className={classes.lang}>{locale}</div>
              <ExpandMoreIcon />
            </div>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu open={openLang} anchorEl={menuPosition} onClose={handleClose}>
            <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/id.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_id" />
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/en.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_en" />
                </div>
              </div>
            </MenuItem>
          </Menu>
          <Menu
            sx={{
              mt: '45px',
              '& .MuiPaper-root': {
                backgroundColor: theme === 'light' ? '#fff' : '#4f4557',
              },
            }}
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
            <MenuItem disabled>
              <div>
                <p>Hi, {userDetails?.user_name}</p>
              </div>
            </MenuItem>
            <MenuItem onClick={() => { handleCloseUserMenu, navigate('/profile') }}>
              <Typography textAlign="center">
                <FormattedMessage id='profile_myProfile' />
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={
                () => {
                  handleCloseUserMenu,
                    dispatch(setLogout());
                  navigate('/login')
                }
              }>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <Box className={classes.drawer}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <List component="nav" sx={{ mt: 4 }} className={classes.listContainer}>
            <Box className={classes["side-bar-toolbar"]}>
              <ListItem >
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={`Hi, ` + userDetails?.user_name} />
              </ListItem>
              <ListItemButton onClick={() => { handleCloseUserMenu, navigate('/profile') }}>
                <ListItemIcon>
                  <AccountCircle className={userDetails?.user_role === 2 ? isSelectedLoc('/manager') : isSelectedLoc('/admin') && classes.dashboardIcon} />
                </ListItemIcon>
                <FormattedMessage id="profile_myProfile" />
              </ListItemButton>
              <ListItemButton onClick={
                () => {
                  handleCloseUserMenu,
                    dispatch(setLogout());
                  navigate('/login')
                }
              }>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <FormattedMessage id='logout' />
              </ListItemButton>
              <Divider />
            </Box>
            <ListItemButton className={userDetails?.user_role === 2 ? isSelectedLoc('/manager') : isSelectedLoc('/admin') && classes.listActive} onClick={() => navigate(userDetails?.user_role === 2 ? '/manager' : '/admin')}>
              <ListItemIcon>
                <DashboardIcon className={userDetails?.user_role === 2 ? isSelectedLoc('/manager') : isSelectedLoc('/admin') && classes.dashboardIcon} />
              </ListItemIcon>
              <FormattedMessage id="drawer_dashboard" />
            </ListItemButton>
            {
              userDetails?.user_role === 2 ?
                null
                :
                <ListItemButton className={isSelectedLoc('/admin/user-list') && classes.listActive} onClick={() => navigate('/admin/user-list')}>
                  <ListItemIcon>
                    <AccountCircle className={isSelectedLoc('/admin/user-list') && classes.AccountCircle} />
                  </ListItemIcon>
                  <FormattedMessage id="drawer_user_list" />
                </ListItemButton>
            }
            <ListItemButton className={userDetails?.user_role === 2 ? isSelectedLoc('/manager/task') : isSelectedLoc('/admin/task') && classes.listActive} onClick={() => navigate(userDetails?.user_role === 2 ? '/manager/task' : '/admin/task')}>
              <ListItemIcon>
                <AssignmentIcon className={userDetails?.user_role === 2 ? isSelectedLoc('/manager/task') : isSelectedLoc('/admin/task') && classes.assignIcon} />
              </ListItemIcon>
              <FormattedMessage id="drawer_task_data" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

NavbarAdmin.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
  userDetails: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectUserDetails
})

export default connect(mapStateToProps)(NavbarAdmin);
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Toolbar from './components/Toolbar';
import MobileToolbar from './components/MobileToolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import { useState } from 'react';

import classes from './style.module.scss';

const Navbar = ({ title, locale, theme }) => {
  const userDetails = useSelector((state) => state.client.userDetails);

  const navigate = useNavigate();
  const goHome = () => {
    if (userDetails?.role == 1) {
      navigate('/admin');
    } else if (userDetails?.role == 2) {
      navigate('/manager');
    } else if (userDetails?.role == 3) {
      navigate('/member');
    } else {
      navigate('/')
    }
  };

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src="/vite.svg" alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes["hamburger-icon-wrapper"]}>
          <MenuIcon onClick={() => setHamburgerOpen(true)}></MenuIcon>
        </div>
        <Drawer
          open={hamburgerOpen}
          anchor={"right"}
          onClose={() => setHamburgerOpen(false)}
        >
          <div className={classes["drawer-wrapper"]}>
            <MobileToolbar userDetails={userDetails} locale={locale} theme={theme} />
          </div>
        </Drawer>
        <Toolbar userDetails={userDetails} locale={locale} theme={theme} />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

export default Navbar;

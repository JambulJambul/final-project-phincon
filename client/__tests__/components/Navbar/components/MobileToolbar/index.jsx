import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { setLogout } from '@containers/Client/actions';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import { setLocale, setTheme } from '@containers/App/actions';

import classes from '../../style.module.scss'

const MobileToolbar = ({ userDetails, locale, theme }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [langMenuPosition, setlangMenuPosition] = useState(null);
    const langMenuOpen = Boolean(langMenuPosition);

    const handleLangClick = (event) => {
        setlangMenuPosition(event.currentTarget);
    };

    const handleLangClose = () => {
        setlangMenuPosition(null);
    };

    const onSelectLang = (lang) => {
        if (lang !== locale) {
            dispatch(setLocale(lang));
        }
        handleLangClose();
    };

    const handleTheme = () => {
        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
    };


    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/login');
    }


    const profileNavigate = () => {
        navigate('/profile');
    }

    const loginNavigate = () => {
        navigate('/login');
    }

    const registerNavigate = () => {
        navigate('/register');
    }

    return (
        <>
            <div className={classes.toolbar}>
                {userDetails != null ? (
                    <>
                        <List>
                            <ListItem >
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText primary={`Hi,` + userDetails?.name} />
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={profileNavigate}>
                                    <FormattedMessage id='profile_myProfile' />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleLogout}>
                                    <FormattedMessage id='logout' />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton className={classes.toggle} onClick={handleLangClick}>
                                    <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
                                    <div className={classes.lang}>{locale}</div>
                                    <ExpandMoreIcon />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton className={classes.theme} onClick={handleTheme}>
                                    {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
                                    {theme === 'light' ? <p className={classes["theme-text"]}><FormattedMessage id='dark_mode' /></p> : <p className={classes["theme-text"]}><FormattedMessage id='light_mode' /></p>}
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                ) : (
                    <>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={loginNavigate}>
                                    <FormattedMessage id='login' />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={registerNavigate}>
                                    <FormattedMessage id='register' />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton className={classes.toggle} onClick={handleLangClick}>
                                    <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
                                    <div className={classes.lang}>{locale}</div>
                                    <ExpandMoreIcon />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton className={classes.theme} onClick={handleTheme}>
                                    {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
                                    {theme === 'light' ? <p className={classes["theme-text"]}><FormattedMessage id='dark_mode' /></p> : <p className={classes["theme-text"]}><FormattedMessage id='light_mode' /></p>}
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                    // <>
                    //     <Link to={'/login'}>
                    //         <button className={classes["button"]}>
                    //             <FormattedMessage id='login' />
                    //         </button>
                    //     </Link>
                    //     <Link to={'/register'}>
                    //         <button className={classes["button"]} >
                    //             <FormattedMessage id='register' />
                    //         </button>
                    //     </Link>
                    // </>
                )}
            </div >
            <Menu open={langMenuOpen} anchorEl={langMenuPosition} onClose={handleLangClose}>
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
        </>
    )
}
export default MobileToolbar
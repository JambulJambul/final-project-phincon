import { SET_LOGIN, SET_TOKEN, SET_USER_DETAILS, SET_LOGOUT, SET_IS_ADMIN } from '@containers/Client/constants';

export const setLogin = (login) => {
  return {
    type: SET_LOGIN,
    login,
  }
};

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUserDetails = (userDetails) => ({
  type: SET_USER_DETAILS,
  userDetails,
});

export const setIsAdmin = (isAdmin) => ({
  type: SET_IS_ADMIN,
  isAdmin,
});

export const setLogout = () => ({
  type: SET_LOGOUT,
});
import { produce } from 'immer';

import { SET_LOGIN, SET_TOKEN, SET_USER_DETAILS, SET_LOGOUT, SET_IS_ADMIN } from '@containers/Client/constants';

export const initialState = {
  login: false,
  token: null,
  userDetails: null,
  isAdmin: false
};

export const storedKey = ['token', 'login', 'userDetails','isAdmin'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      case SET_USER_DETAILS:
        draft.userDetails = action.userDetails;
        break;
      case SET_IS_ADMIN:
        draft.isAdmin = action.isAdmin;
        break;
      case SET_LOGOUT:
        draft.login = draft.login = false;
        draft.token = null;
        draft.userDetails = null;
        draft.isAdmin = false;
        break;
    }
  });

export default clientReducer;

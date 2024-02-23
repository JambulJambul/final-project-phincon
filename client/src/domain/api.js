import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  register: 'auth/register',
  login: 'auth/login',
  userDelete: 'auth/user-delete',
  userRestore: 'auth/user-restore',
  allArena: 'arena/',
  arenaDetails: 'arena/details',
  createArena: 'arena/create',
  addArenaImage: 'arena/add-arena-image',
  restoreArena: 'arena/restore',
  deleteArena: 'arena/delete',
  getAllUsers: 'auth/',
  getUserById: 'auth/details/',
  updateUserById: 'auth/edit-profile/',
  ownerArena: 'arena/owner/'
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const fetchPokemon = () => callAPI(urls.ditto, 'GET');
export const example = (data) => {
  const header = {
    'Content-Type': 'multipart/form-data'
  }
  return callAPI(urls.ditto, 'GET', header, {}, data);
};

export const register = (dataUser) => {
  return callAPI(urls.register, 'POST', {}, {}, dataUser);
}

export const login = (dataUser) => {
  return callAPI(urls.login, 'POST', {}, {}, dataUser);
}

export const getAllUsers = (token) => {
  const authHeader = {
    'Authorization': `Bearer ${token}`
  };
  return callAPI(urls.getAllUsers, 'GET', { authHeader });
}

export const getUserById = (dataObject) => {
  const { token, user_id } = dataObject;
  const authHeader = {
    'Authorization': `Bearer ${token}`
  };
  return callAPI(`${urls.getUserById}${user_id}`, 'GET', { authHeader });
}

export const updateUserById = (userData) => {
  const { token, user_id, encryptedData } = userData;
  const authHeader = {
    'Authorization': `Bearer ${token}`
  };
  return callAPI(`${urls.updateUserById}${user_id}`, 'PATCH', { authHeader }, {}, { encryptedData });
}

export const ownerArena = (data) => {
  const { token, user_id } = data;
  const authHeader = {
    'Authorization': `Bearer ${token}`
  };
  return callAPI(`${urls.ownerArena}${user_id}`, 'GET', { authHeader });
}
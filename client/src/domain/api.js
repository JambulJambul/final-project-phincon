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
  ownerArena: 'arena/owner/',
  arenaDetails: 'arena/details/',
  getArenaCourt: 'arena/court/',
  getDailyCourtSchedule: 'arena/schedule/',
  createCourt: 'arena/court/create',
  addSchedule: 'arena/schedule/create',
  editSchedule: 'arena/schedule/edit',
  deleteSchedule: 'arena/schedule/delete'
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

export const arenaDetails = (data) => {
  return callAPI(`${urls.arenaDetails}${data?.arena_id}`, 'GET');
}

export const getArenaCourt = (data) => {
  const { token, arena_id } = data
  const authHeader = {
    'Authorization': `Bearer ${token}`
  };
  return callAPI(`${urls.getArenaCourt}${arena_id}`, 'GET', { authHeader });
}

export const getDailyCourtSchedule = (scheduleData) => {
  const { arena_id, selectedDay } = scheduleData
  return callAPI(`${urls.getDailyCourtSchedule}?arena_id=${arena_id}&schedule_day=${selectedDay}`, 'GET');
}

export const createCourt = (data) => {
  const { arena_id, court_name, token } = data
  const payload = { arena_id, court_name }
  const authHeader = {
    'Authorization': `Bearer ${token}`
  };
  return callAPI(`${urls.createCourt}`, 'POST', { authHeader }, {}, payload);
}

export const addSchedule = (data) => {
  const { selectedCourtId, selectedDay, schedule_start, schedule_end, schedule_price, token } = data
  const payload = { court_id: selectedCourtId, schedule_day: selectedDay, schedule_start, schedule_end, schedule_price }
  const authHeader = {
    'Authorization': `Bearer ${token}`
  };
  return callAPI(`${urls.addSchedule}`, 'POST', { authHeader }, {}, payload);
}

export const editSchedule = (data) => {
  const { selectedScheduleId, selectedCourtId, selectedDay, schedule_start, schedule_end, schedule_price, token } = data
  const payload = { court_id: selectedCourtId, schedule_day: selectedDay, schedule_start, schedule_end, schedule_price }
  const schedule_id = selectedScheduleId;
  const authHeader = {
    'Authorization': `Bearer ${token}`
  };
  return callAPI(`${urls.editSchedule}/${schedule_id}`, 'PATCH', { authHeader }, {}, payload);
}

export const deleteSchedule = (data) => {
  const { selectedScheduleId, token } = data
  console.log(data)
  const schedule_id = selectedScheduleId;
  const authHeader = {
    'Authorization': `Bearer ${token}`
  };
  console.log(`${urls.deleteSchedule}/${schedule_id}`)
  return callAPI(`${urls.deleteSchedule}/${schedule_id}`, 'DELETE', { authHeader });
}
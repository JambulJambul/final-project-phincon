import { GET_ALL_USERS, SET_ALL_USERS } from "./constants";

export const doGetAllUsers = (token, cbSuccess, cbFailed) => ({
    type: GET_ALL_USERS,
    token, 
    cbSuccess,
    cbFailed
})

export const doSetAllUsers = (userArray) => ({
    type: SET_ALL_USERS,
    userArray
})
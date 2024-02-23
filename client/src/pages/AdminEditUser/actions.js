import { GET_USER, SET_USER, UPDATE_USER } from "./constants";

export const doGetUser = (data, cbSuccess, cbFailed) => {
    return {
        type: GET_USER,
        data,
        cbSuccess,
        cbFailed
    }
}

export const doSetUser = (userData) => {
    return {
        type: SET_USER,
        userData
    }
}

export const doUpdateUser = (userData) => {
    return {
        type: UPDATE_USER,
        userData
    }
}
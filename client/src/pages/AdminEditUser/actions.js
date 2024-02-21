import { GET_USER, SET_USER } from "./constants";

export const doGetUser = (data, cbSuccess, cbFailed) => {
    console.log("TEST")
    return {
        type: GET_USER,
        data,
        cbSuccess,
        cbFailed
    }
}

export const doSetUser = (userData) => ({
    type: SET_USER,
    userData
})
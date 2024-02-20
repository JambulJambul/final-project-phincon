import { DO_LOGIN } from "./constants";

export const doLogin = (postData, cbSuccess, cbFailed) => ({
    type: DO_LOGIN,
    postData,
    cbSuccess,
    cbFailed
})
import { DO_REGISTER } from "./constants";

export const doRegister = (postData, cbSuccess, cbFailed) => ({
    type: DO_REGISTER,
    postData,
    cbSuccess,
    cbFailed
})
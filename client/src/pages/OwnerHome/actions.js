import { GET_OWNER_ARENA, SET_OWNER_ARENA } from "./constants";

export const doOwnerArena = (data, cbSuccess, cbFailed) => {
    return {
        type: GET_OWNER_ARENA,
        data,
        cbSuccess,
        cbFailed
    }
}

export const doSetOwnerArena = (ownerArena) => {
    return {
        type: SET_OWNER_ARENA,
        ownerArena
    }
}
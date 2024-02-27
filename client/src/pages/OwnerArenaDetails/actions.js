import { GET_ARENA_DETAILS, SET_ARENA_DETAILS } from "./constants";

export const doGetArenaDetails = (data, cbSuccess, cbFailed) => {
    return {
        type: GET_ARENA_DETAILS,
        data,
        cbSuccess,
        cbFailed
    }
}

export const doSetArenaDetails = (arenaData) => {
    return {
        type: SET_ARENA_DETAILS,
        arenaData
    }
}
import { GET_ARENA_DETAILS, SET_ARENA_DETAILS, SET_COURT, GET_DAILY_SCHEDULE, SET_DAILY_SCHEDULE, EMPTY_DAILY_SCHEDULE, CREATE_COURT } from "./constants";

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

export const doSetCourt = (court) => {
    return {
        type: SET_COURT,
        court
    }
}

export const doGetDailyCourtSchedule = (scheduleData, cbSuccess, cbFailed) => {
    return {
        type: GET_DAILY_SCHEDULE,
        scheduleData,
        cbSuccess,
        cbFailed
    }
}

export const doSetDailyCourtSchedule = (scheduleData) => {
    return {
        type: SET_DAILY_SCHEDULE,
        scheduleData
    }
}

export const doEmptyDailyCourtSchedule = () => {
    return {
        type: EMPTY_DAILY_SCHEDULE
    }
}

export const doCreateCourt = (data, cbSuccess, cbFailed) => {
    return {
        type: CREATE_COURT,
        data,
        cbSuccess,
        cbFailed
    }
}
import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { deleteSchedule, editSchedule, arenaDetails, getArenaCourt, getDailyCourtSchedule, createCourt, addSchedule } from '@domain/api';
import { EDIT_SCHEDULE, ADD_SCHEDULE, GET_ARENA_DETAILS, GET_DAILY_SCHEDULE, CREATE_COURT, DELETE_SCHEDULE } from './constants';
import { doSetArenaDetails, doSetCourt, doSetDailyCourtSchedule, doEmptyDailyCourtSchedule } from './actions';


function* doGetArenaDetails({ data, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const arenaResponse = yield call(arenaDetails, data)
        const courtResponse = yield call(getArenaCourt, data)
        yield put(doSetArenaDetails(arenaResponse?.arenaData))
        yield put(doSetCourt(courtResponse?.court))
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.arenaResponse?.data?.message)
    }
    yield put(setLoading(false));
}

function* doGetDailyCourtSchedule({ scheduleData, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const response = yield call(getDailyCourtSchedule, scheduleData)
        yield put(doSetDailyCourtSchedule(response?.schedule))
        cbSuccess && cbSuccess();
    } catch (error) {
        yield put(doEmptyDailyCourtSchedule())
        cbFailed && cbFailed(error?.arenaResponse?.data?.message)
    }
    yield put(setLoading(false));
}

function* doCreateCourt({ data, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const response = yield call(createCourt, data)
        console.log(response)
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.arenaResponse?.data?.message)
    }
    yield put(setLoading(false));
}

function* doAddSchedule({ data, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const response = yield call(addSchedule, data)
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.arenaResponse?.data?.message)
    }
    yield put(setLoading(false));
}

function* doEditSchedule({ data, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const response = yield call(editSchedule, data)
        console.log(response)
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.arenaResponse?.data?.message)
    }
    yield put(setLoading(false));
}

function* doDeleteSchedule({ data, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const response = yield call(deleteSchedule, data)
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.arenaResponse?.data?.message)
    }
    yield put(setLoading(false));
}

export default function* arenaDetailsSaga() {
    yield takeLatest(GET_ARENA_DETAILS, doGetArenaDetails);
    yield takeLatest(GET_DAILY_SCHEDULE, doGetDailyCourtSchedule);
    yield takeLatest(CREATE_COURT, doCreateCourt);
    yield takeLatest(ADD_SCHEDULE, doAddSchedule);
    yield takeLatest(EDIT_SCHEDULE, doEditSchedule);
    yield takeLatest(DELETE_SCHEDULE, doDeleteSchedule);
}
import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { arenaDetails } from '@domain/api';
import { GET_ARENA_DETAILS } from './constants';
import { doSetArenaDetails } from './actions';


function* doGetArenaDetails({ data, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const response = yield call(arenaDetails, data)
        yield put(doSetArenaDetails(response?.arenaData))
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.response?.data?.message)
    }
    yield put(setLoading(false));
}

export default function* arenaDetailsSaga() {
    yield takeLatest(GET_ARENA_DETAILS, doGetArenaDetails);
}
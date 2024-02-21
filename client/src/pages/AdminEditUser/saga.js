import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getUserById } from '@domain/api';
import { GET_USER } from './constants';
import { doSetUser } from './actions';


function* doGetUser({ data, cbSuccess, cbFailed }) {
    console.log("REACH ERE")
    yield put(setLoading(true));
    try {
        const response = yield call(getUserById, id, token)
        console.log(response)
        yield put(doSetUser(response?.users))
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.response?.data?.message)
    }
    yield put(setLoading(false));
}

export default function* adminEditUserSaga() {
    yield takeLatest(GET_USER, doGetUser);
}
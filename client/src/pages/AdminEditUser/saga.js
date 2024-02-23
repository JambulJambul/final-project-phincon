import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getUserById, updateUserById } from '@domain/api';
import { GET_USER, UPDATE_USER } from './constants';
import { doSetUser } from './actions';


function* doGetUser({ data, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const response = yield call(getUserById, data)
        yield put(doSetUser(response?.users))
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.response?.data?.message)
    }
    yield put(setLoading(false));
}

function* doUpdateUser({ userData, cbSuccess, cbFailed }) {
    console.log(userData)
    yield put(setLoading(true));
    try {
        const response = yield call(updateUserById, userData)
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.response?.data?.message)
    }
    yield put(setLoading(false));
}

export default function* adminEditUserSaga() {
    yield takeLatest(GET_USER, doGetUser);
    yield takeLatest(UPDATE_USER, doUpdateUser);
}
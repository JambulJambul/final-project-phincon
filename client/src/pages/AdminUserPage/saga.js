import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getAllUsers } from '@domain/api';
import { GET_ALL_USERS } from './constants';
import { doSetAllUsers } from './actions';


function* doGetAllUsers({ token, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const response = yield call(getAllUsers, token)
        yield put(doSetAllUsers(response?.users))
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.response?.data?.message)
    }
    yield put(setLoading(false));
}

export default function* adminUserListSaga() {
    yield takeLatest(GET_ALL_USERS, doGetAllUsers);
}
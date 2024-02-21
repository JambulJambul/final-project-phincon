import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { register } from '@domain/api';
import { DO_REGISTER } from './constants';

function* doRegister({ postData, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const response = yield call(register, postData);
        cbSuccess && cbSuccess();
    } catch (error) {
        if (error?.response?.data?.statusCode == 400) {
            cbFailed && cbFailed(error?.response?.data?.message)
        } else if (error?.response?.data?.statusCode == 401) {
            cbFailed && cbFailed("Please only use letters for the name (minimum 3 letters).")
        }
    }
    yield put(setLoading(false));
}

export default function* RegisterSaga() {
    yield takeLatest(DO_REGISTER, doRegister);
}
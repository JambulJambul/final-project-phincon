import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { ownerArena } from '@domain/api';
import { GET_OWNER_ARENA } from './constants';
import { doSetOwnerArena } from './actions';


function* doOwnerArena({ data, cbSuccess, cbFailed }) {
    yield put(setLoading(true));
    try {
        const response = yield call(ownerArena, data)
        yield put(doSetOwnerArena(response?.arenaData))
        cbSuccess && cbSuccess();
    } catch (error) {
        cbFailed && cbFailed(error?.response?.data?.message)
    }
    yield put(setLoading(false));
}

export default function* ownerHomepageSaga() {
    yield takeLatest(GET_OWNER_ARENA, doOwnerArena);
}
import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import loginSaga from '@pages/Login/saga';
import RegisterSaga from '@pages/Register/saga';
import adminUserListSaga from '@pages/AdminUserPage/saga';
import adminEditUserSaga from '@pages/AdminEditUser/saga';
import ownerHomepageSaga from '@pages/OwnerHome/saga';
import arenaDetailsSaga from '@pages/OwnerArenaDetails/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    RegisterSaga(),
    adminUserListSaga(),
    adminEditUserSaga(),
    ownerHomepageSaga(),
    arenaDetailsSaga()
  ]);
}
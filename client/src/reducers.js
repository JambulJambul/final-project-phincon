import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';
import adminUserListReducer from '@pages/AdminUserPage/reducer';
import adminEditUserReducer from '@pages/AdminEditUser/reducer';
import ownerHomepageReducer from '@pages/OwnerHome/reducer';
import arenaDetailsReducer from '@pages/OwnerArenaDetails/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
};

const temporaryReducers = {
  language: languageReducer,
  adminUserList: adminUserListReducer,
  adminEditUser: adminEditUserReducer,
  ownerHomepage: ownerHomepageReducer,
  arenaDetails: arenaDetailsReducer
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;

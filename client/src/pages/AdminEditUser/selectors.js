import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectAdminEditUserState = (state) => state.adminEditUser || initialState;

export const selectAdminEditUser = createSelector(selectAdminEditUserState, (state) => state.userData);
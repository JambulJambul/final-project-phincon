import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectAdminUserListState = (state) => state.adminUserList || initialState;

export const selectAdminUserList = createSelector(selectAdminUserListState, (state) => state.userArray);
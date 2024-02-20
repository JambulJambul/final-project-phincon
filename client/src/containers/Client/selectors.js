import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectClientState = (state) => state.client || initialState;

export const selectLogin = createSelector(selectClientState, (state) => state.login);
export const selectToken = createSelector(selectClientState, (state) => state.token);
export const selectUserDetails = createSelector(selectClientState, (state) => state.userDetails);
export const selectIsAdmin = createSelector(selectClientState, (state) => state.isAdmin);
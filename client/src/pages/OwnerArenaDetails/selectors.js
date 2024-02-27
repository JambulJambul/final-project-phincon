import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectArenaDetailsState = (state) => state.arenaDetails || initialState;

export const selectArenaDetails = createSelector(selectArenaDetailsState, (state) => state.arenaData);
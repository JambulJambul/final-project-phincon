import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectArenaDetailsState = (state) => state.arenaDetails || initialState;

export const selectArenaDetails = createSelector(selectArenaDetailsState, (state) => state.arenaData);
export const selectCourt = createSelector(selectArenaDetailsState, (state) => state.court);
export const selectDailyCourtSchedule = createSelector(selectArenaDetailsState, (state) => state.scheduleData);
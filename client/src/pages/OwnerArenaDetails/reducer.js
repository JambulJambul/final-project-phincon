import { produce } from 'immer';

import { SET_ARENA_DETAILS, SET_COURT, SET_DAILY_SCHEDULE, EMPTY_DAILY_SCHEDULE } from './constants';

export const initialState = {
    arenaData: null,
    court: null,
    scheduleData: null
};

const arenaDetailsReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_ARENA_DETAILS:
                draft.arenaData = action.arenaData;
                break;
            case SET_COURT:
                draft.court = action.court;
                break;
            case SET_DAILY_SCHEDULE:
                draft.scheduleData = action.scheduleData;
                break;
            case EMPTY_DAILY_SCHEDULE:
                draft.scheduleData = null;
                break;
        }
    });

export default arenaDetailsReducer;

import { produce } from 'immer';

import { SET_ARENA_DETAILS } from './constants';

export const initialState = {
    arenaData: null,
};

const arenaDetailsReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_ARENA_DETAILS:
                draft.arenaData = action.arenaData;
                break;
        }
    });

export default arenaDetailsReducer;

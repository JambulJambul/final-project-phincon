import { produce } from 'immer';

import { SET_OWNER_ARENA } from './constants';

export const initialState = {
    ownerArena: null,
};

export const storedKey = [];

const ownerHomepageReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_OWNER_ARENA:
                draft.ownerArena = action.ownerArena;
                break;
        }
    });

export default ownerHomepageReducer;

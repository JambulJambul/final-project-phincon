import { produce } from 'immer';

import { SET_ALL_USERS } from './constants';

export const initialState = {
    userArray: null,
};

export const storedKey = [];

const adminUserListReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_ALL_USERS:
                draft.userArray = action.userArray;
                break;
        }
    });

export default adminUserListReducer;

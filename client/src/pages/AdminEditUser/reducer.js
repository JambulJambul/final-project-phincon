import { produce } from 'immer';

import { SET_USER } from './constants';

export const initialState = {
    userData: null,
};

export const storedKey = [];

const adminEditUserSaga = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_USER:
                draft.userData = action.userData;
                break;
        }
    });

export default adminEditUserSaga;

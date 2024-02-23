import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOwnerHomepageState = (state) => state.ownerHomepage || initialState;

export const selectOwnerHomepage = createSelector(selectOwnerHomepageState, (state) => state.ownerArena);
import {createReducer} from '@reduxjs/toolkit';

import {UserData} from 'types/user-data';
import {AuthorizationStatus} from 'components/app/const';
import {loadUser, requireAuthorization, setDataLoadedStatus,} from './action';

export type User = {
  user: UserData | null,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
}

export const initialState: User = {
  user: null,
  authorizationStatus: AuthorizationStatus.NoAuth,
  isDataLoaded: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});

export {userReducer};

/* eslint-disable no-param-reassign */
import {createReducer, PayloadAction} from '@reduxjs/toolkit';

import {UserIdentity} from '../types';
import {GetCurrentUserActions, SignOutActions} from '../actions';

export type CurrentUserState = {
  authenticated: boolean;
  user: UserIdentity;
};

const INITIAL: CurrentUserState = {
  authenticated: false,
  user: null,
};

export default createReducer(INITIAL, {
  [GetCurrentUserActions.Succeeded]: (
    state: CurrentUserState,
    action: PayloadAction<UserIdentity>,
  ) => {
    state.authenticated = true;
    state.user = action.payload;
  },

  [SignOutActions.Completed]: (state: CurrentUserState) => {
    state.authenticated = false;
    state.user = null;
  },
});

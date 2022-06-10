import {get} from '@truefit/http-utils';
import {Dispatch} from 'redux';
import {createAction} from '@reduxjs/toolkit';

import {UserIdentity} from '../types';

export enum GetCurrentUserActions {
  Succeeded = 'CURRENT_USER/GET_SUCCEEDED',
}

const succeeded = createAction<UserIdentity>(GetCurrentUserActions.Succeeded);

export const getCurrentUser = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await get('authentication/current-user/identity');
  dispatch(succeeded(response.data));
};

import {del} from '@truefit/http-utils';
import {Dispatch} from 'redux';
import {createAction} from '@reduxjs/toolkit';

export enum SignOutActions {
  Completed = 'SIGN_OUT/COMPLETED',
}

const completed = createAction(SignOutActions.Completed);

export const signOut = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    await del('authentication/sign-out-local');
  } finally {
    dispatch(completed());
  }
};

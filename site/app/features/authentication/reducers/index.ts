/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import currentUser, {CurrentUserState} from './currentUser';

export type AuthenticationState = {
  currentUser: CurrentUserState;
};

export default combineReducers({
  currentUser,
});

/* eslint-disable sort-imports */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
import {combineReducers} from 'redux';

import authentication, {AuthenticationState} from './features/authentication/reducers';
import example, {ExampleState} from './features/example/reducers';

export type ApplicationState = {
  features: {
    authentication: AuthenticationState;
    example: ExampleState;
  };
};

const createRootReducer = () =>
  combineReducers({
    features: combineReducers({
      authentication: authentication,
      example: example,
    }),
  });

export default createRootReducer;

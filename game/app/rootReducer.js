/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import game from './features/game/reducers';

const rootReducer = combineReducers({
  features: combineReducers({
    game,
  }),
  routing: routerReducer,
});

export default rootReducer;

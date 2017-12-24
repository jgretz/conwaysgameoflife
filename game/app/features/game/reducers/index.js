/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import board from './board.js';
import progress from './progress.js';

export default combineReducers({
  board,
  progress,
});

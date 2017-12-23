import {stateReducer} from 'truefit-react-utils';
import {Record} from 'immutable';
import {CHANGE_HEIGHT, CHANGE_WIDTH} from '../actions';

const Board = Record({height: 10, width: 10});
const INITIAL = new Board();

export default stateReducer(INITIAL, {
  [CHANGE_HEIGHT]: (board, payload) => board.set('height', payload),
  [CHANGE_WIDTH]: (board, payload) => board.set('width', payload),
});

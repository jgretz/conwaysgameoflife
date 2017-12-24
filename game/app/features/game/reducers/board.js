import {stateReducer} from 'truefit-react-utils';
import {fromJS} from 'immutable';

import {TOGGLE_SPACE, NEW_GENERATION} from '../actions';
import {WIDTH, HEIGHT} from '../../shared/constants';

const BOARD = [];
for (let x = 0; x < HEIGHT; x++) {
  BOARD[x] = [];

  for (let y = 0; y < WIDTH; y++) {
    BOARD[x][y] = false;
  }
}

export default stateReducer(fromJS(BOARD), {
  [TOGGLE_SPACE]: (board, payload) => {
    const addr = [payload.x, payload.y];
    const flag = board.getIn(addr);

    return board.setIn(addr, !flag);
  },

  [NEW_GENERATION]: (_, payload) => fromJS(payload),
});

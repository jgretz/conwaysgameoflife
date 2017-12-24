import {boardSelector} from '../selectors';
import {WIDTH, HEIGHT} from '../../shared/constants';

export const NEW_GENERATION = 'NEW_GENERATION';

const livingNeighbors = (current, x, y) => {
  const neighbors = [
    current.getIn([x - 1, y - 1], false),
    current.getIn([x, y - 1], false),
    current.getIn([x + 1, y - 1], false),
    current.getIn([x - 1, y], false),
    current.getIn([x + 1, y], false),
    current.getIn([x - 1, y + 1], false),
    current.getIn([x, y + 1], false),
    current.getIn([x + 1, y + 1], false),
  ];

  return neighbors.filter(x => x).length;
};

export const advanceGeneration = () => (dispatch, getState) => {
  const current = boardSelector(getState());

  const next = [];
  for (let x = 0; x < HEIGHT; x++) {
    next[x] = [];

    for (let y = 0; y < WIDTH; y++) {
      const self = current.getIn([x, y]);
      const neighbors = livingNeighbors(current, x, y);

      if (self) {
        if (neighbors < 2) {
          next[x][y] = false;
          continue;
        }

        if (neighbors > 3) {
          next[x][y] = false;
          continue;
        }

        next[x][y] = true;
        continue;
      }

      next[x][y] = neighbors === 3;
    }
  }

  dispatch({
    type: NEW_GENERATION,
    payload: next,
  });
};

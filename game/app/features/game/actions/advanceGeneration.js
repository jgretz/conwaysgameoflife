import {boardSelector} from '../selectors';
import {WIDTH, HEIGHT} from '../../shared/constants';

export const NEW_GENERATION = 'NEW_GENERATION';

const livingNeighbors = (current, x, y) => {
  const get = (offsetX, offSetY) => {
    const posX = x + offsetX;
    const posY = y + offSetY;

    if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) {
      return false;
    }

    return current.getIn([posX, posY]);
  };

  const neighbors = [
    get(-1, -1),
    get(0, -1),
    get(1, -1),
    get(-1, 0),
    get(1, 0),
    get(-1, 1),
    get(0, 1),
    get(1, 1),
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

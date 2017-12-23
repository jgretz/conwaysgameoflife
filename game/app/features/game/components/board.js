import React from 'react';

import Space from './space';
import {HEIGHT, WIDTH} from '../../shared/constants';

const render = () => {
  const spaceHeight = 100 / HEIGHT;
  const spaceWidth = 100 / WIDTH;

  const board = [];

  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      board.push((
        <Space key={`${x}-${y}`} x={x} y={y} height={spaceHeight} width={spaceWidth} />
      ));
    }
  }

  return board;
};

export default () => (
  <div className="board">
    {
      render()
    }
  </div>
);

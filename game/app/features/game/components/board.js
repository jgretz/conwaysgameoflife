import React from 'react';
import {connect} from 'react-redux';

import Space from './space';

import {boardSelector} from '../selectors';

const render = (height, width) => {
  const spaceHeight = 100 / height;
  const spaceWidth = 100 / width;

  const board = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      board.push((
        <Space key={`${x}-${y}`} x={x} y={y} height={spaceHeight} width={spaceWidth} />
      ));
    }
  }

  return board;
};

const board = ({board}) => (
  <div className="board">
    {
      render(board.height, board.height)
    }
  </div>
);

const mapStateToProps = state => ({
  board: boardSelector(state),
});

export default connect(mapStateToProps)(board);

import React from 'react';

import Board from './board';
import GameLoop from './gameLoop';

export default () => (
  <div className="board-container">
    <Board />

    <GameLoop />
  </div>
);

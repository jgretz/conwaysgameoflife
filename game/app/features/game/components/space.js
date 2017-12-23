import React from 'react';

import Creature from './creature';

export default ({x, y, height, width}) => (
  <div className="space" style={{height: `${height}%`, width: `${width}%`}}>
    <Creature />
  </div>
);

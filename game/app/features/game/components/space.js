import React from 'react';

export default ({x, y, height, width}) => (
  <div className="space" style={{height: `${height}%`, width: `${width}%`}}>
    {x}:{y}
  </div>
);

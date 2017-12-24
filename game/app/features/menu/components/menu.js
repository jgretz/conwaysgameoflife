import React from 'react';

import ProgressControl from './progressControl';

export default () => (
  <div className="menu">
    <div className="controls" />
    <h1>Conway&apos;s Game Of Life</h1>
    <div className="controls">
      <ProgressControl />
    </div>
  </div>
);

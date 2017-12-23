import React from 'react';
import {Switch, Route} from 'react-router';

import NotFound from './notFound';
import {Game} from '../../game/components';

export default () => (
  <div>
    <Switch>
      <Route exact path="/" component={Game} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

import React from 'react';
import {Switch, Route} from 'react-router';

import {Paper} from '../../example/components';
import {NotFound, AccessDenied, SystemError} from '../../shared/components';
import {GetCurrentUserPage, SignOut} from '../../authentication/components';
import AuthenticateRoute from './AuthenticateRoute';
import SystemRoles from '../../authentication/enums/systemRoles';

export default () => (
  <Switch>
    <Route exact path="/">
      <Paper />
    </Route>
    <Route path="/sign-out">
      <SignOut />
    </Route>
    <Route exact path="/secure">
      <AuthenticateRoute roles={[SystemRoles.Administrator]}>
        <Paper />
      </AuthenticateRoute>
    </Route>
    <Route path="/get-current-user">
      <GetCurrentUserPage />
    </Route>
    <Route path="/access-denied">
      <AccessDenied />
    </Route>
    <Route path="/system-error">
      <SystemError />
    </Route>

    <Route>
      <NotFound />
    </Route>
  </Switch>
);

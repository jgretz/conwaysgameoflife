import React, {ReactNode} from 'react';
import {compose} from '@truefit/bach';
import {withSelector} from '@truefit/bach-redux';
import {withLocation} from '@truefit/bach-react-router';
import {intersection} from 'lodash';
import {Redirect} from 'react-router-dom';
import {Location} from 'history';
import {isAuthenticatedSelector, rolesSelector} from '../../authentication/selectors';

type PublicProps = {
  roles: Array<string>;
};

type InternalProps = {
  location: Location;
  isAuthenticated: boolean;
  currentUserRoles: Array<string>;
  children: ReactNode;
};

type Props = PublicProps & InternalProps;

const AuthenticateRoute = ({
  roles,
  location,
  isAuthenticated,
  currentUserRoles,
  children,
}: Props) => {
  if (!isAuthenticated) {
    return <Redirect to={{pathname: '/get-current-user', state: {referrer: location}}} />;
  }

  if (roles?.length && !intersection(currentUserRoles, roles).length) {
    return <Redirect to="/access-denied" />;
  }

  return <>{children}</>;
};

export default compose<PublicProps>(
  withLocation(),

  withSelector('isAuthenticated', isAuthenticatedSelector),
  withSelector('currentUserRoles', rolesSelector),
)(AuthenticateRoute);

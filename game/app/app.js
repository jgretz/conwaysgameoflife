import React, {Component} from 'react';
import {withRouter} from 'react-router';

import {Routes} from './features/shared/components';

class App extends Component {
  render() {
    return (
      <Routes />
    );
  }
}

export default withRouter(App);

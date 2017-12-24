import React, {Component} from 'react';
import {withRouter} from 'react-router';

import {Menu} from './features/menu/components';
import {Routes} from './features/shared/components';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Menu />
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);

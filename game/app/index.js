import './styles/styles.scss';

import 'babel-polyfill';
import './babelHelpers';
import 'core-js/es6/symbol';
import 'core-js/es6/promise';
import 'core-js/es6/array';
import 'core-js/es6/number';
import 'core-js/es6/object';

import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import {configureStore, configureHttp} from './util';

import App from './app';

// configure stuff
const app = document.getElementById('app');

const history = createHistory();
const store = configureStore(history);

configureHttp(store);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  app
);

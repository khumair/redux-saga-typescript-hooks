import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers';

import './index.css';

const composeEnhancers = composeWithDevTools({});

const logger = createLogger({
  collapsed: true
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger)
  )
);

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);